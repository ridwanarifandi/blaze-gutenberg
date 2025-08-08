<?php
namespace BlazeGutenberg;

/**
 * Blocks Manager Class
 */
class BlocksManager
{

    /**
     * Registered blocks
     */
    private $blocks = [];

    /**
     * Initialize blocks
     */
    public function init()
    {
        $this->register_blocks();
        add_action('rest_api_init', [$this, 'register_api_endpoints']);
    }

    /**
     * Register all blocks
     */
    public function register_blocks()
    {
        // Register Product Slideshow block
        register_block_type('blaze/product-slideshow', [
            'render_callback' => [$this, 'render_product_slideshow'],
            'style' => 'blaze-gutenberg-style',
        ]);

        // Register Category Grid block
        register_block_type('blaze/category-grid', [
            'render_callback' => [$this, 'render_category_grid'],
            'style' => 'blaze-gutenberg-style',
        ]);

        // Register Product Card block
        register_block_type('blaze/product-card', [
            'render_callback' => [$this, 'render_product_card'],
            'style' => 'blaze-gutenberg-style',
        ]);

        // Register Filter by Category block
        register_block_type('blaze/filter-by-category', [
            'render_callback' => [$this, 'render_filter_by_category'],
            'style' => 'blaze-gutenberg-style',
        ]);

        // Register Filter by Attribute block
        register_block_type('blaze/filter-by-attribute', [
            'render_callback' => [$this, 'render_filter_by_attribute'],
            'style' => 'blaze-gutenberg-style',
        ]);

        // Register Filter by Stock Status block
        register_block_type('blaze/filter-by-stock-status', [
            'render_callback' => [$this, 'render_filter_by_stock_status'],
            'style' => 'blaze-gutenberg-style',
        ]);

        // Register Cart Cross-Sells block
        register_block_type('blaze/cart-cross-sells', [
            'render_callback' => [$this, 'render_cart_cross_sells'],
            'style' => 'blaze-gutenberg-style',
        ]);
    }

    /**
     * Render Product Slideshow block
     */
    public function render_product_slideshow($attributes, $content)
    {

        // Debug: Check if WooCommerce is active
        if (!class_exists('WooCommerce')) {
            return '<div class="blaze-product-slideshow-error">' .
                esc_html__('WooCommerce is required for this block.', 'blaze-gutenberg') .
                '</div>';
        }

        $attributes = wp_parse_args($attributes, [
            'productsPerSlideDesktop' => 4,
            'productsPerSlideTablet' => 3,
            'productsPerSlideMobile' => 1,
            'primaryBackgroundColor' => '#1e3a8a',
            'primaryFontColor' => '#ffffff',
            'priceColor' => '#1e3a8a',
            'showArrows' => true,
            'showDots' => true,
            'autoplay' => false,
            'autoplayDelay' => 3000,
            'productIds' => [],
            'productCategory' => '',
            'productTag' => '',
            'orderBy' => 'date',
            'order' => 'DESC',
            'limit' => 12,
            'featuredOnly' => false,
        ]);

        // Get products based on attributes
        $products = $this->get_products($attributes);

        if (empty($products)) {
            return '<div class="blaze-product-slideshow-empty">' .
                esc_html__('No products found.', 'blaze-gutenberg') .
                '</div>';
        }

        // Generate unique ID for this slideshow instance
        $slideshow_id = 'blaze-slideshow-' . wp_generate_uuid4();

        // Start output buffering
        ob_start();

        // Include the template
        $template_path = BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/blocks/product-slideshow.php';
        if (file_exists($template_path)) {
            include $template_path;
        } else {
            echo '<div class="blaze-product-slideshow-error">' .
                esc_html__('Template file not found.', 'blaze-gutenberg') .
                '</div>';
        }

        return ob_get_clean();
    }

    /**
     * Render Category Grid block
     */
    public function render_category_grid($attributes, $content)
    {
        // Parse attributes with defaults
        $attributes = wp_parse_args($attributes, [
            'selectedCategories' => [],
            'orderBy' => 'name',
            'order' => 'ASC',
            'limit' => 12,
            'columnsDesktop' => 4,
            'columnsTablet' => 3,
            'columnsMobile' => 2,
            'showProductCount' => true,
            'showDescription' => false,
            'hideEmpty' => true,
            'categoryNameColor' => '',
            'categoryDescriptionColor' => '',
            'productCountColor' => '',
        ]);

        // Get categories based on attributes
        $categories = $this->get_categories($attributes);

        if (empty($categories)) {
            return '<div class="blaze-category-grid-empty">' .
                esc_html__('No categories found.', 'blaze-gutenberg') .
                '</div>';
        }

        // Generate unique ID for this grid
        $grid_id = 'blaze-category-grid-' . wp_rand(1000, 9999);

        // Start output buffering
        ob_start();

        // Include template
        include BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/blocks/category-grid.php';

        return ob_get_clean();
    }

