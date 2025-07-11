/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { Icon, chevronUp, chevronDown } from '@wordpress/icons';

/**
 * Filter Header Component
 * Reusable collapsible header for filter blocks
 */
const FilterHeader = ({ title, isCollapsed, onToggle, children }) => {
	return (
		<div className="blaze-filter-block">
			<div 
				className="blaze-filter-header"
				onClick={onToggle}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						onToggle();
					}
				}}
			>
				<h3 className="blaze-filter-title">{title}</h3>
				<Icon 
					icon={isCollapsed ? chevronDown : chevronUp} 
					className="blaze-filter-toggle-icon"
				/>
			</div>
			
			{!isCollapsed && (
				<div className="blaze-filter-content">
					{children}
				</div>
			)}
		</div>
	);
};

export default FilterHeader;
