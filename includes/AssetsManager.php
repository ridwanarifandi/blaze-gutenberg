<?php
namespace BlazeGutenberg;

/**
 * Assets Manager Class
 */
class AssetsManager
{

    /**
     * Enqueue frontend assets
     */
    public function enqueue_frontend_assets()
    {
        // Enqueue Swiper CSS
        wp_enqueue_style(
            'swiper-css',
            'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
            [],
            '11.0.0'
        );

        // Enqueue main block styles
        wp_enqueue_style(
            'blaze-gutenberg-style',
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/css/style-frontend.css',
            ['swiper-css'],
            BLAZE_GUTENBERG_VERSION
        );

        // Add RTL support
        wp_style_add_data('blaze-gutenberg-style', 'rtl', 'replace');

        // Enqueue Swiper JS
        wp_enqueue_script(
            'swiper-js',
            'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
            [],
            '11.0.0',
            true
        );

        // Get frontend asset file data
        $frontend_asset_file = $this->get_asset_file('frontend');

        // Enqueue main block scripts
        wp_enqueue_script(
            'blaze-gutenberg-frontend',
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/frontend.js',
            array_merge(['swiper-js'], $frontend_asset_file['dependencies']),
            $frontend_asset_file['version'],
            true
        );

        // Enqueue filter blocks JavaScript
        wp_enqueue_script(
            'blaze-gutenberg-filter-blocks',
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/filter-blocks.js',
            [],
            BLAZE_GUTENBERG_VERSION,
            true
        );

        // Localize script with AJAX URL and nonce
        wp_localize_script('blaze-gutenberg-frontend', 'blazeGutenberg', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'restUrl' => rest_url('blaze/v1/'),
            'nonce' => wp_create_nonce('blaze_gutenberg_nonce'),
        ]);
    }

    /**
     * Enqueue editor assets
     */
    public function enqueue_editor_assets()
    {
        // Enqueue editor styles
        wp_enqueue_style(
            'blaze-gutenberg-editor',
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/css/editor.css',
            ['wp-edit-blocks'],
            BLAZE_GUTENBERG_VERSION
        );

        // Add RTL support for editor
        wp_style_add_data('blaze-gutenberg-editor', 'rtl', 'replace');

        // Get asset file data
        $asset_file = $this->get_asset_file('blocks');

        // Enqueue editor scripts
        wp_enqueue_script(
            'blaze-gutenberg-editor',
            BLAZE_GUTENBERG_PLUGIN_URL . 'assets/js/blocks.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );

        // Localize editor script
        wp_localize_script('blaze-gutenberg-editor', 'blazeGutenbergEditor', [
            'restUrl' => rest_url('blaze/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
        ]);
    }

    /**
     * Get asset file data
     */
    private function get_asset_file($asset_file)
    {
        $asset_path = BLAZE_GUTENBERG_PLUGIN_DIR . 'assets/js/' . $asset_file . '.asset.php';

        if (file_exists($asset_path)) {
            return include $asset_path;
        }

        return [
            'dependencies' => [],
            'version' => BLAZE_GUTENBERG_VERSION,
        ];
    }
}