    /**
     * Render Product Card block
     */
    public function render_product_card($attributes, $content)
    {
        // Debug: Check if WooCommerce is active
        if (!class_exists('WooCommerce')) {
            return '<div class="blaze-product-card-error">' .
                esc_html__('WooCommerce is required for this block.', 'blaze-gutenberg') .
                '</div>';
        }

        $attributes = wp_parse_args($attributes, [
            'primaryBackgroundColor' => '#1e3a8a',
            'primaryFontColor' => '#ffffff',
            'priceColor' => '#1e3a8a',
            'showBadges' => true,
            'showRating' => true,
            'showColorSwatches' => true,
            'showAddToCart' => true,
            'showEnquireButton' => true,
        ]);

        // Get the current product from WooCommerce loop or global context
        global $product, $post;

        // Try to get product from current loop first
        $current_product = $product;

        // If no product in loop, try to get from current post
        if (!$current_product && $post && $post->post_type === 'product') {
            $current_product = wc_get_product($post->ID);
        }

        // If still no product, try to get from query context
        if (!$current_product && is_product()) {
            $current_product = wc_get_product(get_the_ID());
        }

        // If no product found, show appropriate message
        if (!$current_product || !$current_product->exists()) {
            return '<div class="blaze-product-card-empty">' .
                esc_html__('No product found. This block should be used within a product loop or on a product page.', 'blaze-gutenberg') .
                '</div>';
        }

        // Prepare product data for template
        $product_data = $this->format_product_data($current_product);

        // Generate unique ID for this card instance
        $card_id = 'blaze-product-card-' . wp_generate_uuid4();

        // Start output buffering
        ob_start();

        // Include the template with custom styling
        echo '<div class="blaze-product-card-block" style="' .
            '--primary-bg-color: ' . esc_attr($attributes['primaryBackgroundColor']) . '; ' .
            '--primary-font-color: ' . esc_attr($attributes['primaryFontColor']) . '; ' .
            '--price-color: ' . esc_attr($attributes['priceColor']) . ';">';

        // Include the product card block template
        $template_path = BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/blocks/product-card.php';
        if (file_exists($template_path)) {
            include $template_path;
        } else {
            echo '<div class="blaze-product-card-error">' .
                esc_html__('Template file not found.', 'blaze-gutenberg') .
                '</div>';
        }

        echo '</div>';

        return ob_get_clean();
    }

    /**
     * Render Filter by Category block
     */
    public function render_filter_by_category($attributes, $content)
    {
        // Check if WooCommerce is active
        if (!class_exists('WooCommerce')) {
            return '<div class="blaze-filter-error">' .
                esc_html__('WooCommerce is required for this block.', 'blaze-gutenberg') .
                '</div>';
        }

        $attributes = wp_parse_args($attributes, [
            'title' => __('Category', 'blaze-gutenberg'),
            'filterType' => 'category',
            'selectedCategories' => [],
            'showCount' => true,
            'maxVisible' => 10,
            'isCollapsed' => false,
            'orderBy' => 'name',
            'order' => 'ASC',
            'hideEmpty' => true,
        ]);

        // Get categories or tags based on filter type
        $items = $this->get_filter_categories($attributes);

        if (empty($items)) {
            return '<div class="blaze-filter-empty">' .
                esc_html__('No items found.', 'blaze-gutenberg') .
                '</div>';
        }

        // Generate unique ID for this filter
        $filter_id = 'blaze-filter-category-' . wp_rand(1000, 9999);

        // Start output buffering
        ob_start();

        // Include template
        include BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/blocks/filter-by-category.php';

        return ob_get_clean();
    }

    /**
     * Render Filter by Attribute block
     */
    public function render_filter_by_attribute($attributes, $content)
    {
        // Check if WooCommerce is active
        if (!class_exists('WooCommerce')) {
            return '<div class="blaze-filter-error">' .
                esc_html__('WooCommerce is required for this block.', 'blaze-gutenberg') .
                '</div>';
        }

        $attributes = wp_parse_args($attributes, [
            'title' => __('Color', 'blaze-gutenberg'),
            'attributeSlug' => 'pa_color',
            'selectedAttributes' => [],
            'showCount' => true,
            'maxVisible' => 10,
            'isCollapsed' => false,
            'orderBy' => 'name',
            'order' => 'ASC',
            'hideEmpty' => true,
            'displayType' => 'list',
        ]);

        // Get attribute terms
        $items = $this->get_filter_attributes($attributes);

        if (empty($items)) {
            return '<div class="blaze-filter-empty">' .
                esc_html__('No attribute terms found.', 'blaze-gutenberg') .
                '</div>';
        }

        // Generate unique ID for this filter
        $filter_id = 'blaze-filter-attribute-' . wp_rand(1000, 9999);

        // Start output buffering
        ob_start();

        // Include template
        include BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/blocks/filter-by-attribute.php';

        return ob_get_clean();
    }

