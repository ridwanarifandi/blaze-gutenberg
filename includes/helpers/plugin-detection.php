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
        // First check if the plugin is active
        if (!blaze_is_admin_site_enhancement_pro_active()) {
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

        return !empty($column_exists);
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
        if (blaze_is_term_order_enabled_for_taxonomy('product_cat')) {
            $options[] = ['label' => __('Term Order', 'blaze-gutenberg'), 'value' => 'term_order'];
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
     */
    function blaze_should_use_term_order($orderby)
    {
        return $orderby === 'term_order' && blaze_has_term_order_feature();
    }
}

if (!function_exists('blaze_get_fallback_orderby')) {
    /**
     * Get fallback orderby value when term order is not available
     * 
     * @param string $requested_orderby The originally requested orderby
     * @return string Fallback orderby value
     */
    function blaze_get_fallback_orderby($requested_orderby)
    {
        // If term order was requested but not available, fallback to name
        if ($requested_orderby === 'term_order' && !blaze_has_term_order_feature()) {
            return 'name';
        }

        return $requested_orderby;
    }
}
