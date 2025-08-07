<?php
namespace BlazeGutenberg;

/**
 * Category Priority Management Class
 * Handles custom priority field for WooCommerce product categories using term_meta
 */
class CategoryPriority
{
    /**
     * Meta key for category priority
     */
    const META_KEY = '_blaze_category_priority';

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
        // Add priority field to category editor
        add_action('product_cat_add_form_fields', [__CLASS__, 'add_priority_field_new']);
        add_action('product_cat_edit_form_fields', [__CLASS__, 'add_priority_field_edit']);
        add_action('created_product_cat', [__CLASS__, 'save_priority_field']);
        add_action('edited_product_cat', [__CLASS__, 'save_priority_field']);

        // Add priority column to categories list
        add_filter('manage_edit-product_cat_columns', [__CLASS__, 'add_priority_column']);
        add_action('manage_product_cat_custom_column', [__CLASS__, 'display_priority_column'], 10, 3);

        // Add admin styles for priority column
        add_action('admin_head', [__CLASS__, 'add_admin_styles']);
    }

    /**
     * Add priority field to new category form
     */
    public static function add_priority_field_new()
    {
        ?>
        <div class="form-field">
            <label for="blaze_category_priority"><?php esc_html_e('Priority', 'blaze-gutenberg'); ?></label>
            <input type="number" name="blaze_category_priority" id="blaze_category_priority"
                value="<?php echo esc_attr(self::DEFAULT_PRIORITY); ?>" min="0" step="1" />
            <p class="description">
                <?php esc_html_e('Set category priority for manual sorting. Higher numbers appear first. Default is 0.', 'blaze-gutenberg'); ?>
            </p>
        </div>
        <?php
    }

    /**
     * Add priority field to edit category form
     */
    public static function add_priority_field_edit($term)
    {
        $priority = self::get_priority($term->term_id);
        ?>
        <tr class="form-field">
            <th scope="row" valign="top">
                <label for="blaze_category_priority"><?php esc_html_e('Priority', 'blaze-gutenberg'); ?></label>
            </th>
            <td>
                <input type="number" name="blaze_category_priority" id="blaze_category_priority"
                    value="<?php echo esc_attr($priority); ?>" min="0" step="1" />
                <p class="description">
                    <?php esc_html_e('Set category priority for manual sorting. Higher numbers appear first. Default is 0.', 'blaze-gutenberg'); ?>
                </p>
            </td>
        </tr>
        <?php
    }

    /**
     * Save priority field value
     */
    public static function save_priority_field($term_id)
    {
        if (!isset($_POST['blaze_category_priority'])) {
            return;
        }

        $priority = intval($_POST['blaze_category_priority']);
        if ($priority < 0) {
            $priority = self::DEFAULT_PRIORITY;
        }

        self::set_priority($term_id, $priority);
    }

    /**
     * Add priority column to categories list
     */
    public static function add_priority_column($columns)
    {
        // Insert priority column after the name column
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
     * Display priority value in categories list column
     */
    public static function display_priority_column($content, $column_name, $term_id)
    {
        if ($column_name === 'blaze_priority') {
            $priority = self::get_priority($term_id);
            return esc_html($priority);
        }
        return $content;
    }



    /**
     * Get category priority with fallback for missing meta
     */
    public static function get_priority($term_id)
    {
        $priority = get_term_meta($term_id, self::META_KEY, true);

        // Jika tidak ada meta, return default dan set meta untuk next time
        if ($priority === '') {
            update_term_meta($term_id, self::META_KEY, self::DEFAULT_PRIORITY);
            return self::DEFAULT_PRIORITY;
        }

        return intval($priority);
    }

    /**
     * Set category priority using term_meta
     */
    public static function set_priority($term_id, $priority)
    {
        $priority = intval($priority);
        if ($priority < 0) {
            $priority = self::DEFAULT_PRIORITY;
        }

        return update_term_meta($term_id, self::META_KEY, $priority);
    }

    /**
     * Plugin activation hook - run migration
     */
    public static function activate_plugin()
    {
        // Check if WooCommerce is active
        if (!function_exists('wc_get_logger')) {
            return;
        }

        $logger = wc_get_logger();
        $current_version = get_option('blaze_category_priority_version', '0.0.0');

        // Hanya jalankan migration jika belum pernah atau ada update
        if (version_compare($current_version, '1.0.0', '<')) {
            $logger->info('Starting category priority migration...', ['source' => 'blaze-category-priority']);

            self::migrate_existing_categories();
            update_option('blaze_category_priority_version', '1.0.0');

            $logger->info('Category priority migration completed.', ['source' => 'blaze-category-priority']);
        }
    }

    /**
     * Migrate existing categories to have default priority
     */
    public static function migrate_existing_categories()
    {
        if (!function_exists('wc_get_logger')) {
            return;
        }

        $logger = wc_get_logger();
        $batch_size = 20;
        $offset = 0;
        $total_processed = 0;
        $total_updated = 0;

        do {
            // Get 20 terms per batch
            $terms = get_terms([
                'taxonomy' => 'product_cat',
                'hide_empty' => false,
                'number' => $batch_size,
                'offset' => $offset
            ]);

            if (is_wp_error($terms)) {
                $logger->error('Error getting terms: ' . $terms->get_error_message(), [
                    'source' => 'blaze-category-priority'
                ]);
                break;
            }

            $batch_updated = 0;
            foreach ($terms as $term) {
                $existing_priority = get_term_meta($term->term_id, self::META_KEY, true);

                // Hanya update jika belum ada meta priority
                if ($existing_priority === '') {
                    $result = update_term_meta($term->term_id, self::META_KEY, self::DEFAULT_PRIORITY);
                    if ($result) {
                        $batch_updated++;
                    }
                }
            }

            $total_processed += count($terms);
            $total_updated += $batch_updated;
            $offset += $batch_size;

            $logger->info("Processed batch: {$batch_updated}/" . count($terms) . " updated", [
                'source' => 'blaze-category-priority'
            ]);

        } while (count($terms) === $batch_size);

        $logger->info("Migration completed: {$total_updated}/{$total_processed} terms updated", [
            'source' => 'blaze-category-priority'
        ]);
    }

    /**
     * Add admin styles for priority column
     */
    public static function add_admin_styles()
    {
        $screen = get_current_screen();

        // Only add styles on product categories list page
        if ($screen && $screen->id === 'edit-product_cat') {
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
CategoryPriority::init();
