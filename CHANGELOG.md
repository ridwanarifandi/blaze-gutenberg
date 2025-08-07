# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-08

### Added
- **Manual Product Priority Sorting**: Added priority field to WooCommerce product editor with default value 0
- **Product Priority Column**: Added sortable Priority column (max-width: 70px) to products admin list
- **Product Slideshow Priority Sorting**: Added "Priority" option to product slideshow block Order By dropdown
- **Category Priority System**: Added priority field to WooCommerce category editor with default value 0
- **Category Priority Column**: Added Priority column to categories admin list (non-sortable)
- **Category Grid Priority Sorting**: Added "Priority" option to category grid block Order By dropdown
- **Plugin Activation Migration**: Auto-migration system that sets priority 0 for existing categories when plugin is activated
- **WooCommerce Logger Integration**: Comprehensive logging for category priority migration using WC Logger
- **Batch Processing**: Migration processes 20 categories per batch to prevent timeouts
- **Fallback Mechanism**: Auto-set priority meta if missing when accessing category priority

### Technical Details
- **Product Priority**: Uses `menu_order` column in `wp_posts` table for optimal performance
- **Category Priority**: Uses `term_meta` with meta_key `_blaze_category_priority` for reliable storage
- **WordPress Built-in Sorting**: Leverages `orderby => 'menu_order'` for products and `orderby => 'meta_value_num'` for categories
- **Version Control**: Migration only runs once per version to prevent duplicate processing
- **Non-destructive Migration**: Preserves existing priority values during migration

### Changed
- Updated plugin version from 1.0.7 to 1.1.0
- Enhanced BlocksManager to support priority sorting for both products and categories
- Improved admin styling with responsive design for priority columns

### Fixed
- Resolved `WP_Term_Query::set()` method error by using proper WordPress filters
- Fixed NULL value handling in priority sorting queries
- Ensured all products and categories appear in sorting results regardless of priority value

## [1.0.7] - Previous Release

### Previous Features
- WooCommerce Gutenberg blocks integration
- Product slideshow block
- Category grid block
- Product card components
- Filter blocks system
- Cart cross-sells functionality
