# Fix: Disable Centered Slides in Product Slideshow

## Problem

The product slideshow was displaying slides in a centered mode, which caused the slides to appear centered rather than aligned to the left/start position. This created an undesired visual effect where slides were not properly aligned.

## Root Cause

The Swiper.js slideshow was using default centered slide behavior, which needed to be explicitly disabled through both JavaScript configuration and CSS styling.

## Solution

### 1. JavaScript Configuration Updates

Updated the Swiper configuration in `templates/blocks/product-slideshow.php` to explicitly disable centered slides:

```php
$swiper_config = [ 
    'centeredSlides' => false,
    'centeredSlidesBounds' => false,
    'slidesPerView' => $mobile_slides,
    'spaceBetween' => 20,
    'slidesOffsetBefore' => 0,
    'slidesOffsetAfter' => 0,
    'normalizeSlideIndex' => true,
    // ... other config
    'breakpoints' => [ 
        768 => [ 
            'slidesPerView' => $tablet_slides,
            'spaceBetween' => 25,
            'centeredSlides' => false, // Explicitly disable for tablet
        ],
        1024 => [ 
            'slidesPerView' => $desktop_slides,
            'spaceBetween' => 30,
            'centeredSlides' => false, // Explicitly disable for desktop
        ],
    ],
];
```

### 2. CSS Updates

Updated the SCSS styles in `src/blocks/product-slideshow/style.scss` to ensure proper alignment:

```scss
.swiper-wrapper {
    align-items: stretch;
}

.swiper-slide {
    height: auto;
    display: flex;
    justify-content: flex-start; // Ensure slides align to start, not center
    align-items: stretch;
}
```

## Key Configuration Properties

### JavaScript Properties Added:

- `centeredSlides: false` - Disables centered slide mode
- `centeredSlidesBounds: false` - Disables centered slide bounds
- `slidesOffsetBefore: 0` - No offset before slides
- `slidesOffsetAfter: 0` - No offset after slides
- `normalizeSlideIndex: true` - Normalizes slide indexing

### CSS Properties Added:

- `justify-content: flex-start` - Aligns slides to the start position
- `align-items: stretch` - Ensures consistent slide heights

## Files Modified

1. **`templates/blocks/product-slideshow.php`**
   - Updated Swiper configuration
   - Added explicit centered slides disable for all breakpoints

2. **`src/blocks/product-slideshow/style.scss`**
   - Added CSS properties to ensure left alignment
   - Updated swiper-wrapper and swiper-slide styles

## Testing

After implementing these changes:

1. **Build assets**: Run `npm run build` to compile the updated CSS
2. **Clear cache**: Clear any WordPress/browser cache
3. **Verify alignment**: Check that slides now align to the left/start position
4. **Test responsiveness**: Ensure the fix works across all breakpoints (mobile, tablet, desktop)

## Expected Result

- Slides should now align to the left/start position
- No more centered appearance
- Consistent alignment across all screen sizes
- Proper slide spacing and layout maintained

## Browser Compatibility

This solution is compatible with all modern browsers that support Flexbox and the Swiper.js library.
