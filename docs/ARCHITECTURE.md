# Architecture Documentation - Blaze Gutenberg Plugin

This document outlines the technical architecture, design patterns, and system structure of the Blaze Gutenberg plugin.

## System Overview

The Blaze Gutenberg plugin is built as a modular WordPress plugin that extends the Gutenberg editor with custom blocks for e-commerce functionality. It follows WordPress coding standards and modern JavaScript development practices.

### Core Principles

1. **Modularity**: Each block is self-contained with its own logic, styles, and dependencies
2. **Performance**: Efficient loading, caching, and minimal resource usage
3. **Maintainability**: Clean code, proper documentation, and consistent patterns
4. **Extensibility**: Plugin architecture allows easy addition of new blocks
5. **Security**: Proper sanitization, validation, and capability checks

## Architecture Layers

### 1. Presentation Layer (Frontend)
- **React Components**: Gutenberg block edit and save components
- **SCSS Styles**: Modular styling with BEM methodology
- **Template System**: PHP templates for complex block rendering

### 2. Business Logic Layer
- **Block Controllers**: PHP classes handling block registration and server-side logic
- **Data Services**: API integration and data transformation
- **Validation Layer**: Input sanitization and output escaping

### 3. Data Layer
- **WordPress Database**: Standard WordPress tables and custom tables if needed
- **External APIs**: WooCommerce and third-party service integration
- **Caching Layer**: WordPress transients and object cache

### 4. Infrastructure Layer
- **Asset Management**: Webpack build system and asset optimization
- **Dependency Management**: Composer for PHP, npm for JavaScript
- **Testing Framework**: PHPUnit for PHP, Jest for JavaScript

## Directory Structure Deep Dive

```
blaze-gutenberg/
├── assets/                     # Compiled assets (generated)
│   ├── css/
│   │   ├── blocks.css         # Compiled block styles
│   │   └── editor.css         # Editor-specific styles
│   ├── js/
│   │   ├── blocks.js          # Compiled block scripts
│   │   └── editor.js          # Editor-specific scripts
│   └── images/                # Optimized images
│
├── includes/                   # PHP backend logic
│   ├── class-plugin.php       # Main plugin orchestrator
│   ├── class-blocks.php       # Block registration manager
│   ├── class-assets.php       # Asset enqueuing and management
│   ├── class-cache.php        # Caching utilities and strategies
│   ├── class-api.php          # REST API endpoints
│   ├── class-security.php     # Security utilities
│   ├── blocks/                # Individual block PHP handlers
│   │   ├── class-base-block.php        # Abstract base block class
│   │   ├── class-product-grid.php      # Product grid block
│   │   └── class-featured-products.php # Featured products block
│   ├── services/              # Business logic services
│   │   ├── class-product-service.php   # Product data service
│   │   ├── class-cache-service.php     # Cache management service
│   │   └── class-validation-service.php # Input validation service
│   └── traits/                # Reusable PHP traits
│       ├── trait-cacheable.php        # Caching functionality
│       └── trait-validatable.php      # Validation functionality
│
├── src/                       # Source files (development)
│   ├── blocks/               # Gutenberg blocks
│   │   ├── index.js          # Main blocks entry point
│   │   ├── product-grid/     # Product grid block
│   │   │   ├── index.js      # Block registration
│   │   │   ├── edit.js       # Editor component
│   │   │   ├── save.js       # Save component
│   │   │   ├── style.scss    # Frontend styles
│   │   │   └── editor.scss   # Editor styles
│   │   └── featured-products/ # Featured products block
│   │       ├── index.js
│   │       ├── edit.js
│   │       ├── save.js
│   │       ├── style.scss
│   │       └── editor.scss
│   ├── components/           # Reusable React components
│   │   ├── ProductSelector.js # Product selection component
│   │   ├── ImageUploader.js   # Image upload component
│   │   └── SettingsPanel.js   # Common settings panel
│   ├── hooks/               # Custom React hooks
│   │   ├── useProducts.js    # Product data hook
│   │   └── useDebounce.js    # Debounce utility hook
│   ├── utils/               # JavaScript utilities
│   │   ├── api.js           # API communication utilities
│   │   ├── validation.js    # Client-side validation
│   │   └── helpers.js       # General helper functions
│   ├── styles/              # Global SCSS files
│   │   ├── _variables.scss   # SCSS variables
│   │   ├── _mixins.scss     # SCSS mixins
│   │   └── _base.scss       # Base styles
│   └── editor.js            # Editor entry point
│
├── templates/               # PHP template files
│   ├── blocks/             # Block-specific templates
│   │   ├── product-grid.php # Product grid template
│   │   └── featured-products.php # Featured products template
│   └── partials/           # Reusable template parts
│       ├── product-card.php # Product card partial
│       └── loading-spinner.php # Loading spinner partial
│
├── languages/              # Internationalization files
│   ├── blaze-gutenberg.pot # Translation template
│   └── blaze-gutenberg-*.po # Language-specific translations
│
└── tests/                  # Test files
    ├── php/               # PHP tests
    │   ├── bootstrap.php   # Test bootstrap
    │   ├── blocks/        # Block-specific tests
    │   └── services/      # Service tests
    └── js/                # JavaScript tests
        ├── setup.js       # Test setup
        ├── blocks/        # Block component tests
        └── utils/         # Utility function tests
```