    /**
     * Render Filter by Stock Status block
     */
    public function render_filter_by_stock_status($attributes, $content)
    {
        // Check if WooCommerce is active
        if (!class_exists('WooCommerce')) {
            return '<div class="blaze-filter-error">' .
                esc_html__('WooCommerce is required for this block.', 'blaze-gutenberg') .
                '</div>';
        }

        $attributes = wp_parse_args($attributes, [
            'title' => __('Shop', 'blaze-gutenberg'),
            'selectedStatuses' => [],
            'showCount' => true,
            'maxVisible' => 10,
            'isCollapsed' => false,
            'enabledStatuses' => [
                'instock' => true,
                'onsale' => true,
                'new' => true,
                'outofstock' => false,
                'backorder' => false,
            ],
        ]);

        // Get stock status items
        $items = $this->get_filter_stock_statuses($attributes);

        if (empty($items)) {
            return '<div class="blaze-filter-empty">' .
                esc_html__('No stock status options enabled.', 'blaze-gutenberg') .
                '</div>';
        }

        // Generate unique ID for this filter
        $filter_id = 'blaze-filter-stock-status-' . wp_rand(1000, 9999);

        // Start output buffering
        ob_start();

        // Include template
        include BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/blocks/filter-by-stock-status.php';

        return ob_get_clean();
    }

    /**
     * Get products based on attributes
     */
    private function get_products($attributes)
    {
        $args = [
            'post_type' => 'product',
            'post_status' => 'publish',
            'posts_per_page' => $attributes['limit'] ?? 12,
            'orderby' => $attributes['orderBy'] ?? 'date',
            'order' => $attributes['order'] ?? 'DESC',
            'meta_query' => [],
        ];

        // Handle priority sorting
        if (isset($attributes['orderBy']) && $attributes['orderBy'] === 'priority') {
            $args['orderby'] = 'menu_order';

            // For priority, we want higher numbers first (DESC), but allow override
            if (!isset($attributes['order'])) {
                $args['order'] = 'DESC';
            }
        }

        // Filter by specific product IDs
        if (!empty($attributes['productIds'])) {
            $args['post__in'] = $attributes['productIds'];
        }

        // Filter by category
        if (!empty($attributes['productCategory'])) {
            $args['tax_query'][] = [
                'taxonomy' => 'product_cat',
                'field' => 'slug',
                'terms' => $attributes['productCategory'],
            ];
        }

        // Filter by tag
        if (!empty($attributes['productTag'])) {
            $args['tax_query'][] = [
                'taxonomy' => 'product_tag',
                'field' => 'slug',
                'terms' => $attributes['productTag'],
            ];
        }

        // Filter by featured products
        if (!empty($attributes['featuredOnly']) && $attributes['featuredOnly']) {
            $args['tax_query'][] = [
                'taxonomy' => 'product_visibility',
                'field' => 'name',
                'terms' => 'featured',
                'operator' => 'IN',
            ];
        }

        // Remove empty meta_query if not needed
        if (empty($args['meta_query'])) {
            unset($args['meta_query']);
        }

        do_action(
            "qm/info",
            $args
        );

        $query = new \WP_Query($args);

        return $query->posts;
    }



    /**
     * Get categories based on attributes
     */
    private function get_categories($attributes)
    {
        $orderby = $attributes['orderBy'] ?? 'name';

        $args = [
            'taxonomy' => 'product_cat',
            'hide_empty' => $attributes['hideEmpty'] ?? true,
            'orderby' => $orderby, // Use orderby directly without dependency check
            'order' => $attributes['order'] ?? 'ASC',
            'number' => $attributes['limit'] ?? 12,
        ];

        // Filter by specific category IDs
        if (!empty($attributes['selectedCategories'])) {
            $args['include'] = array_map('intval', $attributes['selectedCategories']);
        }

        do_action(
            "qm/info",
            [
                'include' => $args['include'] ?? [],
                'args' => $args
            ]
        );

        $categories = get_terms($args);

        if (is_wp_error($categories)) {
            return [];
        }

        // Apply PHP sorting if needed (especially when using 'include' parameter)
        // WordPress get_terms() may ignore orderby when include is used
        if (!empty($categories)) {
            $categories = $this->sort_categories_php($categories, $orderby, $attributes['order'] ?? 'ASC');
        }

        // Format categories for template
        $formatted_categories = [];
        foreach ($categories as $category) {
            $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
            $image_url = $thumbnail_id ? wp_get_attachment_image_url($thumbnail_id, 'medium') : '';

            $category_data = [
                'id' => $category->term_id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'count' => $category->count,
                'image' => $image_url,
                'link' => get_term_link($category),
            ];

            // Add term_order if available
            if (isset($category->term_order)) {
                $category_data['term_order'] = $category->term_order;
            }

            $formatted_categories[] = $category_data;
        }

        return $formatted_categories;
    }



