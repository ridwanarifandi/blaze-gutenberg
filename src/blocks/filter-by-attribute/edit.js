/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { Spinner, PanelBody, SelectControl, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import FilterHeader from '../../components/FilterHeader';
import FilterCheckboxList from '../../components/FilterCheckboxList';
import FilterControls from '../../components/FilterControls';

/**
 * Edit component for Filter by Attribute block
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		attributeSlug,
		selectedAttributes,
		showCount,
		maxVisible,
		isCollapsed,
		orderBy,
		order,
		hideEmpty,
		displayType
	} = attributes;

	const [attributes_list, setAttributesList] = useState([]);
	const [availableAttributes, setAvailableAttributes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editorCollapsed, setEditorCollapsed] = useState(isCollapsed);

	const blockProps = useBlockProps({
		className: 'blaze-filter-by-attribute is-editor'
	});

	// Fetch available product attributes
	useEffect(() => {
		const fetchAvailableAttributes = async () => {
			try {
				const response = await apiFetch({
					path: '/blaze/v1/product-attributes'
				});
				setAvailableAttributes(response || []);
			} catch (err) {
				console.error('Error fetching attributes:', err);
			}
		};

		fetchAvailableAttributes();
	}, []);

	// Fetch attribute terms when attribute slug changes
	useEffect(() => {
		const fetchAttributeTerms = async () => {
			if (!attributeSlug) {
				setAttributesList([]);
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const response = await apiFetch({
					path: `/blaze/v1/product-attribute-terms/${attributeSlug}?orderby=${orderBy}&order=${order}&hide_empty=${hideEmpty}`
				});

				setAttributesList(response || []);
			} catch (err) {
				setError(err.message);
				setAttributesList([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAttributeTerms();
	}, [attributeSlug, orderBy, order, hideEmpty]);

	const handleSelectionChange = (newSelection) => {
		setAttributes({ selectedAttributes: newSelection });
	};

	const attributeOptions = availableAttributes.map(attr => ({
		label: attr.label,
		value: attr.slug
	}));

	const additionalControls = (
		<>
			<PanelBody title={__('Attribute Settings', 'blaze-gutenberg')} initialOpen={false}>
				<SelectControl
					label={__('Product Attribute', 'blaze-gutenberg')}
					value={attributeSlug}
					options={[
						{ label: __('Select an attribute...', 'blaze-gutenberg'), value: '' },
						...attributeOptions
					]}
					onChange={(value) => setAttributes({ attributeSlug: value })}
					help={__('Choose which product attribute to filter by', 'blaze-gutenberg')}
				/>

				<SelectControl
					label={__('Display Type', 'blaze-gutenberg')}
					value={displayType}
					options={[
						{ label: __('List', 'blaze-gutenberg'), value: 'list' },
						{ label: __('Color Swatches', 'blaze-gutenberg'), value: 'color-swatches' }
					]}
					onChange={(value) => setAttributes({ displayType: value })}
					help={__('How to display the attribute options', 'blaze-gutenberg')}
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
					help={__('Hide attributes with no products', 'blaze-gutenberg')}
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
				{!attributeSlug && (
					<div className="blaze-filter-empty">
						{__('Please select a product attribute in the block settings.', 'blaze-gutenberg')}
					</div>
				)}

				{attributeSlug && isLoading && (
					<div style={{ textAlign: 'center', padding: '2rem' }}>
						<Spinner />
						<p>{__('Loading...', 'blaze-gutenberg')}</p>
					</div>
				)}

				{attributeSlug && error && (
					<div className="blaze-filter-error">
						{__('Error loading data: ', 'blaze-gutenberg') + error}
					</div>
				)}

				{attributeSlug && !isLoading && !error && attributes_list.length === 0 && (
					<div className="blaze-filter-empty">
						{__('No attribute terms found.', 'blaze-gutenberg')}
					</div>
				)}

				{attributeSlug && !isLoading && !error && attributes_list.length > 0 && (
					<FilterCheckboxList
						items={attributes_list}
						selectedItems={selectedAttributes}
						onSelectionChange={handleSelectionChange}
						showCount={showCount}
						maxVisible={maxVisible}
					/>
				)}
			</FilterHeader>
		</div>
	);
}
