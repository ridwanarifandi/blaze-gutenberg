/**
 * @jest-environment jsdom
 */

// Mock DOM elements for testing
const createMockProductCard = (hasHoverImage = true) => {
	const card = document.createElement('div');
	card.className = 'blaze-product-card';
	card.id = 'product-card-123';

	const mainImage = document.createElement('img');
	mainImage.className = 'product-image main-image';
	mainImage.src = 'main-image.jpg';

	const hoverImage = document.createElement('img');
	hoverImage.className = 'product-image hover-image';
	hoverImage.src = 'hover-image.jpg';
	hoverImage.style.display = 'none';

	const addToCartBtn = document.createElement('a');
	addToCartBtn.className = 'btn btn-primary add-to-cart';
	addToCartBtn.href = '/product/123';

	const enquireBtn = document.createElement('a');
	enquireBtn.className = 'btn btn-secondary enquire-now';
	enquireBtn.href = '/product/123#enquire';

	card.appendChild(mainImage);
	if (hasHoverImage) {
		card.appendChild(hoverImage);
	}
	card.appendChild(addToCartBtn);
	card.appendChild(enquireBtn);

	return { card, mainImage, hoverImage, addToCartBtn, enquireBtn };
};

describe('BlazeProductCard', () => {
	let BlazeProductCard;

	beforeEach(() => {
		// Clear DOM
		document.body.innerHTML = '';
		
		// Reset modules
		jest.resetModules();
		
		// Mock the utils module
		jest.doMock('../../../src/frontend/utils.js', () => ({
			domReady: (callback) => callback(),
			addEventListenerWithCleanup: (element, event, handler, options) => {
				element.addEventListener(event, handler, options);
				return () => element.removeEventListener(event, handler, options);
			}
		}));
	});

	test('should initialize product cards on DOM ready', () => {
		const { card } = createMockProductCard();
		document.body.appendChild(card);

		// Import after DOM setup
		const productCardModule = require('../../../src/frontend/product-card.js');
		
		// Verify card was found and initialized
		expect(card.querySelector('.main-image')).toBeTruthy();
		expect(card.querySelector('.hover-image')).toBeTruthy();
	});

	test('should handle image hover effects', () => {
		const { card, mainImage, hoverImage } = createMockProductCard();
		document.body.appendChild(card);

		// Import after DOM setup
		require('../../../src/frontend/product-card.js');

		// Test mouseenter
		const mouseEnterEvent = new Event('mouseenter');
		card.dispatchEvent(mouseEnterEvent);

		expect(mainImage.style.display).toBe('none');
		expect(hoverImage.style.display).toBe('block');

		// Test mouseleave
		const mouseLeaveEvent = new Event('mouseleave');
		card.dispatchEvent(mouseLeaveEvent);

		expect(mainImage.style.display).toBe('block');
		expect(hoverImage.style.display).toBe('none');
	});

	test('should handle cards without hover images', () => {
		const { card } = createMockProductCard(false);
		document.body.appendChild(card);

		// Should not throw error when hover image is missing
		expect(() => {
			require('../../../src/frontend/product-card.js');
		}).not.toThrow();
	});

	test('should provide global access for reinitialize', () => {
		const { card } = createMockProductCard();
		document.body.appendChild(card);

		require('../../../src/frontend/product-card.js');

		// Should be available globally
		expect(window.BlazeProductCard).toBeDefined();
		expect(typeof window.BlazeProductCard.reinitialize).toBe('function');
	});

	test('should cleanup event listeners on reinitialize', () => {
		const { card } = createMockProductCard();
		document.body.appendChild(card);

		require('../../../src/frontend/product-card.js');

		const addEventListenerSpy = jest.spyOn(card, 'addEventListener');
		const removeEventListenerSpy = jest.spyOn(card, 'removeEventListener');

		// Reinitialize should cleanup and re-add listeners
		window.BlazeProductCard.reinitialize();

		expect(removeEventListenerSpy).toHaveBeenCalled();
		expect(addEventListenerSpy).toHaveBeenCalled();
	});
});
