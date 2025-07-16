/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/filter-blocks.js":
/*!***************************************!*\
  !*** ./src/frontend/filter-blocks.js ***!
  \***************************************/
/***/ (() => {

/**
 * Frontend JavaScript for Filter Blocks
 * Handles collapsible headers, show more/less functionality, and filter interactions
 */

(function () {
  "use strict";

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFilterBlocks);
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
    // Only add collapse functionality to non-category filters
    const headers = document.querySelectorAll(".blaze-filter-header");
    headers.forEach(header => {
      const filterBlock = header.closest('[class*="blaze-filter-by-"]');
      const filterType = getFilterType(filterBlock);

      // Skip category filters - they don't have collapse functionality
      if (filterType === "category") {
        return;
      }
      header.addEventListener("click", handleHeaderClick);
      header.addEventListener("keydown", handleHeaderKeydown);
    });
  }

  /**
   * Handle header click events
   */
  function handleHeaderClick(event) {
    const header = event.currentTarget;
    const content = header.nextElementSibling;
    const icon = header.querySelector(".blaze-filter-toggle-icon");
    if (!content || !content.classList.contains("blaze-filter-content")) {
      return;
    }
    const isCollapsed = header.getAttribute("data-collapsed") === "true";
    if (isCollapsed) {
      // Expand
      content.style.display = "block";
      header.setAttribute("data-collapsed", "false");
      header.setAttribute("aria-expanded", "true");
      if (icon) {
        icon.style.transform = "rotate(180deg)";
      }
    } else {
      // Collapse
      content.style.display = "none";
      header.setAttribute("data-collapsed", "true");
      header.setAttribute("aria-expanded", "false");
      if (icon) {
        icon.style.transform = "rotate(0deg)";
      }
    }
  }

  /**
   * Handle header keyboard events
   */
  function handleHeaderKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleHeaderClick(event);
    }
  }

  /**
   * Initialize show more/less functionality
   */
  function initShowMoreLess() {
    const showMoreButtons = document.querySelectorAll(".blaze-filter-show-more");
    showMoreButtons.forEach(button => {
      button.addEventListener("click", handleShowMoreClick);
    });
  }

  /**
   * Handle show more/less button clicks
   */
  function handleShowMoreClick(event) {
    const button = event.currentTarget;
    const hiddenItems = button.parentElement.querySelector(".blaze-filter-hidden-items");
    const showMoreText = button.querySelector(".show-more-text");
    const showLessText = button.querySelector(".show-less-text");
    if (!hiddenItems || !showMoreText || !showLessText) {
      return;
    }
    const isExpanded = hiddenItems.style.display !== "none";
    if (isExpanded) {
      // Hide items
      hiddenItems.style.display = "none";
      showMoreText.style.display = "inline";
      showLessText.style.display = "none";
    } else {
      // Show items
      hiddenItems.style.display = "block";
      showMoreText.style.display = "none";
      showLessText.style.display = "inline";
    }
  }

  /**
   * Initialize filter interaction functionality
   */
  function initFilterInteractions() {
    const filterCheckboxes = document.querySelectorAll(".blaze-filter-checkbox");
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", handleFilterChange);
    });

    // Handle color swatch clicks for attribute filters
    const colorSwatches = document.querySelectorAll(".blaze-filter-by-attribute.display-color-swatches .blaze-filter-checkbox-item");
    colorSwatches.forEach(swatch => {
      swatch.addEventListener("click", handleColorSwatchClick);
    });

    // Handle category label clicks for navigation
    const categoryLabels = document.querySelectorAll(".blaze-filter-by-category .blaze-filter-checkbox-label");
    categoryLabels.forEach(label => {
      label.addEventListener("click", handleCategoryLabelClick);
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
    const filterType = getFilterType(filterBlock);

    // For category filters, implement single selection
    if (filterType === "category") {
      // Uncheck all other checkboxes in this filter block
      const allCheckboxes = filterBlock.querySelectorAll(".blaze-filter-checkbox");
      allCheckboxes.forEach(cb => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
    }

    // Update URL parameters and trigger filtering
    updateFiltersAndReload(filterBlock);
  }

  /**
   * Handle color swatch clicks
   */
  function handleColorSwatchClick(event) {
    // Prevent double-triggering if checkbox was clicked directly
    if (event.target.classList.contains("blaze-filter-checkbox")) {
      return;
    }
    const swatchItem = event.currentTarget;
    const checkbox = swatchItem.querySelector(".blaze-filter-checkbox");
    if (checkbox) {
      checkbox.checked = !checkbox.checked;

      // Update visual state
      if (checkbox.checked) {
        swatchItem.classList.add("is-selected");
      } else {
        swatchItem.classList.remove("is-selected");
      }

      // Trigger filter change
      checkbox.dispatchEvent(new Event("change"));
    }
  }

  /**
   * Handle category label clicks for navigation
   */
  function handleCategoryLabelClick(event) {
    // Prevent default label behavior
    event.preventDefault();
    event.stopPropagation();
    const label = event.currentTarget;
    const checkboxItem = label.closest(".blaze-filter-checkbox-item");
    const checkbox = checkboxItem.querySelector(".blaze-filter-checkbox");
    if (checkbox && checkbox.dataset.termSlug) {
      // Navigate directly to category page
      window.location.href = `/product-category/${checkbox.dataset.termSlug}/`;
    }
  }

  /**
   * Update URL parameters and reload page with filters
   */
  function updateFiltersAndReload(filterBlock) {
    const filterType = getFilterType(filterBlock);

    // For category filters, redirect to category page directly
    if (filterType === "category") {
      handleCategoryNavigation(filterBlock);
      return;
    }

    // For other filters (attribute, stock status, etc.), use parameter filtering
    const url = new URL(window.location);
    const paramName = getFilterParamName(filterBlock, filterType);

    // Get all checked values for this filter
    const checkedBoxes = filterBlock.querySelectorAll(".blaze-filter-checkbox:checked");
    const values = Array.from(checkedBoxes).map(cb => cb.value);

    // Update URL parameter
    if (values.length > 0) {
      url.searchParams.set(paramName, values.join(","));
    } else {
      url.searchParams.delete(paramName);
    }

    // Remove page parameter to start from page 1 when filtering
    url.searchParams.delete("paged");

    // Reload page with new filters
    window.location.href = url.toString();
  }

  /**
   * Handle category navigation - redirect to category page
   */
  function handleCategoryNavigation(filterBlock) {
    const checkedBoxes = filterBlock.querySelectorAll(".blaze-filter-checkbox:checked");
    if (checkedBoxes.length === 0) {
      // No category selected, stay on current page
      return;
    }

    // Get the first checked category (for single selection)
    const firstChecked = checkedBoxes[0];
    const categorySlug = firstChecked.dataset.termSlug;
    if (categorySlug) {
      // Redirect to category page
      window.location.href = `/product-category/${categorySlug}/`;
    }
  }

  /**
   * Get filter type from block element
   */
  function getFilterType(filterBlock) {
    if (filterBlock.classList.contains("blaze-filter-by-category")) {
      return filterBlock.getAttribute("data-filter-type") || "category";
    } else if (filterBlock.classList.contains("blaze-filter-by-attribute")) {
      return "attribute";
    } else if (filterBlock.classList.contains("blaze-filter-by-stock-status")) {
      return "stock-status";
    }
    return "unknown";
  }

  /**
   * Get URL parameter name for filter type
   */
  function getFilterParamName(filterBlock, filterType) {
    switch (filterType) {
      case "category":
        return "filter_category";
      case "tag":
        return "filter_tag";
      case "attribute":
        const attributeSlug = filterBlock.getAttribute("data-attribute");
        return "filter_" + (attributeSlug ? attributeSlug.replace("pa_", "") : "attribute");
      case "stock-status":
        return "filter_stock_status";
      default:
        return "filter_unknown";
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

      // Skip category filters - they don't use URL parameters
      if (filterType === "category") {
        return;
      }
      const paramName = getFilterParamName(filterBlock, filterType);
      const paramValue = url.searchParams.get(paramName);
      if (paramValue) {
        const values = paramValue.split(",");
        const checkboxes = filterBlock.querySelectorAll(".blaze-filter-checkbox");
        checkboxes.forEach(checkbox => {
          if (values.includes(checkbox.value)) {
            checkbox.checked = true;

            // Update visual state for color swatches
            const item = checkbox.closest(".blaze-filter-checkbox-item");
            if (item && filterBlock.classList.contains("display-color-swatches")) {
              item.classList.add("is-selected");
            }
          }
        });
      }
    });
  }

  // Initialize filter state from URL on page load
  initFilterStateFromURL();
})();