    /**
     * Register REST API endpoints
     */
    public function register_api_endpoints()
    {
        // Products endpoint
        register_rest_route('blaze/v1', '/products', [
            'methods' => 'GET',
            'callback' => [$this, 'get_products_api'],
            'permission_callback' => '__return_true',
        ]);

        // Product categories endpoint
        register_rest_route('blaze/v1', '/product-categories', [
            'methods' => 'GET',
            'callback' => [$this, 'get_product_categories_api'],
            'permission_callback' => '__return_true',
        ]);

        // Product tags endpoint
        register_rest_route('blaze/v1', '/product-tags', [
            'methods' => 'GET',
            'callback' => [$this, 'get_product_tags_api'],
            'permission_callback' => '__return_true',
        ]);

        // Product attributes endpoint
        register_rest_route('blaze/v1', '/product-attributes', [
            'methods' => 'GET',
            'callback' => [$this, 'get_product_attributes_api'],
            'permission_callback' => '__return_true',
        ]);

        // Product attribute terms endpoint
        register_rest_route('blaze/v1', '/product-attribute-terms/(?P<attribute>[a-zA-Z0-9_-]+)', [
            'methods' => 'GET',
            'callback' => [$this, 'get_product_attribute_terms_api'],
            'permission_callback' => '__return_true',
        ]);

        // Product stock status counts endpoint
        register_rest_route('blaze/v1', '/product-stock-status-counts', [
            'methods' => 'GET',
            'callback' => [$this, 'get_product_stock_status_counts_api'],
            'permission_callback' => '__return_true',
        ]);

        // Category order options endpoint
        register_rest_route('blaze/v1', '/category-order-options', [
            'methods' => 'GET',
            'callback' => [$this, 'get_category_order_options_api'],
            'permission_callback' => '__return_true',
        ]);
    }

    /**
     * API endpoint to get products
     */
    public function get_products_api($request)
    {
        $products = get_posts([
            'post_type' => 'product',
            'post_status' => 'publish',
            'posts_per_page' => 50,
            'orderby' => 'title',
            'order' => 'ASC',
        ]);

        $formatted_products = [];
        foreach ($products as $product_post) {
            $product = wc_get_product($product_post->ID);
            if ($product) {
                $formatted_products[] = [
                    'id' => $product->get_id(),
                    'name' => $product->get_name(),
                    'title' => $product->get_name(), // For compatibility
                    'slug' => $product->get_slug(),
                    'image' => wp_get_attachment_image_url($product->get_image_id(), 'woocommerce_thumbnail'),
                    'price' => $product->get_price_html(),
                    'onSale' => $product->is_on_sale(),
                    'isNew' => $this->is_product_new($product),
                    'rating' => $product->get_average_rating(),
                    'reviewCount' => $product->get_review_count(),
                ];
            }
        }

        return rest_ensure_response($formatted_products);
    }

    /**
     * Format product data for templates
     *
     * @param WC_Product $product WooCommerce product object
     * @return array Formatted product data
     */
    private function format_product_data($product)
    {
        if (!$product) {
            return [];
        }

        return [
            'id' => $product->get_id(),
            'title' => $product->get_name(),
            'slug' => $product->get_slug(),
            'permalink' => $product->get_permalink(),
            'price' => $product->get_price_html(),
            'regular_price' => $product->get_regular_price(),
            'sale_price' => $product->get_sale_price(),
            'on_sale' => $product->is_on_sale(),
            'is_new' => $this->is_product_new($product),
            'rating' => $product->get_average_rating(),
            'review_count' => $product->get_review_count(),
            'image' => wp_get_attachment_image_url($product->get_image_id(), 'woocommerce_thumbnail'),
            'hover_image' => $this->get_product_hover_image($product),
            'attributes' => $this->get_product_color_attributes($product),
            'add_to_cart_url' => $product->add_to_cart_url(),
            'add_to_cart_text' => $product->add_to_cart_text(),
        ];
    }

