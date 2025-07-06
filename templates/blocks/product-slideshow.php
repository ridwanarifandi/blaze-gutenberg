<?php
/**
 * Product Slideshow Block Template
 * 
 * Available variables:
 * @var array $attributes Block attributes
 * @var array $products Array of WP_Post objects
 * @var string $slideshow_id Unique slideshow ID
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Extract attributes with defaults
$desktop_slides = $attributes['productsPerSlideDesktop'] ?? 4;
$tablet_slides = $attributes['productsPerSlideTablet'] ?? 3;
$mobile_slides = $attributes['productsPerSlideMobile'] ?? 1;
$primary_bg = $attributes['primaryBackgroundColor'] ?? '#1e3a8a';
$primary_font = $attributes['primaryFontColor'] ?? '#ffffff';
$price_color = $attributes['priceColor'] ?? '#1e3a8a';
$show_arrows = $attributes['showArrows'] ?? true;
$show_dots = $attributes['showDots'] ?? true;
$autoplay = $attributes['autoplay'] ?? false;
$autoplay_delay = $attributes['autoplayDelay'] ?? 3000;
$alignment = $attributes['align'] ?? '';

// Build CSS classes for alignment
$wrapper_classes = [ 'wp-block-blaze-product-slideshow' ];
if ( ! empty( $alignment ) ) {
	$wrapper_classes[] = 'align' . $alignment;
}

// Generate CSS custom properties
$css_vars = sprintf(
	'--primary-bg-color: %s; --primary-font-color: %s; --price-color: %s;',
	esc_attr( $primary_bg ),
	esc_attr( $primary_font ),
	esc_attr( $price_color )
);

// Swiper configuration
$swiper_config = [ 
	'centeredSlides' => false,
	'centeredSlidesBounds' => false,
	'slidesPerView' => $mobile_slides,
	'spaceBetween' => 20,
	'slidesOffsetBefore' => 0,
	'slidesOffsetAfter' => 0,
	'normalizeSlideIndex' => true,
	'navigation' => $show_arrows ? [ 
		'nextEl' => "#{$slideshow_id} .swiper-button-next",
		'prevEl' => "#{$slideshow_id} .swiper-button-prev",
	] : false,
	'pagination' => $show_dots ? [ 
		'el' => "#{$slideshow_id} .swiper-pagination",
		'clickable' => true,
	] : false,
	'autoplay' => $autoplay ? [ 
		'delay' => $autoplay_delay,
		'disableOnInteraction' => false,
	] : false,
	'breakpoints' => [ 
		768 => [ 
			'slidesPerView' => $tablet_slides,
			'spaceBetween' => 25,
			'centeredSlides' => false,
		],
		1024 => [ 
			'slidesPerView' => $desktop_slides,
			'spaceBetween' => 30,
			'centeredSlides' => false,
		],
	],
];
?>

<div class="<?php echo esc_attr( implode( ' ', $wrapper_classes ) ); ?>" style="<?php echo esc_attr( $css_vars ); ?>">
	<div class="blaze-product-slideshow" id="<?php echo esc_attr( $slideshow_id ); ?>">
		<div class="swiper">
			<div class="swiper-wrapper">
				<?php foreach ( $products as $product_post ) :
					$product = wc_get_product( $product_post->ID );
					if ( ! $product )
						continue;

					// Get product data
					$product_data = [ 
						'id' => $product->get_id(),
						'title' => $product->get_name(),
						'slug' => $product->get_slug(),
						'permalink' => $product->get_permalink(),
						'price' => $product->get_price_html(),
						'regular_price' => $product->get_regular_price(),
						'sale_price' => $product->get_sale_price(),
						'on_sale' => $product->is_on_sale(),
						'is_new' => blaze_is_product_new( $product ),
						'rating' => $product->get_average_rating(),
						'review_count' => $product->get_review_count(),
						'image' => wp_get_attachment_image_url( $product->get_image_id(), 'woocommerce_thumbnail' ),
						'hover_image' => blaze_get_product_hover_image( $product ),
						'attributes' => blaze_get_product_color_attributes( $product ),
						'add_to_cart_url' => $product->add_to_cart_url(),
						'add_to_cart_text' => $product->add_to_cart_text(),
					];
					?>
					<div class="swiper-slide">
						<?php include BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/partials/product-card.php'; ?>
					</div>
				<?php endforeach; ?>
			</div>

			<?php if ( $show_arrows ) : ?>
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>
			<?php endif; ?>

			<?php if ( $show_dots ) : ?>
				<div class="swiper-pagination"></div>
			<?php endif; ?>
		</div>
	</div>
</div>

<script>
	document.addEventListener('DOMContentLoaded', function () {
		if (typeof Swiper !== 'undefined') {
			new Swiper('#<?php echo esc_js( $slideshow_id ); ?> .swiper', <?php echo wp_json_encode( $swiper_config ); ?>);
		}
	});
</script>