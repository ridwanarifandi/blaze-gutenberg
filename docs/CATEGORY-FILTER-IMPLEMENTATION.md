# Category Filter Implementation

## Overview

Filter by Category block telah dimodifikasi untuk menampilkan child categories dari kategori saat ini ketika digunakan di halaman product category. Implementasi ini mengikuti design yang diberikan dengan checkbox styling yang sesuai.

## Fitur Utama

### 1. **Auto-Detection Category Page**

- Block secara otomatis mendeteksi ketika berada di halaman product category
- Menampilkan child categories (level 1) dari kategori saat ini
- **Fallback ke top-level categories** jika kategori saat ini tidak memiliki child categories
- Fallback ke semua kategori jika tidak berada di halaman category

### 2. **Custom Checkbox Design**

- Checkbox dengan design sesuai screenshot yang diberikan
- Custom styling dengan border dan checkmark
- Hover states dan focus states yang proper
- Responsive design untuk mobile

### 3. **Helper Functions**

- `blaze_get_current_product_category()` - Mendapatkan kategori saat ini
- `blaze_get_child_categories()` - Mendapatkan child categories
- `blaze_get_current_category_children()` - Mendapatkan child dari kategori saat ini
- `blaze_get_top_level_categories()` - Mendapatkan kategori level paling atas
- `blaze_format_category_for_filter()` - Format kategori untuk filter

## File yang Dimodifikasi

### 1. **includes/BlocksManager.php**

```php
// Method baru untuk mendapatkan child categories
private function get_child_categories_for_current_page($attributes)

// Modifikasi method get_filter_categories untuk auto-detection
private function get_filter_categories($attributes)
```

### 2. **templates/blocks/filter-by-category.php**

```html
<!-- Struktur checkbox baru dengan custom styling -->
<input type="checkbox" class="blaze-filter-checkbox" />
<span class="blaze-filter-checkbox-custom"></span>
<span class="blaze-filter-checkbox-label">Category Name (count)</span>
```

### 3. **src/components/filter-shared.scss**

```scss
// Custom checkbox styling
.blaze-filter-checkbox-custom {
	width: 18px;
	height: 18px;
	border: 2px solid #d1d5db;
	border-radius: 4px;
	// ... checkmark styling
}
```

### 4. **includes/helpers/category-helpers.php** (Baru)

Helper functions untuk operasi kategori WooCommerce.

## Cara Kerja

### 1. **Di Halaman Category**

```php
// Ketika block di-render di halaman category
if (is_product_category()) {
    $current_category = get_queried_object();
    $child_categories = get_child_categories($current_category->term_id);

    if (empty($child_categories)) {
        // Fallback ke top-level categories jika tidak ada child
        $categories = get_top_level_categories();
    } else {
        // Tampilkan child categories
        $categories = $child_categories;
    }
}
```

### 2. **Di Halaman Lain**

```php
// Ketika block di-render di halaman lain
$all_categories = get_terms(['taxonomy' => 'product_cat']);
// Tampilkan semua kategori
```

## Styling

### Checkbox Design

- **Unchecked**: Border abu-abu, background putih
- **Checked**: Background biru, border biru, checkmark putih
- **Hover**: Border lebih gelap
- **Focus**: Outline biru untuk accessibility

### Layout

- Gap 0.75rem antara checkbox dan label
- Padding 0.5rem vertikal untuk setiap item
- Font size 0.875rem untuk label
- Count dengan warna abu-abu

## API Endpoints

### Enhanced Product Categories API

```
GET /wp-json/blaze/v1/product-categories
```

**Parameters:**

- `parent` - ID kategori parent untuk mendapatkan child categories
- `orderby` - Urutan (name, count, id)
- `order` - ASC atau DESC
- `hide_empty` - true/false

## Testing

### Manual Testing

1. Buat beberapa kategori dengan hierarchy (parent-child)
2. Tambahkan Filter by Category block ke halaman category
3. Verifikasi hanya child categories yang muncul
4. Test checkbox functionality
5. Test responsive design

### Test File

```php
// Akses: yoursite.com/?test_category_filter=1
include 'test-category-filter.php';
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (dengan fallback styling)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## Performance

- Lazy loading untuk child categories
- Caching untuk category queries
- Minimal DOM manipulation
- Optimized CSS selectors

## Future Enhancements

1. **Multi-level Categories**: Support untuk lebih dari 1 level child
2. **Category Icons**: Dukungan untuk icon kategori
3. **AJAX Filtering**: Filter tanpa reload halaman
4. **Category Images**: Thumbnail kategori di filter
5. **Search Categories**: Search box untuk kategori banyak