    /**
     * API endpoint to get product categories
     */
    public function get_product_categories_api($request)
    {
        $orderby = $request->get_param('orderby') ?: 'name';
        $order = $request->get_param('order') ?: 'ASC';
        $hide_empty = $request->get_param('hide_empty') !== 'false';
        $parent = $request->get_param('parent');

        $args = [
            'taxonomy' => 'product_cat',
            'hide_empty' => $hide_empty,
            'orderby' => $orderby, // Use orderby directly without dependency check
            'order' => $order,
        ];

        // If parent is specified, get only child categories
        if ($parent !== null) {
            $args['parent'] = intval($parent);
        }

        $categories = get_terms($args);

        if (is_wp_error($categories)) {
            return rest_ensure_response([]);
        }

        // Apply PHP sorting if needed (especially when using 'include' parameter)
        // WordPress get_terms() may ignore orderby when include is used
        if (!empty($categories)) {
            $categories = $this->sort_categories_php($categories, $orderby, $order);
        }

        $formatted_categories = [];
        foreach ($categories as $category) {
            $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
            $image_url = $thumbnail_id ? wp_get_attachment_image_url($thumbnail_id, 'medium') : '';

            $category_data = [
                'id' => $category->term_id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'count' => $category->count,
                'image' => $image_url,
                'link' => get_term_link($category),
                'parent' => $category->parent,
            ];

            // Add term_order if available
            if (isset($category->term_order)) {
                $category_data['term_order'] = $category->term_order;
            }

            $formatted_categories[] = $category_data;
        }

        return rest_ensure_response($formatted_categories);
    }

    /**
     * API endpoint to get product tags
     */
    public function get_product_tags_api($request)
    {
        $tags = get_terms([
            'taxonomy' => 'product_tag',
            'hide_empty' => false,
        ]);

        $formatted_tags = [];
        foreach ($tags as $tag) {
            $formatted_tags[] = [
                'id' => $tag->term_id,
                'name' => $tag->name,
                'slug' => $tag->slug,
            ];
        }

        return rest_ensure_response($formatted_tags);
    }

    /**
     * API endpoint to get product attributes
     */
    public function get_product_attributes_api($request)
    {
        $attributes = wc_get_attribute_taxonomies();

        $formatted_attributes = [];
        foreach ($attributes as $attribute) {
            $formatted_attributes[] = [
                'id' => $attribute->attribute_id,
                'name' => $attribute->attribute_name,
                'slug' => 'pa_' . $attribute->attribute_name,
                'label' => $attribute->attribute_label,
                'type' => $attribute->attribute_type,
            ];
        }

        return rest_ensure_response($formatted_attributes);
    }

    /**
     * API endpoint to get product attribute terms
     */
    public function get_product_attribute_terms_api($request)
    {
        $attribute_slug = $request->get_param('attribute');

        if (empty($attribute_slug)) {
            return new \WP_Error('missing_attribute', 'Attribute parameter is required', ['status' => 400]);
        }

        $terms = get_terms([
            'taxonomy' => $attribute_slug,
            'hide_empty' => false,
        ]);

        if (is_wp_error($terms)) {
            return new \WP_Error('invalid_attribute', 'Invalid attribute taxonomy', ['status' => 400]);
        }

        $formatted_terms = [];
        foreach ($terms as $term) {
            $formatted_terms[] = [
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug,
                'count' => $term->count,
                'color' => $this->get_attribute_color_value($attribute_slug, $term->slug),
            ];
        }

        return rest_ensure_response($formatted_terms);
    }

    /**
     * API endpoint to get product stock status counts
     */
    public function get_product_stock_status_counts_api($request)
    {
        $counts = [
            'instock' => $this->get_stock_status_count('instock'),
            'onsale' => $this->get_stock_status_count('onsale'),
            'new' => $this->get_stock_status_count('new'),
            'outofstock' => $this->get_stock_status_count('outofstock'),
            'backorder' => $this->get_stock_status_count('backorder'),
        ];

        return rest_ensure_response($counts);
    }

