/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * CategoryCard component for displaying individual category items
 */
export default function CategoryCard({
	category,
	isEditor = false,
	showProductCount = true,
	showDescription = false,
	categoryNameColor = "",
	categoryDescriptionColor = "",
	productCountColor = "",
}) {
	const {
		id,
		name,
		slug,
		description,
		count,
		image,
		link,
	} = category;

	const cardStyles = {
		"--category-name-color": categoryNameColor,
		"--category-description-color": categoryDescriptionColor,
		"--product-count-color": productCountColor,
	};

	const CardWrapper = isEditor ? "div" : "a";
	const cardProps = isEditor
		? { className: "blaze-category-card" }
		: { 
			className: "blaze-category-card",
			href: link,
			"aria-label": __(`View ${name} category`, "blaze-gutenberg")
		};

	return (
		<CardWrapper {...cardProps} style={cardStyles}>
			<div className="blaze-category-card__image">
				{image ? (
					<img
						src={image}
						alt={name}
						loading="lazy"
						className="blaze-category-image"
					/>
				) : (
					<div className="blaze-category-placeholder">
						<span className="blaze-category-icon">📦</span>
					</div>
				)}
			</div>
			
			<div className="blaze-category-card__content">
				<h3 className="blaze-category-card__name">
					{name}
				</h3>
				
				{showDescription && description && (
					<p className="blaze-category-card__description">
						{description}
					</p>
				)}
				
				{showProductCount && (
					<span className="blaze-category-card__count">
						{count === 1
							? __("1 product", "blaze-gutenberg")
							: __(`${count} products`, "blaze-gutenberg")
						}
					</span>
				)}
			</div>
		</CardWrapper>
	);
}
