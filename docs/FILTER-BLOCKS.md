# Filter Blocks Documentation

This document describes the three filter blocks created for the Blaze Gutenberg plugin: Filter by Category, Filter by Attribute, and Filter by Stock Status.

## Overview

The filter blocks provide a consistent interface for filtering WooCommerce products with the following features:

- **Collapsible headers** with arrow indicators
- **Show more/less functionality** for long lists
- **Configurable display options** through block settings
- **Real-time product counts** (optional)
- **Responsive design** that works on all devices
- **Accessibility support** with proper ARIA attributes

## Block Types

### 1. Filter by Category

**Block Name:** `blaze/filter-by-category`

Allows filtering products by categories or tags.

#### Attributes:
- `title` (string): Filter heading text (default: "Category")
- `filterType` (string): "category" or "tag" (default: "category")
- `selectedCategories` (array): Pre-selected category/tag IDs
- `showCount` (boolean): Display product counts (default: true)
- `maxVisible` (number): Items shown before "Show More" (default: 10)
- `isCollapsed` (boolean): Start in collapsed state (default: false)
- `orderBy` (string): Sort by "name", "count", or "id" (default: "name")
- `order` (string): "ASC" or "DESC" (default: "ASC")
- `hideEmpty` (boolean): Hide empty categories/tags (default: true)

#### Usage:
```html
<!-- Filter by Categories -->
[blaze/filter-by-category]

<!-- Filter by Tags -->
[blaze/filter-by-category filterType="tag" title="Tags"]
```

### 2. Filter by Attribute

**Block Name:** `blaze/filter-by-attribute`

Allows filtering products by WooCommerce attributes (color, size, brand, etc.).

#### Attributes:
- `title` (string): Filter heading text (default: "Color")
- `attributeSlug` (string): Attribute taxonomy slug (default: "pa_color")
- `selectedAttributes` (array): Pre-selected attribute term IDs
- `showCount` (boolean): Display product counts (default: true)
- `maxVisible` (number): Items shown before "Show More" (default: 10)
- `isCollapsed` (boolean): Start in collapsed state (default: false)
- `orderBy` (string): Sort by "name", "count", or "id" (default: "name")
- `order` (string): "ASC" or "DESC" (default: "ASC")
- `hideEmpty` (boolean): Hide empty attributes (default: true)
- `displayType` (string): "list" or "color-swatches" (default: "list")

#### Usage:
```html
<!-- Color Filter with Swatches -->
[blaze/filter-by-attribute attributeSlug="pa_color" displayType="color-swatches"]

<!-- Size Filter -->
[blaze/filter-by-attribute attributeSlug="pa_size" title="Size"]
```

### 3. Filter by Stock Status

**Block Name:** `blaze/filter-by-stock-status`

Allows filtering products by stock status (In Stock, Sale, New Arrivals, etc.).

#### Attributes:
- `title` (string): Filter heading text (default: "Shop")
- `selectedStatuses` (array): Pre-selected status IDs
- `showCount` (boolean): Display product counts (default: true)
- `maxVisible` (number): Items shown before "Show More" (default: 10)
- `isCollapsed` (boolean): Start in collapsed state (default: false)
- `enabledStatuses` (object): Which statuses to show:
  - `instock` (boolean): Show "In Stock" option (default: true)
  - `onsale` (boolean): Show "Sale" option (default: true)
  - `new` (boolean): Show "New Arrivals" option (default: true)
  - `outofstock` (boolean): Show "Out of Stock" option (default: false)
  - `backorder` (boolean): Show "On Backorder" option (default: false)

#### Usage:
```html
<!-- Basic Stock Status Filter -->
[blaze/filter-by-stock-status]

<!-- Custom Stock Status Filter -->
[blaze/filter-by-stock-status title="Availability" enabledStatuses='{"instock":true,"onsale":true,"outofstock":true}']
```

## Frontend Functionality

### URL Parameters

The filter blocks automatically update URL parameters when filters are applied:

- **Categories:** `?filter_category=category-slug-1,category-slug-2`
- **Tags:** `?filter_tag=tag-slug-1,tag-slug-2`
- **Attributes:** `?filter_color=red,blue` (for pa_color attribute)
- **Stock Status:** `?filter_stock_status=instock,onsale`

### JavaScript Events

The frontend JavaScript handles:
- Collapsible header clicks
- Show more/less button functionality
- Filter checkbox changes
- Color swatch interactions
- URL parameter updates
- Page reloads with new filters

### CSS Classes

Key CSS classes for styling:

```css
.blaze-filter-block                 /* Main container */
.blaze-filter-header               /* Collapsible header */
.blaze-filter-title                /* Filter title */
.blaze-filter-toggle-icon          /* Collapse/expand arrow */
.blaze-filter-content              /* Filter content area */
.blaze-filter-checkbox-list       /* Checkbox container */
.blaze-filter-checkbox-item       /* Individual checkbox item */
.blaze-filter-checkbox            /* Checkbox input */
.blaze-filter-checkbox-label      /* Checkbox label */
.blaze-filter-count               /* Product count display */
.blaze-filter-show-more           /* Show more/less button */
.blaze-filter-color-swatch        /* Color swatch (attributes only) */
```

## API Endpoints

The blocks use these REST API endpoints:

### GET `/blaze/v1/product-categories`
Returns all product categories with counts.

### GET `/blaze/v1/product-tags`
Returns all product tags with counts.

### GET `/blaze/v1/product-attributes`
Returns all available product attributes.

### GET `/blaze/v1/product-attribute-terms/{attribute}`
Returns terms for a specific attribute (e.g., colors, sizes).

### GET `/blaze/v1/product-stock-status-counts`
Returns product counts for each stock status.

## Customization

### Styling

All blocks share common styles from `filter-shared.scss`. Individual blocks can be customized:

```scss
// Category filter specific styles
.blaze-filter-by-category {
    // Custom styles here
}

// Attribute filter with color swatches
.blaze-filter-by-attribute.display-color-swatches {
    .blaze-filter-checkbox-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    }
}

// Stock status filter specific styles
.blaze-filter-by-stock-status {
    // Custom styles here
}
```

### PHP Templates

Templates can be customized by copying them to your theme:

```
your-theme/
├── blaze-gutenberg/
│   ├── blocks/
│   │   ├── filter-by-category.php
│   │   ├── filter-by-attribute.php
│   │   └── filter-by-stock-status.php
```

## Testing

A test page is available at **Tools > Test Filter Blocks** in WordPress admin (when WP_DEBUG is enabled).

The test checks:
- Block registration
- API endpoints
- WooCommerce integration
- Asset loading

## Troubleshooting

### Common Issues

1. **Blocks not appearing in editor**
   - Check if WooCommerce is active
   - Verify assets are built (`npm run build`)
   - Check browser console for JavaScript errors

2. **API endpoints returning errors**
   - Verify WooCommerce is properly installed
   - Check if product categories/attributes exist
   - Ensure proper permissions for REST API

3. **Filters not working on frontend**
   - Check if `filter-blocks.js` is loaded
   - Verify URL parameters are being set
   - Ensure theme supports WooCommerce filtering

4. **Styling issues**
   - Check if CSS files are loaded
   - Verify no theme conflicts
   - Use browser dev tools to inspect styles

### Debug Mode

Enable WordPress debug mode to see detailed error messages:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

## Browser Support

The filter blocks support:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- API endpoints are cached for 1 hour
- JavaScript is loaded only when filter blocks are present
- CSS is optimized and minified
- Database queries are optimized with proper indexing
