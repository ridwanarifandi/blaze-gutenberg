<?php
/**
 * Test Term Order Options
 * 
 * Simple test to verify term order options are available
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

// Force term order to be available for testing
if (!defined('BLAZE_FORCE_TERM_ORDER_TEST')) {
    define('BLAZE_FORCE_TERM_ORDER_TEST', true);
}

/**
 * Test term order options directly
 */
function test_term_order_options_direct()
{
    error_log('=== Testing Term Order Options Direct ===');
    
    // Test plugin detection
    $plugin_active = blaze_is_admin_site_enhancement_pro_active();
    $has_term_order = blaze_has_term_order_feature();
    $enabled_for_taxonomy = blaze_is_term_order_enabled_for_taxonomy('product_cat');
    
    error_log("Plugin Active: " . ($plugin_active ? 'YES' : 'NO'));
    error_log("Has Term Order: " . ($has_term_order ? 'YES' : 'NO'));
    error_log("Enabled for product_cat: " . ($enabled_for_taxonomy ? 'YES' : 'NO'));
    
    // Test order options
    $options = blaze_get_available_category_order_options();
    error_log("Order Options Count: " . count($options));
    
    foreach ($options as $option) {
        error_log("Option: {$option['label']} = {$option['value']}");
    }
    
    // Check if term_order is in options
    $has_term_order_option = false;
    foreach ($options as $option) {
        if ($option['value'] === 'term_order') {
            $has_term_order_option = true;
            break;
        }
    }
    
    error_log("Has Term Order Option: " . ($has_term_order_option ? 'YES' : 'NO'));
    
    if ($has_term_order_option) {
        error_log('✅ SUCCESS: Term Order option is available!');
    } else {
        error_log('❌ FAILED: Term Order option is NOT available!');
    }
    
    error_log('=== Term Order Options Direct Test Complete ===');
}

/**
 * Test API endpoint directly
 */
function test_term_order_api_direct()
{
    error_log('=== Testing Term Order API Direct ===');
    
    // Create a mock request
    $request = new WP_REST_Request('GET', '/blaze/v1/category-order-options');
    
    // Get BlocksManager instance
    $blocks_manager = new \BlazeGutenberg\BlocksManager();
    
    // Call the API method directly
    $response = $blocks_manager->get_category_order_options_api($request);
    
    if (is_wp_error($response)) {
        error_log('API Error: ' . $response->get_error_message());
    } else {
        $data = $response->get_data();
        error_log('API Response: ' . json_encode($data));
        
        // Check if term_order is in response
        $has_term_order_option = false;
        foreach ($data as $option) {
            if (isset($option['value']) && $option['value'] === 'term_order') {
                $has_term_order_option = true;
                break;
            }
        }
        
        if ($has_term_order_option) {
            error_log('✅ SUCCESS: API returns Term Order option!');
        } else {
            error_log('❌ FAILED: API does NOT return Term Order option!');
        }
    }
    
    error_log('=== Term Order API Direct Test Complete ===');
}

// Run tests on init
add_action('init', function() {
    // Only run once
    static $tests_run = false;
    if ($tests_run) {
        return;
    }
    $tests_run = true;
    
    test_term_order_options_direct();
    test_term_order_api_direct();
});

// Add admin notice to show results
add_action('admin_notices', function() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    // Only show on dashboard
    $screen = get_current_screen();
    if (!$screen || $screen->id !== 'dashboard') {
        return;
    }
    
    $options = blaze_get_available_category_order_options();
    $has_term_order = false;
    
    foreach ($options as $option) {
        if ($option['value'] === 'term_order') {
            $has_term_order = true;
            break;
        }
    }
    
    $class = $has_term_order ? 'notice-success' : 'notice-error';
    $message = $has_term_order 
        ? 'Term Order option is available in category grid block!'
        : 'Term Order option is NOT available. Check debug logs for details.';
    
    echo "<div class='notice {$class} is-dismissible'>";
    echo "<p><strong>Term Order Test:</strong> {$message}</p>";
    echo "<p>Available options: ";
    foreach ($options as $option) {
        echo $option['label'] . ' (' . $option['value'] . '), ';
    }
    echo "</p>";
    echo "</div>";
});
