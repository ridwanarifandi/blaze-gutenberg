# Term Order Quick Reference for AI Augment

## Context Summary

This document provides a quick reference for AI Augment to understand the Term Order functionality in the Admin Site Enhancements Pro plugin and how to implement similar features.

## Key Concepts

### What is Term Order?

- **Purpose**: Allows custom drag-and-drop ordering of WordPress taxonomy terms
- **Scope**: Works only with hierarchical taxonomies (categories, not tags)
- **Storage**: Adds `term_order` column to `wp_terms` table
- **Interface**: Admin drag-and-drop interface using jQuery UI Sortable

### Core Components

1. **Database**: `term_order` INT(4) column in `wp_terms` table
2. **Admin Interface**: Drag-and-drop term management pages
3. **Query Filters**: Modifies WordPress term queries to use custom order
4. **AJAX Handler**: Saves new term order via AJAX

## File Structure Pattern

```
term-order/
├── includes/
│   ├── class-tax-terms-order.php          # Main orchestrator
│   ├── class-tax-terms-order-admin.php    # Admin functionality
│   ├── class-tax-terms-order-walker.php   # Hierarchical display
│   └── class-tax-terms-order-loader.php   # Hook management
├── admin/templates/
│   └── terms-ordering-page.php            # Admin interface
├── assets/
│   ├── css/tax-terms-order-admin.css      # Styles
│   └── js/tax-terms-order-admin.js        # JavaScript
└── tax-terms-order.php                    # Entry point
```

## Essential Code Patterns

### 1. Database Setup

```php
// Add term_order column to wp_terms table
global $wpdb;
$query = "SHOW COLUMNS FROM $wpdb->terms LIKE 'term_order'";
$result = $wpdb->query( $query );
if ( 0 == $result ){
    $query = "ALTER TABLE $wpdb->terms ADD `term_order` INT( 4 ) NULL DEFAULT '0'";
    $result = $wpdb->query( $query );
}
```

### 2. Critical WordPress Hooks

```php
// Essential hooks for term ordering
add_filter( 'terms_clauses', 'modify_term_query_clauses', 10, 3 );
add_filter( 'get_terms_orderby', 'modify_terms_orderby', 1, 2 );
add_action( 'wp_ajax_update-taxonomy-order', 'save_term_order' );
add_action( 'admin_menu', 'add_terms_order_menu' );
```

### 3. Query Modification Pattern

```php
public function maybe_apply_custom_order( $clauses, $taxonomies, $args ) {
    // Check if custom ordering should be applied
    if ( $should_apply_custom_order ) {
        if ( ! isset( $args['ignore_term_order'] ) || ! $args['ignore_term_order'] ) {
            $clauses['orderby'] = 'ORDER BY t.term_order';
        }
    }
    return $clauses;
}
```

### 4. AJAX Save Pattern

```php
public function save_terms_order() {
    // Security checks
    if ( ! wp_verify_nonce( $_POST['nonce'], 'update-taxonomy-order' ) ) {
        die();
    }

    // Parse order data
    $data = stripslashes( sanitize_text_field( $_POST['order'] ) );
    $unserialised_data = json_decode( $data, TRUE );

    // Update database
    foreach ( $items as $item_key => $term_id ) {
        $wpdb->update( $wpdb->terms,
            array( 'term_order' => ($item_key + 1) ),
            array( 'term_id' => $term_id )
        );
    }

    // Clear cache
    clean_term_cache( $items );
}
```

## Configuration Patterns

### Settings Structure

```php
// Plugin uses these option keys:
$options = get_option( ASENHA_SLUG_U, array() );
$terms_order_for = $options['terms_order_for']; // Array of enabled post types
$terms_order_frontend = $options['terms_order_frontend']; // Boolean for frontend
```

### Post Type Eligibility

```php
// Only post types with hierarchical taxonomies are eligible
foreach ( $options['terms_order_for'] as $post_type_slug => $is_enabled ) {
    if ( $is_enabled ) {
        $post_type_taxonomies = get_object_taxonomies( $post_type );
        // Filter for hierarchical taxonomies only
        foreach ( $post_type_taxonomies as $taxonomy_name ) {
            $taxonomy_info = get_taxonomy( $taxonomy_name );
            if ( $taxonomy_info->hierarchical === TRUE ) {
                // This post type is eligible
            }
        }
    }
}
```

## Frontend Usage Patterns

### Basic Term Query with Custom Order

