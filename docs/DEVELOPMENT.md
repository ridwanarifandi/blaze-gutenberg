# Development Guide - Blaze Gutenberg Plugin

This guide provides detailed instructions for developers working on the Blaze Gutenberg plugin.

## Quick Start

### Prerequisites
- WordPress development environment
- Node.js 16+ and npm/yarn
- PHP 7.4+ with Composer
- WooCommerce plugin installed

### Initial Setup
```bash
# Clone and navigate to plugin directory
cd wp-content/plugins/blaze-gutenberg

# Install dependencies
composer install
npm install

# Start development
npm run dev
```

## Block Development Workflow

### 1. Creating a New Block

#### Step 1: Create Block Structure
```bash
# Create block directory
mkdir -p src/blocks/my-new-block

# Create required files
touch src/blocks/my-new-block/index.js
touch src/blocks/my-new-block/edit.js
touch src/blocks/my-new-block/save.js
touch src/blocks/my-new-block/style.scss
touch src/blocks/my-new-block/editor.scss
```

#### Step 2: Block Registration (index.js)
```javascript
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

registerBlockType('blaze/my-new-block', {
    title: 'My New Block',
    description: 'Description of what this block does',
    category: 'blaze-commerce',
    icon: 'store',
    keywords: ['blaze', 'commerce', 'product'],
    attributes: {
        // Define block attributes here
    },
    edit,
    save,
});
```

#### Step 3: Edit Component (edit.js)
```javascript
import { useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title="Block Settings">
                    {/* Add controls here */}
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                {/* Block editor interface */}
            </div>
        </>
    );
}
```

#### Step 4: Save Component (save.js)
```javascript
import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            {/* Frontend output */}
        </div>
    );
}
```

#### Step 5: PHP Block Handler
Create `includes/blocks/class-my-new-block.php`:
```php
<?php
namespace BlazeGutenberg\Blocks;

class MyNewBlock {
    public function __construct() {
        add_action('init', [$this, 'register_block']);
    }

    public function register_block() {
        register_block_type('blaze/my-new-block', [
            'render_callback' => [$this, 'render_block'],
            'attributes' => [
                // Define attributes
            ],
        ]);
    }

    public function render_block($attributes, $content) {
        // Server-side rendering logic
        return $content;
    }
}
```

### 2. Block Attributes Best Practices

#### Attribute Types
```javascript
attributes: {
    // String attribute
    title: {
        type: 'string',
        default: '',
    },
    // Number attribute
    count: {
        type: 'number',
        default: 5,
    },
    // Boolean attribute
    showTitle: {
        type: 'boolean',
        default: true,
    },
    // Array attribute
    items: {
        type: 'array',
        default: [],
    },
    // Object attribute
    settings: {
        type: 'object',
        default: {},
    },
}
```

#### Attribute Validation
```javascript
// In edit.js
const updateTitle = (newTitle) => {
    // Sanitize input
    const sanitizedTitle = newTitle.trim().substring(0, 100);
    setAttributes({ title: sanitizedTitle });
};
```

### 3. Styling Guidelines

#### SCSS Structure
```scss
// style.scss - Frontend styles
.wp-block-blaze-my-new-block {
    // Base styles
    display: block;
    
    &__title {
        font-size: 1.5em;
        margin-bottom: 1rem;
    }
    
    &__content {
        // Content styles
    }
    
    // Responsive design
    @media (max-width: 768px) {
        // Mobile styles
    }
}
```

```scss
// editor.scss - Editor-only styles
.wp-block-blaze-my-new-block {
    // Editor-specific styles
    border: 1px dashed #ccc;
    padding: 1rem;
    
    &.is-selected {
        border-color: #007cba;
    }
}
```

### 4. Component Development

#### Reusable Components
Create in `src/components/`:

```javascript
// src/components/ProductSelector.js
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function ProductSelector({ value, onChange }) {
    const products = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'product');
    });

    const options = products ? products.map(product => ({
        label: product.title.rendered,
        value: product.id,
    })) : [];

    return (
        <SelectControl
            label="Select Product"
            value={value}
            options={options}
            onChange={onChange}
        />
    );
}
```

### 5. Data Management

#### WordPress Data API
```javascript
import { useSelect, useDispatch } from '@wordpress/data';

// In your edit component
const { products, isLoading } = useSelect((select) => {
    const { getEntityRecords, isResolving } = select('core');
    return {
        products: getEntityRecords('postType', 'product', { per_page: 10 }),
        isLoading: isResolving('core', 'getEntityRecords', ['postType', 'product']),
    };
});
```

#### Custom API Endpoints
```php
// In PHP
add_action('rest_api_init', function() {
    register_rest_route('blaze/v1', '/products/featured', [
        'methods' => 'GET',
        'callback' => 'get_featured_products',
        'permission_callback' => '__return_true',
    ]);
});

function get_featured_products() {
    // Return featured products data
    return rest_ensure_response($products);
}
```

### 6. Performance Optimization

#### Lazy Loading
```javascript
import { Suspense, lazy } from '@wordpress/element';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function Edit() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HeavyComponent />
        </Suspense>
    );
}
```

#### Memoization
```javascript
import { useMemo } from '@wordpress/element';

export default function Edit({ attributes }) {
    const expensiveValue = useMemo(() => {
        return performExpensiveCalculation(attributes);
    }, [attributes.relevantProp]);

    return <div>{expensiveValue}</div>;
}
```

### 7. Testing

#### Unit Tests (Jest)
```javascript
// tests/js/blocks/my-new-block.test.js
import { render } from '@testing-library/react';
import Edit from '../../../src/blocks/my-new-block/edit';

describe('MyNewBlock Edit', () => {
    test('renders without crashing', () => {
        const props = {
            attributes: {},
            setAttributes: jest.fn(),
        };
        
        render(<Edit {...props} />);
    });
});
```

#### PHP Tests (PHPUnit)
```php
// tests/php/blocks/test-my-new-block.php
class TestMyNewBlock extends WP_UnitTestCase {
    public function test_block_registration() {
        $this->assertTrue(
            WP_Block_Type_Registry::get_instance()->is_registered('blaze/my-new-block')
        );
    }
}
```

### 8. Debugging

#### JavaScript Debugging
```javascript
// Use WordPress debug functions
import { debug } from '@wordpress/debug';

debug('Block attributes:', attributes);
```

#### PHP Debugging
```php
// Use WordPress debug logging
if (WP_DEBUG_LOG) {
    error_log('Block render data: ' . print_r($attributes, true));
}
```

### 9. Build Process

#### Development Build
```bash
npm run dev    # Watch mode with source maps
```

#### Production Build
```bash
npm run build  # Minified, optimized build
```

#### Custom Webpack Configuration
```javascript
// webpack.config.js customization
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    // Custom configurations
};
```

### 10. Common Patterns

#### Conditional Rendering
```javascript
{showTitle && (
    <h2 className="block-title">{title}</h2>
)}
```

#### Error Boundaries
```javascript
import { ErrorBoundary } from '@wordpress/components';

<ErrorBoundary>
    <YourComponent />
</ErrorBoundary>
```

#### Internationalization
```javascript
import { __ } from '@wordpress/i18n';

const title = __('Block Title', 'blaze-gutenberg');
```

## Troubleshooting

### Common Issues
1. **Block not appearing**: Check block registration and category
2. **Styles not loading**: Verify SCSS compilation and enqueuing
3. **Attributes not saving**: Check attribute schema and save function
4. **PHP errors**: Enable WP_DEBUG and check error logs

### Debug Tools
- WordPress Debug Bar
- Query Monitor
- React Developer Tools
- Redux DevTools

---

For more specific questions, refer to the main README.md or contact the development team.
