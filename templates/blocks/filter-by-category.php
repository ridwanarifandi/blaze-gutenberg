<?php
/**
 * Template for Filter by Category block
 *
 * @var array $attributes Block attributes
 * @var array $items Category/tag items
 * @var string $filter_id Unique filter ID
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

$title = $attributes['title'] ?? __('Category', 'blaze-gutenberg');
$show_count = $attributes['showCount'] ?? true;
$max_visible = $attributes['maxVisible'] ?? 10;
$is_collapsed = $attributes['isCollapsed'] ?? false;
$filter_type = $attributes['filterType'] ?? 'category';

// Get current filter values from URL
$current_filters = [];
if ($filter_type === 'category') {
    $current_filters = isset($_GET['filter_category']) ? explode(',', sanitize_text_field($_GET['filter_category'])) : [];
} else {
    $current_filters = isset($_GET['filter_tag']) ? explode(',', sanitize_text_field($_GET['filter_tag'])) : [];
}

$visible_items = array_slice($items, 0, $max_visible);
$hidden_items = array_slice($items, $max_visible);
$has_more_items = count($hidden_items) > 0;
?>

<div class="blaze-filter-by-category" data-filter-type="<?php echo esc_attr($filter_type); ?>">
    <div class="blaze-filter-header">
        <h3 class="blaze-filter-title"><?php echo esc_html($title); ?></h3>
    </div>

    <div class="blaze-filter-content">
        <div class="blaze-filter-checkbox-list">
            <?php foreach ($visible_items as $item): ?>
                <?php
                $is_checked = in_array($item['slug'], $current_filters);
                ?>
                <label class="blaze-filter-checkbox-item">
                    <input type="checkbox" class="blaze-filter-checkbox" value="<?php echo esc_attr($item['slug']); ?>"
                        data-term-id="<?php echo esc_attr($item['id']); ?>" <?php checked($is_checked); ?>>
                    <span class="blaze-filter-checkbox-label">
                        <?php echo esc_html($item['name']); ?>
                        <?php if ($show_count && isset($item['count'])): ?>
                            <span class="blaze-filter-count"> (<?php echo esc_html($item['count']); ?>)</span>
                        <?php endif; ?>
                    </span>
                </label>
            <?php endforeach; ?>

            <?php if ($has_more_items): ?>
                <div class="blaze-filter-hidden-items" style="display: none;">
                    <?php foreach ($hidden_items as $item): ?>
                        <?php
                        $is_checked = in_array($item['slug'], $current_filters);
                        ?>
                        <label class="blaze-filter-checkbox-item">
                            <input type="checkbox" class="blaze-filter-checkbox" value="<?php echo esc_attr($item['slug']); ?>"
                                data-term-id="<?php echo esc_attr($item['id']); ?>" <?php checked($is_checked); ?>>
                            <span class="blaze-filter-checkbox-label">
                                <?php echo esc_html($item['name']); ?>
                                <?php if ($show_count && isset($item['count'])): ?>
                                    <span class="blaze-filter-count"> (<?php echo esc_html($item['count']); ?>)</span>
                                <?php endif; ?>
                            </span>
                        </label>
                    <?php endforeach; ?>
                </div>

                <button type="button" class="blaze-filter-show-more">
                    <span class="show-more-text">
                        <?php echo esc_html__('Show More', 'blaze-gutenberg'); ?>
                        <span class="blaze-filter-remaining-count"> (<?php echo count($hidden_items); ?>)</span>
                    </span>
                    <span class="show-less-text" style="display: none;">
                        <?php echo esc_html__('Show Less', 'blaze-gutenberg'); ?>
                    </span>
                </button>
            <?php endif; ?>
        </div>
    </div>
</div>