```php
$terms = get_terms( array(
    'taxonomy' => 'category',
    'orderby'  => 'term_order',
    'hide_empty' => false,
) );
```

### Ignoring Custom Order

```php
$terms = get_terms( array(
    'taxonomy' => 'category',
    'ignore_term_order' => true, // Bypass custom ordering
    'orderby' => 'name',
) );
```

## Admin Interface Patterns

### Menu Integration

```php
// Adds "Terms Order" submenu for eligible post types
if ( 'post' == $post_type ) {
    add_submenu_page( 'edit.php', 'Terms Order', 'Terms Order',
        'manage_categories', $post_type . '-terms-order', 'callback' );
} else {
    add_submenu_page( 'edit.php?post_type='.$post_type, 'Terms Order', 'Terms Order',
        'manage_categories', $post_type . '-terms-order', 'callback' );
}
```

### jQuery Sortable Implementation

```javascript
jQuery("ul.sortable").sortable({
	tolerance: "intersect",
	cursor: "pointer",
	items: "> li",
	opacity: 0.6,
	update: function (event, ui) {
		// Auto-save on drag completion
		jQuery("#save-terms-order").click();
	},
});
```

## Security Considerations

### Required Capabilities

- Admin interface requires `manage_categories` capability
- AJAX endpoints use WordPress nonce verification
- All input data is sanitized using `sanitize_text_field()`

### Nonce Pattern

```php
// Generate nonce
wp_create_nonce( 'update-taxonomy-order' )

// Verify nonce
wp_verify_nonce( $_POST['nonce'], 'update-taxonomy-order' )
```

## Common Implementation Mistakes

### 1. Forgetting Hierarchical Check

```php
// WRONG: Applying to all taxonomies
$taxonomies = get_object_taxonomies( $post_type );

// CORRECT: Filter for hierarchical only
foreach ( $taxonomies as $taxonomy ) {
    $tax_object = get_taxonomy( $taxonomy );
    if ( $tax_object->hierarchical ) {
        // Process this taxonomy
    }
}
```

### 2. Missing Cache Clearing

```php
// WRONG: Update without cache clearing
$wpdb->update( $wpdb->terms, $data, $where );

// CORRECT: Clear cache after update
$wpdb->update( $wpdb->terms, $data, $where );
clean_term_cache( $term_ids );
```

### 3. Incorrect Query Modification

```php
// WRONG: Always applying custom order
$clauses['orderby'] = 'ORDER BY t.term_order';

// CORRECT: Check conditions first
if ( isset( $args['orderby'] ) && $args['orderby'] === 'term_order' ) {
    $clauses['orderby'] = 'ORDER BY t.term_order';
}
```

## Integration Checklist

When implementing term order in a plugin:

- [ ] Add `term_order` column to `wp_terms` table
- [ ] Hook into `terms_clauses` and `get_terms_orderby` filters
- [ ] Create admin interface with jQuery UI Sortable
- [ ] Implement AJAX save functionality with nonce security
- [ ] Add admin menu items for eligible post types
- [ ] Check for hierarchical taxonomies only
- [ ] Clear term cache after updates
- [ ] Test with various taxonomy configurations
- [ ] Ensure frontend queries use `orderby => 'term_order'`
- [ ] Add capability checks (`manage_categories`)

## Performance Notes

- Minimal database impact (single INT column)
- Uses existing WordPress term cache system
- Query modification is efficient (database-level ordering)
- AJAX updates are lightweight (JSON data structure)

## Debugging Tips

### Check if Term Order is Active

```php
// Verify column exists
global $wpdb;
$columns = $wpdb->get_results("SHOW COLUMNS FROM {$wpdb->terms} LIKE 'term_order'");
var_dump( !empty($columns) );

// Check term order values
$terms = $wpdb->get_results("SELECT term_id, name, term_order FROM {$wpdb->terms} WHERE term_order > 0");
var_dump( $terms );
```

### Test Query Modification

```php
// Add debug filter
add_filter( 'terms_clauses', function( $clauses, $taxonomies, $args ) {
    error_log( 'Terms Clauses: ' . print_r( $clauses, true ) );
    error_log( 'Terms Args: ' . print_r( $args, true ) );
    return $clauses;
}, 999, 3 );
```

---

_This quick reference is designed for AI Augment to quickly understand and implement term ordering functionality based on the Admin Site Enhancements Pro plugin patterns._
