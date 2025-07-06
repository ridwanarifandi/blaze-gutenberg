/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

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
registerBlockType("blaze/category-grid", {
	title: __("WooCommerce Category Grid", "blaze-gutenberg"),
	description: __(
		"Display WooCommerce product categories in a customizable grid layout with responsive columns and sorting options.",
		"blaze-gutenberg",
	),
	category: "blaze-commerce",
	icon: {
		src: "grid-view",
		foreground: "#1e3a8a",
	},
	keywords: [
		__("category", "blaze-gutenberg"),
		__("grid", "blaze-gutenberg"),
		__("woocommerce", "blaze-gutenberg"),
		__("product", "blaze-gutenberg"),
		__("categories", "blaze-gutenberg"),
	],
	supports: {
		align: ["wide", "full"],
		html: false,
	},
	attributes: {
		selectedCategories: {
			type: "array",
			default: [],
		},
		orderBy: {
			type: "string",
			default: "name",
		},
		order: {
			type: "string",
			default: "ASC",
		},
		limit: {
			type: "number",
			default: 12,
		},
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
			default: 2,
		},
		showProductCount: {
			type: "boolean",
			default: true,
		},
		showDescription: {
			type: "boolean",
			default: false,
		},
		hideEmpty: {
			type: "boolean",
			default: true,
		},
		categoryNameColor: {
			type: "string",
			default: "",
		},
		categoryDescriptionColor: {
			type: "string",
			default: "",
		},
		productCountColor: {
			type: "string",
			default: "",
		},
	},
	edit,
	save,
});