    /**
     * Get filter categories/tags data
     */
    private function get_filter_categories($attributes)
    {
        $taxonomy = $attributes['filterType'] === 'category' ? 'product_cat' : 'product_tag';

        // For category filter, check if we're on a product category page
        if ($taxonomy === 'product_cat' && is_product_category()) {
            $child_categories = $this->get_child_categories_for_current_page($attributes);

            // If no child categories found, show top-level categories instead
            if (empty($child_categories)) {
                return $this->get_top_level_categories_with_children($attributes);
            }

            return $child_categories;
        }

        // For category filter, get top-level categories with their children
        if ($taxonomy === 'product_cat') {
            return $this->get_top_level_categories_with_children($attributes);
        }

        // For tags, use the original logic
        $args = [
            'taxonomy' => $taxonomy,
            'hide_empty' => $attributes['hideEmpty'] ?? true,
            'orderby' => $attributes['orderBy'] ?? 'name',
            'order' => $attributes['order'] ?? 'ASC',
            'number' => 0, // Get all for filtering
        ];

        $terms = get_terms($args);

        if (is_wp_error($terms)) {
            return [];
        }

        $formatted_items = [];
        foreach ($terms as $term) {
            $formatted_items[] = [
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug,
                'count' => $term->count,
                'link' => get_term_link($term),
            ];
        }

        return $formatted_items;
    }

    /**
     * Get child categories for current product category page
     */
    private function get_child_categories_for_current_page($attributes)
    {
        // Use helper function to get current category
        $current_category = blaze_get_current_product_category();

        if (!$current_category) {
            return [];
        }

        $args = [
            'hide_empty' => $attributes['hideEmpty'] ?? true,
            'orderby' => $attributes['orderBy'] ?? 'name',
            'order' => $attributes['order'] ?? 'ASC',
        ];

        // Get child categories using helper function
        $child_terms = blaze_get_child_categories($current_category->term_id, $args);

        if (empty($child_terms)) {
            return [];
        }

        $formatted_items = [];
        foreach ($child_terms as $term) {
            $formatted_items[] = blaze_format_category_for_filter($term);
        }

        return $formatted_items;
    }

    /**
     * Get top-level categories (categories with no parent)
     */
    private function get_top_level_categories($attributes)
    {
        $args = [
            'hide_empty' => $attributes['hideEmpty'] ?? true,
            'orderby' => $attributes['orderBy'] ?? 'name',
            'order' => $attributes['order'] ?? 'ASC',
        ];

        // Get top-level categories using helper function
        $top_level_terms = blaze_get_top_level_categories($args);

        if (empty($top_level_terms)) {
            return [];
        }

        $formatted_items = [];
        foreach ($top_level_terms as $term) {
            $formatted_items[] = blaze_format_category_for_filter($term);
        }

        return $formatted_items;
    }

    /**
     * Get top-level categories with their children (1 level deep)
     */
    private function get_top_level_categories_with_children($attributes)
    {
        $args = [
            'hide_empty' => $attributes['hideEmpty'] ?? true,
            'orderby' => $attributes['orderBy'] ?? 'name',
            'order' => $attributes['order'] ?? 'ASC',
        ];

        // Get top-level categories using helper function
        $top_level_terms = blaze_get_top_level_categories($args);

        if (empty($top_level_terms)) {
            return [];
        }

        $formatted_items = [];
        foreach ($top_level_terms as $term) {
            // Add parent category
            $parent_item = blaze_format_category_for_filter($term);
            $parent_item['level'] = 0; // Mark as parent level
            $formatted_items[] = $parent_item;

            // Get child categories
            $child_args = [
                'hide_empty' => $attributes['hideEmpty'] ?? true,
                'orderby' => $attributes['orderBy'] ?? 'name',
                'order' => $attributes['order'] ?? 'ASC',
            ];

            $child_terms = blaze_get_child_categories($term->term_id, $child_args);

            foreach ($child_terms as $child_term) {
                $child_item = blaze_format_category_for_filter($child_term);
                $child_item['level'] = 1; // Mark as child level
                $formatted_items[] = $child_item;
            }
        }

        return $formatted_items;
    }

    /**
     * Get filter attributes data
     */
    private function get_filter_attributes($attributes)
    {
        if (empty($attributes['attributeSlug'])) {
            return [];
        }

        $taxonomy = $attributes['attributeSlug'];

        $args = [
            'taxonomy' => $taxonomy,
            'hide_empty' => $attributes['hideEmpty'] ?? true,
            'orderby' => $attributes['orderBy'] ?? 'name',
            'order' => $attributes['order'] ?? 'ASC',
            'number' => 0, // Get all for filtering
        ];

        $terms = get_terms($args);

        if (is_wp_error($terms)) {
            return [];
        }

        $formatted_items = [];
        foreach ($terms as $term) {
            $formatted_items[] = [
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug,
                'count' => $term->count,
                'color' => $this->get_attribute_color_value($taxonomy, $term->slug),
            ];
        }

        return $formatted_items;
    }

