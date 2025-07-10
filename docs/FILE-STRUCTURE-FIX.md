# File Structure Fix - CSS dan JS Separation

## Masalah yang Ditemukan

User menunjukkan bahwa ada file CSS di dalam folder JS:

```
assets/js/
├── blocks.js
├── editor.js
├── frontend.js
├── style-blocks.css     ❌ CSS file di folder JS
├── editor.css           ❌ CSS file di folder JS
└── blocks.css           ❌ CSS file di folder JS
```

## Penyebab Masalah

Masalah ada di konfigurasi webpack di `webpack.config.js`:

### Sebelum:

```javascript
module.exports = {
	...defaultConfig,
	entry: {
		blocks: "./src/blocks/index.js",
		editor: "./src/editor.js",
		frontend: "./src/frontend/index.js",
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, "assets/js"), // ❌ Semua output ke assets/js
	},
};
```

### Sesudah:

```javascript
module.exports = {
	...defaultConfig,
	entry: {
		blocks: "./src/blocks/index.js",
		editor: "./src/editor.js",
		frontend: "./src/frontend/index.js",
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, "assets"), // ✅ Output ke assets/
		filename: "js/[name].js", // ✅ JS files ke js/ subfolder
	},
};
```

## Perbaikan yang Diterapkan

### 1. **Webpack Configuration**

- Ubah output path dari `assets/js` ke `assets`
- Tambah `filename: "js/[name].js"` untuk menempatkan JS files di subfolder `js/`
- CSS files akan otomatis ditempatkan di root `assets/`

### 2. **AssetsManager.php - Path Updates**

#### Frontend Styles:

```php
// Sebelum
BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/style-blocks.css'

// Sesudah
BLAZE_GUTENBERG_PLUGIN_URL . 'assets/style-blocks.css'
```

#### Editor Styles:

```php
// Sebelum
BLAZE_GUTENBERG_PLUGIN_URL . 'assets/css/editor.css'

// Sesudah
BLAZE_GUTENBERG_PLUGIN_URL . 'assets/editor.css'
```

#### JS Files (tetap sama):

```php
// JS files tetap di assets/js/
BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/blocks.js'
BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/frontend.js'
```

### 3. **Clean Up**

- Hapus file CSS yang salah tempat: `rm -f assets/js/*.css`
- Build ulang dengan konfigurasi yang benar

## Hasil Setelah Perbaikan

### ✅ **Struktur File yang Benar:**

```
assets/
├── css/
│   └── (tidak digunakan lagi)
├── js/
│   ├── blocks.js
│   ├── blocks.asset.php
│   ├── editor.js
│   ├── editor.asset.php
│   ├── frontend.js
│   └── frontend.asset.php
├── blocks.css              ✅ CSS files di root assets/
├── blocks-rtl.css
├── editor.css              ✅ CSS files di root assets/
├── editor-rtl.css
├── style-blocks.css        ✅ CSS files di root assets/
└── style-blocks-rtl.css
```

### ✅ **Build Output:**

```
assets by path js/ 46.4 KiB
  assets by path js/*.js 45.9 KiB 3 assets
  assets by path js/*.php 468 bytes
assets by path *.css 15.4 KiB
  assets by chunk 7.71 KiB (name: editor) 2 assets
  assets by chunk 7.71 KiB (name: blocks) 2 assets
assets by path ./*.css 49.3 KiB
  asset ./style-blocks-rtl.css 24.6 KiB
  asset ./style-blocks.css 24.6 KiB
```

### ✅ **File Loading:**

- **JS Files**: Dimuat dari `assets/js/`
- **CSS Files**: Dimuat dari `assets/`
- **Asset Files**: Tetap di `assets/js/` untuk dependency tracking

## File yang Dimodifikasi

1. **`webpack.config.js`** - Perbaikan output path dan filename
2. **`includes/AssetsManager.php`** - Update path CSS files
3. **Clean up** - Hapus file CSS yang salah tempat

## Testing

### ✅ **Verifikasi Struktur:**

```bash
find assets -name "*.css" | sort
# Output:
# assets/blocks-rtl.css
# assets/blocks.css
# assets/editor-rtl.css
# assets/editor.css
# assets/style-blocks-rtl.css
# assets/style-blocks.css

find assets -name "*.js" | sort
# Output:
# assets/js/blocks.js
# assets/js/editor.js
# assets/js/frontend.js
```

### ✅ **Build Results:**

- Build successful tanpa error
- CSS files: 49.3 KiB total
- JS files: 46.4 KiB total
- Struktur file sesuai standar WordPress

## Update Final: Struktur yang Benar

Setelah perbaikan terakhir, struktur file sekarang sudah benar:

### ✅ **Struktur File Final:**

```
assets/
├── css/                    ✅ Semua CSS files
│   ├── style-blocks.css
│   ├── style-blocks-rtl.css
│   ├── editor.css
│   ├── editor-rtl.css
│   ├── blocks.css
│   └── blocks-rtl.css
└── js/                     ✅ Semua JS files
    ├── blocks.js
    ├── blocks.asset.php
    ├── editor.js
    ├── editor.asset.php
    ├── frontend.js
    └── frontend.asset.php
```

### ✅ **Webpack Configuration Final:**

```javascript
module.exports = {
	...defaultConfig,
	output: {
		path: path.resolve(__dirname, "assets"),
		filename: "js/[name].js",
		assetModuleFilename: "js/[name][ext]",
	},
	plugins: [
		...defaultConfig.plugins.filter(
			(plugin) => !(plugin instanceof MiniCssExtractPlugin),
		),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
	],
};
```

### ✅ **AssetsManager.php Final:**

- CSS files: `assets/css/`
- JS files: `assets/js/`
- RTL support: Automatic dengan `wp_style_add_data()`

## Kesimpulan

Struktur file sekarang sudah benar dengan:

- ✅ **CSS files** di `assets/css/` (termasuk RTL)
- ✅ **JS files** di `assets/js/` (termasuk asset files)
- ✅ **Clean separation** - CSS dan JS terpisah dengan jelas
- ✅ **WordPress standards** - mengikuti konvensi WordPress plugin
- ✅ **RTL support** - Automatic RTL file handling

File structure sekarang clean dan mengikuti best practices! 🎉
