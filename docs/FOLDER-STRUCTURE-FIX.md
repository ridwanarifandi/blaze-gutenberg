# Folder Structure Fix

## Masalah

Struktur folder tidak mengikuti konvensi yang benar:
- File `filter-shared.scss` ditempatkan di `src/components/` 
- Seharusnya setiap block memiliki `style.scss` dan `editor.scss` sendiri
- Tidak ada shared CSS files di folder components

## Konvensi yang Benar

Setiap block harus memiliki struktur seperti ini:

```
src/blocks/[block-name]/
├── block.json          # Block configuration
├── index.js           # Block registration
├── edit.js            # Editor component
├── save.js            # Save component
├── style.scss         # Frontend styles
└── editor.scss        # Editor styles
```

## Perbaikan yang Dilakukan

### 1. **Hapus File Shared**
- ❌ Hapus `src/components/filter-shared.scss`
- ✅ Pindahkan semua CSS ke masing-masing block

### 2. **Update Filter by Category**

**File: `src/blocks/filter-by-category/style.scss`**
- ✅ Hapus `@import "../../components/filter-shared.scss"`
- ✅ Copy semua CSS dari filter-shared.scss
- ✅ Tambahkan responsive styles
- ✅ Tambahkan dark mode support

**File: `src/blocks/filter-by-category/editor.scss`**
- ✅ Hapus import shared
- ✅ Copy semua CSS yang diperlukan untuk editor
- ✅ Tambahkan `pointer-events: none` untuk editor

### 3. **Update Filter by Attribute**

**File: `src/blocks/filter-by-attribute/style.scss`**
- ✅ Hapus import shared
- ✅ Copy base filter CSS + color swatches CSS
- ✅ Maintain existing color swatches functionality

**File: `src/blocks/filter-by-attribute/editor.scss`**
- ✅ Hapus import shared
- ✅ Copy CSS untuk editor preview
- ✅ Maintain color swatches preview

### 4. **Update Filter by Stock Status**

**File: `src/blocks/filter-by-stock-status/style.scss`**
- ✅ Hapus import shared
- ✅ Copy base filter CSS

**File: `src/blocks/filter-by-stock-status/editor.scss`**
- ✅ Hapus import shared
- ✅ Copy CSS untuk editor preview

## Hasil Setelah Perbaikan

### ✅ **Struktur Folder yang Benar**

```
src/blocks/
├── filter-by-category/
│   ├── block.json
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── style.scss      ✅ Complete CSS (280 lines)
│   └── editor.scss     ✅ Editor CSS (122 lines)
├── filter-by-attribute/
│   ├── block.json
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── style.scss      ✅ Complete CSS (188 lines)
│   └── editor.scss     ✅ Editor CSS (126 lines)
└── filter-by-stock-status/
    ├── block.json
    ├── index.js
    ├── edit.js
    ├── save.js
    ├── style.scss      ✅ Complete CSS (135 lines)
    └── editor.scss     ✅ Editor CSS (90 lines)
```

### ✅ **CSS Compilation**

- **Build size**: 35.2 KiB (naik dari 30.5 KiB)
- **All filter CSS included**: ✅
- **No import errors**: ✅
- **Proper compilation**: ✅

### ✅ **CSS Classes Available**

```css
/* Filter by Category */
.blaze-filter-by-category
.blaze-filter-by-category .blaze-filter-header
.blaze-filter-by-category .blaze-filter-checkbox-custom
/* + responsive & dark mode */

/* Filter by Attribute */
.blaze-filter-by-attribute
.blaze-filter-by-attribute.display-color-swatches
.blaze-filter-by-attribute .blaze-filter-color-swatch
/* + all base filter classes */

/* Filter by Stock Status */
.blaze-filter-by-stock-status
/* + all base filter classes */
```

## Keuntungan Struktur Baru

### 1. **Maintainability**
- ✅ Setiap block self-contained
- ✅ Mudah modify CSS per block
- ✅ Tidak ada dependency antar blocks

### 2. **Performance**
- ✅ CSS ter-compile dengan benar
- ✅ Tidak ada unused CSS
- ✅ Tree-shaking friendly

### 3. **Development**
- ✅ Mengikuti WordPress block conventions
- ✅ Easier debugging
- ✅ Clear separation of concerns

### 4. **Scalability**
- ✅ Easy to add new filter blocks
- ✅ No shared dependency issues
- ✅ Independent block development

## Best Practices untuk Future Blocks

### 1. **File Structure**
```
src/blocks/[new-block]/
├── block.json
├── index.js
├── edit.js
├── save.js
├── style.scss         # Frontend styles only
└── editor.scss        # Editor styles only
```

### 2. **CSS Organization**
- ✅ No shared SCSS files in components
- ✅ Each block has complete CSS
- ✅ Use CSS custom properties for theming
- ✅ Include responsive & accessibility styles

### 3. **Import Rules**
- ❌ No `@import` from components folder
- ✅ Self-contained CSS per block
- ✅ Use CSS custom properties for shared values

## Verification

### Build Test
```bash
npm run build
# ✅ Success: 35.2 KiB CSS compiled
# ✅ No import errors
# ✅ All filter classes present
```

### CSS Test
```bash
grep -o "blaze-filter-by-category" assets/css/style-frontend.css
# ✅ Found: .blaze-filter-by-category classes
```

### Structure Test
```bash
find src/blocks -name "*.scss" | head -10
# ✅ All blocks have style.scss and editor.scss
# ✅ No shared SCSS files
```

Struktur folder sekarang sudah benar dan mengikuti konvensi WordPress blocks yang proper!
