<?php
/**
 * Test file for Product Priority Feature
 * This file is for development testing only
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
 * Test Product Priority Feature
 */
function test_blaze_product_priority_feature()
{
    // Check if ProductPriority class exists
    if (!class_exists('BlazeGutenberg\ProductPriority')) {
        error_log('ProductPriority class not found');
        return false;
    }

    // Test constants
    $default_priority = \BlazeGutenberg\ProductPriority::DEFAULT_PRIORITY;

    error_log("Using menu_order column for priority");
    error_log("Default Priority: {$default_priority}");

    // Test if WooCommerce is active
    if (!function_exists('wc_get_products')) {
        error_log('WooCommerce not active - cannot test product priority');
        return false;
    }

    // Get a test product
    $products = wc_get_products(['limit' => 1]);
    if (empty($products)) {
        error_log('No products found for testing');
        return false;
    }

    $test_product = $products[0];
    $product_id = $test_product->get_id();

    error_log("Testing with product ID: {$product_id}");

    // Test get_priority method
    $current_priority = \BlazeGutenberg\ProductPriority::get_priority($product_id);
    error_log("Current priority: {$current_priority}");

    // Test set_priority method
    $test_priority = 5;
    $result = \BlazeGutenberg\ProductPriority::set_priority($product_id, $test_priority);
    error_log("Set priority result: " . ($result ? 'success' : 'failed'));

    // Verify the priority was set
    $new_priority = \BlazeGutenberg\ProductPriority::get_priority($product_id);
    error_log("New priority: {$new_priority}");

    // Test sorting with menu_order
    $products_with_priority = wc_get_products([
        'limit' => 5,
        'orderby' => 'menu_order',
        'order' => 'DESC'
    ]);

    error_log("Products sorted by menu_order: " . count($products_with_priority));

    // Test that all products are included in sorting
    $all_products = wc_get_products(['limit' => -1]);
    error_log("Total products in database: " . count($all_products));

    if ($new_priority == $test_priority) {
        error_log('Product Priority Feature: ALL TESTS PASSED');
        return true;
    } else {
        error_log('Product Priority Feature: TESTS FAILED');
        return false;
    }
}

// Run test on admin_init
add_action('admin_init', function () {
    // Only run once per session
    if (!get_transient('blaze_priority_test_run')) {
        set_transient('blaze_priority_test_run', true, 300); // 5 minutes
        test_blaze_product_priority_feature();
    }
});

/**
 * Add admin notice for test results
 */
add_action('admin_notices', function () {
    if (current_user_can('manage_options') && isset($_GET['blaze_test_priority'])) {
        $result = test_blaze_product_priority_feature();
        $class = $result ? 'notice-success' : 'notice-error';
        $message = $result ? 'Product Priority Feature tests passed!' : 'Product Priority Feature tests failed. Check error log.';

        echo "<div class='notice {$class} is-dismissible'>";
        echo "<p>{$message}</p>";
        echo "</div>";
    }
});
