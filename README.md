# Blaze Commerce - Gutenberg Plugin

A WordPress plugin that provides custom Gutenberg blocks for Blaze Commerce, following WordPress development standards and best practices.

## Overview

This plugin extends the WordPress Gutenberg editor with custom blocks specifically designed for e-commerce functionality, integrating seamlessly with WooCommerce.

## Requirements

- WordPress 5.0+
- PHP 7.4+
- WooCommerce plugin (required dependency)
- Node.js 16+ (for development)
- npm or yarn (for development)

## Installation

1. Upload the plugin files to `/wp-content/plugins/blaze-gutenberg/`
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Ensure WooCommerce is installed and activated

## Development Standards

### Code Standards
- Follow WordPress Coding Standards (WPCS)
- Use PSR-4 autoloading for PHP classes
- Implement proper sanitization and validation
- Use WordPress hooks and filters appropriately
- Follow semantic versioning

### Performance Standards
- Implement proper caching mechanisms
- Minimize database queries
- Use WordPress transients for temporary data
- Optimize asset loading (CSS/JS)
- Implement lazy loading where appropriate

### Security Standards
- Sanitize all user inputs
- Validate and escape all outputs
- Use WordPress nonces for form submissions
- Implement proper capability checks
- Follow WordPress security best practices

## Project Structure

```
blaze-gutenberg/
├── README.md                    # This documentation
├── blaze-gutenberg.php         # Main plugin file
├── composer.json               # PHP dependencies
├── package.json                # Node.js dependencies
├── webpack.config.js           # Build configuration
├── assets/                     # Static assets
│   ├── css/                   # Compiled CSS files
│   ├── js/                    # Compiled JavaScript files
│   └── images/                # Image assets
├── src/                       # Source files
│   ├── blocks/               # Gutenberg blocks
│   │   ├── block-name/       # Individual block directory
│   │   │   ├── index.js      # Block registration
│   │   │   ├── edit.js       # Block editor component
│   │   │   ├── save.js       # Block save component
│   │   │   ├── style.scss    # Block styles
│   │   │   └── editor.scss   # Editor-specific styles
│   │   └── index.js          # Blocks entry point
│   ├── components/           # Reusable React components
│   ├── utils/               # Utility functions
│   └── styles/              # Global SCSS files
├── includes/                # PHP classes and functions
│   ├── class-plugin.php     # Main plugin class
│   ├── class-blocks.php     # Block registration handler
│   ├── class-assets.php     # Asset management
│   ├── class-cache.php      # Caching utilities
│   └── blocks/              # PHP block handlers
├── templates/               # PHP templates
├── languages/              # Translation files
└── tests/                  # Unit and integration tests
    ├── php/               # PHP tests
    └── js/                # JavaScript tests
```

## Block Development Guidelines

### Block Structure
Each custom block should follow this structure:

1. **Block Directory**: `src/blocks/block-name/`
2. **Required Files**:
   - `index.js` - Block registration and configuration
   - `edit.js` - Editor interface component
   - `save.js` - Frontend save component
   - `style.scss` - Frontend styles
   - `editor.scss` - Editor-only styles

### Block Naming Convention
- Use kebab-case for block names
- Prefix with `blaze/` namespace
- Example: `blaze/product-grid`, `blaze/featured-products`

### Block Categories
Organize blocks into logical categories:
- `blaze-commerce` - Main e-commerce blocks
- `blaze-layout` - Layout and structure blocks
- `blaze-content` - Content presentation blocks

## Development Workflow

### Setup Development Environment
```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Start development build with watch
npm run dev

# Build for production
npm run build
```

### Creating a New Block
1. Create block directory: `src/blocks/new-block/`
2. Implement required files (index.js, edit.js, save.js, styles)
3. Register block in PHP: `includes/blocks/class-new-block.php`
4. Add block to main blocks index: `src/blocks/index.js`
5. Test block functionality
6. Add unit tests

### Code Quality
```bash
# Run PHP code standards check
composer run phpcs

# Fix PHP code standards
composer run phpcbf

# Run JavaScript linting
npm run lint

# Fix JavaScript linting issues
npm run lint:fix

# Run tests
npm run test
composer run test
```

## Caching Strategy

### Block Output Caching
- Use WordPress transients for expensive operations
- Cache block render output when appropriate
- Implement cache invalidation on content updates

### Asset Caching
- Version assets based on file modification time
- Use WordPress asset versioning system
- Implement browser caching headers

### Database Query Optimization
- Use WordPress object cache for repeated queries
- Implement query result caching
- Minimize database calls in block render

## Performance Best Practices

### Frontend Performance
- Load block assets only when blocks are present
- Use conditional asset loading
- Implement critical CSS for above-the-fold blocks
- Optimize images and use responsive images

### Backend Performance
- Cache expensive computations
- Use efficient database queries
- Implement proper indexing for custom queries
- Use WordPress cron for background tasks

## Security Considerations

### Input Validation
- Sanitize all user inputs using WordPress functions
- Validate data types and ranges
- Use whitelist validation where possible

### Output Escaping
- Escape all dynamic content using appropriate WordPress functions
- Use context-appropriate escaping (HTML, attributes, URLs)

### Capability Checks
- Verify user permissions before sensitive operations
- Use WordPress capability system
- Implement role-based access control

## Testing Strategy

### Unit Testing
- Test individual functions and methods
- Mock external dependencies
- Achieve high code coverage

### Integration Testing
- Test block registration and rendering
- Test WordPress integration points
- Test WooCommerce integration

### End-to-End Testing
- Test complete user workflows
- Test block editor functionality
- Test frontend display

## Deployment

### Production Checklist
- [ ] Run all tests
- [ ] Build production assets
- [ ] Update version numbers
- [ ] Generate translation files
- [ ] Create deployment package
- [ ] Test on staging environment

### Version Management
- Follow semantic versioning (MAJOR.MINOR.PATCH)
- Update version in main plugin file
- Update version in package.json
- Tag releases in version control

## Contributing

### Code Review Process
1. Create feature branch
2. Implement changes following standards
3. Write/update tests
4. Submit pull request
5. Code review and approval
6. Merge to main branch

### Documentation Updates
- Update README.md for new features
- Add inline code documentation
- Update user documentation
- Maintain changelog

## Support and Maintenance

### Error Handling
- Implement comprehensive error logging
- Use WordPress debug logging
- Provide user-friendly error messages
- Implement graceful degradation

### Monitoring
- Monitor plugin performance
- Track error rates
- Monitor user adoption
- Collect usage analytics

## Resources

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [WooCommerce Developer Documentation](https://woocommerce.github.io/code-reference/)
- [React Documentation](https://reactjs.org/docs/)

---

**Version**: 1.0.0  
**Last Updated**: 2025-06-30  
**Maintainer**: Blaze Commerce Team
