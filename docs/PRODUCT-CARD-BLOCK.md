# Product Card Block

The Product Card Block adalah Gutenberg block khusus yang memungkinkan Anda menampilkan kartu produk WooCommerce individual dengan styling yang dapat dikustomisasi. Block ini sangat cocok untuk digunakan di berbagai loop produk seperti:

- Loop product di category page
- Loop product di recently viewed products  
- Loop product di you may also like
- Landing pages
- Custom product showcases

## Fitur

### Konfigurasi Produk
- **Product Selection**: Pilih produk spesifik dari dropdown yang berisi semua produk WooCommerce
- **Dynamic Product Data**: Otomatis mengambil data produk terbaru dari WooCommerce

### Opsi Display
- **Show Badges**: Toggle untuk menampilkan/menyembunyikan badge SALE dan NEW
- **Show Rating**: Toggle untuk menampilkan/menyembunyikan rating dan review count
- **Show Color Swatches**: Toggle untuk menampilkan/menyembunyikan color variation swatches
- **Show Add to Cart Button**: Toggle untuk menampilkan/menyembunyikan tombol add to cart
- **Show Enquire Button**: Toggle untuk menampilkan/menyembunyikan tombol enquire

### Kustomisasi Warna
- **Primary Background Color**: Warna background utama untuk tombol dan elemen aktif
- **Primary Font Color**: Warna font untuk tombol dan elemen dengan background primary
- **Price Color**: Warna khusus untuk harga produk

### Alignment Support
- **Wide Alignment**: Dukungan untuk alignment wide
- **Full Alignment**: Dukungan untuk alignment full width
- **Spacing Controls**: Margin dan padding dapat dikustomisasi

## Cara Penggunaan

### 1. Menambahkan Block
1. Buka Gutenberg editor
2. Klik tombol "+" untuk menambah block
3. Cari "WooCommerce Product Card" atau "Product Card"
4. Klik untuk menambahkan block

### 2. Konfigurasi Block
1. **Pilih Produk**: Di sidebar, pilih produk dari dropdown "Select Product"
2. **Atur Display Options**: Toggle on/off fitur yang ingin ditampilkan
3. **Kustomisasi Warna**: Sesuaikan warna sesuai brand Anda

### 3. Preview dan Publish
- Preview akan muncul di editor setelah produk dipilih
- Klik "Update" atau "Publish" untuk menyimpan

## Template Integration

Block ini menggunakan template system yang fleksibel:

### Template Files
- `templates/blocks/product-card.php` - Template utama untuk block
- `templates/partials/product-card.php` - Template partial yang dapat digunakan di tempat lain

### Template Variables
Template menerima variabel berikut:
```php
$product_data = [
    'id' => $product->get_id(),
    'title' => $product->get_name(),
    'permalink' => $product->get_permalink(),
    'price' => $product->get_price_html(),
    'on_sale' => $product->is_on_sale(),
    'is_new' => blaze_is_product_new($product),
    'rating' => $product->get_average_rating(),
    'review_count' => $product->get_review_count(),
    'image' => wp_get_attachment_image_url($product->get_image_id()),
    'hover_image' => blaze_get_product_hover_image($product),
    'attributes' => blaze_get_product_color_attributes($product),
    'add_to_cart_url' => $product->add_to_cart_url(),
    'add_to_cart_text' => $product->add_to_cart_text(),
];

$attributes = [
    'showBadges' => true,
    'showRating' => true,
    'showColorSwatches' => true,
    'showAddToCart' => true,
    'showEnquireButton' => true,
];
```

## Penggunaan Programmatic

### Menggunakan di Template PHP
```php
// Render product card block programmatically
$block_content = do_blocks('
<!-- wp:blaze/product-card {
    "productId": 123,
    "primaryBackgroundColor": "#1e3a8a",
    "showBadges": true,
    "showRating": true
} /-->
');
echo $block_content;
```

### Menggunakan Helper Function
```php
// Jika Anda ingin menggunakan template partial langsung
$product = wc_get_product(123);
$product_data = [
    'id' => $product->get_id(),
    'title' => $product->get_name(),
    // ... data lainnya
];

include get_template_directory() . '/path/to/product-card.php';
```

## Frontend JavaScript Integration

Block ini terintegrasi dengan JavaScript frontend yang ada:

### Features
- **Image Hover Effects**: Otomatis mengganti gambar saat hover
- **Add to Cart Functionality**: Terintegrasi dengan WooCommerce AJAX
- **Enquire Functionality**: Terintegrasi dengan sistem enquiry yang ada

### CSS Custom Properties
Block menggunakan CSS custom properties untuk styling:
```css
.blaze-product-card-block {
    --primary-bg-color: #1e3a8a;
    --primary-font-color: #ffffff;
    --price-color: #1e3a8a;
}
```

## Troubleshooting

### Block Tidak Muncul
- Pastikan WooCommerce plugin aktif
- Pastikan ada produk yang dipublish
- Clear cache jika menggunakan caching plugin

### Styling Tidak Sesuai
- Pastikan theme mendukung Gutenberg blocks
- Check apakah ada CSS conflicts
- Pastikan build assets sudah ter-generate dengan `npm run build`

### API Errors
- Pastikan REST API WordPress aktif
- Check permission callback di `register_rest_route`
- Pastikan user memiliki capability yang sesuai

## Development

### File Structure
```
src/blocks/product-card/
├── index.js          # Block registration
├── edit.js           # Editor component
├── save.js           # Save component (null untuk server-side rendering)
├── style.scss        # Frontend styles
├── editor.scss       # Editor-only styles
└── block.json        # Block metadata
```

### Helper Functions
Block menggunakan helper functions yang ada:
- `blaze_is_product_new()` - Check if product is new
- `blaze_get_product_hover_image()` - Get hover image
- `blaze_get_product_color_attributes()` - Get color swatches

### Extending the Block
Untuk menambah fitur baru:
1. Update `attributes` di `block.json` dan `index.js`
2. Tambah control di `edit.js`
3. Update template di `templates/blocks/product-card.php`
4. Update `ProductCard.js` component jika diperlukan
