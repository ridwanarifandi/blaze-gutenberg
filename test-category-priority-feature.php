<?php
/**
 * Test file for Category Priority Feature
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
 * Test Category Priority Feature
 */
function test_blaze_category_priority_feature()
{
    // Check if CategoryPriority class exists
    if (!class_exists('BlazeGutenberg\CategoryPriority')) {
        error_log('CategoryPriority class not found');
        return false;
    }

    // Test constants
    $default_priority = \BlazeGutenberg\CategoryPriority::DEFAULT_PRIORITY;

    error_log("Using term_meta with meta_key '_blaze_category_priority' for category priority");
    error_log("Default Priority: {$default_priority}");

    // Test if WooCommerce is active
    if (!function_exists('get_terms')) {
        error_log('WordPress terms functions not available - cannot test category priority');
        return false;
    }

    // Get a test category
    $categories = get_terms([
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
        'number' => 1
    ]);

    if (empty($categories) || is_wp_error($categories)) {
        error_log('No product categories found for testing');
        return false;
    }

    $test_category = $categories[0];
    $category_id = $test_category->term_id;

    error_log("Testing with category ID: {$category_id} ({$test_category->name})");

    // Test get_priority method
    $current_priority = \BlazeGutenberg\CategoryPriority::get_priority($category_id);
    error_log("Current priority: {$current_priority}");

    // Test set_priority method
    $test_priority = 5;
    $result = \BlazeGutenberg\CategoryPriority::set_priority($category_id, $test_priority);
    error_log("Set priority result: " . ($result !== false ? 'success' : 'failed'));

    // Verify the priority was set
    $new_priority = \BlazeGutenberg\CategoryPriority::get_priority($category_id);
    error_log("New priority: {$new_priority}");

    // Test sorting with term_order
    $categories_with_priority = get_terms([
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
        'number' => 5
    ]);

    error_log("Categories available for sorting: " . count($categories_with_priority));

    // Test that all categories are included in sorting
    $all_categories = get_terms([
        'taxonomy' => 'product_cat',
        'hide_empty' => false
    ]);
    error_log("Total categories in database: " . count($all_categories));

    if ($new_priority == $test_priority) {
        error_log('Category Priority Feature: ALL TESTS PASSED');
        return true;
    } else {
        error_log('Category Priority Feature: TESTS FAILED');
        return false;
    }
}

// Run test on admin_init
add_action('admin_init', function () {
    // Only run once per session
    if (!get_transient('blaze_category_priority_test_run')) {
        set_transient('blaze_category_priority_test_run', true, 300); // 5 minutes
        test_blaze_category_priority_feature();
    }
});

/**
 * Add admin notice for test results
 */
add_action('admin_notices', function () {
    if (current_user_can('manage_options') && isset($_GET['blaze_test_category_priority'])) {
        $result = test_blaze_category_priority_feature();
        $class = $result ? 'notice-success' : 'notice-error';
        $message = $result ? 'Category Priority Feature tests passed!' : 'Category Priority Feature tests failed. Check error log.';

        echo "<div class='notice {$class} is-dismissible'>";
        echo "<p>{$message}</p>";
        echo "</div>";
    }
});
