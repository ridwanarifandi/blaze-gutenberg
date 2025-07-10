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
	SelectControl,
	ToggleControl,
	Placeholder,
	Spinner,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */
import ProductCard from "../../components/ProductCard";

/**
 * Edit component
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		productId,
		primaryBackgroundColor,
		primaryFontColor,
		priceColor,
		showBadges,
		showRating,
		showColorSwatches,
		showAddToCart,
		showEnquireButton,
	} = attributes;

	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const blockProps = useBlockProps({
		className: "blaze-product-card-block",
	});

	// Fetch products for selection
	useEffect(() => {
		apiFetch({
			path: "/blaze/v1/products?per_page=50&status=publish",
		})
			.then((data) => {
				setProducts(data);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	// Fetch selected product details
	useEffect(() => {
		if (productId && productId > 0) {
			setIsLoading(true);
			apiFetch({
				path: `/blaze/v1/products?include=${productId}`,
			})
				.then((data) => {
					if (data && data.length > 0) {
						setSelectedProduct(data[0]);
					}
					setIsLoading(false);
				})
				.catch(() => {
					setIsLoading(false);
				});
		} else {
			setSelectedProduct(null);
		}
	}, [productId]);

	// Prepare product options for select control
	const productOptions = [
		{ label: __("Select a product...", "blaze-gutenberg"), value: 0 },
		...products.map((product) => ({
			label: product.name,
			value: product.id,
		})),
	];

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__("Product Settings", "blaze-gutenberg")}
					initialOpen={true}>
					<SelectControl
						label={__("Select Product", "blaze-gutenberg")}
						value={productId}
						options={productOptions}
						onChange={(value) =>
							setAttributes({ productId: parseInt(value) })
						}
						help={__(
							"Choose which product to display in this card.",
							"blaze-gutenberg",
						)}
					/>
				</PanelBody>

				<PanelBody
					title={__("Display Options", "blaze-gutenberg")}
					initialOpen={false}>
					<ToggleControl
						label={__("Show Badges", "blaze-gutenberg")}
						checked={showBadges}
						onChange={(value) => setAttributes({ showBadges: value })}
						help={__(
							"Display sale and new product badges.",
							"blaze-gutenberg",
						)}
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
						onChange={(value) =>
							setAttributes({ showColorSwatches: value })
						}
						help={__(
							"Display color variation swatches if available.",
							"blaze-gutenberg",
						)}
					/>
					<ToggleControl
						label={__("Show Add to Cart Button", "blaze-gutenberg")}
						checked={showAddToCart}
						onChange={(value) => setAttributes({ showAddToCart: value })}
					/>
					<ToggleControl
						label={__("Show Enquire Button", "blaze-gutenberg")}
						checked={showEnquireButton}
						onChange={(value) =>
							setAttributes({ showEnquireButton: value })
						}
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
							onChange: (value) =>
								setAttributes({ primaryFontColor: value }),
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

			{isLoading ? (
				<Placeholder
					icon="products"
					label={__("Product Card", "blaze-gutenberg")}>
					<Spinner />
				</Placeholder>
			) : !selectedProduct ? (
				<Placeholder
					icon="products"
					label={__("Product Card", "blaze-gutenberg")}
					instructions={__(
						"Select a product from the sidebar to display.",
						"blaze-gutenberg",
					)}
				/>
			) : (
				<ProductCard
					product={selectedProduct}
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
			)}
		</div>
	);
}
