/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	useBlockProps,
	PanelColorSettings,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Placeholder,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import ProductCard from "../../components/ProductCard";

/**
 * Edit component
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		columnsDesktop,
		columnsTablet,
		columnsMobile,
		limit,
		primaryBackgroundColor,
		primaryFontColor,
		priceColor,
		showBadges,
		showRating,
		showColorSwatches,
		showAddToCart,
		showEnquireButton,
		showTitle,
		title,
	} = attributes;

	const blockProps = useBlockProps({
		className: "blaze-cart-cross-sells-block",
	});

	// Create dummy products for preview in editor
	const dummyProducts = Array.from({ length: Math.min(limit, 4) }, (_, index) => ({
		id: index + 1,
		name: __(`Cross-sell Product ${index + 1}`, "blaze-gutenberg"),
		title: __(`Cross-sell Product ${index + 1}`, "blaze-gutenberg"),
		slug: `cross-sell-product-${index + 1}`,
		image: `https://via.placeholder.com/300x300/cccccc/666666?text=Product+${index + 1}`,
		hoverImage: `https://via.placeholder.com/300x300/bbbbbb/555555?text=Hover+${index + 1}`,
		price: `$${(29.99 + index * 10).toFixed(2)}`,
		regularPrice: `${(39.99 + index * 10).toFixed(2)}`,
		salePrice: `${(29.99 + index * 10).toFixed(2)}`,
		onSale: index % 2 === 0,
		isNew: index % 3 === 0,
		rating: 4.5 - index * 0.2,
		reviewCount: 12 - index * 2,
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
	}));

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__("Layout Settings", "blaze-gutenberg")}
					initialOpen={true}>
					<RangeControl
						label={__("Columns (Desktop)", "blaze-gutenberg")}
						value={columnsDesktop}
						onChange={(value) => setAttributes({ columnsDesktop: value })}
						min={1}
						max={6}
						help={__("Number of columns on desktop devices.", "blaze-gutenberg")}
					/>

					<RangeControl
						label={__("Columns (Tablet)", "blaze-gutenberg")}
						value={columnsTablet}
						onChange={(value) => setAttributes({ columnsTablet: value })}
						min={1}
						max={4}
						help={__("Number of columns on tablet devices.", "blaze-gutenberg")}
					/>

					<RangeControl
						label={__("Columns (Mobile)", "blaze-gutenberg")}
						value={columnsMobile}
						onChange={(value) => setAttributes({ columnsMobile: value })}
						min={1}
						max={2}
						help={__("Number of columns on mobile devices.", "blaze-gutenberg")}
					/>

					<RangeControl
						label={__("Products Limit", "blaze-gutenberg")}
						value={limit}
						onChange={(value) => setAttributes({ limit: value })}
						min={1}
						max={12}
						help={__(
							"Maximum number of cross-sell products to display.",
							"blaze-gutenberg",
						)}
					/>
				</PanelBody>

				<PanelBody
					title={__("Title Settings", "blaze-gutenberg")}
					initialOpen={false}>
					<ToggleControl
						label={__("Show Title", "blaze-gutenberg")}
						checked={showTitle}
						onChange={(value) => setAttributes({ showTitle: value })}
						help={__("Display section title above products.", "blaze-gutenberg")}
					/>

					{showTitle && (
						<TextControl
							label={__("Title Text", "blaze-gutenberg")}
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							help={__("Text to display as section title.", "blaze-gutenberg")}
						/>
					)}
				</PanelBody>

				<PanelBody
					title={__("Product Display Settings", "blaze-gutenberg")}
					initialOpen={false}>
					<p className="components-base-control__help">
						{__(
							"This block displays cross-sell products from the WooCommerce cart. Configure the display options below.",
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
							"Display color attribute swatches if available.",
							"blaze-gutenberg",
						)}
					/>

					<ToggleControl
						label={__("Show Add to Cart", "blaze-gutenberg")}
						checked={showAddToCart}
						onChange={(value) => setAttributes({ showAddToCart: value })}
						help={__("Display add to cart button.", "blaze-gutenberg")}
					/>

					<ToggleControl
						label={__("Show Enquire Button", "blaze-gutenberg")}
						checked={showEnquireButton}
						onChange={(value) => setAttributes({ showEnquireButton: value })}
						help={__("Display enquire now button.", "blaze-gutenberg")}
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
			<div className="blaze-cart-cross-sells-editor-preview">
				<div className="editor-preview-notice">
					<p>
						{__(
							"Preview: This block will display cross-sell products from the WooCommerce cart.",
							"blaze-gutenberg",
						)}
					</p>
				</div>

				{showTitle && (
					<h2 className="cross-sells-title">{title}</h2>
				)}

				<div
					className="cross-sells-grid"
					style={{
						"--columns-desktop": columnsDesktop,
						"--columns-tablet": columnsTablet,
						"--columns-mobile": columnsMobile,
					}}>
					{dummyProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
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
					))}
				</div>
			</div>
		</div>
	);
}
