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
        // Category priority functionality has been removed
        // Integration with admin-site-enhancement-pro plugin for term ordering
        // No hooks needed as priority fields and columns are no longer used
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


}

// Initialize the class
CategoryPriority::init();
