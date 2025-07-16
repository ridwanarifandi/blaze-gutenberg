<?php
/**
 * Category Helper Functions
 * 
 * Helper functions for WooCommerce category operations
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('blaze_get_current_product_category')) {
    /**
     * Get current product category when on category archive page
     * 
     * @return WP_Term|null Current category term or null if not on category page
     */
    function blaze_get_current_product_category()
    {
        if (!is_product_category()) {
            return null;
        }

        $current_category = get_queried_object();

        if (!$current_category || !isset($current_category->term_id)) {
            return null;
        }

        return $current_category;
    }
}

if (!function_exists('blaze_get_child_categories')) {
    /**
     * Get child categories of a specific category
     * 
     * @param int $parent_id Parent category ID
     * @param array $args Additional arguments for get_terms
     * @return array Array of child category terms
     */
    function blaze_get_child_categories($parent_id, $args = [])
    {
        $default_args = [
            'taxonomy' => 'product_cat',
            'parent' => $parent_id,
            'hide_empty' => true,
            'orderby' => 'name',
            'order' => 'ASC',
        ];

        $args = wp_parse_args($args, $default_args);

        $child_categories = get_terms($args);

        if (is_wp_error($child_categories)) {
            return [];
        }

        return $child_categories;
    }
}

if (!function_exists('blaze_get_current_category_children')) {
    /**
     * Get child categories of current category page
     * 
     * @param array $args Additional arguments for get_terms
     * @return array Array of child category terms
     */
    function blaze_get_current_category_children($args = [])
    {
        $current_category = blaze_get_current_product_category();

        if (!$current_category) {
            return [];
        }

        return blaze_get_child_categories($current_category->term_id, $args);
    }
}

if (!function_exists('blaze_format_category_for_filter')) {
    /**
     * Format category term for filter display
     * 
     * @param WP_Term $category Category term object
     * @return array Formatted category data
     */
    function blaze_format_category_for_filter($category)
    {
        return [
            'id' => $category->term_id,
            'name' => $category->name,
            'slug' => $category->slug,
            'count' => $category->count,
            'link' => get_term_link($category),
            'parent_id' => $category->parent,
        ];
    }
}

if (!function_exists('blaze_is_category_page')) {
    /**
     * Check if current page is a product category page
     * 
     * @return bool True if on category page, false otherwise
     */
    function blaze_is_category_page()
    {
        return is_product_category();
    }
}

if (!function_exists('blaze_get_top_level_categories')) {
    /**
     * Get top-level categories (categories with no parent)
     *
     * @param array $args Additional arguments for get_terms
     * @return array Array of top-level category terms
     */
    function blaze_get_top_level_categories($args = [])
    {
        $default_args = [
            'taxonomy' => 'product_cat',
            'parent' => 0, // Only get top-level categories
            'hide_empty' => true,
            'orderby' => 'name',
            'order' => 'ASC',
        ];

        $args = wp_parse_args($args, $default_args);

        $top_level_categories = get_terms($args);

        if (is_wp_error($top_level_categories)) {
            return [];
        }

        return $top_level_categories;
    }
}

if (!function_exists('blaze_get_category_breadcrumb')) {
    /**
     * Get category breadcrumb trail
     *
     * @param int $category_id Category ID
     * @return array Array of category terms from root to current
     */
    function blaze_get_category_breadcrumb($category_id)
    {
        $breadcrumb = [];
        $current_id = $category_id;

        while ($current_id > 0) {
            $category = get_term($current_id, 'product_cat');

            if (is_wp_error($category) || !$category) {
                break;
            }

            array_unshift($breadcrumb, $category);
            $current_id = $category->parent;
        }

        return $breadcrumb;
    }
}
