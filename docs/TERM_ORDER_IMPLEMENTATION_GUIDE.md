# Term Order Implementation Guide

## Overview

This document provides a comprehensive guide for implementing custom term ordering functionality in WordPress plugins. The implementation is based on the Admin Site Enhancements Pro plugin's term order feature, which allows drag-and-drop reordering of taxonomy terms with persistent storage.

## Architecture Overview

### Core Components

1. **Database Layer**: Adds `term_order` column to `wp_terms` table
2. **Admin Interface**: Drag-and-drop interface using jQuery UI Sortable
3. **Query Modification**: Filters to apply custom ordering in WordPress queries
4. **AJAX Handler**: Saves new term order via AJAX requests

### File Structure

```
term-order/
├── includes/
│   ├── class-term-order.php           # Main class
│   ├── class-term-order-admin.php     # Admin functionality
│   ├── class-term-order-walker.php    # Custom walker for hierarchical display
│   └── class-term-order-loader.php    # Hook management
├── admin/
│   └── templates/
│       └── terms-ordering-page.php    # Admin interface template
├── assets/
│   ├── css/
│   │   └── term-order-admin.css       # Admin styles
│   └── js/
│       └── term-order-admin.js        # Admin JavaScript
└── term-order.php                     # Entry point
```

## Implementation Details

### 1. Database Schema Modification

The system adds a `term_order` column to the WordPress `wp_terms` table:

```sql
ALTER TABLE wp_terms ADD `term_order` INT(4) NULL DEFAULT '0'
```

**Key Points:**

- Column is added automatically on plugin activation
- Default value is 0 for all existing terms
- Uses INT(4) to support up to 9999 terms per taxonomy

### 2. Core Classes

#### Main Class (`Tax_Terms_Order`)

**Purpose**: Orchestrates the entire term ordering system
**Key Methods**:

- `run()`: Initializes database and hooks
- `add_term_order_column_in_terms_table()`: Creates database column
- `load_dependencies()`: Loads required classes

#### Admin Class (`Tax_Terms_Order_Admin`)

**Purpose**: Handles all admin-related functionality
**Key Hooks**:

- `admin_menu`: Adds "Terms Order" submenus
- `terms_clauses`: Modifies term queries to use custom order
- `get_terms_orderby`: Ensures proper orderby parameter handling
- `wp_ajax_update-taxonomy-order`: Handles AJAX save requests

**Key Methods**:

- `add_terms_order_menu()`: Creates admin menu items
- `maybe_apply_custom_order()`: Applies custom ordering to queries
- `save_terms_order()`: Processes AJAX order updates

#### Walker Class (`Tax_Terms_Order_Walker`)

**Purpose**: Renders hierarchical term lists for drag-and-drop interface
**Extends**: WordPress `Walker` class
**Key Methods**:

- `start_el()`: Renders individual term items
- `start_lvl()`: Handles nested term levels

### 3. Admin Interface

#### Menu Integration

The system automatically adds "Terms Order" submenus based on:

- Enabled post types in plugin settings
- Post types that have hierarchical taxonomies
- User capabilities (`manage_categories`)

**Menu Locations**:

- Posts: `edit.php` → Terms Order
- Custom Post Types: `edit.php?post_type={post_type}` → Terms Order
- Attachments: `upload.php` → Terms Order

#### Drag-and-Drop Interface

**Technology Stack**:

- jQuery UI Sortable for drag-and-drop
- AJAX for real-time saving
- Visual feedback during updates

**Key Features**:

- Hierarchical term support
- Real-time order updates
- Visual indicators for save status
- Nonce security for AJAX requests

### 4. Query Modification System

#### Filter: `terms_clauses`

**Purpose**: Modifies SQL clauses for term queries
**Priority**: 10
**Parameters**: `$clauses`, `$taxonomies`, `$args`

**Logic Flow**:

1. Check if custom ordering is enabled for the taxonomy
2. Verify frontend ordering is enabled (if applicable)
3. Check for `ignore_term_order` parameter
4. Modify `orderby` clause to use `t.term_order`

