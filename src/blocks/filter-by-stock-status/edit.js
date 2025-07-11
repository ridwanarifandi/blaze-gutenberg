/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { Spinner, PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import FilterHeader from '../../components/FilterHeader';
import FilterCheckboxList from '../../components/FilterCheckboxList';
import FilterControls from '../../components/FilterControls';

/**
 * Edit component for Filter by Stock Status block
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		selectedStatuses,
		showCount,
		maxVisible,
		isCollapsed,
		enabledStatuses
	} = attributes;

	const [stockStatuses, setStockStatuses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editorCollapsed, setEditorCollapsed] = useState(isCollapsed);

	const blockProps = useBlockProps({
		className: 'blaze-filter-by-stock-status is-editor'
	});

	// Define available stock statuses
	const availableStatuses = {
		instock: { 
			id: 'instock', 
			name: __('In Stock', 'blaze-gutenberg'), 
			count: 0 
		},
		onsale: { 
			id: 'onsale', 
			name: __('Sale', 'blaze-gutenberg'), 
			count: 0 
		},
		new: { 
			id: 'new', 
			name: __('New Arrivals', 'blaze-gutenberg'), 
			count: 0 
		},
		outofstock: { 
			id: 'outofstock', 
			name: __('Out of Stock', 'blaze-gutenberg'), 
			count: 0 
		},
		backorder: { 
			id: 'backorder', 
			name: __('On Backorder', 'blaze-gutenberg'), 
			count: 0 
		}
	};

	// Fetch stock status counts from API
	useEffect(() => {
		const fetchStockStatusCounts = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await apiFetch({
					path: '/blaze/v1/product-stock-status-counts'
				});

				// Build the stock statuses list based on enabled statuses and counts
				const statusList = [];
				Object.keys(enabledStatuses).forEach(statusKey => {
					if (enabledStatuses[statusKey] && availableStatuses[statusKey]) {
						const status = { ...availableStatuses[statusKey] };
						status.count = response[statusKey] || 0;
						statusList.push(status);
					}
				});

				setStockStatuses(statusList);
			} catch (err) {
				setError(err.message);
				// Fallback to enabled statuses without counts
				const statusList = [];
				Object.keys(enabledStatuses).forEach(statusKey => {
					if (enabledStatuses[statusKey] && availableStatuses[statusKey]) {
						statusList.push(availableStatuses[statusKey]);
					}
				});
				setStockStatuses(statusList);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStockStatusCounts();
	}, [enabledStatuses]);

	const handleSelectionChange = (newSelection) => {
		setAttributes({ selectedStatuses: newSelection });
	};

	const handleStatusToggle = (statusKey, enabled) => {
		setAttributes({
			enabledStatuses: {
				...enabledStatuses,
				[statusKey]: enabled
			}
		});
	};

	const additionalControls = (
		<>
			<PanelBody title={__('Stock Status Options', 'blaze-gutenberg')} initialOpen={false}>
				{Object.keys(availableStatuses).map(statusKey => (
					<ToggleControl
						key={statusKey}
						label={availableStatuses[statusKey].name}
						checked={enabledStatuses[statusKey] || false}
						onChange={(value) => handleStatusToggle(statusKey, value)}
						help={__('Show this stock status option in the filter', 'blaze-gutenberg')}
					/>
				))}
			</PanelBody>
		</>
	);

	return (
		<div {...blockProps}>
			<FilterControls
				attributes={attributes}
				setAttributes={setAttributes}
				showMaxVisibleOption={false} // Stock status usually has few items
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

				{!isLoading && stockStatuses.length === 0 && (
					<div className="blaze-filter-empty">
						{__('No stock status options enabled. Please enable some options in the block settings.', 'blaze-gutenberg')}
					</div>
				)}

				{!isLoading && stockStatuses.length > 0 && (
					<FilterCheckboxList
						items={stockStatuses}
						selectedItems={selectedStatuses}
						onSelectionChange={handleSelectionChange}
						showCount={showCount}
						maxVisible={maxVisible}
					/>
				)}
			</FilterHeader>
		</div>
	);
}
