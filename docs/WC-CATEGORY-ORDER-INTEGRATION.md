# WooCommerce Category Order Integration

## Overview

Kode telah diupdate untuk menggunakan fitur bawaan WooCommerce untuk pengurutan kategori. Alih-alih mengandalkan plugin eksternal seperti "Category Order and Taxonomy Terms Order", sistem sekarang menggunakan term_meta dengan key 'order' yang merupakan fitur standar WooCommerce.

## Perubahan yang Dilakukan

### 1. BlocksManager.php

#### a. Fungsi `sort_categories_php()`

- **Sebelum**: Menggunakan `$category->term_order` property
- **Sesudah**: Menggunakan `get_term_meta($category->term_id, 'order', true)`
- **Alasan**: WooCommerce menyimpan urutan kategori di term_meta dengan key 'order'

```php
// SEBELUM
$a_order = isset($a->term_order) ? (int) $a->term_order : 0;
$b_order = isset($b->term_order) ? (int) $b->term_order : 0;

// SESUDAH
$a_order = get_term_meta($a->term_id, 'order', true);
$b_order = get_term_meta($b->term_id, 'order', true);
$a_order = ($a_order !== '' && $a_order !== false) ? (int) $a_order : 0;
$b_order = ($b_order !== '' && $b_order !== false) ? (int) $b_order : 0;
```

#### b. Debug Logging

- Update log messages untuk menampilkan 'wc_order' alih-alih 'term_order'
- Menggunakan `get_term_meta()` untuk mendapatkan nilai order

#### c. Formatting Functions

- `get_categories()`: Update untuk menggunakan WooCommerce order
- `get_product_categories_api()`: Update untuk menggunakan WooCommerce order

```php
// SEBELUM
if (isset($category->term_order)) {
    $category_data['term_order'] = $category->term_order;
}

// SESUDAH
$wc_order = get_term_meta($category->term_id, 'order', true);
if ($wc_order !== '' && $wc_order !== false) {
    $category_data['term_order'] = (int) $wc_order;
}
```

### 2. plugin-detection.php

#### a. Fungsi `blaze_is_term_order_enabled_for_taxonomy()`

- **Sebelum**: Mengecek plugin eksternal untuk term order
- **Sesudah**: Untuk `product_cat`, langsung mengecek keberadaan WooCommerce

```php
// SEBELUM
if (!blaze_has_term_order_feature()) {
    return false;
}

// SESUDAH
if ($taxonomy === 'product_cat') {
    return class_exists('WooCommerce');
}
```

#### b. Label Option

- Update label dari "Term Order" menjadi "Manual Order (WooCommerce)"
- Memberikan klarifikasi bahwa fitur ini menggunakan WooCommerce

## Keuntungan Perubahan

1. **Native Integration**: Menggunakan fitur bawaan WooCommerce tanpa ketergantungan plugin eksternal
2. **Reliability**: Lebih stabil karena menggunakan sistem yang sudah terintegrasi dengan WooCommerce
3. **User Experience**: Admin dapat mengatur urutan kategori langsung dari WooCommerce admin
4. **Maintenance**: Mengurangi dependency pada plugin third-party

## Cara Menggunakan

1. Buka **WooCommerce > Products > Categories**
2. Drag dan drop kategori untuk mengatur urutan
3. Perubahan akan otomatis tersimpan di term_meta dengan key 'order'
4. Pada blok Gutenberg, pilih **"Manual Order (WooCommerce)"** sebagai opsi sorting

## Testing

Gunakan file `test-wc-order-integration.php` untuk menguji:

1. Deteksi WooCommerce
2. Ketersediaan opsi term order
3. Nilai order pada kategori-kategori
4. Fungsi sorting dengan nilai WooCommerce order

## Compatibility

- **WooCommerce**: Version 3.0+
- **WordPress**: Version 5.0+
- **Backward Compatibility**: Sistem masih mendukung plugin term order lain untuk taxonomies selain product_cat

## Technical Notes

- Term meta 'order' akan kosong ('') untuk kategori yang belum diatur urutannya
- Default value adalah 0 untuk kategori tanpa explicit order
- Sorting menggunakan integer comparison (ASC: 0, 1, 2... / DESC: ...2, 1, 0)
- Field 'order' dikelola otomatis oleh WooCommerce admin interface
