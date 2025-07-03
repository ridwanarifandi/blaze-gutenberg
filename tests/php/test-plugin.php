<?php
/**
 * Test Plugin Functionality
 */

class Test_Blaze_Gutenberg_Plugin extends WP_UnitTestCase {

    /**
     * Test plugin activation
     */
    public function test_plugin_activation() {
        // Test that the plugin class exists
        $this->assertTrue(class_exists('BlazeGutenberg\Plugin'));
        
        // Test that the plugin instance can be created
        $plugin = BlazeGutenberg\Plugin::get_instance();
        $this->assertInstanceOf('BlazeGutenberg\Plugin', $plugin);
    }

    /**
     * Test block registration
     */
    public function test_block_registration() {
        // Test that the product slideshow block is registered
        $registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
        $this->assertArrayHasKey('blaze/product-slideshow', $registered_blocks);
    }

    /**
     * Test block category registration
     */
    public function test_block_category_registration() {
        $categories = get_block_categories(get_post());
        $blaze_category = null;
        
        foreach ($categories as $category) {
            if ($category['slug'] === 'blaze-commerce') {
                $blaze_category = $category;
                break;
            }
        }
        
        $this->assertNotNull($blaze_category);
        $this->assertEquals('Blaze Commerce', $blaze_category['title']);
    }

    /**
     * Test REST API endpoints
     */
    public function test_rest_api_endpoints() {
        $routes = rest_get_server()->get_routes();
        
        // Test products endpoint
        $this->assertArrayHasKey('/blaze/v1/products', $routes);
        
        // Test categories endpoint
        $this->assertArrayHasKey('/blaze/v1/product-categories', $routes);
        
        // Test tags endpoint
        $this->assertArrayHasKey('/blaze/v1/product-tags', $routes);
    }

    /**
     * Test asset enqueuing
     */
    public function test_asset_enqueuing() {
        // Simulate frontend
        set_current_screen('front');
        
        // Test that assets are enqueued when blocks are present
        global $wp_query;
        $wp_query->post = (object) ['post_content' => '<!-- wp:blaze/product-slideshow -->'];
        
        do_action('wp_enqueue_scripts');
        
        // Test that Swiper CSS is enqueued
        $this->assertTrue(wp_style_is('swiper-css', 'enqueued'));
        
        // Test that frontend script is enqueued
        $this->assertTrue(wp_script_is('blaze-gutenberg-frontend', 'enqueued'));
    }

    /**
     * Test helper functions
     */
    public function test_helper_functions() {
        // Test that helper functions exist
        $this->assertTrue(function_exists('blaze_is_product_new'));
        $this->assertTrue(function_exists('blaze_get_product_hover_image'));
        $this->assertTrue(function_exists('blaze_get_product_color_attributes'));
        $this->assertTrue(function_exists('blaze_get_attribute_color_value'));
    }

    /**
     * Test color value function
     */
    public function test_color_value_function() {
        // Test hex color recognition
        $this->assertEquals('#ff0000', blaze_get_attribute_color_value('color', '#ff0000'));
        
        // Test named color recognition
        $this->assertEquals('#ef4444', blaze_get_attribute_color_value('color', 'red'));
        
        // Test default color for unknown values
        $this->assertEquals('#6b7280', blaze_get_attribute_color_value('color', 'unknown-color'));
    }
}
