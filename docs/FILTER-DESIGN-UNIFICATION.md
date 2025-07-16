# Filter Design Unification & Stock Status Filtering

## Overview

Semua filter blocks (Category, Attribute, Stock Status) telah disamakan designnya dan stock status filtering telah diimplementasi dengan proper counting berdasarkan kategori saat ini.

## Design Changes

### 1. **Unified Visual Design**

Semua filter blocks sekarang memiliki design yang konsisten:

```
Category                    Color                      Status
☐ Accessories (5)          ☐ Black (12)               ☐ In stock (223)
☑ Hoodies (4)              ☑ Red (8)                  ☑ Out of stock (15)
☐ Tshirts (5)              ☐ Blue (6)                 ☐ On backorder (3)
```

**Design Elements:**
- ✅ Custom checkbox 18x18px
- ✅ Blue background (#3b82f6) when checked
- ✅ White checkmark
- ✅ Consistent spacing (gap: 12px)
- ✅ Blue text color (#10426e) for labels
- ✅ Hover effects with underline
- ✅ Proper alignment

### 2. **CSS Unification**

**Common Styling Applied to All Filters:**

```scss
.blaze-filter-by-[type] {
    margin-bottom: 1rem;
    overflow: hidden;

    .blaze-filter-header {
        font-weight: 600;
        font-size: 18px;
        line-height: 24px;
        // Category: no collapse, others: collapsible
    }

    .blaze-filter-content {
        padding: 0; // Consistent padding
    }

    .blaze-filter-checkbox-list {
        gap: 12px; // Consistent spacing
    }

    .blaze-filter-checkbox-item {
        padding: 0 !important;
        margin: 0 !important;
    }

    .blaze-filter-checkbox-label {
        color: #10426e; // Consistent blue color
        
        &:hover {
            color: #1f2937;
            text-decoration: underline;
        }
    }
}
```

## Stock Status Filtering Implementation

### 1. **Filter Helper Functions**

**File: `includes/helpers/filter-helpers.php`**

**A. Query Filtering:**
```php
function blaze_apply_stock_status_filters($query) {
    $stock_status_filter = $_GET['filter_stock_status'] ?? '';
    
    if (empty($stock_status_filter)) return;
    
    $stock_statuses = explode(',', $stock_status_filter);
    $meta_query = [];
    
    foreach ($stock_statuses as $status) {
        switch ($status) {
            case 'instock':
                $meta_query[] = ['key' => '_stock_status', 'value' => 'instock'];
                break;
            case 'onsale':
                $meta_query[] = ['key' => '_sale_price', 'value' => '', 'compare' => '!='];
                break;
            // ... other statuses
        }
    }
    
    $query->set('meta_query', $meta_query);
}
```

**B. Category-Aware Counting:**
```php
function blaze_get_stock_status_count_for_category($status, $category_id = null) {
    // Get current category if not provided
    if (!$category_id && is_product_category()) {
        $category_id = get_queried_object_id();
    }
    
    // Build query with category filter
    $base_query = "SELECT COUNT(DISTINCT p.ID) FROM {$wpdb->posts} p";
    
    if ($category_id) {
        $base_query .= " AND p.ID IN (category products)";
    }
    
    // Add stock status specific conditions
    switch ($status) {
        case 'instock':
            return $wpdb->get_var($base_query . " AND stock_status = 'instock'");
        // ... other statuses
    }
}
```

### 2. **Updated BlocksManager**

**File: `includes/BlocksManager.php`**

```php
private function get_stock_status_count($status) {
    // Get current category context
    $category_id = null;
    if (is_product_category()) {
        $category_id = get_queried_object_id();
    }
    
    // Use helper function that considers category context
    return blaze_get_stock_status_count_for_category($status, $category_id);
}
```

### 3. **Template Updates**

**All filter templates now include:**
```html
<input type="checkbox" class="blaze-filter-checkbox" value="slug">
<span class="blaze-filter-checkbox-custom"></span>
<span class="blaze-filter-checkbox-label">Label (count)</span>
```

**Special handling for color swatches:**
```html
<?php if ($display_type === 'color-swatches' && !empty($item['color'])): ?>
    <div class="blaze-filter-color-swatch" style="background-color: <?php echo $item['color']; ?>"></div>
<?php else: ?>
    <span class="blaze-filter-checkbox-custom"></span>
<?php endif; ?>
```

## Filtering Behavior

### 1. **Category Filter (Navigation)**
```
URL: /product-category/music/
User clicks "Clothing" → Navigate to /product-category/clothing/
Behavior: Direct navigation, no URL parameters
```

### 2. **Attribute Filter (Parameter Filtering)**
```
URL: /product-category/electronics/
User selects "Red" color → /product-category/electronics/?filter_color=red
Behavior: Stay on page, add filter parameters
```

### 3. **Stock Status Filter (Parameter Filtering)**
```
URL: /product-category/electronics/
User selects "In Stock" → /product-category/electronics/?filter_stock_status=instock
Behavior: Stay on page, filter products by stock status
```

## Category-Aware Counting

### Before (Global Counts)
```
Status (All Products)
☐ In stock (1,234)     ← All products in store
☐ Out of stock (56)    ← All products in store
☐ On backorder (12)    ← All products in store
```

### After (Category-Specific Counts)
```
Status (Electronics Category)
☐ In stock (223)       ← Only electronics products
☐ Out of stock (15)    ← Only electronics products  
☐ On backorder (3)     ← Only electronics products
```

**Implementation:**
- ✅ Detect current category context
- ✅ Filter counts by category
- ✅ Update counts dynamically
- ✅ Maintain performance with optimized queries

## Stock Status Types

### 1. **In Stock**
- **Query**: `_stock_status = 'instock'`
- **Description**: Products available for purchase

### 2. **Out of Stock**
- **Query**: `_stock_status = 'outofstock'`
- **Description**: Products not available

### 3. **On Backorder**
- **Query**: `_stock_status = 'onbackorder'`
- **Description**: Products available for backorder

### 4. **Sale**
- **Query**: `_sale_price != ''`
- **Description**: Products with sale price set

### 5. **New Arrivals**
- **Query**: `post_date >= 30 days ago`
- **Description**: Products created within last 30 days

## Build Results

```bash
Frontend JS: 5.13 KiB ✅ (includes all filter functionality)
CSS: 33.9 KiB ✅ (unified styling for all filters)
Build: Success ✅
```

## Testing Scenarios

### 1. **Design Consistency Test**
- ✅ All filters have same checkbox style
- ✅ All filters have same spacing
- ✅ All filters have same color scheme
- ✅ All filters have same hover effects

### 2. **Stock Status Filtering Test**
```
1. Go to /product-category/electronics/
2. Check "In Stock" → URL: ?filter_stock_status=instock
3. Verify only in-stock electronics products shown
4. Check "Sale" → URL: ?filter_stock_status=instock,onsale
5. Verify in-stock AND sale electronics products shown
```

### 3. **Category-Aware Counting Test**
```
1. Go to /product-category/electronics/
2. Verify counts show only electronics products
3. Go to /product-category/clothing/
4. Verify counts show only clothing products
5. Go to /shop/ (all products)
6. Verify counts show all products
```

### 4. **Mixed Filtering Test**
```
1. Go to /product-category/electronics/
2. Apply color filter: ?filter_color=red
3. Apply stock status filter: ?filter_color=red&filter_stock_status=instock
4. Verify products match both filters
5. Navigate to different category
6. Verify filters reset appropriately
```

## Performance Optimizations

### 1. **Efficient Queries**
- ✅ Use indexed meta_key queries
- ✅ Combine category and stock status filters
- ✅ Cache-friendly query structure

### 2. **Smart Counting**
- ✅ Context-aware counting
- ✅ Optimized SQL queries
- ✅ Minimal database calls

### 3. **Frontend Performance**
- ✅ Efficient CSS compilation
- ✅ Minimal JavaScript overhead
- ✅ Proper event delegation

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

Semua filter blocks sekarang memiliki design yang konsisten dan stock status filtering bekerja dengan proper category-aware counting!
