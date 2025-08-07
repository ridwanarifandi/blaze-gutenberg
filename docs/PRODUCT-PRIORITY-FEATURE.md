# Product Priority Feature

Fitur ini menambahkan kemampuan untuk melakukan sorting produk secara manual menggunakan nilai priority yang dapat diatur oleh user.

## Fitur yang Ditambahkan

### 1. Priority menggunakan Menu Order

- Menggunakan kolom `menu_order` di table `wp_posts`
- Default value: `0`
- Type: Integer (minimum 0)

### 2. Field Priority di Product Editor

- Lokasi: WooCommerce Product Data > General tab
- Label: "Priority"
- Description: "Set product priority for manual sorting. Higher numbers appear first. Default is 0."
- Type: Number input dengan step 1, minimum 0

### 3. Kolom Priority di Product Management

- Kolom baru "Priority" di halaman daftar produk WooCommerce admin
- Posisi: Setelah kolom "Name"
- Sortable: Ya, dapat diklik untuk sorting
- Menampilkan nilai priority atau 0 jika belum diset
- Styling: Lebar maksimal 70px, center-aligned, responsive

### 4. Sort by Priority di Product Slideshow

- Opsi baru "Priority" di dropdown "Order By"
- Logic: Sorting berdasarkan kolom `menu_order`
- Default order: DESC (priority tinggi muncul duluan)

## Cara Testing

### 1. Testing Field Priority di Product Editor

1. Buka WordPress Admin > Products > Edit Product
2. Scroll ke Product Data metabox
3. Klik tab "General"
4. Cari field "Priority" di bagian bawah
5. Masukkan nilai (contoh: 10, 5, 1)
6. Save product

### 2. Testing Kolom Priority di Product Management

1. Buka WordPress Admin > Products
2. Lihat kolom "Priority" setelah kolom "Name"
3. Klik header "Priority" untuk sorting
4. Verifikasi produk tersortir berdasarkan priority

### 3. Testing Sort by Priority di Product Slideshow

1. Buka Gutenberg editor
2. Tambahkan block "WooCommerce Product Slideshow"
3. Di sidebar settings, cari "Product Query Settings"
4. Pada dropdown "Order By", pilih "Priority"
5. Set "Order" ke "DESC" untuk priority tinggi duluan
6. Preview/publish untuk melihat hasil

## File yang Dimodifikasi

### 1. `blaze-gutenberg.php`

- Menambahkan include untuk `includes/ProductPriority.php`

### 2. `includes/ProductPriority.php` (File Baru)

- Class untuk mengelola semua functionality priority
- Hooks untuk product editor, admin columns, dan sorting
- Admin styling untuk kolom priority (max-width: 70px)

### 3. `src/blocks/product-slideshow/edit.js`

- Menambahkan opsi "Priority" ke `orderByOptions`

### 4. `includes/BlocksManager.php`

- Menambahkan logic untuk handling priority sorting di `get_products()` method

## Struktur Database

Priority disimpan di kolom `menu_order` table `wp_posts`:

- Kolom: `menu_order`
- Type: Integer (0 atau lebih)
- Default: 0 untuk produk baru
- Keuntungan: Tidak ada masalah NULL values, lebih efisien untuk sorting

## Catatan Implementasi

1. **Backward Compatibility**: Produk yang sudah ada akan memiliki priority 0 secara default
2. **Validation**: Input priority hanya menerima angka >= 0
3. **Sorting Logic**: Priority tinggi (angka besar) muncul duluan saat order DESC
4. **Performance**: Menggunakan kolom `menu_order` yang sudah diindex oleh WordPress
5. **No NULL Issues**: Kolom `menu_order` selalu memiliki nilai, default 0
6. **Complete Results**: Semua produk selalu ditampilkan dalam sorting

## Troubleshooting

### Jika field priority tidak muncul di product editor:

1. Pastikan WooCommerce aktif
2. Clear cache jika menggunakan caching plugin
3. Cek error log WordPress

### Jika kolom priority tidak muncul di admin:

1. Refresh halaman products
2. Cek Screen Options untuk memastikan kolom tidak disembunyikan

### Jika sorting priority tidak bekerja di slideshow:

1. Pastikan ada produk dengan priority > 0
2. Cek order setting (DESC untuk priority tinggi duluan)
3. Clear cache dan refresh halaman

### Jika produk dengan priority 0 tidak muncul saat sorting:

1. **Masalah sudah diperbaiki**: Implementasi sekarang menggunakan kolom `menu_order` yang tidak memiliki masalah NULL
2. **Verifikasi**: Semua produk harus muncul, termasuk yang belum pernah di-set priority
3. **Testing**: Coba sorting ASC dan DESC untuk memastikan produk priority 0 muncul di posisi yang benar
4. **Keuntungan menu_order**: Tidak ada masalah dengan meta field yang tidak exist
