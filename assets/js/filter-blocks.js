/**
 * Frontend JavaScript for Filter Blocks
 * Handles collapsible headers, show more/less functionality, and filter interactions
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFilterBlocks);
    } else {
        initFilterBlocks();
    }

    function initFilterBlocks() {
        initCollapsibleHeaders();
        initShowMoreLess();
        initFilterInteractions();
    }

    /**
     * Initialize collapsible header functionality
     */
    function initCollapsibleHeaders() {
        const headers = document.querySelectorAll('.blaze-filter-header');
        
        headers.forEach(header => {
            header.addEventListener('click', handleHeaderClick);
            header.addEventListener('keydown', handleHeaderKeydown);
        });
    }

    /**
     * Handle header click events
     */
    function handleHeaderClick(event) {
        const header = event.currentTarget;
        const content = header.nextElementSibling;
        const icon = header.querySelector('.blaze-filter-toggle-icon');
        
        if (!content || !content.classList.contains('blaze-filter-content')) {
            return;
        }

        const isCollapsed = header.getAttribute('data-collapsed') === 'true';
        
        if (isCollapsed) {
            // Expand
            content.style.display = 'block';
            header.setAttribute('data-collapsed', 'false');
            header.setAttribute('aria-expanded', 'true');
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
        } else {
            // Collapse
            content.style.display = 'none';
            header.setAttribute('data-collapsed', 'true');
            header.setAttribute('aria-expanded', 'false');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        }
    }

    /**
     * Handle header keyboard events
     */
    function handleHeaderKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleHeaderClick(event);
        }
    }

    /**
     * Initialize show more/less functionality
     */
    function initShowMoreLess() {
        const showMoreButtons = document.querySelectorAll('.blaze-filter-show-more');
        
        showMoreButtons.forEach(button => {
            button.addEventListener('click', handleShowMoreClick);
        });
    }

    /**
     * Handle show more/less button clicks
     */
    function handleShowMoreClick(event) {
        const button = event.currentTarget;
        const hiddenItems = button.parentElement.querySelector('.blaze-filter-hidden-items');
        const showMoreText = button.querySelector('.show-more-text');
        const showLessText = button.querySelector('.show-less-text');
        
        if (!hiddenItems || !showMoreText || !showLessText) {
            return;
        }

        const isExpanded = hiddenItems.style.display !== 'none';
        
        if (isExpanded) {
            // Hide items
            hiddenItems.style.display = 'none';
            showMoreText.style.display = 'inline';
            showLessText.style.display = 'none';
        } else {
            // Show items
            hiddenItems.style.display = 'block';
            showMoreText.style.display = 'none';
            showLessText.style.display = 'inline';
        }
    }

    /**
     * Initialize filter interaction functionality
     */
    function initFilterInteractions() {
        const filterCheckboxes = document.querySelectorAll('.blaze-filter-checkbox');
        
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleFilterChange);
        });

        // Handle color swatch clicks for attribute filters
        const colorSwatches = document.querySelectorAll('.blaze-filter-by-attribute.display-color-swatches .blaze-filter-checkbox-item');
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', handleColorSwatchClick);
        });
    }

    /**
     * Handle filter checkbox changes
     */
    function handleFilterChange(event) {
        const checkbox = event.target;
        const filterBlock = checkbox.closest('[class*="blaze-filter-by-"]');
        
        if (!filterBlock) {
            return;
        }

        // Update URL parameters and trigger filtering
        updateFiltersAndReload(filterBlock);
    }

    /**
     * Handle color swatch clicks
     */
    function handleColorSwatchClick(event) {
        // Prevent double-triggering if checkbox was clicked directly
        if (event.target.classList.contains('blaze-filter-checkbox')) {
            return;
        }

        const swatchItem = event.currentTarget;
        const checkbox = swatchItem.querySelector('.blaze-filter-checkbox');
        
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            
            // Update visual state
            if (checkbox.checked) {
                swatchItem.classList.add('is-selected');
            } else {
                swatchItem.classList.remove('is-selected');
            }
            
            // Trigger filter change
            checkbox.dispatchEvent(new Event('change'));
        }
    }

    /**
     * Update URL parameters and reload page with filters
     */
    function updateFiltersAndReload(filterBlock) {
        const url = new URL(window.location);
        const filterType = getFilterType(filterBlock);
        const paramName = getFilterParamName(filterBlock, filterType);
        
        // Get all checked values for this filter
        const checkedBoxes = filterBlock.querySelectorAll('.blaze-filter-checkbox:checked');
        const values = Array.from(checkedBoxes).map(cb => cb.value);
        
        // Update URL parameter
        if (values.length > 0) {
            url.searchParams.set(paramName, values.join(','));
        } else {
            url.searchParams.delete(paramName);
        }
        
        // Reload page with new filters
        window.location.href = url.toString();
    }

    /**
     * Get filter type from block element
     */
    function getFilterType(filterBlock) {
        if (filterBlock.classList.contains('blaze-filter-by-category')) {
            return filterBlock.getAttribute('data-filter-type') || 'category';
        } else if (filterBlock.classList.contains('blaze-filter-by-attribute')) {
            return 'attribute';
        } else if (filterBlock.classList.contains('blaze-filter-by-stock-status')) {
            return 'stock-status';
        }
        return 'unknown';
    }

    /**
     * Get URL parameter name for filter type
     */
    function getFilterParamName(filterBlock, filterType) {
        switch (filterType) {
            case 'category':
                return 'filter_category';
            case 'tag':
                return 'filter_tag';
            case 'attribute':
                const attributeSlug = filterBlock.getAttribute('data-attribute');
                return 'filter_' + (attributeSlug ? attributeSlug.replace('pa_', '') : 'attribute');
            case 'stock-status':
                return 'filter_stock_status';
            default:
                return 'filter_unknown';
        }
    }

    /**
     * Initialize filter state from URL parameters
     */
    function initFilterStateFromURL() {
        const url = new URL(window.location);
        const filterBlocks = document.querySelectorAll('[class*="blaze-filter-by-"]');
        
        filterBlocks.forEach(filterBlock => {
            const filterType = getFilterType(filterBlock);
            const paramName = getFilterParamName(filterBlock, filterType);
            const paramValue = url.searchParams.get(paramName);
            
            if (paramValue) {
                const values = paramValue.split(',');
                const checkboxes = filterBlock.querySelectorAll('.blaze-filter-checkbox');
                
                checkboxes.forEach(checkbox => {
                    if (values.includes(checkbox.value)) {
                        checkbox.checked = true;
                        
                        // Update visual state for color swatches
                        const item = checkbox.closest('.blaze-filter-checkbox-item');
                        if (item && filterBlock.classList.contains('display-color-swatches')) {
                            item.classList.add('is-selected');
                        }
                    }
                });
            }
        });
    }

    // Initialize filter state from URL on page load
    initFilterStateFromURL();

})();
