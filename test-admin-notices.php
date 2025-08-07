<?php
/**
 * Test Admin Notices
 * 
 * Simple test to verify admin notices are working correctly
 * Only loads in debug mode
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Only run in debug mode
if (!defined('WP_DEBUG') || !WP_DEBUG) {
    return;
}

/**
 * Add test admin notice to verify functionality
 */
add_action('admin_notices', function() {
    if (!current_user_can('manage_options')) {
        return;
    }

    // Only show on dashboard for testing
    $screen = get_current_screen();
    if (!$screen || $screen->id !== 'dashboard') {
        return;
    }

    // Check if this test notice was dismissed
    $test_dismissed = get_user_meta(get_current_user_id(), 'blaze_test_notice_dismissed', true);
    
    if (!$test_dismissed) {
        echo '<div class="notice notice-info is-dismissible" data-dismissible="blaze-test-notice">';
        echo '<p><strong>Blaze Gutenberg Test:</strong> ';
        echo 'Admin notices system is working. ';
        echo '<a href="#" class="blaze-dismiss-test" data-nonce="' . wp_create_nonce('blaze_test_dismiss') . '">Dismiss this test notice</a>';
        echo '</p>';
        echo '</div>';
        
        // Add inline script for test dismissal
        wp_add_inline_script('jquery', '
            jQuery(document).ready(function($) {
                $(document).on("click", ".blaze-dismiss-test", function(e) {
                    e.preventDefault();
                    
                    var nonce = $(this).data("nonce");
                    var notice = $(this).closest(".notice");
                    
                    $.post(ajaxurl, {
                        action: "blaze_dismiss_test_notice",
                        nonce: nonce
                    }, function(response) {
                        if (response.success) {
                            notice.fadeOut();
                        }
                    });
                });
            });
        ');
    }
});

/**
 * Handle test notice dismissal
 */
add_action('wp_ajax_blaze_dismiss_test_notice', function() {
    if (!wp_verify_nonce($_POST['nonce'], 'blaze_test_dismiss')) {
        wp_send_json_error('Security check failed');
    }
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Insufficient permissions');
    }
    
    update_user_meta(get_current_user_id(), 'blaze_test_notice_dismissed', true);
    wp_send_json_success();
});

/**
 * Add admin menu item to reset notices for testing
 */
add_action('admin_menu', function() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    add_submenu_page(
        'tools.php',
        'Reset Blaze Notices',
        'Reset Blaze Notices',
        'manage_options',
        'reset-blaze-notices',
        function() {
            if (isset($_POST['reset_notices'])) {
                // Reset all dismissal statuses
                \BlazeGutenberg\AdminNotices::reset_dismissal_status();
                delete_user_meta(get_current_user_id(), 'blaze_test_notice_dismissed');
                
                echo '<div class="notice notice-success"><p>All Blaze notices have been reset!</p></div>';
            }
            
            echo '<div class="wrap">';
            echo '<h1>Reset Blaze Notices</h1>';
            echo '<p>Use this tool to reset all dismissed notices for testing purposes.</p>';
            echo '<form method="post">';
            echo '<input type="submit" name="reset_notices" class="button button-primary" value="Reset All Notices" />';
            echo '</form>';
            echo '</div>';
        }
    );
});
