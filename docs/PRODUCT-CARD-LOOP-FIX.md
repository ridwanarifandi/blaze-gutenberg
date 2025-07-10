# Product Card Block - Loop Context Fix

## Masalah yang Ditemukan

User menunjukkan bahwa implementasi product card block salah karena:

1. **Manual Product Selection**: Block memiliki opsi untuk memilih produk secara manual
2. **Tidak Menggunakan Loop Context**: Block tidak menggunakan data dari loop WooCommerce yang sedang berjalan
3. **Tidak Dinamis**: Data produk tidak dinamis mengikuti loop

## Konsep yang Benar

Product card block seharusnya:
- **Menggunakan produk dari loop WooCommerce** yang sedang berjalan
- **Tidak memiliki product selection** - hanya styling options
- **Dinamis** - mengikuti context loop atau halaman produk
- **Reusable** - dapat digunakan di berbagai loop tanpa konfigurasi produk

## Perbaikan yang Diterapkan

### 1. **BlocksManager.php - render_product_card()**

#### Sebelum:
```php
// Menggunakan productId dari attributes
$product = wc_get_product($attributes['productId']);
```

#### Sesudah:
```php
// Menggunakan global $product dari loop WooCommerce
global $product, $post;

// Try to get product from current loop first
$current_product = $product;

// If no product in loop, try to get from current post
if (!$current_product && $post && $post->post_type === 'product') {
    $current_product = wc_get_product($post->ID);
}

// If still no product, try to get from query context
if (!$current_product && is_product()) {
    $current_product = wc_get_product(get_the_ID());
}
```

### 2. **block.json - Attributes**

#### Sebelum:
```json
{
    "productId": {
        "type": "number",
        "default": 0
    },
    // ... styling attributes
}
```

#### Sesudah:
```json
{
    // Hanya styling attributes, tidak ada productId
    "primaryBackgroundColor": {
        "type": "string",
        "default": "#1e3a8a"
    },
    // ... styling attributes lainnya
}
```

### 3. **edit.js - Editor Component**

#### Sebelum:
- Product selection dropdown
- API calls untuk fetch products
- Product selection state management

#### Sesudah:
- Dummy product untuk preview di editor
- Hanya styling controls
- Preview notice yang menjelaskan behavior block

```javascript
// Create a dummy product for preview in editor
const dummyProduct = {
    id: 1,
    name: __("Sample Product", "blaze-gutenberg"),
    // ... dummy data untuk preview
};
```

### 4. **Editor Preview Notice**

Menambahkan notice di editor yang menjelaskan:
```
"Preview: This block will display the current product from the loop or page context."
```

## Hasil Setelah Perbaikan

### ✅ **Behavior yang Benar**
1. **Loop Context**: Block menggunakan produk dari loop WooCommerce yang sedang berjalan
2. **Page Context**: Jika tidak ada loop, menggunakan produk dari halaman saat ini
3. **Fallback**: Memberikan pesan error yang jelas jika tidak ada produk

### ✅ **Editor Experience**
1. **Preview**: Menampilkan dummy product untuk preview styling
2. **Notice**: Menjelaskan bahwa block akan menggunakan produk dari context
3. **Styling Only**: Hanya menampilkan opsi styling, bukan product selection

### ✅ **Use Cases yang Didukung**

#### 1. **Product Loop (Category Page)**
```php
// WooCommerce loop
while (have_posts()) {
    the_post();
    global $product; // Product card akan menggunakan ini
    
    // Product card block akan otomatis menggunakan $product
    echo do_blocks('<!-- wp:blaze/product-card /-->');
}
```

#### 2. **Single Product Page**
```php
// Single product page
global $product; // Product card akan menggunakan ini
echo do_blocks('<!-- wp:blaze/product-card /-->');
```

#### 3. **Custom Loop**
```php
$products = wc_get_products(['limit' => 10]);
foreach ($products as $product) {
    global $product; // Set global product
    echo do_blocks('<!-- wp:blaze/product-card /-->');
}
```

## File yang Dimodifikasi

1. **`includes/BlocksManager.php`** - Logic render menggunakan loop context
2. **`src/blocks/product-card/block.json`** - Hapus productId attribute
3. **`src/blocks/product-card/edit.js`** - Hapus product selection, gunakan dummy preview
4. **`src/blocks/product-card/editor.scss`** - Tambah styling untuk preview notice

## Testing

### ✅ **Test Cases**
1. **Category Page Loop**: Block menggunakan produk dari loop
2. **Single Product Page**: Block menggunakan produk dari halaman
3. **Editor Preview**: Menampilkan dummy product dengan styling yang benar
4. **Error Handling**: Menampilkan pesan error jika tidak ada produk

### ✅ **Build Results**
- CSS file size: 24.5 KiB (sedikit turun dari 25.1 KiB)
- Product card module: 13.9 KiB (turun dari 14.2 KiB)
- Build successful tanpa error

## Kesimpulan

Product card block sekarang berfungsi dengan benar sebagai:
- **Loop-aware block** yang menggunakan produk dari context
- **Reusable component** yang dapat digunakan di berbagai loop
- **Styling-focused block** tanpa product selection
- **Dynamic block** yang mengikuti WooCommerce loop context

Block ini sekarang siap digunakan dalam berbagai skenario loop produk WooCommerce! 🎉
