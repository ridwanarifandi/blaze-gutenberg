<?php
namespace BlazeGutenberg;

/**
 * Blocks Manager Class
 */
class BlocksManager {

	/**
	 * Registered blocks
	 */
	private $blocks = [];

	/**
	 * Initialize blocks
	 */
	public function init() {
		add_action( 'init', [ $this, 'register_blocks' ] );
		add_action( 'rest_api_init', [ $this, 'register_api_endpoints' ] );
	}

	/**
	 * Register all blocks
	 */
	public function register_blocks() {
		// Register Product Slideshow block
		$this->register_block( 'product-slideshow', [ 
			'render_callback' => [ $this, 'render_product_slideshow' ],
			'attributes' => $this->get_product_slideshow_attributes(),
		] );
	}

	/**
	 * Register a single block
	 */
	private function register_block( $block_name, $args = [] ) {
		$block_type = "blaze/{$block_name}";

		$default_args = [ 
			'editor_script' => 'blaze-gutenberg-blocks',
			'editor_style' => 'blaze-gutenberg-editor',
			'style' => 'blaze-gutenberg-style',
		];

		$args = wp_parse_args( $args, $default_args );

		register_block_type( $block_type, $args );

		$this->blocks[ $block_name ] = $args;
	}

	/**
	 * Get Product Slideshow block attributes
	 */
	private function get_product_slideshow_attributes() {
		return [ 
			'productsPerSlideDesktop' => [ 
				'type' => 'number',
				'default' => 4,
			],
			'productsPerSlideTablet' => [ 
				'type' => 'number',
				'default' => 3,
			],
			'productsPerSlideMobile' => [ 
				'type' => 'number',
				'default' => 1,
			],
			'primaryBackgroundColor' => [ 
				'type' => 'string',
				'default' => '#1e3a8a',
			],
			'primaryFontColor' => [ 
				'type' => 'string',
				'default' => '#ffffff',
			],
			'priceColor' => [ 
				'type' => 'string',
				'default' => '#1e3a8a',
			],
			'showArrows' => [ 
				'type' => 'boolean',
				'default' => true,
			],
			'showDots' => [ 
				'type' => 'boolean',
				'default' => true,
			],
			'autoplay' => [ 
				'type' => 'boolean',
				'default' => false,
			],
			'autoplayDelay' => [ 
				'type' => 'number',
				'default' => 3000,
			],
			'productIds' => [ 
				'type' => 'array',
				'default' => [],
			],
			'productCategory' => [ 
				'type' => 'string',
				'default' => '',
			],
			'productTag' => [ 
				'type' => 'string',
				'default' => '',
			],
			'orderBy' => [ 
				'type' => 'string',
				'default' => 'date',
			],
			'order' => [ 
				'type' => 'string',
				'default' => 'DESC',
			],
			'limit' => [ 
				'type' => 'number',
				'default' => 12,
			],
			'featuredOnly' => [ 
				'type' => 'boolean',
				'default' => false,
			],
		];
	}

	/**
	 * Render Product Slideshow block
	 */
	public function render_product_slideshow( $attributes, $content ) {
		// Get products based on attributes
		$products = $this->get_products( $attributes );

		if ( empty( $products ) ) {
			return '<div class="blaze-product-slideshow-empty">' .
				esc_html__( 'No products found.', 'blaze-gutenberg' ) .
				'</div>';
		}

		?>addasdasad
		<?php

		// Generate unique ID for this slideshow instance
		$slideshow_id = 'blaze-slideshow-' . wp_generate_uuid4();

		// Start output buffering
		ob_start();

		// Include the template
		include BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/blocks/product-slideshow.php';

		return ob_get_clean();
	}

	/**
	 * Get products based on attributes
	 */
	private function get_products( $attributes ) {
		$args = [ 
			'post_type' => 'product',
			'post_status' => 'publish',
			'posts_per_page' => $attributes['limit'] ?? 12,
			'orderby' => $attributes['orderBy'] ?? 'date',
			'order' => $attributes['order'] ?? 'DESC',
			'meta_query' => [ 
				[ 
					'key' => '_visibility',
					'value' => [ 'catalog', 'visible' ],
					'compare' => 'IN',
				],
			],
		];

		// Filter by specific product IDs
		if ( ! empty( $attributes['productIds'] ) ) {
			$args['post__in'] = $attributes['productIds'];
		}

		// Filter by category
		if ( ! empty( $attributes['productCategory'] ) ) {
			$args['tax_query'][] = [ 
				'taxonomy' => 'product_cat',
				'field' => 'slug',
				'terms' => $attributes['productCategory'],
			];
		}

		// Filter by tag
		if ( ! empty( $attributes['productTag'] ) ) {
			$args['tax_query'][] = [ 
				'taxonomy' => 'product_tag',
				'field' => 'slug',
				'terms' => $attributes['productTag'],
			];
		}

		// Filter by featured products
		if ( ! empty( $attributes['featuredOnly'] ) && $attributes['featuredOnly'] ) {
			$args['meta_query'][] = [ 
				'key' => '_featured',
				'value' => 'yes',
				'compare' => '=',
			];
		}

		$query = new \WP_Query( $args );
		return $query->posts;
	}

