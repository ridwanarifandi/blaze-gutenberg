# Frontend JavaScript Architecture

## Overview

This document describes the frontend JavaScript architecture for the Blaze Gutenberg plugin, specifically how product card functionality is organized and implemented.

## Problem Solved

Previously, JavaScript code for product card functionality was embedded inline within each product card template (`templates/partials/product-card.php`). This approach had several issues:

1. **Performance**: JavaScript code was duplicated for every product card on the page
2. **Maintainability**: Code was scattered across template files
3. **Caching**: Inline scripts cannot be cached by browsers
4. **Code Organization**: JavaScript logic mixed with PHP template code

## Solution

The JavaScript code has been moved to a centralized frontend module system:

### File Structure

```
src/frontend/
├── index.js           # Frontend entry point
└── product-card.js    # Product card functionality
```

### Build Process

The frontend JavaScript is built using webpack and outputs to:
- `assets/js/frontend.js` - Compiled JavaScript
- `assets/js/frontend.asset.php` - Asset dependencies and version

### Implementation Details

#### 1. Product Card Class (`src/frontend/product-card.js`)

```javascript
class BlazeProductCard {
    // Handles all product card functionality
    // - Image hover effects
    // - Add to cart interactions
    // - Enquire functionality
}
```

#### 2. Automatic Initialization

The script automatically:
- Waits for DOM ready
- Finds all `.blaze-product-card` elements
- Initializes functionality for each card
- Provides global access for dynamic content

#### 3. Asset Management

The `AssetsManager` class properly enqueues the frontend script:
- Uses webpack-generated asset file for dependencies
- Ensures proper loading order with Swiper.js
- Includes version hashing for cache busting

## Benefits

1. **Performance**: Single JavaScript file loaded once per page
2. **Maintainability**: Centralized code in dedicated files
3. **Caching**: Browser can cache the JavaScript file
4. **Scalability**: Easy to add new frontend functionality
5. **Code Quality**: Proper separation of concerns

## Usage

### For Template Files

Product card templates no longer need inline JavaScript. The functionality is automatically applied to any element with the `.blaze-product-card` class.

### For Dynamic Content

If you're loading product cards dynamically (via AJAX), you can reinitialize the functionality:

```javascript
// After loading new content
window.BlazeProductCard.reinitialize();
```

## Development

### Building Assets

```bash
# Development build with watching
npm run dev

# Production build
npm run build
```

### Adding New Frontend Functionality

1. Create new module in `src/frontend/`
2. Import in `src/frontend/index.js`
3. Build assets
4. Enqueue in `AssetsManager` if needed

## Files Modified

- `src/frontend/product-card.js` - New product card functionality
- `src/frontend/index.js` - New frontend entry point
- `webpack.config.js` - Added frontend build target
- `includes/AssetsManager.php` - Enabled frontend script enqueuing
- `templates/partials/product-card.php` - Removed inline JavaScript

## Testing

After implementing these changes:

1. Verify product cards still function correctly
2. Check browser developer tools for JavaScript errors
3. Confirm only one frontend.js file is loaded per page
4. Test image hover effects and button interactions
