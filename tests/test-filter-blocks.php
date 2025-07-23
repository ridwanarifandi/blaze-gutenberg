<?php
/**
 * Test file for Filter Blocks
 * 
 * This file can be used to test the filter blocks functionality
 * Run this from WordPress admin or frontend to check if blocks are working
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Test Filter Blocks Registration
 */
function test_filter_blocks_registration() {
    $registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
    
    $filter_blocks = [
        'blaze/filter-by-category',
        'blaze/filter-by-attribute', 
        'blaze/filter-by-stock-status'
    ];
    
    echo "<h2>Filter Blocks Registration Test</h2>";
    
    foreach ($filter_blocks as $block_name) {
        if (isset($registered_blocks[$block_name])) {
            echo "<p>✅ <strong>{$block_name}</strong> is registered</p>";
        } else {
            echo "<p>❌ <strong>{$block_name}</strong> is NOT registered</p>";
        }
    }
}

/**
 * Test API Endpoints
 */
function test_filter_api_endpoints() {
    echo "<h2>API Endpoints Test</h2>";
    
    $endpoints = [
        '/blaze/v1/product-categories',
        '/blaze/v1/product-tags',
        '/blaze/v1/product-attributes',
        '/blaze/v1/product-stock-status-counts'
    ];
    
    foreach ($endpoints as $endpoint) {
        $response = wp_remote_get(rest_url($endpoint));
        
        if (is_wp_error($response)) {
            echo "<p>❌ <strong>{$endpoint}</strong> - Error: " . $response->get_error_message() . "</p>";
        } else {
            $status_code = wp_remote_retrieve_response_code($response);
            if ($status_code === 200) {
                $body = wp_remote_retrieve_body($response);
                $data = json_decode($body, true);
                $count = is_array($data) ? count($data) : 0;
                echo "<p>✅ <strong>{$endpoint}</strong> - Status: {$status_code}, Items: {$count}</p>";
            } else {
                echo "<p>❌ <strong>{$endpoint}</strong> - Status: {$status_code}</p>";
            }
        }
    }
}

/**
 * Test WooCommerce Integration
 */
function test_woocommerce_integration() {
    echo "<h2>WooCommerce Integration Test</h2>";
    
    if (!class_exists('WooCommerce')) {
        echo "<p>❌ WooCommerce is not active</p>";
        return;
    }
    
    echo "<p>✅ WooCommerce is active</p>";
    
    // Test product categories
    $categories = get_terms([
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
        'number' => 5
    ]);
    
    if (is_wp_error($categories)) {
        echo "<p>❌ Error getting product categories: " . $categories->get_error_message() . "</p>";
    } else {
        echo "<p>✅ Product categories found: " . count($categories) . "</p>";
    }
    
    // Test product attributes
    if (function_exists('wc_get_attribute_taxonomies')) {
        $attributes = wc_get_attribute_taxonomies();
        echo "<p>✅ Product attributes found: " . count($attributes) . "</p>";
    } else {
        echo "<p>❌ wc_get_attribute_taxonomies function not available</p>";
    }
    
    // Test products
    $products = get_posts([
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => 5
    ]);
    
    echo "<p>✅ Products found: " . count($products) . "</p>";
}

/**
 * Test Assets Loading
 */
function test_assets_loading() {
    echo "<h2>Assets Loading Test</h2>";
    
    $assets_to_check = [
        'CSS' => [
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/css/style-blocks.css',
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/css/editor.css'
        ],
        'JavaScript' => [
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/blocks.js',
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/frontend.js',
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/filter-blocks.js'
        ]
    ];
    
    foreach ($assets_to_check as $type => $files) {
        echo "<h3>{$type} Files</h3>";
        foreach ($files as $file) {
            $file_path = str_replace(BLAZE_GUTENBERG_PLUGIN_URL, BLAZE_GUTENBERG_PLUGIN_DIR, $file);
            if (file_exists($file_path)) {
                $size = filesize($file_path);
                echo "<p>✅ " . basename($file) . " - Size: " . number_format($size) . " bytes</p>";
            } else {
                echo "<p>❌ " . basename($file) . " - File not found</p>";
            }
        }
    }
}

/**
 * Run all tests
 */
function run_filter_blocks_tests() {
    if (!current_user_can('manage_options')) {
        wp_die('You do not have permission to access this page.');
    }
    
    echo "<div style='max-width: 800px; margin: 20px; font-family: Arial, sans-serif;'>";
    echo "<h1>Blaze Gutenberg Filter Blocks - Test Results</h1>";
    
    test_filter_blocks_registration();
    test_woocommerce_integration();
    test_api_endpoints();
    test_assets_loading();
    
    echo "<hr>";
    echo "<p><em>Test completed at: " . current_time('Y-m-d H:i:s') . "</em></p>";
    echo "</div>";
}

// Add admin menu for testing (only for admins)
add_action('admin_menu', function() {
    add_submenu_page(
        'tools.php',
        'Test Filter Blocks',
        'Test Filter Blocks',
        'manage_options',
        'test-filter-blocks',
        'run_filter_blocks_tests'
    );
});

// Add AJAX endpoint for frontend testing
add_action('wp_ajax_test_filter_blocks', 'run_filter_blocks_tests');
add_action('wp_ajax_nopriv_test_filter_blocks', 'run_filter_blocks_tests');
