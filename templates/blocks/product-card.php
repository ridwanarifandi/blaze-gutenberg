<?php
/**
 * Product Card Block Template
 * 
 * Available variables:
 * @var array $product_data Product data array
 * @var array $attributes Block attributes
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Extract product data
$product = wc_get_product($product_data['id']);
$product_id = $product_data['id'];
$title = $product_data['title'];
$permalink = $product_data['permalink'];
$price_html = $product_data['price'];
$on_sale = $product_data['on_sale'];
$is_new = $product_data['is_new'];
$rating = $product_data['rating'];
$review_count = $product_data['review_count'];
$image = $product_data['image'];
$hover_image = $product_data['hover_image'];
$product_attributes = $product_data['attributes'];
$add_to_cart_url = $product_data['add_to_cart_url'];
$add_to_cart_text = $product_data['add_to_cart_text'];

// Generate unique IDs for hover functionality
$card_id = 'product-card-' . $product_id . '-' . wp_generate_uuid4();
?>

<div class="blaze-product-card" id="<?php echo esc_attr($card_id); ?>" data-id="<?php echo esc_attr($product_id); ?>">
    <div class="product-image-container">
        <a href="<?php echo esc_url($permalink); ?>" class="product-image-link" alt="<?php echo esc_attr($title); ?>">
            <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>"
                class="product-image main-image" loading="lazy" />

            <?php if ($hover_image): ?>
                <img src="<?php echo esc_url($hover_image); ?>" alt="<?php echo esc_attr($title); ?>"
                    class="product-image hover-image" loading="lazy" style="display: none;" />
            <?php endif; ?>
        </a>

        <?php if ($attributes['showBadges']): ?>
            <div class="product-badges">
                <?php if ($on_sale): ?>
                    <span class="badge sale-badge">
                        <?php esc_html_e('SALE', 'blaze-gutenberg'); ?>
                    </span>
                <?php endif; ?>

                <?php if ($is_new): ?>
                    <span class="badge new-badge">
                        <?php esc_html_e('NEW', 'blaze-gutenberg'); ?>
                    </span>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>

    <div class="product-info">
        <h3 class="product-title">
            <a href="<?php echo esc_url($permalink); ?>">
                <?php echo wp_kses($title, array(
                    'sup' => array(),
                    'sub' => array(),
                    'em' => array(),
                    'strong' => array(),
                    'b' => array(),
                    'i' => array(),
                    'span' => array('class' => array()),
                )); ?>
            </a>
        </h3>

        <?php if ($attributes['showColorSwatches'] && !empty($product_attributes)): ?>
            <div class="product-swatches">
                <?php foreach ($product_attributes as $attribute):
                    if ($attribute['type'] === 'color'): ?>
                        <span class="color-swatch-border">
                            <span class="color-swatch" style="background-color: <?php echo esc_attr($attribute['color']); ?>"
                                title="<?php echo esc_attr($attribute['value']); ?>"
                                data-attribute="<?php echo esc_attr($attribute['name']); ?>"
                                data-value="<?php echo esc_attr($attribute['value']); ?>"></span>
                        </span>
                    <?php endif;
                endforeach; ?>
            </div>
        <?php endif; ?>

        <?php if ($attributes['showRating'] && $rating > 0): ?>
            <div class="product-reviews">
                <div class="stars"
                    title="<?php echo esc_attr(sprintf(__('Rated %s out of 5', 'blaze-gutenberg'), $rating)); ?>">
                    <?php
                    $full_stars = floor($rating);
                    $half_star = ($rating - $full_stars) >= 0.5;
                    $empty_stars = 5 - $full_stars - ($half_star ? 1 : 0);

                    // Full stars
                    for ($i = 0; $i < $full_stars; $i++) {
                        echo '<span class="star full">★</span>';
                    }

                    // Half star
                    if ($half_star) {
                        echo '<span class="star half">★</span>';
                    }

                    // Empty stars
                    for ($i = 0; $i < $empty_stars; $i++) {
                        echo '<span class="star empty">☆</span>';
                    }
                    ?>
                </div>
                <span class="review-count">
                    <?php echo esc_html($rating); ?> (<?php echo esc_html($review_count); ?>
                    <?php esc_html_e('reviews', 'blaze-gutenberg'); ?>)
                </span>
            </div>
        <?php endif; ?>

        <div class="product-price">
            <?php echo wp_kses_post($price_html); ?>
        </div>

        <?php if ($attributes['showAddToCart'] || $attributes['showEnquireButton']): ?>
            <div class="product-actions">
                <?php if ($attributes['showAddToCart']): ?>
                    <a href="<?php echo esc_url($add_to_cart_url); ?>" class="btn btn-primary add-to-cart"
                        data-id="<?php echo esc_attr($product_id); ?>" <?php if ($product->is_type('external')): ?>
                            target="_blank" rel="noopener" <?php endif; ?>>
                        <?php echo esc_html($add_to_cart_text ?: __('SELECT OPTIONS', 'blaze-gutenberg')); ?>
                    </a>
                <?php endif; ?>

                <?php if ($attributes['showEnquireButton']): ?>
                    <a href="#" class="btn btn-secondary add-to-enquiry" data-action="pi_add_to_enquiry"
                        data-id="<?php echo esc_attr($product_id); ?>" data-quantity="1">
                        <?php esc_html_e('ENQUIRE NOW', 'blaze-gutenberg'); ?>
                    </a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</div>