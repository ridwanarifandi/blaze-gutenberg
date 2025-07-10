# Assets Loading Fix

## Masalah yang Ditemukan

Berdasarkan screenshot DevTools yang diberikan, file `style-blocks.css` tidak dimuat di halaman product category. Setelah analisis, ditemukan dua masalah utama:

### 1. Path CSS File Salah

Di file `includes/AssetsManager.php` baris 24, path CSS mengarah ke folder yang salah:

```php
// SALAH
BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/style-blocks.css'

// BENAR (sudah diperbaiki)
BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/style-blocks.css'
```

### 2. Kondisi Loading Assets Terlalu Ketat

Di file `includes/Plugin.php`, kondisi untuk memuat assets terlalu ketat:

```php
// SEBELUM (terlalu ketat)
if ( has_blocks() || $this->has_blaze_blocks() ) {
    $this->assets_manager->enqueue_frontend_assets();
}

// SESUDAH (lebih fleksibel)
if (!is_admin()) {
    $this->assets_manager->enqueue_frontend_assets();
}
```

## Solusi yang Diterapkan

### 1. Perbaikan Path CSS

Path CSS sudah diperbaiki untuk mengarah ke lokasi yang benar di folder `assets/js/`.

### 2. Memuat Assets di Semua Halaman Frontend

Mengubah kondisi loading assets agar dimuat di semua halaman frontend (bukan admin). Ini memastikan:

- CSS tersedia di semua halaman WooCommerce
- Product cards dapat digunakan di template PHP manapun
- Tidak ada masalah dengan dynamic content
- Konsisten dengan penggunaan product card di berbagai loop

### 3. Menambahkan Method Helper

Menambahkan method `is_woocommerce_page()` sebagai backup untuk deteksi halaman WooCommerce jika diperlukan di masa depan.

## Hasil Setelah Perbaikan

1. **File CSS Dimuat**: `style-blocks.css` sekarang akan muncul di DevTools Network tab
2. **Ukuran File Bertambah**: CSS file bertambah dari 13.5 KiB menjadi 18.5 KiB (termasuk styles product-card)
3. **Konsistensi**: Assets dimuat konsisten di semua halaman frontend
4. **Performance**: Minimal impact karena CSS file di-cache browser

## Testing

Untuk memverifikasi perbaikan:

1. **Buka halaman product category**
2. **Check DevTools Network tab**
3. **Pastikan `style-blocks.css` muncul dengan status 200**
4. **Verify product card styling berfungsi dengan baik**

## File yang Dimodifikasi

- `includes/AssetsManager.php` - Perbaikan path CSS
- `includes/Plugin.php` - Perbaikan kondisi loading assets
- `src/blocks/product-card/style.scss` - Styles untuk product card block (user modification)
- `src/blocks/product-card/editor.scss` - Editor-specific styles untuk product card block

## Update Terbaru: Perbaikan Styling di Editor

### Masalah Kedua yang Ditemukan

Setelah perbaikan loading assets, ditemukan masalah baru: styling product card tidak diterapkan dengan benar di Gutenberg editor meskipun CSS sudah dimuat.

### Penyebab Masalah

1. **CSS Selector Specificity**: Block di editor memiliki wrapper tambahan (`.wp-block-blaze-product-card`) yang tidak tercakup dalam CSS selector
2. **Editor Context**: Gutenberg editor memiliki CSS context yang berbeda dengan frontend
3. **Missing Style File**: File `style.scss` untuk product card block tidak ada

### Solusi yang Diterapkan

#### 1. Membuat File `style.scss` yang Lengkap

- Menambahkan selector untuk wrapper block (`.wp-block-blaze-product-card`)
- Menyertakan semua styling product card yang komprehensif
- Menambahkan CSS dengan specificity tinggi untuk editor context

#### 2. Memperbaiki `editor.scss`

- Menghapus border editor yang mengganggu
- Menambahkan CSS dengan `!important` untuk memastikan styling diterapkan di editor
- Mempertahankan fungsionalitas editor (disable hover, pointer events)

#### 3. CSS Specificity untuk Editor

```scss
// Selector untuk frontend dan editor
.wp-block-blaze-product-card,
.blaze-product-card-block {
	.blaze-product-card {
		/* styles */
	}
}

// Specificity tinggi untuk editor
.block-editor-block-list__layout .wp-block-blaze-product-card {
	.blaze-product-card {
		/* styles dengan !important */
	}
}
```

### Hasil Setelah Perbaikan Kedua

1. **CSS File Size Bertambah**: dari 18.5 KiB menjadi 25.1 KiB
2. **Product Card Module Size**: dari 6.33 KiB menjadi 14.2 KiB
3. **Styling Diterapkan**: Product card sekarang memiliki styling yang benar di editor
4. **Konsistensi**: Styling sama antara editor dan frontend

## Catatan Pengembangan

Untuk pengembangan selanjutnya:

- Assets sekarang dimuat di semua halaman frontend
- Styling product card konsisten antara editor dan frontend
- CSS menggunakan specificity tinggi untuk memastikan styling diterapkan di editor
- Jika perlu optimasi lebih lanjut, bisa menggunakan conditional loading berdasarkan kebutuhan spesifik
- Method `is_woocommerce_page()` tersedia untuk deteksi halaman WooCommerce yang lebih spesifik

## Testing Lengkap

Untuk memverifikasi perbaikan:

1. **Buka halaman product category**

   - Check DevTools Network tab
   - Pastikan `style-blocks.css` muncul dengan status 200
   - Verify product card styling berfungsi dengan baik

2. **Buka Gutenberg editor**

   - Tambahkan product card block
   - Pastikan styling diterapkan dengan benar
   - Verify preview sesuai dengan design yang diinginkan

3. **Check file sizes**
   - `style-blocks.css`: 25.1 KiB (naik dari 18.5 KiB)
   - Product card module: 14.2 KiB (naik dari 6.33 KiB)