#### Filter: `get_terms_orderby`

**Purpose**: Ensures proper orderby parameter handling
**Priority**: 1
**Parameters**: `$orderby`, `$args`

**Logic Flow**:

1. Check for filter bypass (`tto/get_terms_orderby/ignore`)
2. Convert `term_order` parameter to `t.term_order`
3. Return modified orderby value

### 5. AJAX Implementation

#### Endpoint: `update-taxonomy-order`

**Security**: WordPress nonce verification
**Data Format**: JSON serialized term order data
**Process**:

1. Verify nonce for security
2. Parse JSON order data
3. Update `term_order` values in database
4. Clear term cache for updated terms

**Data Structure**:

```javascript
{
  "0": "item[]=123&item[]=456&item[]=789",
  "parent_id": "item[]=child1&item[]=child2"
}
```

## Configuration and Settings

### Plugin Options

The system uses the following option keys:

- `terms_order`: Boolean to enable/disable feature
- `terms_order_for`: Array of enabled post types
- `terms_order_frontend`: Boolean for frontend ordering

### Post Type Requirements

**Eligibility Criteria**:

- Post type must be enabled in plugin settings
- Post type must have at least one hierarchical taxonomy
- User must have `manage_categories` capability

**Supported Taxonomies**:

- Only hierarchical taxonomies (categories, not tags)
- Custom hierarchical taxonomies
- Built-in WordPress taxonomies

## Frontend Usage

### Basic Term Query with Custom Order

```php
$terms = get_terms( array(
    'taxonomy'   => 'category',
    'orderby'    => 'term_order',
    'hide_empty' => false,
) );
```

### Ignoring Custom Order

```php
$terms = get_terms( array(
    'taxonomy'         => 'category',
    'ignore_term_order' => true,
    'orderby'          => 'name',
) );
```

### WP_Query with Custom Term Order

```php
$query = new WP_Query( array(
    'post_type' => 'product',
    'tax_query' => array(
        array(
            'taxonomy' => 'product_category',
            'field'    => 'slug',
            'terms'    => 'electronics',
        ),
    ),
    // Terms will automatically use custom order if enabled
) );
```

## Security Considerations

### Nonce Verification

All AJAX requests use WordPress nonce system:

```php
wp_verify_nonce( $_POST['nonce'], 'update-taxonomy-order' )
```

### Capability Checks

Admin interface requires `manage_categories` capability:

```php
'capability' => 'manage_categories'
```

### Data Sanitization

All input data is sanitized:

```php
$data = stripslashes( sanitize_text_field( $_POST['order'] ) );
```

## Performance Considerations

### Database Impact

- Single additional column per term
- Minimal storage overhead (INT(4))
- Indexed queries for optimal performance

### Caching

- Uses WordPress term cache system
- Clears cache after order updates
- No additional caching layer required

### Query Optimization

- Modifies existing queries rather than additional queries
- Uses database-level ordering for efficiency
- Minimal impact on page load times

## Troubleshooting

### Common Issues

1. **Terms not ordering**: Check if taxonomy is hierarchical
2. **Menu not appearing**: Verify post type has hierarchical taxonomies
3. **Order not saving**: Check AJAX errors and nonce verification
4. **Frontend not working**: Ensure `terms_order_frontend` is enabled

### Debug Filters

```php
// Bypass custom ordering for specific queries
add_filter( 'tto/get_terms_orderby/ignore', '__return_true' );
```

## Extension Points

### Custom Filters

- `tto/get_terms_orderby/ignore`: Bypass ordering for specific queries
- Standard WordPress term filters still apply

### Custom Implementations

The system can be extended for:

- Non-hierarchical taxonomies (with modifications)
- Custom post type specific ordering
- Advanced sorting algorithms
- Integration with other ordering systems

## Migration and Compatibility

### WordPress Compatibility

- Requires WordPress 4.0+
- Compatible with multisite installations
- Works with custom post types and taxonomies

