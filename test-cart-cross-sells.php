<?php
/**
 * Test file for Cart Cross-Sells Block
 * 
 * This file can be used to test the cart cross-sells block functionality
 * Place this file in the WordPress root and access via browser
 */

// Load WordPress
require_once('wp-config.php');

// Ensure we're not in admin
if (!defined('WP_USE_THEMES')) {
    define('WP_USE_THEMES', true);
}

// Start WordPress
require_once(ABSPATH . 'wp-blog-header.php');

// Check if user is admin (for security)
if (!current_user_can('manage_options')) {
    wp_die('Access denied. Admin privileges required.');
}

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cart Cross-Sells Block Test</title>
    <?php wp_head(); ?>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .test-section { margin: 30px 0; padding: 20px; border: 1px solid #ddd; }
        .test-title { color: #333; border-bottom: 2px solid #0073aa; padding-bottom: 10px; }
        .status { padding: 10px; margin: 10px 0; border-radius: 4px; }
        .status.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .status.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .status.warning { background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; }
        .code { background: #f8f9fa; padding: 15px; border-left: 4px solid #0073aa; margin: 10px 0; }
        pre { margin: 0; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>🛒 Cart Cross-Sells Block Test</h1>
    
    <?php
    /**
     * Test 1: Check if WooCommerce is active
     */
    ?>
    <div class="test-section">
        <h2 class="test-title">Test 1: WooCommerce Status</h2>
        <?php if (class_exists('WooCommerce')): ?>
            <div class="status success">✅ WooCommerce is active</div>
            <p><strong>Version:</strong> <?php echo WC()->version; ?></p>
        <?php else: ?>
            <div class="status error">❌ WooCommerce is not active</div>
            <p>Please install and activate WooCommerce to use this block.</p>
        <?php endif; ?>
    </div>

    <?php
    /**
     * Test 2: Check if Block is registered
     */
    ?>
    <div class="test-section">
        <h2 class="test-title">Test 2: Block Registration</h2>
        <?php
        $block_registry = WP_Block_Type_Registry::get_instance();
        $is_registered = $block_registry->is_registered('blaze/cart-cross-sells');
        ?>
        <?php if ($is_registered): ?>
            <div class="status success">✅ Cart Cross-Sells block is registered</div>
            <?php
            $block_type = $block_registry->get_registered('blaze/cart-cross-sells');
            ?>
            <p><strong>Render Callback:</strong> <?php echo $block_type->render_callback ? 'Set' : 'Not set'; ?></p>
        <?php else: ?>
            <div class="status error">❌ Cart Cross-Sells block is not registered</div>
            <p>Please check if the block is properly registered in BlocksManager.php</p>
        <?php endif; ?>
    </div>

    <?php
    /**
     * Test 3: Check Helper Functions
     */
    ?>
    <div class="test-section">
        <h2 class="test-title">Test 3: Helper Functions</h2>
        <?php
        $helper_functions = [
            'blaze_is_product_new',
            'blaze_get_product_hover_image', 
            'blaze_get_product_color_attributes'
        ];
        
        $all_exist = true;
        foreach ($helper_functions as $function) {
            if (function_exists($function)) {
                echo "<div class='status success'>✅ {$function}() exists</div>";
            } else {
                echo "<div class='status error'>❌ {$function}() not found</div>";
                $all_exist = false;
            }
        }
        
        if ($all_exist) {
            echo "<div class='status success'>✅ All helper functions are available</div>";
        }
        ?>
    </div>

    <?php
    /**
     * Test 4: Test Cart and Cross-Sells
     */
    ?>
    <div class="test-section">
        <h2 class="test-title">Test 4: Cart & Cross-Sells</h2>
        <?php if (class_exists('WooCommerce')): ?>
            <?php
            // Check if cart exists
            $cart = WC()->cart;
            if ($cart) {
                $cart_items = $cart->get_cart();
                echo "<div class='status success'>✅ WooCommerce cart is available</div>";
                echo "<p><strong>Cart items count:</strong> " . count($cart_items) . "</p>";
                
                if (empty($cart_items)) {
                    echo "<div class='status warning'>⚠️ Cart is empty. Add some products to test cross-sells.</div>";
                } else {
                    echo "<h4>Cart Items:</h4>";
                    foreach ($cart_items as $cart_item) {
                        $product = $cart_item['data'];
                        if ($product) {
                            echo "<p>• " . $product->get_name();
                            $cross_sells = $product->get_cross_sell_ids();
                            echo " (Cross-sells: " . count($cross_sells) . ")</p>";
                        }
                    }
                }
            } else {
                echo "<div class='status error'>❌ WooCommerce cart not available</div>";
            }
            ?>
        <?php else: ?>
            <div class="status error">❌ WooCommerce not active</div>
        <?php endif; ?>
    </div>

    <?php
    /**
     * Test 5: Render Block Test
     */
    ?>
    <div class="test-section">
        <h2 class="test-title">Test 5: Block Rendering</h2>
        <?php if ($is_registered && class_exists('WooCommerce')): ?>
            <div class="status success">✅ Attempting to render block...</div>
            
            <div class="code">
                <h4>Block Code:</h4>
                <pre>&lt;!-- wp:blaze/cart-cross-sells {
    "columnsDesktop": 3,
    "limit": 3,
    "showTitle": true,
    "title": "Test Cross-Sells"
} /--&gt;</pre>
            </div>

            <h4>Rendered Output:</h4>
            <div style="border: 2px solid #0073aa; padding: 20px; margin: 20px 0;">
                <?php
                echo do_blocks('<!-- wp:blaze/cart-cross-sells {
                    "columnsDesktop": 3,
                    "limit": 3,
                    "showTitle": true,
                    "title": "Test Cross-Sells"
                } /-->');
                ?>
            </div>
        <?php else: ?>
            <div class="status error">❌ Cannot render block - requirements not met</div>
        <?php endif; ?>
    </div>

    <?php
    /**
     * Test 6: File Structure Check
     */
    ?>
    <div class="test-section">
        <h2 class="test-title">Test 6: File Structure</h2>
        <?php
        $required_files = [
            'src/blocks/cart-cross-sells/index.js',
            'src/blocks/cart-cross-sells/edit.js', 
            'src/blocks/cart-cross-sells/save.js',
            'src/blocks/cart-cross-sells/style.scss',
            'templates/blocks/cart-cross-sells.php'
        ];
        
        $plugin_dir = WP_PLUGIN_DIR . '/blaze-gutenberg/';
        $all_files_exist = true;
        
        foreach ($required_files as $file) {
            $file_path = $plugin_dir . $file;
            if (file_exists($file_path)) {
                echo "<div class='status success'>✅ {$file}</div>";
            } else {
                echo "<div class='status error'>❌ {$file} not found</div>";
                $all_files_exist = false;
            }
        }
        
        if ($all_files_exist) {
            echo "<div class='status success'>✅ All required files exist</div>";
        }
        ?>
    </div>

    <div class="test-section">
        <h2 class="test-title">Instructions</h2>
        <ol>
            <li>Ensure WooCommerce is active</li>
            <li>Add some products to cart that have cross-sell products configured</li>
            <li>Go to a page/post editor and add the "Cart Cross-Sells Products" block</li>
            <li>Configure the block settings as needed</li>
            <li>View the frontend to see the cross-sell products</li>
        </ol>
        
        <p><strong>Note:</strong> This test file should be removed from production sites for security.</p>
    </div>

    <?php wp_footer(); ?>
</body>
</html>
