# Category Priority Feature

Fitur ini menambahkan kemampuan untuk melakukan sorting kategori produk secara manual menggunakan nilai priority yang dapat diatur oleh user.

## Fitur yang Ditambahkan

### 1. Priority menggunakan Term Meta (Final Implementation)

- Menggunakan `term_meta` dengan meta_key `_blaze_category_priority`
- Memanfaatkan WordPress built-in `orderby => 'meta_value_num'`
- Default value: `0`
- Type: Integer (minimum 0)
- Migration: Auto-set priority 0 untuk kategori lama saat plugin activation

### 2. Field Priority di Category Editor

- Lokasi: WooCommerce Product Categories > Add/Edit Category
- Label: "Priority"
- Description: "Set category priority for manual sorting. Higher numbers appear first. Default is 0."
- Type: Number input dengan step 1, minimum 0

### 3. Kolom Priority di Category Management

- Kolom baru "Priority" di halaman daftar kategori WooCommerce admin
- Posisi: Setelah kolom "Name"
- Sortable: Ya, dapat diklik untuk sorting
- Menampilkan nilai priority atau 0 jika belum diset
- Styling: Lebar maksimal 70px, center-aligned, responsive

### 4. Sort by Priority di Category Grid Block

- Opsi baru "Priority" di dropdown "Order By"
- Logic: Menggunakan WordPress built-in `orderby => 'meta_value_num'`
- Default order: DESC (priority tinggi muncul duluan)

### 5. Plugin Activation Migration

- **Auto Migration**: Saat plugin diaktifkan, otomatis set priority 0 untuk kategori lama
- **Batch Processing**: Proses 20 kategori per batch untuk menghindari timeout
- **WC Logger**: Menggunakan WooCommerce logger untuk tracking progress
- **Version Control**: Hanya jalankan migration sekali per version
- **Non-destructive**: Tidak mengubah priority yang sudah ada

## Cara Testing

### 1. Testing Field Priority di Category Editor

1. Buka WordPress Admin > Products > Categories
2. Klik "Add New Category" atau edit kategori yang sudah ada
3. Cari field "Priority" di form
4. Masukkan nilai (contoh: 10, 5, 1)
5. Save category

### 2. Testing Kolom Priority di Category Management

1. Buka WordPress Admin > Products > Categories
2. Lihat kolom "Priority" setelah kolom "Name"
3. Klik header "Priority" untuk sorting
4. Verifikasi kategori tersortir berdasarkan priority

### 3. Testing Sort by Priority di Category Grid

1. Buka Gutenberg editor
2. Tambahkan block "WooCommerce Category Grid"
3. Di sidebar settings, cari "Sorting & Display"
4. Pada dropdown "Order By", pilih "Priority"
5. Set "Order" ke "DESC" untuk priority tinggi duluan
6. Preview/publish untuk melihat hasil

### 4. Testing Plugin Activation Migration

1. **Deactivate Plugin**: Deactivate plugin jika sudah aktif
2. **Create Test Categories**: Buat beberapa kategori baru (tanpa priority)
3. **Activate Plugin**: Activate plugin kembali
4. **Check WC Logs**: Buka WooCommerce > Status > Logs > pilih log "blaze-category-priority"
5. **Verify Migration**: Cek apakah kategori lama sudah punya priority 0
6. **Test Sorting**: Test sorting di admin dan category grid

## File yang Dimodifikasi

### 1. `blaze-gutenberg.php`

- Menambahkan include untuk `includes/CategoryPriority.php`

### 2. `includes/CategoryPriority.php` (File Baru)

- Class untuk mengelola semua functionality priority kategori
- Hooks untuk category editor, admin columns, dan sorting
- Admin styling untuk kolom priority (max-width: 70px)

### 3. `src/blocks/category-grid/edit.js`

- Menambahkan opsi "Priority" ke `orderByOptions`
- Menambahkan case "priority" di client-side sorting

### 4. `includes/BlocksManager.php`

- Menambahkan logic untuk handling priority sorting di `get_categories()` method
- Menambahkan method `modify_categories_query_for_priority()`
- Menambahkan priority field ke API response

## Struktur Database

Priority disimpan sebagai term meta:

- Meta key: `_blaze_category_priority`
- Meta value: Integer (0 atau lebih)
- Default: 0 untuk kategori baru
- Storage: `wp_termmeta` table
- WordPress built-in: Menggunakan `orderby => 'meta_value_num'`

## Catatan Implementasi

1. **Backward Compatibility**: Kategori yang sudah ada akan memiliki priority 0 secara default
2. **Validation**: Input priority hanya menerima angka >= 0
3. **Sorting Logic**: Priority tinggi (angka besar) muncul duluan saat order DESC
4. **Performance**: Menggunakan WordPress built-in `orderby => 'meta_value_num'`
5. **Migration**: Auto-migration untuk kategori lama saat plugin activation
6. **Complete Results**: Semua kategori selalu ditampilkan dalam sorting
7. **WC Logger**: Comprehensive logging untuk debugging dan monitoring

## Troubleshooting

### Jika field priority tidak muncul di category editor:

1. Pastikan WooCommerce aktif
2. Clear cache jika menggunakan caching plugin
3. Cek error log WordPress

### Jika kolom priority tidak muncul di admin:

1. Refresh halaman categories
2. Cek Screen Options untuk memastikan kolom tidak disembunyikan

### Jika sorting priority tidak bekerja di category grid:

1. Pastikan ada kategori dengan priority > 0
2. Cek order setting (DESC untuk priority tinggi duluan)
3. Clear cache dan refresh halaman

### Jika kategori dengan priority 0 tidak muncul saat sorting:

1. **Implementasi menggunakan term_order**: Semua kategori harus muncul
2. **Verifikasi**: Semua kategori harus muncul, termasuk yang belum pernah di-set priority
3. **Testing**: Coba sorting ASC dan DESC untuk memastikan kategori priority 0 muncul di posisi yang benar
4. **Keuntungan term_order**: Tidak ada masalah dengan field yang tidak exist

## Perbedaan dengan Product Priority

- **Product Priority**: Menggunakan kolom `menu_order` di table `wp_posts`
- **Category Priority**: Menggunakan `term_meta` di table `wp_termmeta`
- **Alasan**: Kategori adalah taxonomy terms, bukan posts, sehingga menggunakan struktur database yang berbeda