### Plugin Compatibility

- Compatible with most taxonomy-related plugins
- May conflict with other term ordering plugins
- Test with caching plugins for optimal performance

## Best Practices

### Implementation

1. Always check for hierarchical taxonomies
2. Implement proper capability checks
3. Use WordPress coding standards
4. Include proper error handling

### Usage

1. Test ordering on staging environment first
2. Backup database before major changes
3. Monitor performance with large term counts
4. Document custom implementations

## Code Examples

### Complete Implementation Example

#### 1. Main Plugin File

```php
<?php
/**
 * Plugin Name: Custom Term Order
 * Description: Adds drag-and-drop term ordering functionality
 * Version: 1.0.0
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define constants
define( 'CTO_VERSION', '1.0.0' );
define( 'CTO_PATH', plugin_dir_path( __FILE__ ) );
define( 'CTO_URL', plugin_url( '', __FILE__ ) );

// Include main class
require_once CTO_PATH . 'includes/class-custom-term-order.php';

// Initialize plugin
function init_custom_term_order() {
    $plugin = new Custom_Term_Order();
    $plugin->run();
}
add_action( 'plugins_loaded', 'init_custom_term_order' );
```

#### 2. Main Class Implementation

```php
<?php
class Custom_Term_Order {

    private $version;
    private $plugin_name;

    public function __construct() {
        $this->version = CTO_VERSION;
        $this->plugin_name = 'custom-term-order';
        $this->load_dependencies();
    }

    private function load_dependencies() {
        require_once CTO_PATH . 'includes/class-term-order-admin.php';
        require_once CTO_PATH . 'includes/class-term-order-walker.php';
    }

    public function run() {
        $this->add_term_order_column();
        $this->init_admin();
    }

    private function add_term_order_column() {
        global $wpdb;

        $column_exists = $wpdb->get_results(
            "SHOW COLUMNS FROM {$wpdb->terms} LIKE 'term_order'"
        );

        if ( empty( $column_exists ) ) {
            $wpdb->query(
                "ALTER TABLE {$wpdb->terms} ADD `term_order` INT(4) NULL DEFAULT '0'"
            );
        }
    }

    private function init_admin() {
        if ( is_admin() ) {
            new Term_Order_Admin( $this->plugin_name, $this->version );
        }
    }
}
```

#### 3. Admin Class Implementation

