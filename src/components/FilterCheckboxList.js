/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Filter Checkbox List Component
 * Reusable checkbox list with show more/hide less functionality
 */
const FilterCheckboxList = ({ 
	items = [], 
	selectedItems = [], 
	onSelectionChange, 
	showCount = false,
	maxVisible = 10,
	showMoreText = __('Show More', 'blaze-gutenberg'),
	showLessText = __('Show Less', 'blaze-gutenberg')
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	
	const visibleItems = isExpanded ? items : items.slice(0, maxVisible);
	const hasMoreItems = items.length > maxVisible;
	
	const handleCheckboxChange = (itemId, isChecked) => {
		let newSelection;
		if (isChecked) {
			newSelection = [...selectedItems, itemId];
		} else {
			newSelection = selectedItems.filter(id => id !== itemId);
		}
		onSelectionChange(newSelection);
	};
	
	return (
		<div className="blaze-filter-checkbox-list">
			{visibleItems.map((item) => (
				<label key={item.id} className="blaze-filter-checkbox-item">
					<input
						type="checkbox"
						checked={selectedItems.includes(item.id)}
						onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
						className="blaze-filter-checkbox"
					/>
					<span className="blaze-filter-checkbox-label">
						{item.name}
						{showCount && item.count !== undefined && (
							<span className="blaze-filter-count"> ({item.count})</span>
						)}
					</span>
				</label>
			))}
			
			{hasMoreItems && (
				<button
					type="button"
					className="blaze-filter-show-more"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{isExpanded ? showLessText : showMoreText}
					{!isExpanded && (
						<span className="blaze-filter-remaining-count">
							{' '}({items.length - maxVisible})
						</span>
					)}
				</button>
			)}
		</div>
	);
};

export default FilterCheckboxList;
