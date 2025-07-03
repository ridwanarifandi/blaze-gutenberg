<?php
namespace BlazeGutenberg;

/**
 * Assets Manager Class
 */
class AssetsManager {

	/**
	 * Enqueue frontend assets
	 */
	public function enqueue_frontend_assets() {
		// Enqueue Swiper CSS
		wp_enqueue_style(
			'swiper-css',
			'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
			[],
			'11.0.0'
		);

		// Enqueue main block styles
		wp_enqueue_style(
			'blaze-gutenberg-style',
			BLAZE_GUTENBERG_PLUGIN_URL . 'assets/css/blocks.css',
			[ 'swiper-css' ],
			BLAZE_GUTENBERG_VERSION
		);

		// Enqueue Swiper JS
		wp_enqueue_script(
			'swiper-js',
			'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
			[],
			'11.0.0',
			true
		);

		// Enqueue main block scripts
		wp_enqueue_script(
			'blaze-gutenberg-frontend',
			BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/frontend.js',
			[ 'swiper-js' ],
			BLAZE_GUTENBERG_VERSION,
			true
		);

		// Localize script with AJAX URL and nonce
		wp_localize_script( 'blaze-gutenberg-frontend', 'blazeGutenberg', [ 
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
			'restUrl' => rest_url( 'blaze/v1/' ),
			'nonce' => wp_create_nonce( 'blaze_gutenberg_nonce' ),
		] );
	}

	/**
	 * Enqueue editor assets
	 */
	public function enqueue_editor_assets() {
		// Enqueue editor styles
		wp_enqueue_style(
			'blaze-gutenberg-editor',
			BLAZE_GUTENBERG_PLUGIN_URL . 'assets/css/editor.css',
			[ 'wp-edit-blocks' ],
			BLAZE_GUTENBERG_VERSION
		);

		// Enqueue editor scripts
		wp_enqueue_script(
			'blaze-gutenberg-editor',
			BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/blocks.js',
			[ 
				'wp-blocks',
				'wp-element',
				'wp-editor',
				'wp-components',
				'wp-i18n',
				'wp-api-fetch',
				'wp-data',
			],
			BLAZE_GUTENBERG_VERSION,
			true
		);

		// Localize editor script
		wp_localize_script( 'blaze-gutenberg-blocks', 'blazeGutenbergEditor', [ 
			'restUrl' => rest_url( 'blaze/v1/' ),
			'nonce' => wp_create_nonce( 'wp_rest' ),
		] );
	}

	/**
	 * Get asset file data
	 */
	private function get_asset_file( $asset_file ) {
		$asset_path = BLAZE_GUTENBERG_PLUGIN_DIR . 'assets/js/' . $asset_file . '.asset.php';

		if ( file_exists( $asset_path ) ) {
			return include $asset_path;
		}

		return [ 
			'dependencies' => [],
			'version' => BLAZE_GUTENBERG_VERSION,
		];
	}
}
