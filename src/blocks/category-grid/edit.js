/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	CheckboxControl,
	Spinner,
	__experimentalBoxControl as BoxControl,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */
import CategoryCard from "../../components/CategoryCard";

/**
 * Edit component
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		selectedCategories,
		orderBy,
		order,
		limit,
		columnsDesktop,
		columnsTablet,
		columnsMobile,
		showProductCount,
		showDescription,
		hideEmpty,
		categoryNameColor,
		categoryDescriptionColor,
		productCountColor,
	} = attributes;

	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const blockProps = useBlockProps({
		className: "blaze-category-grid-editor",
	});

	// Fetch categories
	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true);
			try {
				const categoriesData = await apiFetch({
					path: "/blaze/v1/product-categories",
				});
				setCategories(categoriesData);
			} catch (error) {
				console.error("Error fetching categories:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
	}, []);

	// Filter and sort categories based on settings
	const getFilteredCategories = () => {
		let filtered = [...categories];

		// Filter by selected categories
		if (selectedCategories.length > 0) {
			filtered = filtered.filter((cat) =>
				selectedCategories.includes(cat.id.toString()),
			);
		}

		// Filter empty categories if hideEmpty is true
		if (hideEmpty) {
			filtered = filtered.filter((cat) => cat.count > 0);
		}

		// Sort categories
		filtered.sort((a, b) => {
			let comparison = 0;

			switch (orderBy) {
				case "name":
					comparison = a.name.localeCompare(b.name);
					break;
				case "count":
					comparison = a.count - b.count;
					break;
				case "priority":
					comparison = (a.priority || 0) - (b.priority || 0);
					break;
				case "id":
					comparison = a.id - b.id;
					break;
				default:
					comparison = a.name.localeCompare(b.name);
			}

			return order === "DESC" ? -comparison : comparison;
		});

		// Limit results
		return filtered.slice(0, limit);
	};

	const filteredCategories = getFilteredCategories();

	// Options for select controls
	const orderByOptions = [
		{ label: __("Name", "blaze-gutenberg"), value: "name" },
		{ label: __("Product Count", "blaze-gutenberg"), value: "count" },
		{ label: __("Priority", "blaze-gutenberg"), value: "priority" },
		{ label: __("ID", "blaze-gutenberg"), value: "id" },
	];

	const orderOptions = [
		{ label: __("Ascending", "blaze-gutenberg"), value: "ASC" },
		{ label: __("Descending", "blaze-gutenberg"), value: "DESC" },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Category Selection", "blaze-gutenberg")}
					initialOpen={true}>
					{categories.length > 0 && (
						<div className="blaze-category-selection">
							<p>
								{__(
									"Select categories to display (leave empty for all):",
									"blaze-gutenberg",
								)}
							</p>
							{categories.map((category) => (
								<CheckboxControl
									key={category.id}
									label={`${category.name} (${category.count})`}
									checked={selectedCategories.includes(category.id.toString())}
									onChange={(checked) => {
										const newSelection = checked
											? [...selectedCategories, category.id.toString()]
											: selectedCategories.filter(
													(id) => id !== category.id.toString(),
											  );
										setAttributes({ selectedCategories: newSelection });
									}}
								/>
							))}
						</div>
					)}

					<ToggleControl
						label={__("Hide Empty Categories", "blaze-gutenberg")}
						help={__(
							"Hide categories that have no products",
							"blaze-gutenberg",
						)}
						checked={hideEmpty}
						onChange={(value) => setAttributes({ hideEmpty: value })}
					/>
				</PanelBody>

				<PanelBody
					title={__("Sorting & Display", "blaze-gutenberg")}
					initialOpen={false}>
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
						label={__("Number of Categories", "blaze-gutenberg")}
						value={limit}
						onChange={(value) => setAttributes({ limit: value })}
						min={1}
						max={50}
					/>

					<ToggleControl
						label={__("Show Product Count", "blaze-gutenberg")}
						checked={showProductCount}
						onChange={(value) => setAttributes({ showProductCount: value })}
					/>

					<ToggleControl
						label={__("Show Description", "blaze-gutenberg")}
						checked={showDescription}
						onChange={(value) => setAttributes({ showDescription: value })}
					/>
				</PanelBody>

				<PanelBody
					title={__("Responsive Columns", "blaze-gutenberg")}
					initialOpen={false}>
					<RangeControl
						label={__("Columns (Desktop)", "blaze-gutenberg")}
						value={columnsDesktop}
						onChange={(value) => setAttributes({ columnsDesktop: value })}
						min={1}
						max={6}
					/>

					<RangeControl
						label={__("Columns (Tablet)", "blaze-gutenberg")}
						value={columnsTablet}
						onChange={(value) => setAttributes({ columnsTablet: value })}
						min={1}
						max={4}
					/>

					<RangeControl
						label={__("Columns (Mobile)", "blaze-gutenberg")}
						value={columnsMobile}
						onChange={(value) => setAttributes({ columnsMobile: value })}
						min={1}
						max={3}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="blaze-category-grid-preview">
					{isLoading ? (
						<div className="blaze-loading">
							<Spinner />
							<p>{__("Loading categories...", "blaze-gutenberg")}</p>
						</div>
					) : (
						<div
							className="blaze-categories-grid"
							style={{
								display: "grid",
								gridTemplateColumns: `repeat(${columnsDesktop}, 1fr)`,
								gap: "20px",
								"--category-name-color": categoryNameColor,
								"--category-description-color": categoryDescriptionColor,
								"--product-count-color": productCountColor,
							}}>
							{filteredCategories.length > 0 ? (
								filteredCategories.map((category) => (
									<CategoryCard
										key={category.id}
										category={category}
										isEditor={true}
										showProductCount={showProductCount}
										showDescription={showDescription}
										categoryNameColor={categoryNameColor}
										categoryDescriptionColor={categoryDescriptionColor}
										productCountColor={productCountColor}
									/>
								))
							) : (
								<div className="blaze-no-categories">
									<p>
										{__(
											"No categories found. Please check your selection criteria.",
											"blaze-gutenberg",
										)}
									</p>
								</div>
							)}
						</div>
					)}

					<div className="blaze-grid-info">
						<p>
							{__("Desktop: ", "blaze-gutenberg")}
							{columnsDesktop} |{__(" Tablet: ", "blaze-gutenberg")}
							{columnsTablet} |{__(" Mobile: ", "blaze-gutenberg")}
							{columnsMobile}
						</p>
						<p>
							{__("Showing ", "blaze-gutenberg")}
							{filteredCategories.length}
							{__(" of ", "blaze-gutenberg")}
							{categories.length}
							{__(" categories", "blaze-gutenberg")}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
