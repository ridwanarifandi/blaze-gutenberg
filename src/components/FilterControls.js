/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Filter Controls Component
 * Reusable inspector controls for filter blocks
 */
const FilterControls = ({ 
	attributes, 
	setAttributes,
	showCountOption = true,
	showMaxVisibleOption = true,
	showTitleOption = true,
	additionalControls = null
}) => {
	const {
		title,
		showCount,
		maxVisible,
		isCollapsed
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__('Filter Settings', 'blaze-gutenberg')} initialOpen={true}>
				{showTitleOption && (
					<TextControl
						label={__('Filter Title', 'blaze-gutenberg')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						help={__('The heading text for this filter block', 'blaze-gutenberg')}
					/>
				)}
				
				{showCountOption && (
					<ToggleControl
						label={__('Show Item Count', 'blaze-gutenberg')}
						checked={showCount}
						onChange={(value) => setAttributes({ showCount: value })}
						help={__('Display the number of products for each filter option', 'blaze-gutenberg')}
					/>
				)}
				
				{showMaxVisibleOption && (
					<RangeControl
						label={__('Maximum Visible Items', 'blaze-gutenberg')}
						value={maxVisible}
						onChange={(value) => setAttributes({ maxVisible: value })}
						min={3}
						max={50}
						help={__('Number of items to show before "Show More" button appears', 'blaze-gutenberg')}
					/>
				)}
				
				<ToggleControl
					label={__('Start Collapsed', 'blaze-gutenberg')}
					checked={isCollapsed}
					onChange={(value) => setAttributes({ isCollapsed: value })}
					help={__('Whether the filter should start in collapsed state', 'blaze-gutenberg')}
				/>
			</PanelBody>
			
			{additionalControls}
		</InspectorControls>
	);
};

export default FilterControls;
