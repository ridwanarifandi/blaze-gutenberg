<?php
/**
 * Test Term Order Integration
 * 
 * Test file to verify integration with admin-site-enhancement-pro plugin
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

// For testing purposes, force term order to be available
// Remove this line when testing with actual plugin
define('BLAZE_FORCE_TERM_ORDER_TEST', true);

/**
 * Test Term Order Integration
 */
function test_blaze_term_order_integration()
{
    error_log('=== Testing Term Order Integration ===');

    // Test plugin detection functions
    $is_plugin_active = blaze_is_admin_site_enhancement_pro_active();
    $has_term_order = blaze_has_term_order_feature();
    $is_enabled_for_taxonomy = blaze_is_term_order_enabled_for_taxonomy('product_cat');

    error_log("Admin Site Enhancement Pro Active: " . ($is_plugin_active ? 'YES' : 'NO'));
    error_log("Term Order Feature Available: " . ($has_term_order ? 'YES' : 'NO'));
    error_log("Term Order Enabled for product_cat: " . ($is_enabled_for_taxonomy ? 'YES' : 'NO'));

    // Test available order options
    $order_options = blaze_get_available_category_order_options();
    error_log("Available Order Options: " . json_encode($order_options));

    // Test orderby fallback
    $fallback_name = blaze_get_fallback_orderby('name');
    $fallback_term_order = blaze_get_fallback_orderby('term_order');

    error_log("Fallback for 'name': " . $fallback_name);
    error_log("Fallback for 'term_order': " . $fallback_term_order);

    // Test should use term order
    $should_use_name = blaze_should_use_term_order('name');
    $should_use_term_order = blaze_should_use_term_order('term_order');

    error_log("Should use term order for 'name': " . ($should_use_name ? 'YES' : 'NO'));
    error_log("Should use term order for 'term_order': " . ($should_use_term_order ? 'YES' : 'NO'));

    // Test database structure if plugin is active
    if ($has_term_order) {
        global $wpdb;

        // Check if term_order column exists
        $columns = $wpdb->get_results("SHOW COLUMNS FROM {$wpdb->terms} LIKE 'term_order'");
        error_log("term_order column exists: " . (!empty($columns) ? 'YES' : 'NO'));

        // Get sample categories with term_order
        $sample_categories = get_terms([
            'taxonomy' => 'product_cat',
            'number' => 5,
            'hide_empty' => false,
        ]);

        if (!is_wp_error($sample_categories) && !empty($sample_categories)) {
            error_log("Sample categories found: " . count($sample_categories));
            foreach ($sample_categories as $category) {
                error_log("Category: {$category->name} (ID: {$category->term_id})");
            }
        }
    }

    error_log('=== Term Order Integration Test Complete ===');
}

/**
 * Test API endpoints
 */
function test_blaze_api_endpoints()
{
    error_log('=== Testing API Endpoints ===');

    // Test if we're in admin context for REST API
    if (!is_admin()) {
        error_log('Not in admin context, skipping API tests');
        return;
    }

    // Test category order options endpoint
    if (function_exists('rest_do_request')) {
        $request = new WP_REST_Request('GET', '/blaze/v1/category-order-options');
        $response = rest_do_request($request);

        if ($response->is_error()) {
            error_log('API Error: ' . $response->get_error_message());
        } else {
            $data = $response->get_data();
            error_log('Category Order Options API Response: ' . json_encode($data));
        }
    }

    error_log('=== API Endpoints Test Complete ===');
}

// Run tests on admin_init to ensure WordPress is fully loaded
add_action('admin_init', function () {
    // Only run once per page load
    static $tests_run = false;
    if ($tests_run) {
        return;
    }
    $tests_run = true;

    test_blaze_term_order_integration();
    test_blaze_api_endpoints();
});

// Admin notices are now handled by AdminNotices class
// This provides dismissible warnings when admin-site-enhancement-pro is not active