```php
<?php
class Term_Order_Admin {

    private $plugin_name;
    private $version;

    public function __construct( $plugin_name, $version ) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;

        add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
        add_filter( 'terms_clauses', array( $this, 'modify_terms_clauses' ), 10, 3 );
        add_filter( 'get_terms_orderby', array( $this, 'modify_terms_orderby' ), 10, 2 );
        add_action( 'wp_ajax_save_term_order', array( $this, 'save_term_order' ) );
    }

    public function add_admin_menu() {
        // Get post types with hierarchical taxonomies
        $post_types = $this->get_eligible_post_types();

        foreach ( $post_types as $post_type ) {
            $parent_slug = ( $post_type === 'post' ) ? 'edit.php' : "edit.php?post_type={$post_type}";

            add_submenu_page(
                $parent_slug,
                'Term Order',
                'Term Order',
                'manage_categories',
                "{$post_type}-term-order",
                array( $this, 'render_admin_page' )
            );
        }
    }

    private function get_eligible_post_types() {
        $post_types = get_post_types( array( 'public' => true ), 'names' );
        $eligible = array();

        foreach ( $post_types as $post_type ) {
            $taxonomies = get_object_taxonomies( $post_type );

            foreach ( $taxonomies as $taxonomy ) {
                $tax_object = get_taxonomy( $taxonomy );
                if ( $tax_object->hierarchical ) {
                    $eligible[] = $post_type;
                    break;
                }
            }
        }

        return array_unique( $eligible );
    }

    public function enqueue_scripts( $hook ) {
        if ( strpos( $hook, 'term-order' ) !== false ) {
            wp_enqueue_script( 'jquery-ui-sortable' );
            wp_enqueue_script(
                $this->plugin_name,
                CTO_URL . 'assets/js/term-order.js',
                array( 'jquery', 'jquery-ui-sortable' ),
                $this->version,
                true
            );

            wp_localize_script( $this->plugin_name, 'termOrder', array(
                'ajaxurl' => admin_url( 'admin-ajax.php' ),
                'nonce'   => wp_create_nonce( 'save_term_order' ),
            ) );

            wp_enqueue_style(
                $this->plugin_name,
                CTO_URL . 'assets/css/term-order.css',
                array(),
                $this->version
            );
        }
    }

    public function modify_terms_clauses( $clauses, $taxonomies, $args ) {
        // Apply custom ordering if not explicitly disabled
        if ( ! isset( $args['ignore_custom_order'] ) || ! $args['ignore_custom_order'] ) {
            if ( isset( $args['orderby'] ) && $args['orderby'] === 'term_order' ) {
                $clauses['orderby'] = 'ORDER BY t.term_order ASC, t.name ASC';
            }
        }

        return $clauses;
    }

    public function modify_terms_orderby( $orderby, $args ) {
        if ( isset( $args['orderby'] ) && $args['orderby'] === 'term_order' ) {
            return 't.term_order';
        }

        return $orderby;
    }

    public function save_term_order() {
        // Verify nonce
        if ( ! wp_verify_nonce( $_POST['nonce'], 'save_term_order' ) ) {
            wp_die( 'Security check failed' );
        }

        // Check capabilities
        if ( ! current_user_can( 'manage_categories' ) ) {
            wp_die( 'Insufficient permissions' );
        }

        global $wpdb;

        $order_data = json_decode( stripslashes( $_POST['order'] ), true );

        if ( is_array( $order_data ) ) {
            foreach ( $order_data as $term_id => $order ) {
                $wpdb->update(
                    $wpdb->terms,
                    array( 'term_order' => intval( $order ) ),
                    array( 'term_id' => intval( $term_id ) ),
                    array( '%d' ),
                    array( '%d' )
                );
            }

            // Clear term cache
            wp_cache_flush();
        }

        wp_send_json_success( 'Order saved successfully' );
    }

    public function render_admin_page() {
        $post_type = $this->get_current_post_type();
        $taxonomies = $this->get_hierarchical_taxonomies( $post_type );
        $current_taxonomy = isset( $_GET['taxonomy'] ) ? $_GET['taxonomy'] : $taxonomies[0];

        include CTO_PATH . 'templates/admin-page.php';
    }

    private function get_current_post_type() {
        $page = isset( $_GET['page'] ) ? $_GET['page'] : '';
        return str_replace( '-term-order', '', $page );
    }

    private function get_hierarchical_taxonomies( $post_type ) {
        $taxonomies = get_object_taxonomies( $post_type );
        $hierarchical = array();

        foreach ( $taxonomies as $taxonomy ) {
            $tax_object = get_taxonomy( $taxonomy );
            if ( $tax_object->hierarchical ) {
                $hierarchical[] = $taxonomy;
            }
        }

        return $hierarchical;
    }
}
```

#### 4. JavaScript Implementation

```javascript
// assets/js/term-order.js
jQuery(document).ready(function ($) {
	// Initialize sortable
	$(".term-list").sortable({
		items: "> li",
		cursor: "move",
		opacity: 0.6,
		placeholder: "term-placeholder",
		update: function (event, ui) {
			saveTermOrder();
		},
	});

	function saveTermOrder() {
		var orderData = {};
		var order = 1;

		$(".term-list li").each(function () {
			var termId = $(this).data("term-id");
			orderData[termId] = order;
			order++;
		});

		$.ajax({
			url: termOrder.ajaxurl,
			type: "POST",
			data: {
				action: "save_term_order",
				order: JSON.stringify(orderData),
				nonce: termOrder.nonce,
			},
			success: function (response) {
				if (response.success) {
					showNotice("Order saved successfully", "success");
				} else {
					showNotice("Failed to save order", "error");
				}
			},
			error: function () {
				showNotice("AJAX error occurred", "error");
			},
		});
	}

	function showNotice(message, type) {
		var notice = $(
			'<div class="notice notice-' +
				type +
				' is-dismissible"><p>' +
				message +
				"</p></div>",
		);
		$(".wrap h1").after(notice);

		setTimeout(function () {
			notice.fadeOut();
		}, 3000);
	}
});
```

