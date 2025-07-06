// Frontend Utility Functions

/**
 * Wait for DOM to be ready
 * @param {Function} callback - Function to execute when DOM is ready
 */
export function domReady(callback) {
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
export function debounce(func, wait, immediate) {
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
export function throttle(func, limit) {
	let inThrottle;
	return function(...args) {
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
export function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

/**
 * Add event listener with automatic cleanup
 * @param {Element} element - Element to add listener to
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 * @returns {Function} Cleanup function
 */
export function addEventListenerWithCleanup(element, event, handler, options = {}) {
	element.addEventListener(event, handler, options);
	return () => element.removeEventListener(event, handler, options);
}

/**
 * Simple event emitter for component communication
 */
export class EventEmitter {
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