    /**
     * Get filter stock statuses data
     */
    private function get_filter_stock_statuses($attributes)
    {
        $enabled_statuses = $attributes['enabledStatuses'] ?? [];
        $show_count = $attributes['showCount'] ?? true;

        $available_statuses = [
            'instock' => __('In Stock', 'blaze-gutenberg'),
            'onsale' => __('Sale', 'blaze-gutenberg'),
            'new' => __('New Arrivals', 'blaze-gutenberg'),
            'outofstock' => __('Out of Stock', 'blaze-gutenberg'),
            'backorder' => __('On Backorder', 'blaze-gutenberg'),
        ];

        $formatted_items = [];
        foreach ($enabled_statuses as $status_key => $is_enabled) {
            if ($is_enabled && isset($available_statuses[$status_key])) {
                $count = $show_count ? $this->get_stock_status_count($status_key) : 0;

                $formatted_items[] = [
                    'id' => $status_key,
                    'name' => $available_statuses[$status_key],
                    'slug' => $status_key,
                    'count' => $count,
                ];
            }
        }

        return $formatted_items;
    }

    /**
     * Get product count for stock status
     */
    private function get_stock_status_count($status)
    {
        // Get current category context
        $category_id = null;
        if (is_product_category()) {
            $category_id = get_queried_object_id();
        }

        // Use helper function that considers category context
        return blaze_get_stock_status_count_for_category($status, $category_id);
    }

    /**
     * Check if product is new (created within last 30 days)
     */
    private function is_product_new($product)
    {
        $created_date = $product->get_date_created();
        if (!$created_date)
            return false;

        $thirty_days_ago = new \DateTime('-30 days');
        return $created_date > $thirty_days_ago;
    }

    /**
     * Get product hover image (second image from gallery)
     */
    private function get_product_hover_image($product)
    {
        $gallery_ids = $product->get_gallery_image_ids();
        if (!empty($gallery_ids)) {
            return wp_get_attachment_image_url($gallery_ids[0], 'woocommerce_thumbnail');
        }
        return null;
    }

    /**
     * Get product color attributes for swatches
     */
    private function get_product_color_attributes($product)
    {
        $attributes = [];

        if ($product->is_type('variable')) {
            $available_variations = $product->get_available_variations();

            foreach ($available_variations as $variation) {
                $variation_obj = wc_get_product($variation['variation_id']);
                $variation_attributes = $variation_obj->get_variation_attributes();

                foreach ($variation_attributes as $attribute_name => $attribute_value) {
                    if (strpos(strtolower($attribute_name), 'color') !== false) {
                        // Try to get color value from swatches plugin or use default
                        $color_value = $this->get_attribute_color_value($attribute_name, $attribute_value);

                        $attributes[] = [
                            'name' => str_replace('attribute_pa_', '', $attribute_name),
                            'value' => $attribute_value,
                            'type' => 'color',
                            'color' => $color_value,
                        ];
                    }
                }
            }
        }

        return array_unique($attributes, SORT_REGULAR);
    }

    /**
     * Get color value for attribute (supports various swatches plugins)
     */
    private function get_attribute_color_value($attribute_name, $attribute_value)
    {
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

        $color_name = strtolower($attribute_value);

        // Check if it's a hex color
        if (preg_match('/^#[a-f0-9]{6}$/i', $attribute_value)) {
            return $attribute_value;
        }

        // Check default colors
        if (isset($default_colors[$color_name])) {
            return $default_colors[$color_name];
        }

        // Try to get from various swatches plugins
        // WooCommerce Variation Swatches
        if (function_exists('wvs_get_wc_attribute_taxonomy')) {
            $taxonomy = wvs_get_wc_attribute_taxonomy($attribute_name);
            if ($taxonomy) {
                $term = get_term_by('slug', $attribute_value, $taxonomy);
                if ($term) {
                    $color = get_term_meta($term->term_id, 'color', true);
                    if ($color)
                        return $color;
                }
            }
        }

        // Return default color if nothing found
        return '#6b7280';
    }

    /**
     * Render Cart Cross-Sells block
     */
    public function render_cart_cross_sells($attributes, $content)
    {
        // Check if WooCommerce is active
        if (!class_exists('WooCommerce')) {
            return '<div class="blaze-cart-cross-sells-error">' .
                esc_html__('WooCommerce is required for this block.', 'blaze-gutenberg') .
                '</div>';
        }

        $attributes = wp_parse_args($attributes, [
            'columnsDesktop' => 4,
            'columnsTablet' => 3,
            'columnsMobile' => 1,
            'limit' => 4,
            'primaryBackgroundColor' => '#1e3a8a',
            'primaryFontColor' => '#ffffff',
            'priceColor' => '#1e3a8a',
            'showBadges' => true,
            'showRating' => true,
            'showColorSwatches' => true,
            'showAddToCart' => true,
            'showEnquireButton' => true,
            'showTitle' => false,
            'title' => __('You may also like', 'blaze-gutenberg'),
        ]);

        // Get cross-sell products from cart
        $cross_sell_products = $this->get_cart_cross_sells($attributes['limit']);

        if (empty($cross_sell_products)) {
            return '<div class="blaze-cart-cross-sells-empty">' .
                esc_html__('No cross-sell products found.', 'blaze-gutenberg') .
                '</div>';
        }

        // Start output buffering
        ob_start();

        // Include the template
        include BLAZE_GUTENBERG_PLUGIN_DIR . 'templates/blocks/cart-cross-sells.php';

        return ob_get_clean();
    }