#### 5. Admin Template

```php
<?php
// templates/admin-page.php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="wrap">
    <h1>Term Order - <?php echo esc_html( get_post_type_object( $post_type )->labels->name ); ?></h1>

    <?php if ( count( $taxonomies ) > 1 ) : ?>
        <div class="taxonomy-selector">
            <h3>Select Taxonomy:</h3>
            <?php foreach ( $taxonomies as $taxonomy ) :
                $tax_object = get_taxonomy( $taxonomy );
                $active_class = ( $taxonomy === $current_taxonomy ) ? 'button-primary' : 'button-secondary';
            ?>
                <a href="<?php echo esc_url( add_query_arg( 'taxonomy', $taxonomy ) ); ?>"
                   class="button <?php echo esc_attr( $active_class ); ?>">
                    <?php echo esc_html( $tax_object->labels->name ); ?>
                </a>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <div class="term-ordering-container">
        <h3><?php echo esc_html( get_taxonomy( $current_taxonomy )->labels->name ); ?> Order</h3>

        <ul class="term-list">
            <?php
            $terms = get_terms( array(
                'taxonomy'   => $current_taxonomy,
                'orderby'    => 'term_order',
                'hide_empty' => false,
            ) );

            foreach ( $terms as $term ) :
            ?>
                <li data-term-id="<?php echo esc_attr( $term->term_id ); ?>" class="term-item">
                    <span class="dashicons dashicons-menu"></span>
                    <span class="term-name"><?php echo esc_html( $term->name ); ?></span>
                    <span class="term-count">(<?php echo esc_html( $term->count ); ?>)</span>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>
```

#### 6. CSS Styles

```css
/* assets/css/term-order.css */
.term-ordering-container {
	margin-top: 20px;
}

.term-list {
	list-style: none;
	margin: 0;
	padding: 0;
	max-width: 600px;
}

.term-item {
	background: #fff;
	border: 1px solid #ddd;
	margin-bottom: 5px;
	padding: 10px;
	cursor: move;
	display: flex;
	align-items: center;
	border-radius: 3px;
}

.term-item:hover {
	background: #f9f9f9;
}

.term-item .dashicons {
	margin-right: 10px;
	color: #666;
}

.term-name {
	flex-grow: 1;
	font-weight: 500;
}

.term-count {
	color: #666;
	font-size: 0.9em;
}

.term-placeholder {
	background: #f0f0f0;
	border: 2px dashed #ccc;
	height: 40px;
	margin-bottom: 5px;
	border-radius: 3px;
}

.taxonomy-selector {
	margin: 20px 0;
	padding: 15px;
	background: #f9f9f9;
	border-radius: 3px;
}

.taxonomy-selector .button {
	margin-right: 10px;
}
```

## Integration with Existing Plugins

### Adding Term Order to Existing Plugin

If you want to add term ordering to an existing plugin, follow these integration steps:

#### 1. Check Plugin Structure

```php
// In your main plugin file or init function
if ( ! class_exists( 'Custom_Term_Order' ) ) {
    require_once plugin_dir_path( __FILE__ ) . 'includes/term-order/class-custom-term-order.php';

    // Initialize only if needed
    add_action( 'init', function() {
        if ( get_option( 'your_plugin_enable_term_order', false ) ) {
            $term_order = new Custom_Term_Order();
            $term_order->run();
        }
    } );
}
```

#### 2. Settings Integration

