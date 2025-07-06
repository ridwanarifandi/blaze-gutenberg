<?php
/**
 * Helper Functions Loader
 * 
 * Loads all helper functions for the Blaze Gutenberg plugin
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load product helper functions
require_once __DIR__ . '/product-helpers.php';

// Load attribute helper functions
require_once __DIR__ . '/attribute-helpers.php';
