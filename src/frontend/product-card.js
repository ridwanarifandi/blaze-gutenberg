// Product Card Frontend Functionality
import { domReady, addEventListenerWithCleanup } from "./utils.js";

class BlazeProductCard {
	constructor() {
		this.cleanupFunctions = [];
		this.init();
	}

	init() {
		// Wait for DOM to be ready
		domReady(() => this.initializeCards());
	}

	initializeCards() {
		// Find all product cards
		const productCards = document.querySelectorAll(".blaze-product-card");

		productCards.forEach((card) => {
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
			card.addEventListener("mouseenter", () => {
				mainImage.style.display = "none";
				hoverImage.style.display = "block";
			});

			card.addEventListener("mouseleave", () => {
				mainImage.style.display = "block";
				hoverImage.style.display = "none";
			});
		}
	}

	initAddToCart(card) {
		const addToCartBtn = card.querySelector(".add-to-cart");

		if (addToCartBtn && !addToCartBtn.href.includes("add-to-cart")) {
			addToCartBtn.addEventListener("click", (e) => {
				e.preventDefault();
				// Add custom add to cart logic here if needed
				window.location.href = addToCartBtn.href;
			});
		}
	}

	initEnquire(card) {
		const enquireBtn = card.querySelector(".enquire-now");

		if (enquireBtn) {
			enquireBtn.addEventListener("click", (e) => {
				// Add custom enquire logic here if needed
				// For now, just follow the link
			});
		}
	}

	// Method to reinitialize cards (useful for dynamically loaded content)
	reinitialize() {
		this.initializeCards();
	}
}

// Initialize when script loads
const blazeProductCard = new BlazeProductCard();

// Make it globally available for dynamic content
window.BlazeProductCard = blazeProductCard;
