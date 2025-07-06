<?php
/**
 * Attribute Helper Functions
 * 
 * Helper functions for WooCommerce product attributes and variations
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'blaze_get_product_color_attributes' ) ) {
	/**
	 * Get product color attributes for swatches
	 * 
	 * @param WC_Product $product WooCommerce product object
	 * @return array Array of color attributes
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
	 * 
	 * @param string $attribute_name Attribute name
	 * @param string $attribute_value Attribute value
	 * @return string Color hex value
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
					if ( $color ) {
						return $color;
					}
				}
			}
		}

		// Return default color if nothing found
		return '#6b7280';
	}
}