```php
// Add to your plugin's settings page
add_settings_field(
    'enable_term_order',
    'Enable Term Ordering',
    'render_term_order_setting',
    'your-plugin-settings',
    'main-section'
);

function render_term_order_setting() {
    $enabled = get_option( 'your_plugin_enable_term_order', false );
    ?>
    <input type="checkbox"
           name="your_plugin_enable_term_order"
           value="1"
           <?php checked( $enabled, true ); ?> />
    <label>Enable drag-and-drop term ordering for hierarchical taxonomies</label>
    <?php
}
```

#### 3. Conditional Loading

```php
// Only load term order functionality when needed
class Your_Main_Plugin {

    private $term_order;

    public function __construct() {
        add_action( 'init', array( $this, 'maybe_init_term_order' ) );
    }

    public function maybe_init_term_order() {
        $options = get_option( 'your_plugin_options', array() );

        if ( isset( $options['enable_term_order'] ) && $options['enable_term_order'] ) {
            $this->init_term_order();
        }
    }

    private function init_term_order() {
        if ( ! $this->term_order ) {
            require_once plugin_dir_path( __FILE__ ) . 'includes/class-term-order.php';
            $this->term_order = new Custom_Term_Order();
            $this->term_order->run();
        }
    }
}
```

### Advanced Usage Examples

#### 1. Custom Term Order for Specific Taxonomies

```php
// Limit term ordering to specific taxonomies
class Selective_Term_Order extends Custom_Term_Order {

    private $allowed_taxonomies = array( 'product_category', 'portfolio_category' );

    public function modify_terms_clauses( $clauses, $taxonomies, $args ) {
        // Only apply to allowed taxonomies
        $intersect = array_intersect( (array) $taxonomies, $this->allowed_taxonomies );

        if ( ! empty( $intersect ) ) {
            return parent::modify_terms_clauses( $clauses, $taxonomies, $args );
        }

        return $clauses;
    }

    protected function get_eligible_post_types() {
        $post_types = array();

        foreach ( $this->allowed_taxonomies as $taxonomy ) {
            $tax_object = get_taxonomy( $taxonomy );
            if ( $tax_object ) {
                $post_types = array_merge( $post_types, $tax_object->object_type );
            }
        }

        return array_unique( $post_types );
    }
}
```

#### 2. Term Order with Custom Meta

```php
// Extend to support custom term meta for ordering
class Enhanced_Term_Order extends Custom_Term_Order {

    public function save_term_order() {
        // Call parent method first
        parent::save_term_order();

        // Add custom meta handling
        $order_data = json_decode( stripslashes( $_POST['order'] ), true );

        if ( is_array( $order_data ) ) {
            foreach ( $order_data as $term_id => $order ) {
                // Save additional meta
                update_term_meta( $term_id, 'custom_order_timestamp', current_time( 'timestamp' ) );
                update_term_meta( $term_id, 'custom_order_user', get_current_user_id() );
            }
        }
    }

    // Add order history tracking
    public function get_term_order_history( $term_id ) {
        return get_term_meta( $term_id, 'order_history', true );
    }

    private function log_order_change( $term_id, $old_order, $new_order ) {
        $history = $this->get_term_order_history( $term_id );
        if ( ! is_array( $history ) ) {
            $history = array();
        }

        $history[] = array(
            'timestamp' => current_time( 'timestamp' ),
            'user_id'   => get_current_user_id(),
            'old_order' => $old_order,
            'new_order' => $new_order,
        );

        update_term_meta( $term_id, 'order_history', $history );
    }
}
```

#### 3. Frontend Display with Custom Order

