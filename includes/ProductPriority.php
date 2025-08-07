<?php
namespace BlazeGutenberg;

/**
 * Product Priority Management Class
 * Handles custom priority field for WooCommerce products
 */
class ProductPriority
{
    /**
     * Default priority value
     */
    const DEFAULT_PRIORITY = 0;

    /**
     * Initialize the class
     */
    public static function init()
    {
        add_action('init', [__CLASS__, 'setup_hooks']);
    }

    /**
     * Setup WordPress hooks
     */
    public static function setup_hooks()
    {
        // Add priority field to product editor
        add_action('woocommerce_product_options_general_product_data', [__CLASS__, 'add_priority_field']);
        add_action('woocommerce_process_product_meta', [__CLASS__, 'save_priority_field']);

        // Add priority column to products list
        add_filter('manage_edit-product_columns', [__CLASS__, 'add_priority_column']);
        add_action('manage_product_posts_custom_column', [__CLASS__, 'display_priority_column'], 10, 2);
        add_filter('manage_edit-product_sortable_columns', [__CLASS__, 'make_priority_column_sortable']);

        // Handle priority column sorting
        add_action('pre_get_posts', [__CLASS__, 'handle_priority_sorting']);

        // Add admin styles for priority column
        add_action('admin_head', [__CLASS__, 'add_admin_styles']);
    }

    /**
     * Add priority field to product general tab
     */
    public static function add_priority_field()
    {
        global $post;

        $priority = $post->menu_order;

        woocommerce_wp_text_input([
            'id' => 'blaze_product_priority',
            'label' => __('Priority', 'blaze-gutenberg'),
            'placeholder' => '0',
            'description' => __('Set product priority for manual sorting. Higher numbers appear first. Default is 0.', 'blaze-gutenberg'),
            'type' => 'number',
            'custom_attributes' => [
                'step' => '1',
                'min' => '0',
            ],
            'value' => $priority,
        ]);
    }

    /**
     * Save priority field value
     */
    public static function save_priority_field($post_id)
    {
        if (!isset($_POST['blaze_product_priority'])) {
            return;
        }

        $priority = intval($_POST['blaze_product_priority']);
        if ($priority < 0) {
            $priority = self::DEFAULT_PRIORITY;
        }

        // Update menu_order instead of meta field
        wp_update_post([
            'ID' => $post_id,
            'menu_order' => $priority
        ]);
    }

    /**
     * Add priority column to products list
     */
    public static function add_priority_column($columns)
    {
        // Insert priority column after the product name column
        $new_columns = [];
        foreach ($columns as $key => $value) {
            $new_columns[$key] = $value;
            if ($key === 'name') {
                $new_columns['blaze_priority'] = __('Priority', 'blaze-gutenberg');
            }
        }
        return $new_columns;
    }

    /**
     * Display priority value in products list column
     */
    public static function display_priority_column($column, $post_id)
    {
        if ($column === 'blaze_priority') {
            $post = get_post($post_id);
            $priority = $post ? $post->menu_order : self::DEFAULT_PRIORITY;
            echo esc_html($priority);
        }
    }

    /**
     * Make priority column sortable
     */
    public static function make_priority_column_sortable($columns)
    {
        $columns['blaze_priority'] = 'blaze_priority';
        return $columns;
    }

    /**
     * Handle priority column sorting in admin
     */
    public static function handle_priority_sorting($query)
    {
        if (!is_admin() || !$query->is_main_query()) {
            return;
        }

        $orderby = $query->get('orderby');
        if ($orderby === 'blaze_priority') {
            $query->set('orderby', 'menu_order');
        }
    }

    /**
     * Get product priority
     */
    public static function get_priority($product_id)
    {
        $post = get_post($product_id);
        return $post ? intval($post->menu_order) : self::DEFAULT_PRIORITY;
    }

    /**
     * Set product priority
     */
    public static function set_priority($product_id, $priority)
    {
        $priority = intval($priority);
        if ($priority < 0) {
            $priority = self::DEFAULT_PRIORITY;
        }

        return wp_update_post([
            'ID' => $product_id,
            'menu_order' => $priority
        ]);
    }

    /**
     * Add admin styles for priority column
     */
    public static function add_admin_styles()
    {
        $screen = get_current_screen();

        // Only add styles on products list page
        if ($screen && $screen->id === 'edit-product') {
            echo '<style>
                .wp-list-table .column-blaze_priority {
                    width: 70px;
                    max-width: 70px;
                    text-align: center;
                }
                .wp-list-table .column-blaze_priority a {
                    display: block;
                    width: 100%;
                }
                @media screen and (max-width: 782px) {
                    .wp-list-table .column-blaze_priority {
                        width: 60px;
                        max-width: 60px;
                    }
                }
            </style>';
        }
    }
}

// Initialize the class
ProductPriority::init();