/***/ }),

/***/ "./src/frontend/product-card.js":
/*!**************************************!*\
  !*** ./src/frontend/product-card.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/frontend/utils.js");
// Product Card Frontend Functionality

class BlazeProductCard {
  constructor() {
    this.cleanupFunctions = [];
    this.init();
  }
  init() {
    // Wait for DOM to be ready
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.domReady)(() => this.initializeCards());
  }
  initializeCards() {
    // Find all product cards
    const productCards = document.querySelectorAll(".blaze-product-card");
    productCards.forEach(card => {
      this.initializeCard(card);
    });
  }
  initializeCard(card) {
    // Initialize hover functionality for image switching
    this.initImageHover(card);

    // Initialize add to cart functionality
    this.initAddToCart(card);

    // Initialize enquire functionality
    this.initEnquire(card);
  }
  initImageHover(card) {
    const mainImage = card.querySelector(".main-image");
    const hoverImage = card.querySelector(".hover-image");
    if (mainImage && hoverImage) {
      const cleanupEnter = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.addEventListenerWithCleanup)(card, "mouseenter", () => {
        mainImage.style.display = "none";
        hoverImage.style.display = "block";
      });
      const cleanupLeave = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.addEventListenerWithCleanup)(card, "mouseleave", () => {
        mainImage.style.display = "block";
        hoverImage.style.display = "none";
      });
      this.cleanupFunctions.push(cleanupEnter, cleanupLeave);
    }
  }
  initAddToCart(card) {
    const addToCartBtn = card.querySelector(".add-to-cart");
    if (addToCartBtn && !addToCartBtn.href.includes("add-to-cart")) {
      addToCartBtn.addEventListener("click", e => {
        e.preventDefault();
        // Add custom add to cart logic here if needed
        window.location.href = addToCartBtn.href;
      });
    }
  }
  initEnquire(card) {
    const enquireBtn = card.querySelector(".enquire-now");
    if (enquireBtn) {
      enquireBtn.addEventListener("click", e => {
        // Add custom enquire logic here if needed
        // For now, just follow the link
      });
    }
  }

  // Method to reinitialize cards (useful for dynamically loaded content)
  reinitialize() {
    this.cleanup();
    this.initializeCards();
  }

  // Cleanup all event listeners
  cleanup() {
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }
}

// Initialize when script loads
const blazeProductCard = new BlazeProductCard();

// Make it globally available for dynamic content
window.BlazeProductCard = blazeProductCard;

/***/ }),

