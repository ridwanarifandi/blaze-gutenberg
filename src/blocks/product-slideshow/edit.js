/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	ColorPicker,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	Spinner,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
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
		productsPerSlideDesktop,
		productsPerSlideTablet,
		productsPerSlideMobile,
		primaryBackgroundColor,
		primaryFontColor,
		priceColor,
		showArrows,
		showDots,
		autoplay,
		autoplayDelay,
		productIds,
		productCategory,
		productTag,
		orderBy,
		order,
		limit,
		featuredOnly,
	} = attributes;

	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const blockProps = useBlockProps({
		className: "blaze-product-slideshow-editor",
	});

	// Fetch products, categories, and tags
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const [productsData, categoriesData, tagsData] = await Promise.all([
					apiFetch({ path: "/blaze/v1/products" }),
					apiFetch({ path: "/blaze/v1/product-categories" }),
					apiFetch({ path: "/blaze/v1/product-tags" }),
				]);

				setProducts(productsData);
				setCategories(categoriesData);
				setTags(tagsData);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	// Format options for select controls
	const categoryOptions = [
		{ label: __("All Categories", "blaze-gutenberg"), value: "" },
		...categories.map((cat) => ({ label: cat.name, value: cat.slug })),
	];

	const tagOptions = [
		{ label: __("All Tags", "blaze-gutenberg"), value: "" },
		...tags.map((tag) => ({ label: tag.name, value: tag.slug })),
	];

	const orderByOptions = [
		{ label: __("Date", "blaze-gutenberg"), value: "date" },
		{ label: __("Title", "blaze-gutenberg"), value: "title" },
		{ label: __("Menu Order", "blaze-gutenberg"), value: "menu_order" },
		{ label: __("Random", "blaze-gutenberg"), value: "rand" },
	];

	const orderOptions = [
		{ label: __("Descending", "blaze-gutenberg"), value: "DESC" },
		{ label: __("Ascending", "blaze-gutenberg"), value: "ASC" },
	];

	// Mock products for preview (first 4 products)
	const previewProducts = products.slice(0, productsPerSlideDesktop);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Slideshow Settings", "blaze-gutenberg")}
					initialOpen={true}>
					<RangeControl
						label={__("Products per slide (Desktop)", "blaze-gutenberg")}
						value={productsPerSlideDesktop}
						onChange={(value) =>
							setAttributes({ productsPerSlideDesktop: value })
						}
						min={1}
						max={6}
					/>
					<RangeControl
						label={__("Products per slide (Tablet)", "blaze-gutenberg")}
						value={productsPerSlideTablet}
						onChange={(value) =>
							setAttributes({ productsPerSlideTablet: value })
						}
						min={1}
						max={4}
					/>
					<RangeControl
						label={__("Products per slide (Mobile)", "blaze-gutenberg")}
						value={productsPerSlideMobile}
						onChange={(value) =>
							setAttributes({ productsPerSlideMobile: value })
						}
						min={1}
						max={2}
					/>

					<ToggleControl
						label={__("Show Navigation Arrows", "blaze-gutenberg")}
						checked={showArrows}
						onChange={(value) => setAttributes({ showArrows: value })}
					/>

					<ToggleControl
						label={__("Show Dots Navigation", "blaze-gutenberg")}
						checked={showDots}
						onChange={(value) => setAttributes({ showDots: value })}
					/>

					<ToggleControl
						label={__("Autoplay", "blaze-gutenberg")}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
					/>

					{autoplay && (
						<RangeControl
							label={__("Autoplay Delay (ms)", "blaze-gutenberg")}
							value={autoplayDelay}
							onChange={(value) => setAttributes({ autoplayDelay: value })}
							min={1000}
							max={10000}
							step={500}
						/>
					)}
				</PanelBody>

				<PanelBody
					title={__("Product Selection", "blaze-gutenberg")}
					initialOpen={false}>
					<ToggleControl
						label={__("Featured Products Only", "blaze-gutenberg")}
						help={__(
							"Show only products marked as featured",
							"blaze-gutenberg",
						)}
						checked={featuredOnly}
						onChange={(value) => setAttributes({ featuredOnly: value })}
					/>

					<SelectControl
						label={__("Category", "blaze-gutenberg")}
						value={productCategory}
						options={categoryOptions}
						onChange={(value) => setAttributes({ productCategory: value })}
					/>

					<SelectControl
						label={__("Tag", "blaze-gutenberg")}
						value={productTag}
						options={tagOptions}
						onChange={(value) => setAttributes({ productTag: value })}
					/>

					<SelectControl
						label={__("Order By", "blaze-gutenberg")}
						value={orderBy}
						options={orderByOptions}
						onChange={(value) => setAttributes({ orderBy: value })}
					/>

					<SelectControl
						label={__("Order", "blaze-gutenberg")}
						value={order}
						options={orderOptions}
						onChange={(value) => setAttributes({ order: value })}
					/>

					<RangeControl
						label={__("Maximum Products", "blaze-gutenberg")}
						value={limit}
						onChange={(value) => setAttributes({ limit: value })}
						min={1}
						max={50}
					/>
				</PanelBody>

				<PanelBody
					title={__("Color Settings", "blaze-gutenberg")}
					initialOpen={false}>
					<div style={{ marginBottom: "20px" }}>
						<label>{__("Primary Background Color", "blaze-gutenberg")}</label>
						<ColorPicker
							color={primaryBackgroundColor}
							onChange={(value) =>
								setAttributes({ primaryBackgroundColor: value })
							}
						/>
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label>{__("Primary Font Color", "blaze-gutenberg")}</label>
						<ColorPicker
							color={primaryFontColor}
							onChange={(value) => setAttributes({ primaryFontColor: value })}
						/>
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label>{__("Price Color", "blaze-gutenberg")}</label>
						<ColorPicker
							color={priceColor}
							onChange={(value) => setAttributes({ priceColor: value })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="blaze-product-slideshow-preview">
					{isLoading ? (
						<div className="blaze-loading">
							<Spinner />
							<p>{__("Loading products...", "blaze-gutenberg")}</p>
						</div>
					) : (
						<div
							className="blaze-products-grid"
							style={{
								display: "grid",
								gridTemplateColumns: `repeat(${productsPerSlideDesktop}, 1fr)`,
								gap: "20px",
								"--primary-bg-color": primaryBackgroundColor,
								"--primary-font-color": primaryFontColor,
								"--price-color": priceColor,
							}}>
							{previewProducts.length > 0 ? (
								previewProducts.map((product) => (
									<ProductCard
										key={product.id}
										product={product}
										isEditor={true}
										primaryBackgroundColor={primaryBackgroundColor}
										primaryFontColor={primaryFontColor}
										priceColor={priceColor}
									/>
								))
							) : (
								<div className="blaze-no-products">
									<p>
										{__(
											"No products found. Please check your selection criteria.",
											"blaze-gutenberg",
										)}
									</p>
								</div>
							)}
						</div>
					)}

					<div className="blaze-slideshow-info">
						<p>
							{__("Desktop: ", "blaze-gutenberg")}
							{productsPerSlideDesktop} |{__(" Tablet: ", "blaze-gutenberg")}
							{productsPerSlideTablet} |{__(" Mobile: ", "blaze-gutenberg")}
							{productsPerSlideMobile}
						</p>
						<p>
							{__("Arrows: ", "blaze-gutenberg")}
							{showArrows
								? __("Yes", "blaze-gutenberg")
								: __("No", "blaze-gutenberg")}{" "}
							|{__(" Dots: ", "blaze-gutenberg")}
							{showDots
								? __("Yes", "blaze-gutenberg")
								: __("No", "blaze-gutenberg")}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
