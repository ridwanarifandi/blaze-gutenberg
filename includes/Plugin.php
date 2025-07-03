<?php
namespace BlazeGutenberg;

/**
 * Main Plugin Class
 */
class Plugin {
    
    /**
     * Plugin instance
     */
    private static $instance = null;
    
    /**
     * Block manager instance
     */
    private $blocks_manager;
    
    /**
     * Assets manager instance
     */
    private $assets_manager;
    
    /**
     * Get plugin instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
        $this->init_managers();
    }
    
    /**
     * Initialize WordPress hooks
     */
    private function init_hooks() {
        add_action('init', [$this, 'init']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
        add_filter('block_categories_all', [$this, 'register_block_categories'], 10, 2);
    }
    
    /**
     * Initialize managers
     */
    private function init_managers() {
        $this->blocks_manager = new BlocksManager();
        $this->assets_manager = new AssetsManager();
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Load text domain
        load_plugin_textdomain(
            'blaze-gutenberg',
            false,
            dirname(plugin_basename(BLAZE_GUTENBERG_PLUGIN_FILE)) . '/languages'
        );
        
        // Initialize blocks
        $this->blocks_manager->init();
    }
    
    /**
     * Enqueue frontend assets
     */
    public function enqueue_frontend_assets() {
        if (has_blocks()) {
            $this->assets_manager->enqueue_frontend_assets();
        }
    }
    
    /**
     * Enqueue editor assets
     */
    public function enqueue_editor_assets() {
        $this->assets_manager->enqueue_editor_assets();
    }
    
    /**
     * Register custom block categories
     */
    public function register_block_categories($categories, $post) {
        return array_merge(
            $categories,
            [
                [
                    'slug'  => 'blaze-commerce',
                    'title' => __('Blaze Commerce', 'blaze-gutenberg'),
                    'icon'  => 'store',
                ],
            ]
        );
    }
    
    /**
     * Plugin activation
     */
    public static function activate() {
        // Flush rewrite rules
        flush_rewrite_rules();
        
        // Create necessary database tables if needed
        self::create_tables();
    }
    
    /**
     * Plugin deactivation
     */
    public static function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
        
        // Clear any cached data
        wp_cache_flush();
    }
    
    /**
     * Create necessary database tables
     */
    private static function create_tables() {
        // Add any custom table creation logic here if needed
    }
}
