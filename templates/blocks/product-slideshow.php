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

// Generate CSS custom properties
$css_vars = sprintf(
	'--primary-bg-color: %s; --primary-font-color: %s; --price-color: %s;',
	esc_attr( $primary_bg ),
	esc_attr( $primary_font ),
	esc_attr( $price_color )
);

// Swiper configuration
$swiper_config = [ 
	'slidesPerView' => $mobile_slides,
	'spaceBetween' => 20,
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
		],
		1024 => [ 
			'slidesPerView' => $desktop_slides,
			'spaceBetween' => 30,
		],
	],
];
?>

<div class="wp-block-blaze-product-slideshow" style="<?php echo esc_attr( $css_vars ); ?>">
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

<?php
// Helper methods for the BlocksManager class
if ( ! function_exists( 'blaze_is_product_new' ) ) {
	/**
	 * Check if product is new (created within last 30 days)
	 */
	function blaze_is_product_new( $product ) {
		$created_date = $product->get_date_created();
		if ( ! $created_date )
			return false;

		$thirty_days_ago = new DateTime( '-30 days' );
		return $created_date > $thirty_days_ago;
	}
}

if ( ! function_exists( 'blaze_get_product_hover_image' ) ) {
	/**
	 * Get product hover image (second image from gallery)
	 */
	function blaze_get_product_hover_image( $product ) {
		$gallery_ids = $product->get_gallery_image_ids();
		if ( ! empty( $gallery_ids ) ) {
			return wp_get_attachment_image_url( $gallery_ids[0], 'woocommerce_thumbnail' );
		}
		return null;
	}
}

if ( ! function_exists( 'blaze_get_product_color_attributes' ) ) {
	/**
	 * Get product color attributes for swatches
	 */
	function blaze_get_product_color_attributes( $product ) {
		$attributes = [];

		if ( $product->is_type( 'variable' ) ) {
			$available_variations = $product->get_available_variations();

			foreach ( $available_variations as $variation ) {
				$variation_obj = wc_get_product( $variation['variation_id'] );
				$variation_attributes = $variation_obj->get_variation_attributes();

				foreach ( $variation_attributes as $attribute_name => $attribute_value ) {
					if ( strpos( strtolower( $attribute_name ), 'color' ) !== false ) {
						// Try to get color value from swatches plugin or use default
						$color_value = blaze_get_attribute_color_value( $attribute_name, $attribute_value );

						$attributes[] = [ 
							'name' => str_replace( 'attribute_pa_', '', $attribute_name ),
							'value' => $attribute_value,
							'type' => 'color',
							'color' => $color_value,
						];
					}
				}
			}
		}

		return array_unique( $attributes, SORT_REGULAR );
	}
}

if ( ! function_exists( 'blaze_get_attribute_color_value' ) ) {
	/**
	 * Get color value for attribute (supports various swatches plugins)
	 */
	function blaze_get_attribute_color_value( $attribute_name, $attribute_value ) {
		// Default colors for common color names
		$default_colors = [ 
			'red' => '#ef4444',
			'blue' => '#3b82f6',
			'green' => '#10b981',
			'yellow' => '#f59e0b',
			'purple' => '#8b5cf6',
			'pink' => '#ec4899',
			'black' => '#1f2937',
			'white' => '#f9fafb',
			'gray' => '#6b7280',
			'grey' => '#6b7280',
			'orange' => '#f97316',
			'brown' => '#92400e',
		];

		$color_name = strtolower( $attribute_value );

		// Check if it's a hex color
		if ( preg_match( '/^#[a-f0-9]{6}$/i', $attribute_value ) ) {
			return $attribute_value;
		}

		// Check default colors
		if ( isset( $default_colors[ $color_name ] ) ) {
			return $default_colors[ $color_name ];
		}

		// Try to get from various swatches plugins
		// WooCommerce Variation Swatches
		if ( function_exists( 'wvs_get_wc_attribute_taxonomy' ) ) {
			$taxonomy = wvs_get_wc_attribute_taxonomy( $attribute_name );
			if ( $taxonomy ) {
				$term = get_term_by( 'slug', $attribute_value, $taxonomy );
				if ( $term ) {
					$color = get_term_meta( $term->term_id, 'color', true );
					if ( $color )
						return $color;
				}
			}
		}

		// Return default color if nothing found
		return '#6b7280';
	}
}
?>