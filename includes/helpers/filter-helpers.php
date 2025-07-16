<?php
/**
 * Filter Helper Functions
 * 
 * Helper functions for product filtering functionality
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Apply stock status filters to WooCommerce product queries
 */
function blaze_apply_stock_status_filters($query) {
    // Only apply on frontend and for product queries
    if (is_admin() || !$query->is_main_query()) {
        return;
    }

    // Check if we have stock status filters
    $stock_status_filter = isset($_GET['filter_stock_status']) ? sanitize_text_field($_GET['filter_stock_status']) : '';
    
    if (empty($stock_status_filter)) {
        return;
    }

    $stock_statuses = explode(',', $stock_status_filter);
    $meta_query = $query->get('meta_query') ?: [];
    $tax_query = $query->get('tax_query') ?: [];

    foreach ($stock_statuses as $status) {
        $status = trim($status);
        
        switch ($status) {
            case 'instock':
                $meta_query[] = [
                    'key' => '_stock_status',
                    'value' => 'instock',
                    'compare' => '='
                ];
                break;
                
            case 'outofstock':
                $meta_query[] = [
                    'key' => '_stock_status',
                    'value' => 'outofstock',
                    'compare' => '='
                ];
                break;
                
            case 'onbackorder':
                $meta_query[] = [
                    'key' => '_stock_status',
                    'value' => 'onbackorder',
                    'compare' => '='
                ];
                break;
                
            case 'onsale':
                // Products on sale have sale price set
                $meta_query[] = [
                    'key' => '_sale_price',
                    'value' => '',
                    'compare' => '!='
                ];
                break;
                
            case 'new':
                // Products created within last 30 days
                $thirty_days_ago = date('Y-m-d H:i:s', strtotime('-30 days'));
                $query->set('date_query', [
                    [
                        'after' => $thirty_days_ago,
                        'column' => 'post_date'
                    ]
                ]);
                break;
        }
    }

    // Set meta query relation to OR if multiple stock statuses
    if (count($stock_statuses) > 1) {
        $meta_query['relation'] = 'OR';
    }

    $query->set('meta_query', $meta_query);
    $query->set('tax_query', $tax_query);
}

/**
 * Get product count for stock status within current category context
 */
function blaze_get_stock_status_count_for_category($status, $category_id = null) {
    global $wpdb;
    
    // Get current category if not provided
    if (!$category_id && is_product_category()) {
        $category_id = get_queried_object_id();
    }
    
    $base_query = "
        SELECT COUNT(DISTINCT p.ID)
        FROM {$wpdb->posts} p
        INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
        WHERE p.post_type = 'product'
        AND p.post_status = 'publish'
    ";
    
    // Add category filter if we have a category
    if ($category_id) {
        $base_query .= "
            AND p.ID IN (
                SELECT object_id 
                FROM {$wpdb->term_relationships} tr
                INNER JOIN {$wpdb->term_taxonomy} tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
                WHERE tt.term_id = {$category_id}
                AND tt.taxonomy = 'product_cat'
            )
        ";
    }
    
    switch ($status) {
        case 'instock':
            $query = $base_query . "
                AND pm.meta_key = '_stock_status'
                AND pm.meta_value = 'instock'
            ";
            break;
            
        case 'outofstock':
            $query = $base_query . "
                AND pm.meta_key = '_stock_status'
                AND pm.meta_value = 'outofstock'
            ";
            break;
            
        case 'onbackorder':
            $query = $base_query . "
                AND pm.meta_key = '_stock_status'
                AND pm.meta_value = 'onbackorder'
            ";
            break;
            
        case 'onsale':
            $query = $base_query . "
                AND pm.meta_key = '_sale_price'
                AND pm.meta_value != ''
            ";
            break;
            
        case 'new':
            $thirty_days_ago = date('Y-m-d H:i:s', strtotime('-30 days'));
            $query = str_replace(
                "INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id",
                "",
                $base_query
            );
            $query = str_replace(
                "WHERE p.post_type = 'product'",
                "WHERE p.post_type = 'product'
                AND p.post_date >= '{$thirty_days_ago}'",
                $query
            );
            break;
            
        default:
            return 0;
    }
    
    return (int) $wpdb->get_var($query);
}

/**
 * Initialize filter hooks
 */
function blaze_init_filter_hooks() {
    // Apply stock status filters to main query
    add_action('pre_get_posts', 'blaze_apply_stock_status_filters');
}

// Initialize hooks
add_action('init', 'blaze_init_filter_hooks');