## Design Patterns

### 1. Plugin Pattern (PHP)
```php
class Plugin {
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        $this->init_hooks();
    }
}
```

### 2. Factory Pattern (Block Registration)
```php
class BlockFactory {
    public static function create_block($block_type, $config) {
        switch ($block_type) {
            case 'product-grid':
                return new ProductGridBlock($config);
            case 'featured-products':
                return new FeaturedProductsBlock($config);
            default:
                throw new InvalidArgumentException("Unknown block type: $block_type");
        }
    }
}
```

### 3. Observer Pattern (Hooks)
```php
class BlockManager {
    public function __construct() {
        add_action('init', [$this, 'register_blocks']);
        add_action('enqueue_block_assets', [$this, 'enqueue_assets']);
    }
}
```

### 4. Strategy Pattern (Caching)
```php
interface CacheStrategy {
    public function get($key);
    public function set($key, $value, $expiration);
    public function delete($key);
}

class TransientCacheStrategy implements CacheStrategy {
    // Implementation
}

class ObjectCacheStrategy implements CacheStrategy {
    // Implementation
}
```

### 5. Decorator Pattern (Block Enhancement)
```php
class CacheableBlock extends BaseBlock {
    private $block;
    
    public function __construct(BaseBlock $block) {
        $this->block = $block;
    }
    
    public function render($attributes) {
        $cache_key = $this->generate_cache_key($attributes);
        $cached = get_transient($cache_key);
        
        if ($cached !== false) {
            return $cached;
        }
        
        $output = $this->block->render($attributes);
        set_transient($cache_key, $output, HOUR_IN_SECONDS);
        
        return $output;
    }
}
```

## Data Flow Architecture

### 1. Block Registration Flow
```
Plugin Init → Block Manager → Individual Blocks → WordPress Registry
```

### 2. Asset Loading Flow
```
WordPress Hook → Asset Manager → Webpack Manifest → Enqueue Assets
```

### 3. Block Rendering Flow
```
Gutenberg Request → PHP Block Handler → Template System → HTML Output
```

### 4. Data Fetching Flow
```
React Component → WordPress Data API → REST Endpoint → Database Query → Cache Layer
```

## Caching Architecture

### 1. Multi-Level Caching Strategy
```
Browser Cache → CDN Cache → WordPress Object Cache → Database Cache → Transient Cache
```

### 2. Cache Invalidation Strategy
```php
class CacheInvalidator {
    public function invalidate_product_cache($product_id) {
        // Invalidate specific product cache
        wp_cache_delete("product_{$product_id}", 'blaze_products');
        
        // Invalidate related block caches
        $this->invalidate_block_cache('product-grid');
        $this->invalidate_block_cache('featured-products');
    }
}
```

