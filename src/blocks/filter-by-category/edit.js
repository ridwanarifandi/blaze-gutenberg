/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { Spinner, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import FilterHeader from '../../components/FilterHeader';
import FilterCheckboxList from '../../components/FilterCheckboxList';
import FilterControls from '../../components/FilterControls';

/**
 * Edit component for Filter by Category block
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		filterType,
		selectedCategories,
		showCount,
		maxVisible,
		isCollapsed,
		orderBy,
		order,
		hideEmpty
	} = attributes;

	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editorCollapsed, setEditorCollapsed] = useState(isCollapsed);

	const blockProps = useBlockProps({
		className: 'blaze-filter-by-category is-editor'
	});

	// Fetch categories/tags from API
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const endpoint = filterType === 'category' 
					? '/blaze/v1/product-categories'
					: '/blaze/v1/product-tags';
				
				const response = await apiFetch({
					path: endpoint + `?orderby=${orderBy}&order=${order}&hide_empty=${hideEmpty}`
				});

				setCategories(response || []);
			} catch (err) {
				setError(err.message);
				setCategories([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [filterType, orderBy, order, hideEmpty]);

	const handleSelectionChange = (newSelection) => {
		setAttributes({ selectedCategories: newSelection });
	};

	const additionalControls = (
		<>
			<PanelBody title={__('Filter Options', 'blaze-gutenberg')} initialOpen={false}>
				<SelectControl
					label={__('Filter Type', 'blaze-gutenberg')}
					value={filterType}
					options={[
						{ label: __('Categories', 'blaze-gutenberg'), value: 'category' },
						{ label: __('Tags', 'blaze-gutenberg'), value: 'tag' }
					]}
					onChange={(value) => setAttributes({ filterType: value })}
					help={__('Choose whether to filter by product categories or tags', 'blaze-gutenberg')}
				/>

				<SelectControl
					label={__('Order By', 'blaze-gutenberg')}
					value={orderBy}
					options={[
						{ label: __('Name', 'blaze-gutenberg'), value: 'name' },
						{ label: __('Product Count', 'blaze-gutenberg'), value: 'count' },
						{ label: __('ID', 'blaze-gutenberg'), value: 'id' }
					]}
					onChange={(value) => setAttributes({ orderBy: value })}
				/>

				<SelectControl
					label={__('Order', 'blaze-gutenberg')}
					value={order}
					options={[
						{ label: __('Ascending', 'blaze-gutenberg'), value: 'ASC' },
						{ label: __('Descending', 'blaze-gutenberg'), value: 'DESC' }
					]}
					onChange={(value) => setAttributes({ order: value })}
				/>

				<ToggleControl
					label={__('Hide Empty', 'blaze-gutenberg')}
					checked={hideEmpty}
					onChange={(value) => setAttributes({ hideEmpty: value })}
					help={__('Hide categories/tags with no products', 'blaze-gutenberg')}
				/>
			</PanelBody>
		</>
	);

	return (
		<div {...blockProps}>
			<FilterControls
				attributes={attributes}
				setAttributes={setAttributes}
				additionalControls={additionalControls}
			/>

			<FilterHeader
				title={title}
				isCollapsed={editorCollapsed}
				onToggle={() => setEditorCollapsed(!editorCollapsed)}
			>
				{isLoading && (
					<div style={{ textAlign: 'center', padding: '2rem' }}>
						<Spinner />
						<p>{__('Loading...', 'blaze-gutenberg')}</p>
					</div>
				)}

				{error && (
					<div className="blaze-filter-error">
						{__('Error loading data: ', 'blaze-gutenberg') + error}
					</div>
				)}

				{!isLoading && !error && categories.length === 0 && (
					<div className="blaze-filter-empty">
						{__('No items found.', 'blaze-gutenberg')}
					</div>
				)}

				{!isLoading && !error && categories.length > 0 && (
					<FilterCheckboxList
						items={categories}
						selectedItems={selectedCategories}
						onSelectionChange={handleSelectionChange}
						showCount={showCount}
						maxVisible={maxVisible}
					/>
				)}
			</FilterHeader>
		</div>
	);
}
