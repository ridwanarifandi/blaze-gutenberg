<?php
/**
 * Category Grid Block Template
 * 
 * Available variables:
 * @var array $attributes Block attributes
 * @var array $categories Array of formatted category data
 * @var string $grid_id Unique grid ID
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Extract attributes with defaults
$columns_desktop = $attributes['columnsDesktop'] ?? 4;
$columns_tablet = $attributes['columnsTablet'] ?? 3;
$columns_mobile = $attributes['columnsMobile'] ?? 2;
$show_product_count = $attributes['showProductCount'] ?? true;
$show_description = $attributes['showDescription'] ?? false;
$category_name_color = $attributes['categoryNameColor'] ?? '';
$category_description_color = $attributes['categoryDescriptionColor'] ?? '';
$product_count_color = $attributes['productCountColor'] ?? '';
$alignment = $attributes['align'] ?? '';

// Build wrapper classes
$wrapper_classes = [ 'wp-block-blaze-category-grid' ];
if ( ! empty( $alignment ) ) {
	$wrapper_classes[] = 'align' . $alignment;
}

// Build CSS custom properties
$css_vars = [
	'--columns-desktop: ' . $columns_desktop,
	'--columns-tablet: ' . $columns_tablet,
	'--columns-mobile: ' . $columns_mobile,
];

if ( ! empty( $category_name_color ) ) {
	$css_vars[] = '--category-name-color: ' . $category_name_color;
}
if ( ! empty( $category_description_color ) ) {
	$css_vars[] = '--category-description-color: ' . $category_description_color;
}
if ( ! empty( $product_count_color ) ) {
	$css_vars[] = '--product-count-color: ' . $product_count_color;
}

$css_vars_string = implode( '; ', $css_vars );
?>

<div class="<?php echo esc_attr( implode( ' ', $wrapper_classes ) ); ?>" style="<?php echo esc_attr( $css_vars_string ); ?>">
	<div class="blaze-category-grid" id="<?php echo esc_attr( $grid_id ); ?>">
		<div class="blaze-categories-grid">
			<?php foreach ( $categories as $category ) : ?>
				<a href="<?php echo esc_url( $category['link'] ); ?>" 
				   class="blaze-category-card"
				   aria-label="<?php echo esc_attr( sprintf( __( 'View %s category', 'blaze-gutenberg' ), $category['name'] ) ); ?>">
					
					<div class="blaze-category-card__image">
						<?php if ( ! empty( $category['image'] ) ) : ?>
							<img src="<?php echo esc_url( $category['image'] ); ?>" 
								 alt="<?php echo esc_attr( $category['name'] ); ?>"
								 loading="lazy"
								 class="blaze-category-image" />
						<?php else : ?>
							<div class="blaze-category-placeholder">
								<span class="blaze-category-icon">📦</span>
							</div>
						<?php endif; ?>
					</div>
					
					<div class="blaze-category-card__content">
						<h3 class="blaze-category-card__name">
							<?php echo esc_html( $category['name'] ); ?>
						</h3>
						
						<?php if ( $show_description && ! empty( $category['description'] ) ) : ?>
							<p class="blaze-category-card__description">
								<?php echo esc_html( wp_trim_words( $category['description'], 20 ) ); ?>
							</p>
						<?php endif; ?>
						
						<?php if ( $show_product_count ) : ?>
							<span class="blaze-category-card__count">
								<?php
								if ( $category['count'] === 1 ) {
									echo esc_html__( '1 product', 'blaze-gutenberg' );
								} else {
									echo esc_html( sprintf( __( '%d products', 'blaze-gutenberg' ), $category['count'] ) );
								}
								?>
							</span>
						<?php endif; ?>
					</div>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</div>
