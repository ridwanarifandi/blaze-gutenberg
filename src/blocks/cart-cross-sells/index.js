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

/**
 * Block registration
 */
registerBlockType("blaze/cart-cross-sells", {
	title: __("Cart Cross-Sells Products", "blaze-gutenberg"),
	description: __(
		"Display WooCommerce cross-sell products from the cart in a customizable grid layout using product cards.",
		"blaze-gutenberg",
	),
	category: "blaze-commerce",
	icon: {
		src: "cart",
		foreground: "#1e3a8a",
	},
	keywords: [
		__("cart", "blaze-gutenberg"),
		__("cross-sell", "blaze-gutenberg"),
		__("woocommerce", "blaze-gutenberg"),
		__("products", "blaze-gutenberg"),
		__("upsell", "blaze-gutenberg"),
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
		columnsDesktop: {
			type: "number",
			default: 4,
		},
		columnsTablet: {
			type: "number",
			default: 3,
		},
		columnsMobile: {
			type: "number",
			default: 1,
		},
		limit: {
			type: "number",
			default: 4,
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
		showTitle: {
			type: "boolean",
			default: false,
		},
		title: {
			type: "string",
			default: __("You may also like", "blaze-gutenberg"),
		},
	},
	edit,
	save,
});
