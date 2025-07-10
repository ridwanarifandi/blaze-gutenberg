/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import "./style.scss";
import "./editor.scss";

/**
 * Block registration
 */
registerBlockType("blaze/product-card", {
	title: __("WooCommerce Product Card", "blaze-gutenberg"),
	description: __(
		"Display a single WooCommerce product card with customizable styling. Perfect for use in product loops, category pages, and related product sections.",
		"blaze-gutenberg",
	),
	category: "blaze-commerce",
	icon: {
		src: "products",
		foreground: "#1e3a8a",
	},
	keywords: [
		__("product", "blaze-gutenberg"),
		__("card", "blaze-gutenberg"),
		__("woocommerce", "blaze-gutenberg"),
		__("shop", "blaze-gutenberg"),
		__("commerce", "blaze-gutenberg"),
	],
	supports: {
		align: ["wide", "full"],
		html: false,
		spacing: {
			margin: true,
			padding: true,
		},
	},
	attributes: {
		productId: {
			type: "number",
			default: 0,
		},
		primaryBackgroundColor: {
			type: "string",
			default: "#1e3a8a",
		},
		primaryFontColor: {
			type: "string",
			default: "#ffffff",
		},
		priceColor: {
			type: "string",
			default: "#1e3a8a",
		},
		showBadges: {
			type: "boolean",
			default: true,
		},
		showRating: {
			type: "boolean",
			default: true,
		},
		showColorSwatches: {
			type: "boolean",
			default: true,
		},
		showAddToCart: {
			type: "boolean",
			default: true,
		},
		showEnquireButton: {
			type: "boolean",
			default: true,
		},
	},
	edit,
	save,
});
