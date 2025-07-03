# Installation Guide - Blaze Commerce Gutenberg Blocks

## Quick Installation

### 1. Download and Install
1. Download the plugin files
2. Upload to `/wp-content/plugins/blaze-gutenberg/`
3. Activate the plugin in WordPress admin

### 2. Verify Installation
1. Go to WordPress admin → Posts → Add New
2. Click the "+" button to add a block
3. Look for "Blaze Commerce" category
4. You should see "WooCommerce Product Slideshow" block

## Development Installation

### Prerequisites
- WordPress 5.0+
- WooCommerce 3.0+
- PHP 7.4+
- Node.js 14+
- Composer

### Setup Steps

1. **Clone/Download the plugin**
   ```bash
   cd /path/to/wordpress/wp-content/plugins/
   # Place the blaze-gutenberg folder here
   ```

2. **Install PHP dependencies**
   ```bash
   cd blaze-gutenberg
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

4. **Build assets**
   ```bash
   # For production
   npm run build
   
   # For development (with file watching)
   npm run dev
   ```

5. **Activate the plugin**
   - Go to WordPress admin → Plugins
   - Find "Blaze Commerce - Gutenberg"
   - Click "Activate"

## Using the Product Slideshow Block

### Adding the Block
1. Edit a page or post
2. Click "+" to add a block
3. Search for "Product Slideshow" or find it under "Blaze Commerce"
4. Click to add the block

### Configuring the Block

#### Slideshow Settings
- **Products per slide**: Configure for desktop (1-6), tablet (1-4), mobile (1-2)
- **Navigation**: Toggle arrows and dots
- **Autoplay**: Enable with custom delay

#### Product Selection
- **Category**: Filter by product category
- **Tag**: Filter by product tag
- **Order**: Sort by date, title, menu order, or random
- **Limit**: Maximum number of products to display

#### Styling
- **Primary Background Color**: Used for badges, buttons, navigation
- **Primary Font Color**: Text color for primary elements
- **Price Color**: Color for product prices

### Block Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Hover effects on product images
- ✅ Sale and New badges
- ✅ Color swatches for variable products
- ✅ Star ratings and review counts
- ✅ "Select Options" and "Enquire Now" buttons
- ✅ Smooth slideshow transitions
- ✅ Touch/swipe support on mobile

## Troubleshooting

### Block Not Appearing
1. Ensure WooCommerce is installed and active
2. Check if the plugin is activated
3. Clear any caching plugins
4. Check browser console for JavaScript errors

### Slideshow Not Working
1. Verify Swiper.js is loading (check browser network tab)
2. Check for JavaScript conflicts with other plugins
3. Ensure the block has products to display

### Styling Issues
1. Check if CSS files are loading
2. Verify theme compatibility
3. Check for CSS conflicts

### No Products Showing
1. Ensure you have published WooCommerce products
2. Check product visibility settings
3. Verify category/tag filters are correct

## Performance Optimization

### Recommended Settings
- Limit products to 12-20 per slideshow
- Use appropriate image sizes (WooCommerce thumbnails)
- Enable caching plugins
- Optimize images before upload

### Caching Considerations
- The block uses server-side rendering
- Product data is cached by WordPress
- Clear cache after product updates

## Support

For technical support:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Contact Blaze Commerce support with:
   - WordPress version
   - WooCommerce version
   - Active theme name
   - List of active plugins
   - Error messages (if any)

## Updates

The plugin will notify you of updates through the WordPress admin. Always:
1. Backup your site before updating
2. Test updates on staging environment first
3. Clear caches after updating
