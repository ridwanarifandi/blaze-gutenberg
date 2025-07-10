/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	useBlockProps,
	PanelColorSettings,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl, Placeholder } from "@wordpress/components";

/**
 * Internal dependencies
 */
import ProductCard from "../../components/ProductCard";

/**
 * Edit component
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		primaryBackgroundColor,
		primaryFontColor,
		priceColor,
		showBadges,
		showRating,
		showColorSwatches,
		showAddToCart,
		showEnquireButton,
	} = attributes;

	const blockProps = useBlockProps({
		className: "blaze-product-card-block",
	});

	// Create a dummy product for preview in editor
	const dummyProduct = {
		id: 1,
		name: __("Sample Product", "blaze-gutenberg"),
		title: __("Sample Product", "blaze-gutenberg"),
		slug: "sample-product",
		image:
			"https://via.placeholder.com/300x300/cccccc/666666?text=Product+Image",
		hoverImage:
			"https://via.placeholder.com/300x300/bbbbbb/555555?text=Hover+Image",
		price: "$29.99",
		regularPrice: "39.99",
		salePrice: "29.99",
		onSale: true,
		isNew: true,
		rating: 4.5,
		reviewCount: 12,
		permalink: "#",
		addToCartUrl: "#",
		addToCartText: __("Add to cart", "blaze-gutenberg"),
		attributes: [
			{
				name: "color",
				type: "color",
				value: "Red",
				color: "#ff0000",
			},
			{
				name: "color",
				type: "color",
				value: "Blue",
				color: "#0000ff",
			},
		],
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__("Display Settings", "blaze-gutenberg")}
					initialOpen={true}>
					<p className="components-base-control__help">
						{__(
							"This block displays the current product from the loop or page context. Configure the display options below.",
							"blaze-gutenberg",
						)}
					</p>

					<ToggleControl
						label={__("Show Badges", "blaze-gutenberg")}
						checked={showBadges}
						onChange={(value) => setAttributes({ showBadges: value })}
						help={__("Display sale and new product badges.", "blaze-gutenberg")}
					/>

					<ToggleControl
						label={__("Show Rating", "blaze-gutenberg")}
						checked={showRating}
						onChange={(value) => setAttributes({ showRating: value })}
						help={__(
							"Display product rating and review count.",
							"blaze-gutenberg",
						)}
					/>

					<ToggleControl
						label={__("Show Color Swatches", "blaze-gutenberg")}
						checked={showColorSwatches}
						onChange={(value) => setAttributes({ showColorSwatches: value })}
						help={__(
							"Display color variation swatches if available.",
							"blaze-gutenberg",
						)}
					/>

					<ToggleControl
						label={__("Show Add to Cart", "blaze-gutenberg")}
						checked={showAddToCart}
						onChange={(value) => setAttributes({ showAddToCart: value })}
						help={__("Display the add to cart button.", "blaze-gutenberg")}
					/>

					<ToggleControl
						label={__("Show Enquire Button", "blaze-gutenberg")}
						checked={showEnquireButton}
						onChange={(value) => setAttributes({ showEnquireButton: value })}
						help={__("Display the enquire now button.", "blaze-gutenberg")}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__("Color Settings", "blaze-gutenberg")}
					initialOpen={false}
					colorSettings={[
						{
							value: primaryBackgroundColor,
							onChange: (value) =>
								setAttributes({ primaryBackgroundColor: value }),
							label: __("Primary Background Color", "blaze-gutenberg"),
						},
						{
							value: primaryFontColor,
							onChange: (value) => setAttributes({ primaryFontColor: value }),
							label: __("Primary Font Color", "blaze-gutenberg"),
						},
						{
							value: priceColor,
							onChange: (value) => setAttributes({ priceColor: value }),
							label: __("Price Color", "blaze-gutenberg"),
						},
					]}
				/>
			</InspectorControls>

			{/* Editor Preview */}
			<div className="blaze-product-card-editor-preview">
				<div className="editor-preview-notice">
					<p>
						{__(
							"Preview: This block will display the current product from the loop or page context.",
							"blaze-gutenberg",
						)}
					</p>
				</div>
				<ProductCard
					product={dummyProduct}
					isEditor={true}
					primaryBackgroundColor={primaryBackgroundColor}
					primaryFontColor={primaryFontColor}
					priceColor={priceColor}
					showBadges={showBadges}
					showRating={showRating}
					showColorSwatches={showColorSwatches}
					showAddToCart={showAddToCart}
					showEnquireButton={showEnquireButton}
				/>
			</div>
		</div>
	);
}
