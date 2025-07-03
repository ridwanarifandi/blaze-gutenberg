/**
 * Frontend JavaScript Tests
 */

describe('Blaze Gutenberg Frontend', () => {
    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
            <div class="blaze-product-slideshow" id="test-slideshow" 
                 data-desktop-slides="4" 
                 data-tablet-slides="3" 
                 data-mobile-slides="1"
                 data-autoplay="true"
                 data-autoplay-delay="3000">
                <div class="swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">Product 1</div>
                        <div class="swiper-slide">Product 2</div>
                        <div class="swiper-slide">Product 3</div>
                        <div class="swiper-slide">Product 4</div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        `;

        // Mock Swiper
        global.Swiper = jest.fn().mockImplementation(() => ({
            destroy: jest.fn(),
            update: jest.fn(),
        }));
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('should initialize slideshow with correct configuration', () => {
        // Load the frontend script
        require('../../assets/js/frontend.js');

        // Trigger DOMContentLoaded
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);

        // Check if Swiper was called
        expect(global.Swiper).toHaveBeenCalled();

        // Check configuration
        const config = global.Swiper.mock.calls[0][1];
        expect(config.slidesPerView).toBe(1); // Mobile default
        expect(config.breakpoints[768].slidesPerView).toBe(3); // Tablet
        expect(config.breakpoints[1024].slidesPerView).toBe(4); // Desktop
        expect(config.autoplay).toBeDefined();
        expect(config.autoplay.delay).toBe(3000);
    });

    test('should handle missing Swiper gracefully', () => {
        global.Swiper = undefined;

        // Load the frontend script
        require('../../assets/js/frontend.js');

        // Trigger DOMContentLoaded
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);

        // Should not throw error
        expect(true).toBe(true);
    });

    test('should parse data attributes correctly', () => {
        // Load the frontend script
        require('../../assets/js/frontend.js');

        const container = document.getElementById('test-slideshow');
        const config = getSlideshowConfig(container);

        expect(config.slidesPerView).toBe(1);
        expect(config.breakpoints[768].slidesPerView).toBe(3);
        expect(config.breakpoints[1024].slidesPerView).toBe(4);
        expect(config.autoplay.delay).toBe(3000);
    });
});