### 3. Cache Warming Strategy
```php
class CacheWarmer {
    public function warm_product_cache() {
        $products = $this->get_popular_products();
        foreach ($products as $product) {
            $this->cache_product_data($product->ID);
        }
    }
}
```

## Security Architecture

### 1. Input Sanitization Layer
```php
class InputSanitizer {
    public function sanitize_block_attributes($attributes) {
        return array_map([$this, 'sanitize_attribute'], $attributes);
    }
    
    private function sanitize_attribute($value) {
        if (is_string($value)) {
            return sanitize_text_field($value);
        }
        // Handle other types
    }
}
```

### 2. Output Escaping Layer
```php
class OutputEscaper {
    public function escape_for_html($value) {
        return esc_html($value);
    }
    
    public function escape_for_attribute($value) {
        return esc_attr($value);
    }
}
```

### 3. Capability Checking
```php
class CapabilityChecker {
    public function can_edit_blocks() {
        return current_user_can('edit_posts');
    }
    
    public function can_manage_products() {
        return current_user_can('manage_woocommerce');
    }
}
```

## Performance Architecture

### 1. Lazy Loading Strategy
```javascript
// Dynamic imports for heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### 2. Code Splitting
```javascript
// Webpack configuration for code splitting
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};
```

### 3. Asset Optimization
```php
class AssetOptimizer {
    public function optimize_images($image_path) {
        // Image compression and optimization
    }
    
    public function minify_css($css_content) {
        // CSS minification
    }
    
    public function minify_js($js_content) {
        // JavaScript minification
    }
}
```

## API Architecture

### 1. REST API Structure
```
/wp-json/blaze/v1/
├── products/              # Product endpoints
│   ├── featured          # GET featured products
│   ├── categories        # GET product categories
│   └── search           # POST product search
├── blocks/               # Block-specific endpoints
│   ├── product-grid     # GET product grid data
│   └── featured-products # GET featured products data
└── cache/               # Cache management endpoints
    ├── clear            # POST clear cache
    └── warm             # POST warm cache
```

### 2. API Response Format
```json
{
    "success": true,
    "data": {
        "products": [...],
        "pagination": {
            "total": 100,
            "pages": 10,
            "current": 1
        }
    },
    "cache": {
        "hit": true,
        "ttl": 3600
    }
}
```

## Error Handling Architecture

### 1. Error Hierarchy
```php
class BlazeGutenbergException extends Exception {}
class BlockRegistrationException extends BlazeGutenbergException {}
class AssetLoadingException extends BlazeGutenbergException {}
class CacheException extends BlazeGutenbergException {}
```

### 2. Error Logging Strategy
```php
class ErrorLogger {
    public function log_error($error, $context = []) {
        if (WP_DEBUG_LOG) {
            error_log(sprintf(
                '[Blaze Gutenberg] %s: %s | Context: %s',
                get_class($error),
                $error->getMessage(),
                json_encode($context)
            ));
        }
    }
}
```

## Testing Architecture

### 1. Test Pyramid
```
E2E Tests (Few)
    ↑
Integration Tests (Some)
    ↑
Unit Tests (Many)
```

### 2. Test Organization
```php
// PHP Test Structure
abstract class BaseBlockTest extends WP_UnitTestCase {
    protected function setUp(): void {
        parent::setUp();
        $this->setup_test_data();
    }
}

class ProductGridBlockTest extends BaseBlockTest {
    // Specific block tests
}
```

```javascript
// JavaScript Test Structure
describe('Block Tests', () => {
    describe('ProductGrid', () => {
        test('renders correctly', () => {
            // Test implementation
        });
    });
});
```

## Deployment Architecture

### 1. Build Pipeline
```
Source Code → Linting → Testing → Building → Optimization → Packaging → Deployment
```

### 2. Environment Configuration
```php
class Environment {
    public static function is_development() {
        return defined('WP_DEBUG') && WP_DEBUG;
    }
    
    public static function is_production() {
        return !self::is_development();
    }
}
```

This architecture ensures scalability, maintainability, and performance while following WordPress and modern development best practices.
