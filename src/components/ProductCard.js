/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Product Card Component
 */
export default function ProductCard({ 
    product, 
    isEditor = false, 
    primaryBackgroundColor = '#1e3a8a',
    primaryFontColor = '#ffffff',
    priceColor = '#1e3a8a'
}) {
    const [isHovered, setIsHovered] = useState(false);
    
    // Mock product data for editor preview
    const mockProduct = {
        id: product?.id || 1,
        title: product?.title || 'Sample Product',
        slug: product?.slug || 'sample-product',
        price: '$99.99',
        salePrice: '$79.99',
        regularPrice: '$99.99',
        onSale: true,
        isNew: false,
        rating: 4.5,
        reviewCount: 15,
        image: 'https://via.placeholder.com/300x300?text=Product+Image',
        hoverImage: 'https://via.placeholder.com/300x300?text=Hover+Image',
        attributes: [
            { name: 'Color', value: 'Blue', type: 'color', color: '#3b82f6' },
            { name: 'Color', value: 'Red', type: 'color', color: '#ef4444' },
        ],
        addToCartUrl: '#',
        enquireUrl: '#',
    };

    const productData = isEditor ? mockProduct : product;

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star full">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
        }

        return stars;
    };

    const renderColorSwatches = (attributes) => {
        const colorAttributes = attributes?.filter(attr => 
            attr.type === 'color' && attr.name.toLowerCase() === 'color'
        ) || [];

        if (colorAttributes.length === 0) return null;

        return (
            <div className="product-swatches">
                {colorAttributes.map((attr, index) => (
                    <span
                        key={index}
                        className="color-swatch"
                        style={{ backgroundColor: attr.color }}
                        title={attr.value}
                    />
                ))}
            </div>
        );
    };

    return (
        <div 
            className="blaze-product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                '--primary-bg-color': primaryBackgroundColor,
                '--primary-font-color': primaryFontColor,
                '--price-color': priceColor,
            }}
        >
            {/* Product Image */}
            <div className="product-image-container">
                <img
                    src={isHovered && productData.hoverImage ? productData.hoverImage : productData.image}
                    alt={productData.title}
                    className="product-image"
                />
                
                {/* Badges */}
                <div className="product-badges">
                    {productData.onSale && (
                        <span className="badge sale-badge">
                            {__('SALE', 'blaze-gutenberg')}
                        </span>
                    )}
                    {productData.isNew && (
                        <span className="badge new-badge">
                            {__('NEW', 'blaze-gutenberg')}
                        </span>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
                {/* Product Title */}
                <h3 className="product-title">
                    {isEditor ? (
                        productData.title
                    ) : (
                        <a href={`/product/${productData.slug}`}>
                            {productData.title}
                        </a>
                    )}
                </h3>

                {/* Color Swatches */}
                {renderColorSwatches(productData.attributes)}

                {/* Reviews */}
                <div className="product-reviews">
                    <div className="stars">
                        {renderStars(productData.rating)}
                    </div>
                    <span className="review-count">
                        {productData.rating} ({productData.reviewCount} {__('reviews', 'blaze-gutenberg')})
                    </span>
                </div>

                {/* Price */}
                <div className="product-price">
                    {productData.onSale ? (
                        <>
                            <span className="sale-price">{productData.salePrice}</span>
                            <span className="regular-price">{productData.regularPrice}</span>
                        </>
                    ) : (
                        <span className="current-price">{productData.price}</span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="product-actions">
                    <button 
                        className="btn btn-primary add-to-cart"
                        onClick={isEditor ? (e) => e.preventDefault() : undefined}
                    >
                        {__('SELECT OPTIONS', 'blaze-gutenberg')}
                    </button>
                    
                    <button 
                        className="btn btn-secondary enquire-now"
                        onClick={isEditor ? (e) => e.preventDefault() : undefined}
                    >
                        {__('ENQUIRE NOW', 'blaze-gutenberg')}
                    </button>
                </div>
            </div>
        </div>
    );
}