    /**
     * Get cross-sell products from WooCommerce cart
     */
    private function get_cart_cross_sells($limit = 4)
    {
        // Check if cart exists
        if (!WC()->cart) {
            return [];
        }

        $cross_sells = [];
        $cart_items = WC()->cart->get_cart();

        // Get cross-sell product IDs from cart items
        $cross_sell_ids = [];
        foreach ($cart_items as $cart_item) {
            $product = $cart_item['data'];
            if ($product) {
                $product_cross_sells = $product->get_cross_sell_ids();
                if (!empty($product_cross_sells)) {
                    $cross_sell_ids = array_merge($cross_sell_ids, $product_cross_sells);
                }
            }
        }

        // Remove duplicates and limit
        $cross_sell_ids = array_unique($cross_sell_ids);
        $cross_sell_ids = array_slice($cross_sell_ids, 0, $limit);

        // Get product objects
        foreach ($cross_sell_ids as $product_id) {
            $product = wc_get_product($product_id);
            if ($product && $product->is_visible()) {
                $cross_sells[] = $product;
            }
        }

        return $cross_sells;
    }

    /**
     * API endpoint to get available category order options
     */
    public function get_category_order_options_api($request)
    {
        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            do_action("qm/debug", 'get_category_order_options_api called');
        }

        // Use helper function to get available order options
        $order_options = blaze_get_available_category_order_options();

        // Debug logging
        if (defined('WP_DEBUG') && WP_DEBUG) {
            do_action("qm/debug", 'get_category_order_options_api returning: ' . json_encode($order_options));
        }

        return rest_ensure_response($order_options);
    }

    /**
     * Sort categories using PHP when get_terms orderby doesn't work
     * This is especially needed when using 'include' parameter
     *
     * @param array $categories Array of WP_Term objects
     * @param string $orderby The orderby parameter
     * @param string $order ASC or DESC
     * @return array Sorted array of categories
     */
    private function sort_categories_php($categories, $orderby, $order = 'ASC')
    {
        if (empty($categories) || !is_array($categories)) {
            return $categories;
        }

        // Debug logging
        do_action("qm/debug", "sort_categories_php: orderby={$orderby}, order={$order}, count=" . count($categories));

        // Log first few categories before sorting
        for ($i = 0; $i < min(3, count($categories)); $i++) {
            $cat = $categories[$i];
            $term_order = isset($cat->term_order) ? $cat->term_order : 'not_set';
            do_action("qm/debug", "  Before sort [{$i}]: {$cat->name} (ID: {$cat->term_id}, term_order: {$term_order})");
        }

        usort($categories, function ($a, $b) use ($orderby, $order) {
            $comparison = 0;

            switch ($orderby) {
                case 'name':
                    $comparison = strcmp($a->name, $b->name);
                    break;

                case 'count':
                    $comparison = $a->count - $b->count;
                    break;

                case 'term_order':
                    // Get term_order from the term object or default to 0
                    $a_order = isset($a->term_order) ? (int) $a->term_order : 0;
                    $b_order = isset($b->term_order) ? (int) $b->term_order : 0;
                    $comparison = $a_order - $b_order;
                    break;

                case 'id':
                    $comparison = $a->term_id - $b->term_id;
                    break;

                default:
                    // Default to name sorting
                    $comparison = strcmp($a->name, $b->name);
                    break;
            }

            // Apply order direction
            return ($order === 'DESC') ? -$comparison : $comparison;
        });

        // Debug logging after sorting
        do_action("qm/debug", "  After sorting:");
        for ($i = 0; $i < min(3, count($categories)); $i++) {
            $cat = $categories[$i];
            $term_order = isset($cat->term_order) ? $cat->term_order : 'not_set';
            do_action("qm/debug", "  After sort [{$i}]: {$cat->name} (ID: {$cat->term_id}, term_order: {$term_order})");
        }

        return $categories;
    }
}
