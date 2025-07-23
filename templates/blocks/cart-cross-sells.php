<?php
/**
 * Cart Cross-Sells Block Template
 * 
 * Available variables:
 * @var array $attributes Block attributes
 * @var array $cross_sell_products Array of WC_Product objects
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes
$columns_desktop = $attributes['columnsDesktop'];
$columns_tablet = $attributes['columnsTablet'];
$columns_mobile = $attributes['columnsMobile'];
$limit = $attributes['limit'];
$primary_bg_color = $attributes['primaryBackgroundColor'];
$primary_font_color = $attributes['primaryFontColor'];
$price_color = $attributes['priceColor'];
$show_badges = $attributes['showBadges'];
$show_rating = $attributes['showRating'];
$show_color_swatches = $attributes['showColorSwatches'];
$show_add_to_cart = $attributes['showAddToCart'];
$show_enquire_button = $attributes['showEnquireButton'];
$show_title = $attributes['showTitle'];
$title = $attributes['title'];

// Generate unique ID for this instance
$block_id = 'blaze-cart-cross-sells-' . wp_generate_uuid4();
?>

<div class="blaze-cart-cross-sells-block" id="<?php echo esc_attr($block_id); ?>"
    style="--primary-bg-color: <?php echo esc_attr($primary_bg_color); ?>; --primary-font-color: <?php echo esc_attr($primary_font_color); ?>; --price-color: <?php echo esc_attr($price_color); ?>;">
    
    <?php if ($show_title && !empty($title)): ?>
        <h2 class="cross-sells-title"><?php echo esc_html($title); ?></h2>
    <?php endif; ?>

    <div class="cross-sells-grid"
        style="--columns-desktop: <?php echo esc_attr($columns_desktop); ?>; --columns-tablet: <?php echo esc_attr($columns_tablet); ?>; --columns-mobile: <?php echo esc_attr($columns_mobile); ?>;">
        
        <?php foreach ($cross_sell_products as $product): ?>
            <?php
            // Prepare product data for the product card template
            $product_data = [
                'id' => $product->get_id(),
                'title' => $product->get_name(),
                'slug' => $product->get_slug(),
                'permalink' => $product->get_permalink(),
                'price' => $product->get_price_html(),
                'regular_price' => $product->get_regular_price(),
                'sale_price' => $product->get_sale_price(),
                'on_sale' => $product->is_on_sale(),
                'is_new' => blaze_is_product_new($product),
                'rating' => $product->get_average_rating(),
                'review_count' => $product->get_review_count(),
                'image' => wp_get_attachment_image_url($product->get_image_id(), 'woocommerce_thumbnail'),
                'hover_image' => blaze_get_product_hover_image($product),
                'attributes' => blaze_get_product_color_attributes($product),
                'add_to_cart_url' => $product->add_to_cart_url(),
                'add_to_cart_text' => $product->add_to_cart_text(),
            ];

            // Prepare attributes for product card
            $card_attributes = [
                'showBadges' => $show_badges,
                'showRating' => $show_rating,
                'showColorSwatches' => $show_color_swatches,
                'showAddToCart' => $show_add_to_cart,
                'showEnquireButton' => $show_enquire_button,
            ];
            ?>
            
            <div class="cross-sell-item">
                <?php include BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/blocks/product-card.php'; ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>
