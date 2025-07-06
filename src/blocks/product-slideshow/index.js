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
registerBlockType("blaze/product-slideshow", {
	title: __("WooCommerce Product Slideshow", "blaze-gutenberg"),
	description: __(
		"Display WooCommerce products in an interactive slideshow with hover effects, badges, and customizable settings.",
		"blaze-gutenberg",
	),
	category: "blaze-commerce",
	icon: {
		src: "slides",
		foreground: "#1e3a8a",
	},
	keywords: [
		__("product", "blaze-gutenberg"),
		__("slideshow", "blaze-gutenberg"),
		__("woocommerce", "blaze-gutenberg"),
		__("carousel", "blaze-gutenberg"),
		__("slider", "blaze-gutenberg"),
	],
	supports: {
		align: ["wide", "full"],
		html: false,
	},
	attributes: {
		productsPerSlideDesktop: {
			type: "number",
			default: 4,
		},
		productsPerSlideTablet: {
			type: "number",
			default: 3,
		},
		productsPerSlideMobile: {
			type: "number",
			default: 1,
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
		showArrows: {
			type: "boolean",
			default: true,
		},
		showDots: {
			type: "boolean",
			default: true,
		},
		autoplay: {
			type: "boolean",
			default: false,
		},
		autoplayDelay: {
			type: "number",
			default: 3000,
		},
		productIds: {
			type: "array",
			default: [],
		},
		productCategory: {
			type: "string",
			default: "",
		},
		productTag: {
			type: "string",
			default: "",
		},
		orderBy: {
			type: "string",
			default: "date",
		},
		order: {
			type: "string",
			default: "DESC",
		},
		limit: {
			type: "number",
			default: 12,
		},
		featuredOnly: {
			type: "boolean",
			default: false,
		},
	},
	edit,
	save,
});
