# Cart Cross-Sells Products Block

Block Cart Cross-Sells Products adalah Gutenberg block khusus yang menampilkan produk cross-sell dari WooCommerce cart menggunakan template product-card yang sudah ada. Block ini sangat berguna untuk meningkatkan penjualan dengan menampilkan produk terkait yang direkomendasikan berdasarkan item yang ada di cart.

## Fitur

### Integrasi WooCommerce
- **Otomatis mengambil cross-sell products** dari item yang ada di cart
- **Dynamic content** - produk berubah sesuai dengan isi cart
- **Menggunakan WooCommerce cross-sell settings** yang sudah dikonfigurasi di admin
- **Responsive** - menyesuaikan dengan berbagai ukuran layar

### Layout & Display Options
- **Responsive Grid Layout**: Konfigurasi kolom untuk desktop (1-6), tablet (1-4), dan mobile (1-2)
- **Product Limit**: Batasi jumlah produk yang ditampilkan (1-12)
- **Title Settings**: Opsi untuk menampilkan/menyembunyikan judul section dengan teks yang dapat dikustomisasi
- **Product Card Integration**: Menggunakan template product-card yang konsisten dengan block lainnya

### Product Display Features
- **Badges**: Tampilkan badge "SALE" dan "NEW" pada produk
- **Rating & Reviews**: Tampilkan rating bintang dan jumlah review
- **Color Swatches**: Tampilkan swatch warna untuk variasi produk
- **Add to Cart Button**: Tombol add to cart yang terintegrasi dengan WooCommerce
- **Enquire Button**: Tombol enquiry untuk produk yang memerlukan inquiry

### Styling Options
- **Primary Background Color**: Warna background untuk tombol dan elemen utama
- **Primary Font Color**: Warna teks untuk elemen utama
- **Price Color**: Warna khusus untuk harga produk
- **Alignment Support**: Mendukung wide dan full width alignment

## Penggunaan

### Di Editor Gutenberg
1. Tambahkan block "Cart Cross-Sells Products" dari kategori "Blaze Commerce"
2. Konfigurasikan layout settings (kolom untuk berbagai device)
3. Atur display options sesuai kebutuhan
4. Sesuaikan warna dan styling
5. Publish atau update halaman

### Template PHP
```php
// Render cart cross-sells block programmatically
echo do_blocks('<!-- wp:blaze/cart-cross-sells {
    "columnsDesktop": 4,
    "columnsTablet": 3,
    "columnsMobile": 1,
    "limit": 4,
    "showTitle": true,
    "title": "You may also like",
    "primaryBackgroundColor": "#1e3a8a"
} /-->');
```

## Konfigurasi Block

### Layout Settings
- **Columns (Desktop)**: 1-6 kolom untuk desktop (default: 4)
- **Columns (Tablet)**: 1-4 kolom untuk tablet (default: 3)  
- **Columns (Mobile)**: 1-2 kolom untuk mobile (default: 1)
- **Products Limit**: Maksimal produk yang ditampilkan (default: 4)

### Title Settings
- **Show Title**: Toggle untuk menampilkan judul section
- **Title Text**: Teks judul yang dapat dikustomisasi (default: "You may also like")

### Product Display Settings
- **Show Badges**: Tampilkan badge sale dan new
- **Show Rating**: Tampilkan rating dan review count
- **Show Color Swatches**: Tampilkan color swatches untuk variasi
- **Show Add to Cart**: Tampilkan tombol add to cart
- **Show Enquire Button**: Tampilkan tombol enquiry

### Color Settings
- **Primary Background Color**: Warna background utama (default: #1e3a8a)
- **Primary Font Color**: Warna font utama (default: #ffffff)
- **Price Color**: Warna harga (default: #1e3a8a)

## Cara Kerja Cross-Sells

### WooCommerce Integration
Block ini bekerja dengan mengambil cross-sell products yang sudah dikonfigurasi di WooCommerce:

1. **Mengambil item dari cart** - Block membaca semua item yang ada di WooCommerce cart
2. **Mengumpulkan cross-sell IDs** - Dari setiap produk di cart, mengambil cross-sell product IDs
3. **Menghilangkan duplikasi** - Menggabungkan dan menghilangkan duplikasi cross-sell IDs
4. **Membatasi jumlah** - Membatasi sesuai dengan setting limit
5. **Menampilkan produk** - Menggunakan template product-card untuk menampilkan setiap produk

### Fallback Behavior
- **Cart kosong**: Jika cart kosong, block tidak menampilkan apa-apa
- **Tidak ada cross-sells**: Jika tidak ada cross-sell products, menampilkan pesan "No cross-sell products found"
- **WooCommerce tidak aktif**: Menampilkan pesan error yang informatif

## Use Cases

### 1. Cart Page
Tempatkan block ini di cart page untuk menampilkan produk terkait:
```php
// Di template cart/cart.php atau melalui Gutenberg editor
echo do_blocks('<!-- wp:blaze/cart-cross-sells /-->');
```

### 2. Checkout Page
Gunakan di checkout page untuk last-minute upselling:
```php
// Di template checkout/form-checkout.php
echo do_blocks('<!-- wp:blaze/cart-cross-sells {
    "columnsDesktop": 3,
    "limit": 3,
    "title": "Complete your purchase"
} /-->');
```

### 3. Custom Landing Pages
Integrasikan dengan landing pages yang memiliki cart functionality.

## Technical Details

### File Structure
```
src/blocks/cart-cross-sells/
├── index.js          # Block registration
├── edit.js           # Editor component
├── save.js           # Save component (server-side rendering)
└── style.scss        # Frontend & editor styles

templates/blocks/
└── cart-cross-sells.php  # Server-side template

includes/
└── BlocksManager.php     # Render callback implementation
```

### Dependencies
- **WooCommerce**: Required untuk cart dan cross-sell functionality
- **Product Card Template**: Menggunakan template product-card yang sudah ada
- **Helper Functions**: blaze_is_product_new, blaze_get_product_hover_image, blaze_get_product_color_attributes

### CSS Custom Properties
```css
.blaze-cart-cross-sells-block {
    --primary-bg-color: #1e3a8a;
    --primary-font-color: #ffffff;
    --price-color: #1e3a8a;
    --columns-desktop: 4;
    --columns-tablet: 3;
    --columns-mobile: 1;
}
```

## Best Practices

### 1. Konfigurasi Cross-Sells di WooCommerce
Pastikan cross-sell products sudah dikonfigurasi dengan benar di WooCommerce admin untuk setiap produk.

### 2. Responsive Design
Gunakan konfigurasi kolom yang sesuai untuk setiap device:
- Desktop: 3-4 kolom optimal
- Tablet: 2-3 kolom
- Mobile: 1-2 kolom maksimal

### 3. Performance
Batasi jumlah produk (limit) untuk menjaga performa halaman, terutama di mobile.

### 4. Styling Consistency
Gunakan warna yang konsisten dengan theme dan brand untuk menjaga konsistensi visual.

## Troubleshooting

### Block tidak muncul
- Pastikan WooCommerce aktif
- Pastikan ada item di cart
- Pastikan produk di cart memiliki cross-sell products yang dikonfigurasi

### Styling tidak sesuai
- Periksa CSS custom properties
- Pastikan theme tidak override styling block
- Gunakan browser developer tools untuk debug

### Performance issues
- Kurangi limit produk
- Optimalkan gambar produk
- Gunakan caching jika diperlukan

Block ini memberikan cara yang mudah dan fleksibel untuk menampilkan cross-sell products dari WooCommerce cart dengan styling yang konsisten dan responsive! 🛒✨
