<?php
/**
 * Test Category Filter Implementation
 * 
 * This file tests the category filter functionality
 * to ensure it works correctly on category pages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Test Category Filter on Category Page
 */
function test_category_filter_implementation()
{
    echo "<h2>Category Filter Implementation Test</h2>";

    // Test 1: Check if we can detect category page
    echo "<h3>1. Category Page Detection</h3>";
    if (function_exists('is_product_category')) {
        if (is_product_category()) {
            echo "<p>✅ Currently on a product category page</p>";

            // Get current category
            $current_category = get_queried_object();
            if ($current_category && isset($current_category->term_id)) {
                echo "<p>✅ Current category: " . esc_html($current_category->name) . " (ID: " . $current_category->term_id . ")</p>";
            } else {
                echo "<p>❌ Could not get current category object</p>";
            }
        } else {
            echo "<p>⚠️ Not currently on a product category page</p>";
        }
    } else {
        echo "<p>❌ WooCommerce function is_product_category() not available</p>";
    }

    // Test 2: Check helper functions
    echo "<h3>2. Helper Functions Test</h3>";
    if (function_exists('blaze_get_current_product_category')) {
        echo "<p>✅ blaze_get_current_product_category() function exists</p>";

        $current_cat = blaze_get_current_product_category();
        if ($current_cat) {
            echo "<p>✅ Helper function returned category: " . esc_html($current_cat->name) . "</p>";
        } else {
            echo "<p>⚠️ Helper function returned null (normal if not on category page)</p>";
        }
    } else {
        echo "<p>❌ blaze_get_current_product_category() function not found</p>";
    }

    if (function_exists('blaze_get_child_categories')) {
        echo "<p>✅ blaze_get_child_categories() function exists</p>";
    } else {
        echo "<p>❌ blaze_get_child_categories() function not found</p>";
    }

    // Test 3: Test getting child categories
    echo "<h3>3. Child Categories Test</h3>";
    if (function_exists('blaze_get_current_category_children')) {
        echo "<p>✅ blaze_get_current_category_children() function exists</p>";

        $child_categories = blaze_get_current_category_children();
        if (!empty($child_categories)) {
            echo "<p>✅ Found " . count($child_categories) . " child categories:</p>";
            echo "<ul>";
            foreach ($child_categories as $child) {
                echo "<li>" . esc_html($child->name) . " (" . $child->count . " products)</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>⚠️ No child categories found - will fallback to top-level categories</p>";

            // Test top-level categories fallback
            if (function_exists('blaze_get_top_level_categories')) {
                echo "<p>✅ blaze_get_top_level_categories() function exists</p>";

                $top_level_categories = blaze_get_top_level_categories();
                if (!empty($top_level_categories)) {
                    echo "<p>✅ Found " . count($top_level_categories) . " top-level categories:</p>";
                    echo "<ul>";
                    foreach ($top_level_categories as $top_cat) {
                        echo "<li>" . esc_html($top_cat->name) . " (" . $top_cat->count . " products)</li>";
                    }
                    echo "</ul>";
                } else {
                    echo "<p>❌ No top-level categories found</p>";
                }
            } else {
                echo "<p>❌ blaze_get_top_level_categories() function not found</p>";
            }
        }
    } else {
        echo "<p>❌ blaze_get_current_category_children() function not found</p>";
    }

    // Test 4: Test all product categories
    echo "<h3>4. All Product Categories</h3>";
    $all_categories = get_terms([
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
        'number' => 10
    ]);

    if (!is_wp_error($all_categories) && !empty($all_categories)) {
        echo "<p>✅ Found " . count($all_categories) . " product categories (showing first 10):</p>";
        echo "<ul>";
        foreach ($all_categories as $category) {
            $child_count = get_terms([
                'taxonomy' => 'product_cat',
                'parent' => $category->term_id,
                'hide_empty' => false,
                'fields' => 'count'
            ]);

            echo "<li>" . esc_html($category->name) . " (ID: " . $category->term_id . ", Parent: " . $category->parent . ", Children: " . $child_count . ")</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>❌ Could not get product categories</p>";
    }

    // Test 5: Simulate filter block rendering
    echo "<h3>5. Filter Block Simulation</h3>";
    if (class_exists('BlazeGutenberg\\BlocksManager')) {
        echo "<p>✅ BlocksManager class exists</p>";

        // Test attributes
        $test_attributes = [
            'title' => 'Category Filter Test',
            'filterType' => 'category',
            'showCount' => true,
            'maxVisible' => 10,
            'isCollapsed' => false,
            'orderBy' => 'name',
            'order' => 'ASC',
            'hideEmpty' => true,
        ];

        echo "<p>Test attributes prepared</p>";
        echo "<pre>" . print_r($test_attributes, true) . "</pre>";
    } else {
        echo "<p>❌ BlocksManager class not found</p>";
    }
}

// Run test if this file is accessed directly or via admin
if (is_admin() || (defined('WP_CLI') && WP_CLI)) {
    add_action('init', function () {
        if (isset($_GET['test_category_filter'])) {
            test_category_filter_implementation();
            exit;
        }
    });
}
