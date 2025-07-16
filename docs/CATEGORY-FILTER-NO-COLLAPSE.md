# Category Filter - Remove Collapse Functionality

## Overview

Fitur collapse/expand telah dihapus dari category filter untuk memberikan user experience yang lebih sederhana dan langsung. Category filter sekarang selalu dalam keadaan expanded dan tidak memiliki toggle button.

## Changes Made

### 1. **Template Changes**

**File: `templates/blocks/filter-by-category.php`**

**Sebelum:**
```html
<div class="blaze-filter-header" data-collapsed="false" role="button" tabindex="0" aria-expanded="true">
    <h3 class="blaze-filter-title">Category</h3>
    <svg class="blaze-filter-toggle-icon" width="20" height="20" viewBox="0 0 24 24">
        <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
</div>

<div class="blaze-filter-content" style="display: block;">
    <!-- content -->
</div>
```

**Sesudah:**
```html
<div class="blaze-filter-header">
    <h3 class="blaze-filter-title">Category</h3>
</div>

<div class="blaze-filter-content">
    <!-- content -->
</div>
```

**Perubahan:**
- ✅ Hapus `data-collapsed`, `role="button"`, `tabindex`, `aria-expanded`
- ✅ Hapus `<svg class="blaze-filter-toggle-icon">`
- ✅ Hapus inline style `display: none/block` pada content

### 2. **JavaScript Changes**

**File: `src/frontend/filter-blocks.js`**

**Function: `initCollapsibleHeaders()`**

**Sebelum:**
```javascript
function initCollapsibleHeaders() {
    const headers = document.querySelectorAll(".blaze-filter-header");
    
    headers.forEach((header) => {
        header.addEventListener("click", handleHeaderClick);
        header.addEventListener("keydown", handleHeaderKeydown);
    });
}
```

**Sesudah:**
```javascript
function initCollapsibleHeaders() {
    // Only add collapse functionality to non-category filters
    const headers = document.querySelectorAll(".blaze-filter-header");
    
    headers.forEach((header) => {
        const filterBlock = header.closest('[class*="blaze-filter-by-"]');
        const filterType = getFilterType(filterBlock);
        
        // Skip category filters - they don't have collapse functionality
        if (filterType === 'category') {
            return;
        }
        
        header.addEventListener("click", handleHeaderClick);
        header.addEventListener("keydown", handleHeaderKeydown);
    });
}
```

**Perubahan:**
- ✅ Skip category filters dari collapse functionality
- ✅ Hanya attribute dan stock status filters yang memiliki collapse
- ✅ Category filter tidak memiliki click/keyboard event listeners

### 3. **CSS Changes**

**File: `src/blocks/filter-by-category/style.scss`**

**Sebelum:**
```scss
.blaze-filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background: #f3f4f6;
    }

    &:focus {
        outline: 2px solid #3b82f6;
        outline-offset: -2px;
    }
}

.blaze-filter-toggle-icon {
    width: 20px;
    height: 20px;
    color: #6b7280;
    transition: transform 0.2s ease;
}
```

**Sesudah:**
```scss
.blaze-filter-header {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 12px;
}
```

**Perubahan:**
- ✅ Hapus `justify-content: space-between`
- ✅ Hapus `cursor: pointer`
- ✅ Hapus hover dan focus states
- ✅ Hapus padding dan background
- ✅ Hapus `.blaze-filter-toggle-icon` styles
- ✅ Simplify ke basic header styling

**File: `src/blocks/filter-by-category/editor.scss`**

**Perubahan serupa:**
- ✅ Hapus toggle icon styles
- ✅ Simplify header styling untuk editor

## User Experience Impact

### Before (With Collapse)
```
[Category ▼]  ← Clickable header with arrow
├─ Electronics
├─ Clothing  
└─ Books
```

### After (No Collapse)
```
Category      ← Static header, no arrow
├─ Electronics
├─ Clothing
└─ Books
```

## Benefits

### 1. **Simplified UI**
- ✅ Cleaner header design
- ✅ No confusing toggle button
- ✅ Always visible category options

### 2. **Better UX for Navigation**
- ✅ Categories always accessible
- ✅ No extra click to expand
- ✅ Immediate category selection

### 3. **Consistent with Navigation Pattern**
- ✅ Category filter = navigation tool
- ✅ Always visible like menu items
- ✅ No need to hide navigation options

### 4. **Performance**
- ✅ No collapse/expand animations
- ✅ Simpler DOM structure
- ✅ Less JavaScript event handling

## Filter Comparison

### Category Filter (No Collapse)
```html
<div class="blaze-filter-by-category">
    <div class="blaze-filter-header">
        <h3 class="blaze-filter-title">Category</h3>
    </div>
    <div class="blaze-filter-content">
        <!-- Always visible -->
    </div>
</div>
```

### Attribute Filter (With Collapse)
```html
<div class="blaze-filter-by-attribute">
    <div class="blaze-filter-header" role="button" tabindex="0">
        <h3 class="blaze-filter-title">Color</h3>
        <svg class="blaze-filter-toggle-icon">...</svg>
    </div>
    <div class="blaze-filter-content">
        <!-- Collapsible -->
    </div>
</div>
```

### Stock Status Filter (With Collapse)
```html
<div class="blaze-filter-by-stock-status">
    <div class="blaze-filter-header" role="button" tabindex="0">
        <h3 class="blaze-filter-title">Availability</h3>
        <svg class="blaze-filter-toggle-icon">...</svg>
    </div>
    <div class="blaze-filter-content">
        <!-- Collapsible -->
    </div>
</div>
```

## Build Results

```bash
Frontend JS: 4.77 KiB ✅ (slight increase due to conditional logic)
CSS: 33.6 KiB ✅ (slight decrease due to removed styles)
Build: Success ✅
```

## Testing

### 1. **Category Filter Test**
- ✅ Header tidak clickable
- ✅ Tidak ada arrow icon
- ✅ Content selalu visible
- ✅ Checkbox navigation bekerja

### 2. **Other Filters Test**
- ✅ Attribute filter masih collapsible
- ✅ Stock status filter masih collapsible
- ✅ Toggle functionality normal

### 3. **Responsive Test**
- ✅ Mobile: Category header responsive
- ✅ Tablet: Layout tetap konsisten
- ✅ Desktop: Styling sesuai design

## Accessibility

### Category Filter
- ✅ No role="button" (not interactive)
- ✅ No tabindex (not focusable)
- ✅ No aria-expanded (not collapsible)
- ✅ Simple heading structure

### Other Filters
- ✅ Maintain full accessibility
- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support

## Future Considerations

1. **Consistent Design**: Consider applying same pattern to all filters
2. **User Preference**: Add option to enable/disable collapse per filter type
3. **Mobile Optimization**: Optimize for small screens without collapse
4. **Analytics**: Track if users prefer always-visible vs collapsible

Category filter sekarang memiliki UI yang lebih sederhana dan konsisten dengan fungsinya sebagai navigation tool!