/***/ "./src/frontend/utils.js":
/*!*******************************!*\
  !*** ./src/frontend/utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* binding */ EventEmitter),
/* harmony export */   addEventListenerWithCleanup: () => (/* binding */ addEventListenerWithCleanup),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   domReady: () => (/* binding */ domReady),
/* harmony export */   isInViewport: () => (/* binding */ isInViewport),
/* harmony export */   throttle: () => (/* binding */ throttle)
/* harmony export */ });
// Frontend Utility Functions

/**
 * Wait for DOM to be ready
 * @param {Function} callback - Function to execute when DOM is ready
 */
function domReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

/**
 * Add event listener with automatic cleanup
 * @param {Element} element - Element to add listener to
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 * @returns {Function} Cleanup function
 */
function addEventListenerWithCleanup(element, event, handler, options = {}) {
  element.addEventListener(event, handler, options);
  return () => element.removeEventListener(event, handler, options);
}

/**
 * Simple event emitter for component communication
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./src/frontend/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/frontend/utils.js");
/* harmony import */ var _product_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-card.js */ "./src/frontend/product-card.js");
/* harmony import */ var _filter_blocks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter-blocks.js */ "./src/frontend/filter-blocks.js");
/* harmony import */ var _filter_blocks_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_filter_blocks_js__WEBPACK_IMPORTED_MODULE_2__);
// Frontend JavaScript Entry Point




// Add other frontend modules here as needed
// import './other-module.js';
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map