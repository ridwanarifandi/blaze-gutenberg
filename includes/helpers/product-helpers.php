<?php
/**
 * Product Helper Functions
 * 
 * Helper functions for WooCommerce product operations
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'blaze_is_product_new' ) ) {
	/**
	 * Check if product is new (created within last 30 days)
	 * 
	 * @param WC_Product $product WooCommerce product object
	 * @return bool True if product is new, false otherwise
	 */
	function blaze_is_product_new( $product ) {
		$created_date = $product->get_date_created();
		if ( ! $created_date ) {
			return false;
		}

		$thirty_days_ago = new DateTime( '-30 days' );
		return $created_date > $thirty_days_ago;
	}
}

if ( ! function_exists( 'blaze_get_product_hover_image' ) ) {
	/**
	 * Get product hover image (second image from gallery)
	 * 
	 * @param WC_Product $product WooCommerce product object
	 * @return string|null Image URL or null if no hover image
	 */
	function blaze_get_product_hover_image( $product ) {
		$gallery_ids = $product->get_gallery_image_ids();
		if ( ! empty( $gallery_ids ) ) {
			return wp_get_attachment_image_url( $gallery_ids[0], 'woocommerce_thumbnail' );
		}
		return null;
	}
}
