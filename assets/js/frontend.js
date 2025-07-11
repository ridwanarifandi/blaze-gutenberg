/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/product-card.js":
/*!**************************************!*\
  !*** ./src/frontend/product-card.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/frontend/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/frontend/utils.js");
/* harmony import */ var _product_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-card.js */ "./src/frontend/product-card.js");
// Frontend JavaScript Entry Point



// Add other frontend modules here as needed
// import './other-module.js';
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map