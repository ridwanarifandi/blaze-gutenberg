<?php
/**
 * Plugin Detection Helper Functions
 * 
 * Helper functions for detecting and integrating with third-party plugins
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('blaze_is_admin_site_enhancement_pro_active')) {
    /**
     * Check if Admin Site Enhancement Pro plugin is active
     *
     * @return bool True if plugin is active, false otherwise
     */
    function blaze_is_admin_site_enhancement_pro_active()
    {
        // For testing purposes, allow manual override
        if (defined('WP_DEBUG') && WP_DEBUG && defined('BLAZE_FORCE_TERM_ORDER_TEST') && BLAZE_FORCE_TERM_ORDER_TEST) {
            return true;
        }

        // Check if plugin is active
        if (!function_exists('is_plugin_active')) {
            include_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }

        return is_plugin_active('admin-site-enhancement-pro/admin-site-enhancement-pro.php');
    }
}

if (!function_exists('blaze_has_term_order_feature')) {
    /**
     * Check if term order feature is available
     *
     * @return bool True if term order feature is available, false otherwise
     */
    function blaze_has_term_order_feature()
    {
        // For testing purposes, allow manual override
        if (defined('WP_DEBUG') && WP_DEBUG && defined('BLAZE_FORCE_TERM_ORDER_TEST') && BLAZE_FORCE_TERM_ORDER_TEST) {
            return true;
        }

        // First check if the plugin is active
        $plugin_active = blaze_is_admin_site_enhancement_pro_active();

        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('blaze_has_term_order_feature: plugin_active = ' . ($plugin_active ? 'YES' : 'NO'));
        }

        if (!$plugin_active) {
            return false;
        }

        // Check if the term order functionality is available
        // This can be done by checking if the terms table has term_order column
        global $wpdb;

        $column_exists = $wpdb->get_results(
            $wpdb->prepare(
                "SHOW COLUMNS FROM {$wpdb->terms} LIKE %s",
                'term_order'
            )
        );

        $has_column = !empty($column_exists);

        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('blaze_has_term_order_feature: term_order column exists = ' . ($has_column ? 'YES' : 'NO'));
        }

        return $has_column;
    }
}

if (!function_exists('blaze_is_term_order_enabled_for_taxonomy')) {
    /**
     * Check if term order is enabled for a specific taxonomy
     * 
     * @param string $taxonomy Taxonomy name (e.g., 'product_cat')
     * @return bool True if term order is enabled for the taxonomy, false otherwise
     */
    function blaze_is_term_order_enabled_for_taxonomy($taxonomy = 'product_cat')
    {
        // First check if term order feature is available
        if (!blaze_has_term_order_feature()) {
            return false;
        }

        // Check if term order is enabled for this specific taxonomy
        // This would depend on the plugin's settings
        // For now, we assume it's enabled if the feature is available
        return true;
    }
}

if (!function_exists('blaze_get_available_category_order_options')) {
    /**
     * Get available order options for category sorting
     *
     * @return array Array of order options with label and value
     */
    function blaze_get_available_category_order_options()
    {
        $options = [
            ['label' => __('Name', 'blaze-gutenberg'), 'value' => 'name'],
            ['label' => __('Product Count', 'blaze-gutenberg'), 'value' => 'count'],
            ['label' => __('ID', 'blaze-gutenberg'), 'value' => 'id'],
        ];

        // Add term order option if available
        $term_order_enabled = blaze_is_term_order_enabled_for_taxonomy('product_cat');

        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('blaze_get_available_category_order_options: term_order_enabled = ' . ($term_order_enabled ? 'YES' : 'NO'));
        }

        if ($term_order_enabled) {
            $options[] = ['label' => __('Term Order', 'blaze-gutenberg'), 'value' => 'term_order'];
        }

        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('blaze_get_available_category_order_options: returning ' . count($options) . ' options');
            error_log('Options: ' . json_encode($options));
        }

        return $options;
    }
}

if (!function_exists('blaze_should_use_term_order')) {
    /**
     * Check if we should use term order for a given orderby value
     *
     * @param string $orderby The orderby value to check
     * @return bool True if we should use term order, false otherwise
     * @deprecated No longer needed - orderby is used directly without dependency check
     */
    function blaze_should_use_term_order($orderby)
    {
        // Always return true for term_order - let WordPress handle if column doesn't exist
        return $orderby === 'term_order';
    }
}

if (!function_exists('blaze_get_fallback_orderby')) {
    /**
     * Get fallback orderby value when term order is not available
     *
     * @param string $requested_orderby The originally requested orderby
     * @return string Fallback orderby value
     * @deprecated No longer needed - orderby is used directly without dependency check
     */
    function blaze_get_fallback_orderby($requested_orderby)
    {
        // No fallback needed - use orderby directly
        // WordPress will handle gracefully if column doesn't exist
        return $requested_orderby;
    }
}