```php
// Helper functions for frontend display
class Term_Order_Frontend {

    /**
     * Get terms with custom order for display
     */
    public static function get_ordered_terms( $taxonomy, $args = array() ) {
        $defaults = array(
            'taxonomy'   => $taxonomy,
            'orderby'    => 'term_order',
            'order'      => 'ASC',
            'hide_empty' => false,
        );

        $args = wp_parse_args( $args, $defaults );

        return get_terms( $args );
    }

    /**
     * Display terms as ordered list
     */
    public static function display_term_list( $taxonomy, $args = array() ) {
        $terms = self::get_ordered_terms( $taxonomy, $args );

        if ( empty( $terms ) ) {
            return '';
        }

        $output = '<ul class="ordered-term-list">';

        foreach ( $terms as $term ) {
            $output .= sprintf(
                '<li class="term-item term-%s"><a href="%s">%s</a></li>',
                esc_attr( $term->slug ),
                esc_url( get_term_link( $term ) ),
                esc_html( $term->name )
            );
        }

        $output .= '</ul>';

        return $output;
    }

    /**
     * Get terms for dropdown with custom order
     */
    public static function get_terms_dropdown( $taxonomy, $selected = '', $args = array() ) {
        $terms = self::get_ordered_terms( $taxonomy, $args );

        $output = '<select name="' . esc_attr( $taxonomy ) . '">';
        $output .= '<option value="">Select ' . esc_html( get_taxonomy( $taxonomy )->labels->singular_name ) . '</option>';

        foreach ( $terms as $term ) {
            $output .= sprintf(
                '<option value="%s" %s>%s</option>',
                esc_attr( $term->term_id ),
                selected( $selected, $term->term_id, false ),
                esc_html( $term->name )
            );
        }

        $output .= '</select>';

        return $output;
    }
}

// Usage examples:
// echo Term_Order_Frontend::display_term_list( 'product_category' );
// echo Term_Order_Frontend::get_terms_dropdown( 'product_category', $selected_term );
```

#### 4. REST API Integration

```php
// Add term order to REST API responses
class Term_Order_REST_API {

    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_term_order_field' ) );
    }

    public function register_term_order_field() {
        $taxonomies = get_taxonomies( array( 'show_in_rest' => true ) );

        foreach ( $taxonomies as $taxonomy ) {
            register_rest_field( $taxonomy, 'term_order', array(
                'get_callback'    => array( $this, 'get_term_order' ),
                'update_callback' => array( $this, 'update_term_order' ),
                'schema'          => array(
                    'description' => 'Custom term order',
                    'type'        => 'integer',
                    'context'     => array( 'view', 'edit' ),
                ),
            ) );
        }
    }

    public function get_term_order( $term_array ) {
        $term = get_term( $term_array['id'] );
        return isset( $term->term_order ) ? (int) $term->term_order : 0;
    }

    public function update_term_order( $value, $term ) {
        global $wpdb;

        return $wpdb->update(
            $wpdb->terms,
            array( 'term_order' => (int) $value ),
            array( 'term_id' => $term->term_id ),
            array( '%d' ),
            array( '%d' )
        );
    }
}

// Initialize REST API integration
new Term_Order_REST_API();
```

#### 5. Shortcode Support

```php
// Add shortcode for displaying ordered terms
function ordered_terms_shortcode( $atts ) {
    $atts = shortcode_atts( array(
        'taxonomy'   => 'category',
        'show_count' => false,
        'hide_empty' => false,
        'limit'      => -1,
        'format'     => 'list', // list, dropdown, grid
    ), $atts );

    $args = array(
        'taxonomy'   => $atts['taxonomy'],
        'orderby'    => 'term_order',
        'hide_empty' => $atts['hide_empty'],
        'number'     => $atts['limit'],
    );

    $terms = get_terms( $args );

    if ( empty( $terms ) ) {
        return '';
    }

    switch ( $atts['format'] ) {
        case 'dropdown':
            return Term_Order_Frontend::get_terms_dropdown( $atts['taxonomy'] );

        case 'grid':
            return render_terms_grid( $terms, $atts );

        default:
            return Term_Order_Frontend::display_term_list( $atts['taxonomy'], $args );
    }
}
add_shortcode( 'ordered_terms', 'ordered_terms_shortcode' );

// Usage: [ordered_terms taxonomy="product_category" format="grid" show_count="true"]
```

---

_This documentation is based on the Admin Site Enhancements Pro plugin implementation and serves as a reference for implementing similar functionality in other WordPress projects._
