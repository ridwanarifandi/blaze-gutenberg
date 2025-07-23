<?php
/*
Plugin Name: Blaze Commerce - Gutenberg
Plugin URI: https://www.blazecommerce.io
Description: The official plugin that serves gutenberg blocks for Blaze Commerce.
Version: 1.0.5
Requires Plugins: woocommerce
Author: Blaze Commerce
Author URI: https://www.blazecommerce.io
Text Domain: blaze-gutenberg
Domain Path: /languages
*/

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('BLAZE_GUTENBERG_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('BLAZE_GUTENBERG_PLUGIN_URL', plugin_dir_url(__FILE__));
define('BLAZE_GUTENBERG_VERSION', '1.0.5');
define('BLAZE_GUTENBERG_PLUGIN_FILE', __FILE__);

// Check if WooCommerce is active
if (!in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    add_action('admin_notices', function () {
        echo '<div class="notice notice-error"><p>';
        echo esc_html__('Blaze Gutenberg requires WooCommerce to be installed and active.', 'blaze-gutenberg');
        echo '</p></div>';
    });
    return;
}

// Autoload classes
require_once BLAZE_GUTENBERG_PLUGIN_DIR . 'vendor/autoload.php';

// Initialize the plugin
add_action('plugins_loaded', function () {
    \BlazeGutenberg\Plugin::get_instance();
});

// Include helper files
require_once BLAZE_GUTENBERG_PLUGIN_DIR . 'includes/helpers/filter-helpers.php';

// Include test file for development (only in debug mode)
if (defined('WP_DEBUG') && WP_DEBUG) {
    require_once BLAZE_GUTENBERG_PLUGIN_DIR . 'test-filter-blocks.php';
}

// Activation hook
register_activation_hook(__FILE__, function () {
    \BlazeGutenberg\Plugin::activate();
});

// Deactivation hook
register_deactivation_hook(__FILE__, function () {
    \BlazeGutenberg\Plugin::deactivate();
});
