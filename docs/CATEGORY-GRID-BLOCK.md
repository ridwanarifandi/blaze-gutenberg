# WooCommerce Category Grid Block

## Overview
The WooCommerce Category Grid block displays product categories in a customizable grid layout with responsive columns and various display options.

## Features

### Category Selection
- **Select Specific Categories**: Choose which categories to display using checkboxes
- **Hide Empty Categories**: Option to hide categories with no products
- **All Categories**: Leave selection empty to show all categories

### Sorting & Display Options
- **Order By**: Sort categories by Name, Product Count, or ID
- **Order**: Ascending or Descending order
- **Number of Categories**: Limit the number of categories displayed (1-50)
- **Show Product Count**: Display the number of products in each category
- **Show Description**: Display category descriptions (truncated to 20 words)

### Responsive Layout
- **Desktop Columns**: 1-6 columns (default: 4)
- **Tablet Columns**: 1-4 columns (default: 3)
- **Mobile Columns**: 1-3 columns (default: 2)

### Styling Integration
- **Gutenberg Color Palette**: Category names, descriptions, and product counts automatically use WordPress theme colors
- **Custom Colors**: Support for custom color overrides via CSS variables
- **Responsive Design**: Automatically adapts to different screen sizes

## Block Attributes

```javascript
{
  selectedCategories: [], // Array of category IDs to display
  orderBy: "name",        // "name", "count", or "id"
  order: "ASC",          // "ASC" or "DESC"
  limit: 12,             // Number of categories to show
  columnsDesktop: 4,     // Desktop columns (1-6)
  columnsTablet: 3,      // Tablet columns (1-4)
  columnsMobile: 2,      // Mobile columns (1-3)
  showProductCount: true, // Show product count
  showDescription: false, // Show category description
  hideEmpty: true,       // Hide empty categories
  categoryNameColor: "", // Custom color for category names
  categoryDescriptionColor: "", // Custom color for descriptions
  productCountColor: ""  // Custom color for product count
}
```

## Usage

### In Gutenberg Editor
1. Add a new block
2. Search for "WooCommerce Category Grid" in the Blaze Commerce category
3. Configure settings in the Inspector Panel:
   - **Category Selection**: Choose specific categories or show all
   - **Sorting & Display**: Set order, limit, and display options
   - **Responsive Columns**: Configure columns for different devices

### Programmatic Usage
```php
// Render block with custom attributes
echo do_blocks('<!-- wp:blaze/category-grid {"columnsDesktop":3,"showDescription":true} -->');
```

## Styling

### CSS Variables
The block uses CSS custom properties for easy theming:

```css
.wp-block-blaze-category-grid {
  --columns-desktop: 4;
  --columns-tablet: 3;
  --columns-mobile: 2;
  --category-name-color: var(--wp--preset--color--foreground);
  --category-description-color: var(--wp--preset--color--foreground);
  --product-count-color: var(--wp--preset--color--primary);
}
```

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

## Template Structure

### Frontend Template
- **File**: `templates/blocks/category-grid.php`
- **Variables**: `$attributes`, `$categories`, `$grid_id`

### Category Card Structure
```html
<a href="[category-link]" class="blaze-category-card">
  <div class="blaze-category-card__image">
    <img src="[category-image]" alt="[category-name]" />
  </div>
  <div class="blaze-category-card__content">
    <h3 class="blaze-category-card__name">[category-name]</h3>
    <p class="blaze-category-card__description">[description]</p>
    <span class="blaze-category-card__count">[product-count]</span>
  </div>
</a>
```

## API Integration

### REST Endpoint
- **URL**: `/wp-json/blaze/v1/product-categories`
- **Method**: GET
- **Response**: Array of category objects with id, name, slug, description, count, image, and link

### Category Data Format
```javascript
{
  id: 123,
  name: "Category Name",
  slug: "category-slug",
  description: "Category description",
  count: 15,
  image: "https://example.com/image.jpg",
  link: "https://example.com/category/category-slug"
}
```

## Accessibility

- **Semantic HTML**: Uses proper heading hierarchy and link structure
- **ARIA Labels**: Descriptive labels for category links
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper alt text and content structure

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Responsive**: Works on all screen sizes

## Performance

- **Server-Side Rendering**: Block content is rendered on the server
- **Lazy Loading**: Images use lazy loading for better performance
- **Caching**: Supports WordPress caching mechanisms
- **Optimized Queries**: Efficient database queries for category data
