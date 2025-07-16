<?php
/**
 * Template for Filter by Attribute block
 *
 * @var array $attributes Block attributes
 * @var array $items Attribute term items
 * @var string $filter_id Unique filter ID
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

$title = $attributes['title'] ?? __('Color', 'blaze-gutenberg');
$show_count = $attributes['showCount'] ?? true;
$max_visible = $attributes['maxVisible'] ?? 10;
$is_collapsed = $attributes['isCollapsed'] ?? false;
$display_type = $attributes['displayType'] ?? 'list';
$attribute_slug = $attributes['attributeSlug'] ?? '';

// Get current filter values from URL
$current_filters = isset($_GET['filter_' . str_replace('pa_', '', $attribute_slug)])
    ? explode(',', sanitize_text_field($_GET['filter_' . str_replace('pa_', '', $attribute_slug)]))
    : [];

$visible_items = array_slice($items, 0, $max_visible);
$hidden_items = array_slice($items, $max_visible);
$has_more_items = count($hidden_items) > 0;

$block_classes = 'blaze-filter-by-attribute';
if ($display_type === 'color-swatches') {
    $block_classes .= ' display-color-swatches';
}
?>

<div class="<?php echo esc_attr($block_classes); ?>" data-attribute="<?php echo esc_attr($attribute_slug); ?>">
    <div class="blaze-filter-header" data-collapsed="<?php echo $is_collapsed ? 'true' : 'false'; ?>" role="button"
        tabindex="0" aria-expanded="<?php echo $is_collapsed ? 'false' : 'true'; ?>">
        <h3 class="blaze-filter-title"><?php echo esc_html($title); ?></h3>
        <svg class="blaze-filter-toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
    </div>

    <div class="blaze-filter-content" <?php echo $is_collapsed ? 'style="display: none;"' : ''; ?>>
        <div class="blaze-filter-checkbox-list">
            <?php foreach ($visible_items as $item): ?>
                <?php
                $is_checked = in_array($item['slug'], $current_filters);
                $item_classes = 'blaze-filter-checkbox-item';
                if ($is_checked) {
                    $item_classes .= ' is-selected';
                }
                ?>
                <label class="<?php echo esc_attr($item_classes); ?>">
                    <input type="checkbox" class="blaze-filter-checkbox" value="<?php echo esc_attr($item['slug']); ?>"
                        data-term-id="<?php echo esc_attr($item['id']); ?>" <?php checked($is_checked); ?>>

                    <?php if ($display_type === 'color-swatches' && !empty($item['color'])): ?>
                        <div class="blaze-filter-color-swatch"
                            style="background-color: <?php echo esc_attr($item['color']); ?>"></div>
                    <?php else: ?>
                        <span class="blaze-filter-checkbox-custom"></span>
                    <?php endif; ?>

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
                        $item_classes = 'blaze-filter-checkbox-item';
                        if ($is_checked) {
                            $item_classes .= ' is-selected';
                        }
                        ?>
                        <label class="<?php echo esc_attr($item_classes); ?>">
                            <input type="checkbox" class="blaze-filter-checkbox" value="<?php echo esc_attr($item['slug']); ?>"
                                data-term-id="<?php echo esc_attr($item['id']); ?>" <?php checked($is_checked); ?>>

                            <?php if ($display_type === 'color-swatches' && !empty($item['color'])): ?>
                                <div class="blaze-filter-color-swatch"
                                    style="background-color: <?php echo esc_attr($item['color']); ?>"></div>
                            <?php else: ?>
                                <span class="blaze-filter-checkbox-custom"></span>
                            <?php endif; ?>

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