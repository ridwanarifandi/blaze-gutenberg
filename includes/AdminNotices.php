<?php
namespace BlazeGutenberg;

/**
 * Admin Notices Management Class
 * Handles dismissible admin notices for plugin status and warnings
 */
class AdminNotices
{
    /**
     * Initialize the class
     */
    public static function init()
    {
        add_action('admin_notices', [__CLASS__, 'show_term_order_notices']);
        add_action('wp_ajax_blaze_dismiss_term_order_warning', [__CLASS__, 'dismiss_term_order_warning']);
        add_action('admin_enqueue_scripts', [__CLASS__, 'enqueue_admin_scripts']);
    }

    /**
     * Show term order related notices
     */
    public static function show_term_order_notices()
    {
        // Only show to users who can manage options
        if (!current_user_can('manage_options')) {
            return;
        }

        // Only show on relevant admin pages
        if (!self::should_show_notices()) {
            return;
        }

        $is_plugin_active = blaze_is_admin_site_enhancement_pro_active();
        $has_term_order = blaze_has_term_order_feature();
        
        // Check if user has dismissed the warning
        $dismissed = get_user_meta(get_current_user_id(), 'blaze_term_order_warning_dismissed', true);
        
        if ($has_term_order) {
            // Show success message only once per session
            if (!get_transient('blaze_term_order_success_shown_' . get_current_user_id())) {
                self::show_success_notice();
                set_transient('blaze_term_order_success_shown_' . get_current_user_id(), true, HOUR_IN_SECONDS);
            }
        } elseif (!$dismissed) {
            // Show warning only if not dismissed
            self::show_warning_notice();
        }
    }

    /**
     * Show success notice
     */
    private static function show_success_notice()
    {
        echo '<div class="notice notice-success is-dismissible">';
        echo '<p><strong>' . esc_html__('Blaze Gutenberg:', 'blaze-gutenberg') . '</strong> ';
        echo esc_html__('Admin Site Enhancement Pro detected! Term ordering is now available for category blocks.', 'blaze-gutenberg');
        echo '</p>';
        echo '</div>';
    }

    /**
     * Show warning notice
     */
    private static function show_warning_notice()
    {
        $nonce = wp_create_nonce('blaze_dismiss_warning');
        
        echo '<div class="notice notice-warning is-dismissible" data-dismissible="blaze-term-order-warning">';
        echo '<p><strong>' . esc_html__('Blaze Gutenberg:', 'blaze-gutenberg') . '</strong> ';
        echo esc_html__('Admin Site Enhancement Pro plugin is not active or term ordering feature is not available.', 'blaze-gutenberg') . ' ';
        echo esc_html__('Category sorting will use default options (Name, Product Count, ID).', 'blaze-gutenberg') . ' ';
        echo '<a href="#" class="blaze-dismiss-warning" data-nonce="' . esc_attr($nonce) . '">';
        echo esc_html__("Don't show this again", 'blaze-gutenberg');
        echo '</a>';
        echo '</p>';
        echo '</div>';
    }

    /**
     * Check if notices should be shown on current page
     */
    private static function should_show_notices()
    {
        $screen = get_current_screen();
        
        if (!$screen) {
            return false;
        }

        // Show on dashboard, plugins page, and block editor pages
        $allowed_screens = [
            'dashboard',
            'plugins',
            'edit-page',
            'edit-post',
            'page',
            'post',
            'edit-product_cat', // WooCommerce category management
        ];

        return in_array($screen->id, $allowed_screens) || 
               strpos($screen->id, 'blaze') !== false;
    }

    /**
     * Enqueue admin scripts for notice handling
     */
    public static function enqueue_admin_scripts($hook)
    {
        // Only enqueue on pages where we show notices
        if (!self::should_show_notices()) {
            return;
        }

        wp_add_inline_script('jquery', '
            jQuery(document).ready(function($) {
                // Handle custom dismiss link
                $(document).on("click", ".blaze-dismiss-warning", function(e) {
                    e.preventDefault();
                    
                    var nonce = $(this).data("nonce");
                    var notice = $(this).closest(".notice");
                    
                    $.post(ajaxurl, {
                        action: "blaze_dismiss_term_order_warning",
                        nonce: nonce
                    }, function(response) {
                        if (response.success) {
                            notice.fadeOut();
                        }
                    });
                });
                
                // Handle WordPress default dismiss button
                $(document).on("click", "[data-dismissible=\"blaze-term-order-warning\"] .notice-dismiss", function() {
                    var notice = $(this).closest(".notice");
                    var dismissLink = notice.find(".blaze-dismiss-warning");
                    
                    if (dismissLink.length) {
                        var nonce = dismissLink.data("nonce");
                        
                        $.post(ajaxurl, {
                            action: "blaze_dismiss_term_order_warning",
                            nonce: nonce
                        });
                    }
                });
            });
        ');
    }

    /**
     * Handle AJAX request to dismiss warning
     */
    public static function dismiss_term_order_warning()
    {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'blaze_dismiss_warning')) {
            wp_send_json_error('Security check failed');
        }
        
        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error('Insufficient permissions');
        }
        
        // Save dismissal preference
        update_user_meta(get_current_user_id(), 'blaze_term_order_warning_dismissed', true);
        
        wp_send_json_success();
    }

    /**
     * Reset dismissal status (useful for testing or when plugin is reactivated)
     */
    public static function reset_dismissal_status($user_id = null)
    {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        
        delete_user_meta($user_id, 'blaze_term_order_warning_dismissed');
        delete_transient('blaze_term_order_success_shown_' . $user_id);
    }
}

// Initialize the class
AdminNotices::init();