	/**
	 * Register REST API endpoints
	 */
	public function register_api_endpoints() {
		// Products endpoint
		register_rest_route( 'blaze/v1', '/products', [ 
			'methods' => 'GET',
			'callback' => [ $this, 'get_products_api' ],
			'permission_callback' => '__return_true',
		] );

		// Product categories endpoint
		register_rest_route( 'blaze/v1', '/product-categories', [ 
			'methods' => 'GET',
			'callback' => [ $this, 'get_product_categories_api' ],
			'permission_callback' => '__return_true',
		] );

		// Product tags endpoint
		register_rest_route( 'blaze/v1', '/product-tags', [ 
			'methods' => 'GET',
			'callback' => [ $this, 'get_product_tags_api' ],
			'permission_callback' => '__return_true',
		] );
	}

	/**
	 * API endpoint to get products
	 */
	public function get_products_api( $request ) {
		$products = get_posts( [ 
			'post_type' => 'product',
			'post_status' => 'publish',
			'posts_per_page' => 50,
			'orderby' => 'title',
			'order' => 'ASC',
		] );

		$formatted_products = [];
		foreach ( $products as $product ) {
			$formatted_products[] = [ 
				'id' => $product->ID,
				'title' => $product->post_title,
				'slug' => $product->post_name,
			];
		}

		return rest_ensure_response( $formatted_products );
	}

	/**
	 * API endpoint to get product categories
	 */
	public function get_product_categories_api( $request ) {
		$categories = get_terms( [ 
			'taxonomy' => 'product_cat',
			'hide_empty' => false,
		] );

		$formatted_categories = [];
		foreach ( $categories as $category ) {
			$formatted_categories[] = [ 
				'id' => $category->term_id,
				'name' => $category->name,
				'slug' => $category->slug,
			];
		}

		return rest_ensure_response( $formatted_categories );
	}

	/**
	 * API endpoint to get product tags
	 */
	public function get_product_tags_api( $request ) {
		$tags = get_terms( [ 
			'taxonomy' => 'product_tag',
			'hide_empty' => false,
		] );

		$formatted_tags = [];
		foreach ( $tags as $tag ) {
			$formatted_tags[] = [ 
				'id' => $tag->term_id,
				'name' => $tag->name,
				'slug' => $tag->slug,
			];
		}

		return rest_ensure_response( $formatted_tags );
	}

	/**
	 * Check if product is new (created within last 30 days)
	 */
	private function is_product_new( $product ) {
		$created_date = $product->get_date_created();
		if ( ! $created_date )
			return false;

		$thirty_days_ago = new \DateTime( '-30 days' );
		return $created_date > $thirty_days_ago;
	}

	/**
	 * Get product hover image (second image from gallery)
	 */
	private function get_product_hover_image( $product ) {
		$gallery_ids = $product->get_gallery_image_ids();
		if ( ! empty( $gallery_ids ) ) {
			return wp_get_attachment_image_url( $gallery_ids[0], 'woocommerce_thumbnail' );
		}
		return null;
	}

	/**
	 * Get product color attributes for swatches
	 */
	private function get_product_color_attributes( $product ) {
		$attributes = [];

		if ( $product->is_type( 'variable' ) ) {
			$available_variations = $product->get_available_variations();

			foreach ( $available_variations as $variation ) {
				$variation_obj = wc_get_product( $variation['variation_id'] );
				$variation_attributes = $variation_obj->get_variation_attributes();

				foreach ( $variation_attributes as $attribute_name => $attribute_value ) {
					if ( strpos( strtolower( $attribute_name ), 'color' ) !== false ) {
						// Try to get color value from swatches plugin or use default
						$color_value = $this->get_attribute_color_value( $attribute_name, $attribute_value );

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

	/**
	 * Get color value for attribute (supports various swatches plugins)
	 */
	private function get_attribute_color_value( $attribute_name, $attribute_value ) {
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
