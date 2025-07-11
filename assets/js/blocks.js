<<<<<<< HEAD
(()=>{"use strict";var e,t={20:(e,t,l)=>{var a=l(609),r=Symbol.for("react.element"),o=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,s=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,l){var a,o={},c=null,u=null;for(a in void 0!==l&&(c=""+l),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)n.call(t,a)&&!i.hasOwnProperty(a)&&(o[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===o[a]&&(o[a]=t[a]);return{$$typeof:r,type:e,key:c,ref:u,props:o,_owner:s.current}}t.Fragment=o,t.jsx=c,t.jsxs=c},289:(e,t,l)=>{const a=window.wp.blocks,r=window.wp.i18n,o=window.wp.blockEditor,n=window.wp.components,s=(window.wp.data,window.wp.element),i=window.wp.apiFetch;var c=l.n(i),u=l(848);function g({product:e,isEditor:t=!1,primaryBackgroundColor:l="#1e3a8a",primaryFontColor:a="#ffffff",priceColor:o="#1e3a8a",showBadges:n=!0,showRating:i=!0,showColorSwatches:c=!0,showAddToCart:g=!0,showEnquireButton:d=!0}){const[b,p]=(0,s.useState)(!1),h=t?{id:e?.id||1,title:e?.title||"Sample Product",slug:e?.slug||"sample-product",price:"$99.99",salePrice:"$79.99",regularPrice:"$99.99",onSale:!0,isNew:!1,rating:4.5,reviewCount:15,image:"https://via.placeholder.com/300x300?text=Product+Image",hoverImage:"https://via.placeholder.com/300x300?text=Hover+Image",attributes:[{name:"Color",value:"Blue",type:"color",color:"#3b82f6"},{name:"Color",value:"Red",type:"color",color:"#ef4444"}],addToCartUrl:"#",enquireUrl:"#"}:e;return(0,u.jsxs)("div",{className:"blaze-product-card",onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),style:{"--primary-bg-color":l,"--primary-font-color":a,"--price-color":o},children:[(0,u.jsxs)("div",{className:"product-image-container",children:[(0,u.jsx)("img",{src:b&&h.hoverImage?h.hoverImage:h.image,alt:h.title,className:"product-image"}),n&&(0,u.jsxs)("div",{className:"product-badges",children:[h.onSale&&(0,u.jsx)("span",{className:"badge sale-badge",children:(0,r.__)("SALE","blaze-gutenberg")}),h.isNew&&(0,u.jsx)("span",{className:"badge new-badge",children:(0,r.__)("NEW","blaze-gutenberg")})]})]}),(0,u.jsxs)("div",{className:"product-info",children:[(0,u.jsx)("h3",{className:"product-title",children:t?h.title:(0,u.jsx)("a",{href:`/product/${h.slug}`,children:h.title})}),c&&(e=>{const t=e?.filter(e=>"color"===e.type&&"color"===e.name.toLowerCase())||[];return 0===t.length?null:(0,u.jsx)("div",{className:"product-swatches",children:t.map((e,t)=>(0,u.jsx)("span",{className:"color-swatch-border",style:{borderColor:l},children:(0,u.jsx)("span",{className:"color-swatch",style:{backgroundColor:e.color},title:e.value})},t))})})(h.attributes),i&&h.rating>0&&(0,u.jsxs)("div",{className:"product-reviews",children:[(0,u.jsx)("div",{className:"stars",children:(e=>{const t=[],l=Math.floor(e),a=e%1!=0;for(let e=0;e<l;e++)t.push((0,u.jsx)("span",{className:"star full",children:"★"},e));a&&t.push((0,u.jsx)("span",{className:"star half",children:"★"},"half"));const r=5-Math.ceil(e);for(let e=0;e<r;e++)t.push((0,u.jsx)("span",{className:"star empty",children:"☆"},`empty-${e}`));return t})(h.rating)}),(0,u.jsxs)("span",{className:"review-count",children:[h.rating," (",h.reviewCount," ",(0,r.__)("reviews","blaze-gutenberg"),")"]})]}),(0,u.jsx)("div",{className:"product-price",children:h.onSale?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("span",{className:"sale-price",children:h.salePrice}),(0,u.jsx)("span",{className:"regular-price",children:h.regularPrice})]}):(0,u.jsx)("span",{className:"current-price",children:h.price})}),(g||d)&&(0,u.jsxs)("div",{className:"product-actions",children:[g&&(0,u.jsx)("button",{className:"btn btn-primary add-to-cart",onClick:t?e=>e.preventDefault():void 0,children:(0,r.__)("SELECT OPTIONS","blaze-gutenberg")}),d&&(0,u.jsx)("button",{className:"btn btn-secondary enquire-now",onClick:t?e=>e.preventDefault():void 0,children:(0,r.__)("ENQUIRE NOW","blaze-gutenberg")})]})]})]})}function d({category:e,isEditor:t=!1,showProductCount:l=!0,showDescription:a=!1,categoryNameColor:o="",categoryDescriptionColor:n="",productCountColor:s=""}){const{id:i,name:c,slug:g,description:d,count:b,image:p,link:h}=e,m={"--category-name-color":o,"--category-description-color":n,"--product-count-color":s},_=t?"div":"a",y=t?{className:"blaze-category-card"}:{className:"blaze-category-card",href:h,"aria-label":(0,r.__)(`View ${c} category`,"blaze-gutenberg")};return(0,u.jsxs)(_,{...y,style:m,children:[(0,u.jsx)("div",{className:"blaze-category-card__image",children:p?(0,u.jsx)("img",{src:p,alt:c,loading:"lazy",className:"blaze-category-image"}):(0,u.jsx)("div",{className:"blaze-category-placeholder",children:(0,u.jsx)("span",{className:"blaze-category-icon",children:"📦"})})}),(0,u.jsxs)("div",{className:"blaze-category-card__content",children:[(0,u.jsx)("h3",{className:"blaze-category-card__name",children:c}),a&&d&&(0,u.jsx)("p",{className:"blaze-category-card__description",children:d}),l&&(0,u.jsx)("span",{className:"blaze-category-card__count",children:1===b?(0,r.__)("1 product","blaze-gutenberg"):(0,r.__)(`${b} products`,"blaze-gutenberg")})]})]})}(0,a.registerBlockType)("blaze/product-slideshow",{title:(0,r.__)("WooCommerce Product Slideshow","blaze-gutenberg"),description:(0,r.__)("Display WooCommerce products in an interactive slideshow with hover effects, badges, and customizable settings.","blaze-gutenberg"),category:"blaze-commerce",icon:{src:"slides",foreground:"#1e3a8a"},keywords:[(0,r.__)("product","blaze-gutenberg"),(0,r.__)("slideshow","blaze-gutenberg"),(0,r.__)("woocommerce","blaze-gutenberg"),(0,r.__)("carousel","blaze-gutenberg"),(0,r.__)("slider","blaze-gutenberg")],supports:{align:["wide","full"],html:!1},attributes:{productsPerSlideDesktop:{type:"number",default:4},productsPerSlideTablet:{type:"number",default:3},productsPerSlideMobile:{type:"number",default:1},primaryBackgroundColor:{type:"string",default:"#1e3a8a"},primaryFontColor:{type:"string",default:"#ffffff"},priceColor:{type:"string",default:"#1e3a8a"},showArrows:{type:"boolean",default:!0},showDots:{type:"boolean",default:!0},autoplay:{type:"boolean",default:!1},autoplayDelay:{type:"number",default:3e3},productIds:{type:"array",default:[]},productCategory:{type:"string",default:""},productTag:{type:"string",default:""},orderBy:{type:"string",default:"date"},order:{type:"string",default:"DESC"},limit:{type:"number",default:12},featuredOnly:{type:"boolean",default:!1}},edit:function({attributes:e,setAttributes:t}){const{productsPerSlideDesktop:l,productsPerSlideTablet:a,productsPerSlideMobile:i,primaryBackgroundColor:d,primaryFontColor:b,priceColor:p,showArrows:h,showDots:m,autoplay:_,autoplayDelay:y,productIds:f,productCategory:C,productTag:z,orderBy:x,order:w,limit:v,featuredOnly:j}=e,[S,k]=(0,s.useState)([]),[N,P]=(0,s.useState)([]),[T,B]=(0,s.useState)([]),[E,D]=(0,s.useState)(!0),O=(0,o.useBlockProps)({className:"blaze-product-slideshow-editor"});(0,s.useEffect)(()=>{(async()=>{D(!0);try{const[e,t,l]=await Promise.all([c()({path:"/blaze/v1/products"}),c()({path:"/blaze/v1/product-categories"}),c()({path:"/blaze/v1/product-tags"})]);k(e),P(t),B(l)}catch(e){console.error("Error fetching data:",e)}finally{D(!1)}})()},[]);const A=[{label:(0,r.__)("All Categories","blaze-gutenberg"),value:""},...N.map(e=>({label:e.name,value:e.slug}))],V=[{label:(0,r.__)("All Tags","blaze-gutenberg"),value:""},...T.map(e=>({label:e.name,value:e.slug}))],M=[{label:(0,r.__)("Date","blaze-gutenberg"),value:"date"},{label:(0,r.__)("Title","blaze-gutenberg"),value:"title"},{label:(0,r.__)("Menu Order","blaze-gutenberg"),value:"menu_order"},{label:(0,r.__)("Random","blaze-gutenberg"),value:"rand"}],I=[{label:(0,r.__)("Descending","blaze-gutenberg"),value:"DESC"},{label:(0,r.__)("Ascending","blaze-gutenberg"),value:"ASC"}],R=S.slice(0,l);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(o.InspectorControls,{children:[(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Slideshow Settings","blaze-gutenberg"),initialOpen:!0,children:[(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Products per slide (Desktop)","blaze-gutenberg"),value:l,onChange:e=>t({productsPerSlideDesktop:e}),min:1,max:6}),(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Products per slide (Tablet)","blaze-gutenberg"),value:a,onChange:e=>t({productsPerSlideTablet:e}),min:1,max:4}),(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Products per slide (Mobile)","blaze-gutenberg"),value:i,onChange:e=>t({productsPerSlideMobile:e}),min:1,max:2}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Navigation Arrows","blaze-gutenberg"),checked:h,onChange:e=>t({showArrows:e})}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Dots Navigation","blaze-gutenberg"),checked:m,onChange:e=>t({showDots:e})}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Autoplay","blaze-gutenberg"),checked:_,onChange:e=>t({autoplay:e})}),_&&(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Autoplay Delay (ms)","blaze-gutenberg"),value:y,onChange:e=>t({autoplayDelay:e}),min:1e3,max:1e4,step:500})]}),(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Product Selection","blaze-gutenberg"),initialOpen:!1,children:[(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Featured Products Only","blaze-gutenberg"),help:(0,r.__)("Show only products marked as featured","blaze-gutenberg"),checked:j,onChange:e=>t({featuredOnly:e})}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Category","blaze-gutenberg"),value:C,options:A,onChange:e=>t({productCategory:e})}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Tag","blaze-gutenberg"),value:z,options:V,onChange:e=>t({productTag:e})}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Order By","blaze-gutenberg"),value:x,options:M,onChange:e=>t({orderBy:e})}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Order","blaze-gutenberg"),value:w,options:I,onChange:e=>t({order:e})}),(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Maximum Products","blaze-gutenberg"),value:v,onChange:e=>t({limit:e}),min:1,max:50})]}),(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Color Settings","blaze-gutenberg"),initialOpen:!1,children:[(0,u.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,u.jsx)("label",{children:(0,r.__)("Primary Background Color","blaze-gutenberg")}),(0,u.jsx)(n.ColorPicker,{color:d,onChange:e=>t({primaryBackgroundColor:e})})]}),(0,u.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,u.jsx)("label",{children:(0,r.__)("Primary Font Color","blaze-gutenberg")}),(0,u.jsx)(n.ColorPicker,{color:b,onChange:e=>t({primaryFontColor:e})})]}),(0,u.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,u.jsx)("label",{children:(0,r.__)("Price Color","blaze-gutenberg")}),(0,u.jsx)(n.ColorPicker,{color:p,onChange:e=>t({priceColor:e})})]})]})]}),(0,u.jsx)("div",{...O,children:(0,u.jsxs)("div",{className:"blaze-product-slideshow-preview",children:[E?(0,u.jsxs)("div",{className:"blaze-loading",children:[(0,u.jsx)(n.Spinner,{}),(0,u.jsx)("p",{children:(0,r.__)("Loading products...","blaze-gutenberg")})]}):(0,u.jsx)("div",{className:"blaze-products-grid",style:{display:"grid",gridTemplateColumns:`repeat(${l}, 1fr)`,gap:"20px","--primary-bg-color":d,"--primary-font-color":b,"--price-color":p},children:R.length>0?R.map(e=>(0,u.jsx)(g,{product:e,isEditor:!0,primaryBackgroundColor:d,primaryFontColor:b,priceColor:p},e.id)):(0,u.jsx)("div",{className:"blaze-no-products",children:(0,u.jsx)("p",{children:(0,r.__)("No products found. Please check your selection criteria.","blaze-gutenberg")})})}),(0,u.jsxs)("div",{className:"blaze-slideshow-info",children:[(0,u.jsxs)("p",{children:[(0,r.__)("Desktop: ","blaze-gutenberg"),l," |",(0,r.__)(" Tablet: ","blaze-gutenberg"),a," |",(0,r.__)(" Mobile: ","blaze-gutenberg"),i]}),(0,u.jsxs)("p",{children:[(0,r.__)("Arrows: ","blaze-gutenberg"),h?(0,r.__)("Yes","blaze-gutenberg"):(0,r.__)("No","blaze-gutenberg")," ","|",(0,r.__)(" Dots: ","blaze-gutenberg"),m?(0,r.__)("Yes","blaze-gutenberg"):(0,r.__)("No","blaze-gutenberg")]})]})]})})]})},save:function(){return null}}),(0,a.registerBlockType)("blaze/category-grid",{title:(0,r.__)("WooCommerce Category Grid","blaze-gutenberg"),description:(0,r.__)("Display WooCommerce product categories in a customizable grid layout with responsive columns and sorting options.","blaze-gutenberg"),category:"blaze-commerce",icon:{src:"grid-view",foreground:"#1e3a8a"},keywords:[(0,r.__)("category","blaze-gutenberg"),(0,r.__)("grid","blaze-gutenberg"),(0,r.__)("woocommerce","blaze-gutenberg"),(0,r.__)("product","blaze-gutenberg"),(0,r.__)("categories","blaze-gutenberg")],supports:{align:["wide","full"],html:!1},attributes:{selectedCategories:{type:"array",default:[]},orderBy:{type:"string",default:"name"},order:{type:"string",default:"ASC"},limit:{type:"number",default:12},columnsDesktop:{type:"number",default:4},columnsTablet:{type:"number",default:3},columnsMobile:{type:"number",default:2},showProductCount:{type:"boolean",default:!0},showDescription:{type:"boolean",default:!1},hideEmpty:{type:"boolean",default:!0},categoryNameColor:{type:"string",default:""},categoryDescriptionColor:{type:"string",default:""},productCountColor:{type:"string",default:""}},edit:function({attributes:e,setAttributes:t}){const{selectedCategories:l,orderBy:a,order:i,limit:g,columnsDesktop:b,columnsTablet:p,columnsMobile:h,showProductCount:m,showDescription:_,hideEmpty:y,categoryNameColor:f,categoryDescriptionColor:C,productCountColor:z}=e,[x,w]=(0,s.useState)([]),[v,j]=(0,s.useState)(!0),S=(0,o.useBlockProps)({className:"blaze-category-grid-editor"});(0,s.useEffect)(()=>{(async()=>{j(!0);try{const e=await c()({path:"/blaze/v1/product-categories"});w(e)}catch(e){console.error("Error fetching categories:",e)}finally{j(!1)}})()},[]);const k=(()=>{let e=[...x];return l.length>0&&(e=e.filter(e=>l.includes(e.id.toString()))),y&&(e=e.filter(e=>e.count>0)),e.sort((e,t)=>{let l=0;switch(a){case"name":default:l=e.name.localeCompare(t.name);break;case"count":l=e.count-t.count;break;case"id":l=e.id-t.id}return"DESC"===i?-l:l}),e.slice(0,g)})(),N=[{label:(0,r.__)("Name","blaze-gutenberg"),value:"name"},{label:(0,r.__)("Product Count","blaze-gutenberg"),value:"count"},{label:(0,r.__)("ID","blaze-gutenberg"),value:"id"}],P=[{label:(0,r.__)("Ascending","blaze-gutenberg"),value:"ASC"},{label:(0,r.__)("Descending","blaze-gutenberg"),value:"DESC"}];return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(o.InspectorControls,{children:[(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Category Selection","blaze-gutenberg"),initialOpen:!0,children:[x.length>0&&(0,u.jsxs)("div",{className:"blaze-category-selection",children:[(0,u.jsx)("p",{children:(0,r.__)("Select categories to display (leave empty for all):","blaze-gutenberg")}),x.map(e=>(0,u.jsx)(n.CheckboxControl,{label:`${e.name} (${e.count})`,checked:l.includes(e.id.toString()),onChange:a=>{const r=a?[...l,e.id.toString()]:l.filter(t=>t!==e.id.toString());t({selectedCategories:r})}},e.id))]}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Hide Empty Categories","blaze-gutenberg"),help:(0,r.__)("Hide categories that have no products","blaze-gutenberg"),checked:y,onChange:e=>t({hideEmpty:e})})]}),(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Sorting & Display","blaze-gutenberg"),initialOpen:!1,children:[(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Order By","blaze-gutenberg"),value:a,options:N,onChange:e=>t({orderBy:e})}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Order","blaze-gutenberg"),value:i,options:P,onChange:e=>t({order:e})}),(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Number of Categories","blaze-gutenberg"),value:g,onChange:e=>t({limit:e}),min:1,max:50}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Product Count","blaze-gutenberg"),checked:m,onChange:e=>t({showProductCount:e})}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Description","blaze-gutenberg"),checked:_,onChange:e=>t({showDescription:e})})]}),(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Responsive Columns","blaze-gutenberg"),initialOpen:!1,children:[(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Columns (Desktop)","blaze-gutenberg"),value:b,onChange:e=>t({columnsDesktop:e}),min:1,max:6}),(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Columns (Tablet)","blaze-gutenberg"),value:p,onChange:e=>t({columnsTablet:e}),min:1,max:4}),(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Columns (Mobile)","blaze-gutenberg"),value:h,onChange:e=>t({columnsMobile:e}),min:1,max:3})]})]}),(0,u.jsx)("div",{...S,children:(0,u.jsxs)("div",{className:"blaze-category-grid-preview",children:[v?(0,u.jsxs)("div",{className:"blaze-loading",children:[(0,u.jsx)(n.Spinner,{}),(0,u.jsx)("p",{children:(0,r.__)("Loading categories...","blaze-gutenberg")})]}):(0,u.jsx)("div",{className:"blaze-categories-grid",style:{display:"grid",gridTemplateColumns:`repeat(${b}, 1fr)`,gap:"20px","--category-name-color":f,"--category-description-color":C,"--product-count-color":z},children:k.length>0?k.map(e=>(0,u.jsx)(d,{category:e,isEditor:!0,showProductCount:m,showDescription:_,categoryNameColor:f,categoryDescriptionColor:C,productCountColor:z},e.id)):(0,u.jsx)("div",{className:"blaze-no-categories",children:(0,u.jsx)("p",{children:(0,r.__)("No categories found. Please check your selection criteria.","blaze-gutenberg")})})}),(0,u.jsxs)("div",{className:"blaze-grid-info",children:[(0,u.jsxs)("p",{children:[(0,r.__)("Desktop: ","blaze-gutenberg"),b," |",(0,r.__)(" Tablet: ","blaze-gutenberg"),p," |",(0,r.__)(" Mobile: ","blaze-gutenberg"),h]}),(0,u.jsxs)("p",{children:[(0,r.__)("Showing ","blaze-gutenberg"),k.length,(0,r.__)(" of ","blaze-gutenberg"),x.length,(0,r.__)(" categories","blaze-gutenberg")]})]})]})})]})},save:function(){return null}}),(0,a.registerBlockType)("blaze/product-card",{title:(0,r.__)("WooCommerce Product Card","blaze-gutenberg"),description:(0,r.__)("Display a single WooCommerce product card with customizable styling. Perfect for use in product loops, category pages, and related product sections.","blaze-gutenberg"),category:"blaze-commerce",icon:{src:"products",foreground:"#1e3a8a"},keywords:[(0,r.__)("product","blaze-gutenberg"),(0,r.__)("card","blaze-gutenberg"),(0,r.__)("woocommerce","blaze-gutenberg"),(0,r.__)("shop","blaze-gutenberg"),(0,r.__)("commerce","blaze-gutenberg")],supports:{align:["wide","full"],html:!1,spacing:{margin:!0,padding:!0}},attributes:{productId:{type:"number",default:0},primaryBackgroundColor:{type:"string",default:"#1e3a8a"},primaryFontColor:{type:"string",default:"#ffffff"},priceColor:{type:"string",default:"#1e3a8a"},showBadges:{type:"boolean",default:!0},showRating:{type:"boolean",default:!0},showColorSwatches:{type:"boolean",default:!0},showAddToCart:{type:"boolean",default:!0},showEnquireButton:{type:"boolean",default:!0}},edit:function({attributes:e,setAttributes:t}){const{primaryBackgroundColor:l,primaryFontColor:a,priceColor:s,showBadges:i,showRating:c,showColorSwatches:d,showAddToCart:b,showEnquireButton:p}=e,h=(0,o.useBlockProps)({className:"blaze-product-card-block"}),m={id:1,name:(0,r.__)("Sample Product","blaze-gutenberg"),title:(0,r.__)("Sample Product","blaze-gutenberg"),slug:"sample-product",image:"https://via.placeholder.com/300x300/cccccc/666666?text=Product+Image",hoverImage:"https://via.placeholder.com/300x300/bbbbbb/555555?text=Hover+Image",price:"$29.99",regularPrice:"39.99",salePrice:"29.99",onSale:!0,isNew:!0,rating:4.5,reviewCount:12,permalink:"#",addToCartUrl:"#",addToCartText:(0,r.__)("Add to cart","blaze-gutenberg"),attributes:[{name:"color",type:"color",value:"Red",color:"#ff0000"},{name:"color",type:"color",value:"Blue",color:"#0000ff"}]};return(0,u.jsxs)("div",{...h,children:[(0,u.jsxs)(o.InspectorControls,{children:[(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Display Settings","blaze-gutenberg"),initialOpen:!0,children:[(0,u.jsx)("p",{className:"components-base-control__help",children:(0,r.__)("This block displays the current product from the loop or page context. Configure the display options below.","blaze-gutenberg")}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Badges","blaze-gutenberg"),checked:i,onChange:e=>t({showBadges:e}),help:(0,r.__)("Display sale and new product badges.","blaze-gutenberg")}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Rating","blaze-gutenberg"),checked:c,onChange:e=>t({showRating:e}),help:(0,r.__)("Display product rating and review count.","blaze-gutenberg")}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Color Swatches","blaze-gutenberg"),checked:d,onChange:e=>t({showColorSwatches:e}),help:(0,r.__)("Display color variation swatches if available.","blaze-gutenberg")}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Add to Cart","blaze-gutenberg"),checked:b,onChange:e=>t({showAddToCart:e}),help:(0,r.__)("Display the add to cart button.","blaze-gutenberg")}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Enquire Button","blaze-gutenberg"),checked:p,onChange:e=>t({showEnquireButton:e}),help:(0,r.__)("Display the enquire now button.","blaze-gutenberg")})]}),(0,u.jsx)(o.PanelColorSettings,{title:(0,r.__)("Color Settings","blaze-gutenberg"),initialOpen:!1,colorSettings:[{value:l,onChange:e=>t({primaryBackgroundColor:e}),label:(0,r.__)("Primary Background Color","blaze-gutenberg")},{value:a,onChange:e=>t({primaryFontColor:e}),label:(0,r.__)("Primary Font Color","blaze-gutenberg")},{value:s,onChange:e=>t({priceColor:e}),label:(0,r.__)("Price Color","blaze-gutenberg")}]})]}),(0,u.jsxs)("div",{className:"blaze-product-card-editor-preview",children:[(0,u.jsx)("div",{className:"editor-preview-notice",children:(0,u.jsx)("p",{children:(0,r.__)("Preview: This block will display the current product from the loop or page context.","blaze-gutenberg")})}),(0,u.jsx)(g,{product:m,isEditor:!0,primaryBackgroundColor:l,primaryFontColor:a,priceColor:s,showBadges:i,showRating:c,showColorSwatches:d,showAddToCart:b,showEnquireButton:p})]})]})},save:function(){return null}});var b=l(609);const p=window.wp.primitives,h=(0,b.createElement)(p.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,b.createElement)(p.Path,{d:"M6 5.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM4 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm11-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM13 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm5 8.5h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM15 13a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3zm-9 1.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM4 15a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z",fillRule:"evenodd",clipRule:"evenodd"})),m=(0,s.forwardRef)(function({icon:e,size:t=24,...l},a){return(0,s.cloneElement)(e,{width:t,height:t,...l,ref:a})}),_=(0,b.createElement)(p.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,b.createElement)(p.Path,{d:"M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"})),y=(0,b.createElement)(p.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,b.createElement)(p.Path,{d:"M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"})),f=({title:e,isCollapsed:t,onToggle:l,children:a})=>(0,u.jsxs)("div",{className:"blaze-filter-block",children:[(0,u.jsxs)("div",{className:"blaze-filter-header",onClick:l,role:"button",tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),l())},children:[(0,u.jsx)("h3",{className:"blaze-filter-title",children:e}),(0,u.jsx)(m,{icon:t?_:y,className:"blaze-filter-toggle-icon"})]}),!t&&(0,u.jsx)("div",{className:"blaze-filter-content",children:a})]}),C=({items:e=[],selectedItems:t=[],onSelectionChange:l,showCount:a=!1,maxVisible:o=10,showMoreText:n=(0,r.__)("Show More","blaze-gutenberg"),showLessText:i=(0,r.__)("Show Less","blaze-gutenberg")})=>{const[c,g]=(0,s.useState)(!1),d=c?e:e.slice(0,o),b=e.length>o;return(0,u.jsxs)("div",{className:"blaze-filter-checkbox-list",children:[d.map(e=>(0,u.jsxs)("label",{className:"blaze-filter-checkbox-item",children:[(0,u.jsx)("input",{type:"checkbox",checked:t.includes(e.id),onChange:a=>((e,a)=>{let r;r=a?[...t,e]:t.filter(t=>t!==e),l(r)})(e.id,a.target.checked),className:"blaze-filter-checkbox"}),(0,u.jsxs)("span",{className:"blaze-filter-checkbox-label",children:[e.name,a&&void 0!==e.count&&(0,u.jsxs)("span",{className:"blaze-filter-count",children:[" (",e.count,")"]})]})]},e.id)),b&&(0,u.jsxs)("button",{type:"button",className:"blaze-filter-show-more",onClick:()=>g(!c),children:[c?i:n,!c&&(0,u.jsxs)("span",{className:"blaze-filter-remaining-count",children:[" ","(",e.length-o,")"]})]})]})},z=({attributes:e,setAttributes:t,showCountOption:l=!0,showMaxVisibleOption:a=!0,showTitleOption:s=!0,additionalControls:i=null})=>{const{title:c,showCount:g,maxVisible:d,isCollapsed:b}=e;return(0,u.jsxs)(o.InspectorControls,{children:[(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Filter Settings","blaze-gutenberg"),initialOpen:!0,children:[s&&(0,u.jsx)(n.TextControl,{label:(0,r.__)("Filter Title","blaze-gutenberg"),value:c,onChange:e=>t({title:e}),help:(0,r.__)("The heading text for this filter block","blaze-gutenberg")}),l&&(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Show Item Count","blaze-gutenberg"),checked:g,onChange:e=>t({showCount:e}),help:(0,r.__)("Display the number of products for each filter option","blaze-gutenberg")}),a&&(0,u.jsx)(n.RangeControl,{label:(0,r.__)("Maximum Visible Items","blaze-gutenberg"),value:d,onChange:e=>t({maxVisible:e}),min:3,max:50,help:(0,r.__)('Number of items to show before "Show More" button appears',"blaze-gutenberg")}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Start Collapsed","blaze-gutenberg"),checked:b,onChange:e=>t({isCollapsed:e}),help:(0,r.__)("Whether the filter should start in collapsed state","blaze-gutenberg")})]}),i]})},x=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"blaze/filter-by-category","version":"1.0.0","title":"Filter by Category","category":"blaze-commerce","description":"Filter products by category or tag with collapsible interface and show more/less functionality.","keywords":["filter","category","tag","woocommerce","shop","commerce"],"textdomain":"blaze-gutenberg","supports":{"align":["wide","full"],"html":false,"spacing":{"margin":true,"padding":true}},"attributes":{"title":{"type":"string","default":"Category"},"filterType":{"type":"string","default":"category","enum":["category","tag"]},"selectedCategories":{"type":"array","default":[]},"showCount":{"type":"boolean","default":true},"maxVisible":{"type":"number","default":10},"isCollapsed":{"type":"boolean","default":false},"orderBy":{"type":"string","default":"name","enum":["name","count","id"]},"order":{"type":"string","default":"ASC","enum":["ASC","DESC"]},"hideEmpty":{"type":"boolean","default":true}},"editorScript":"file:./index.js","editorStyle":"file:./editor.scss","style":"file:./style.scss"}');(0,a.registerBlockType)(x.name,{...x,icon:{src:h,foreground:"#1e3a8a"},edit:function({attributes:e,setAttributes:t}){const{title:l,filterType:a,selectedCategories:i,showCount:g,maxVisible:d,isCollapsed:b,orderBy:p,order:h,hideEmpty:m}=e,[_,y]=(0,s.useState)([]),[x,w]=(0,s.useState)(!0),[v,j]=(0,s.useState)(null),[S,k]=(0,s.useState)(b),N=(0,o.useBlockProps)({className:"blaze-filter-by-category is-editor"});(0,s.useEffect)(()=>{(async()=>{w(!0),j(null);try{const e="category"===a?"/blaze/v1/product-categories":"/blaze/v1/product-tags",t=await c()({path:e+`?orderby=${p}&order=${h}&hide_empty=${m}`});y(t||[])}catch(e){j(e.message),y([])}finally{w(!1)}})()},[a,p,h,m]);const P=(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Filter Options","blaze-gutenberg"),initialOpen:!1,children:[(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Filter Type","blaze-gutenberg"),value:a,options:[{label:(0,r.__)("Categories","blaze-gutenberg"),value:"category"},{label:(0,r.__)("Tags","blaze-gutenberg"),value:"tag"}],onChange:e=>t({filterType:e}),help:(0,r.__)("Choose whether to filter by product categories or tags","blaze-gutenberg")}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Order By","blaze-gutenberg"),value:p,options:[{label:(0,r.__)("Name","blaze-gutenberg"),value:"name"},{label:(0,r.__)("Product Count","blaze-gutenberg"),value:"count"},{label:(0,r.__)("ID","blaze-gutenberg"),value:"id"}],onChange:e=>t({orderBy:e})}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Order","blaze-gutenberg"),value:h,options:[{label:(0,r.__)("Ascending","blaze-gutenberg"),value:"ASC"},{label:(0,r.__)("Descending","blaze-gutenberg"),value:"DESC"}],onChange:e=>t({order:e})}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Hide Empty","blaze-gutenberg"),checked:m,onChange:e=>t({hideEmpty:e}),help:(0,r.__)("Hide categories/tags with no products","blaze-gutenberg")})]})});return(0,u.jsxs)("div",{...N,children:[(0,u.jsx)(z,{attributes:e,setAttributes:t,additionalControls:P}),(0,u.jsxs)(f,{title:l,isCollapsed:S,onToggle:()=>k(!S),children:[x&&(0,u.jsxs)("div",{style:{textAlign:"center",padding:"2rem"},children:[(0,u.jsx)(n.Spinner,{}),(0,u.jsx)("p",{children:(0,r.__)("Loading...","blaze-gutenberg")})]}),v&&(0,u.jsx)("div",{className:"blaze-filter-error",children:(0,r.__)("Error loading data: ","blaze-gutenberg")+v}),!x&&!v&&0===_.length&&(0,u.jsx)("div",{className:"blaze-filter-empty",children:(0,r.__)("No items found.","blaze-gutenberg")}),!x&&!v&&_.length>0&&(0,u.jsx)(C,{items:_,selectedItems:i,onSelectionChange:e=>{t({selectedCategories:e})},showCount:g,maxVisible:d})]})]})},save:function(){return null}});const w=(0,b.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(p.Path,{d:"M4.75 4a.75.75 0 0 0-.75.75v7.826c0 .2.08.39.22.53l6.72 6.716a2.313 2.313 0 0 0 3.276-.001l5.61-5.611-.531-.53.532.528a2.315 2.315 0 0 0 0-3.264L13.104 4.22a.75.75 0 0 0-.53-.22H4.75ZM19 12.576a.815.815 0 0 1-.236.574l-5.61 5.611a.814.814 0 0 1-1.153 0L5.5 12.264V5.5h6.763l6.5 6.502a.816.816 0 0 1 .237.574ZM8.75 9.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"})),v=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"blaze/filter-by-attribute","version":"1.0.0","title":"Filter by Attribute","category":"blaze-commerce","description":"Filter products by attributes like color, size, brand with collapsible interface and show more/less functionality.","keywords":["filter","attribute","color","size","woocommerce","shop","commerce"],"textdomain":"blaze-gutenberg","supports":{"align":["wide","full"],"html":false,"spacing":{"margin":true,"padding":true}},"attributes":{"title":{"type":"string","default":"Color"},"attributeSlug":{"type":"string","default":"pa_color"},"selectedAttributes":{"type":"array","default":[]},"showCount":{"type":"boolean","default":true},"maxVisible":{"type":"number","default":10},"isCollapsed":{"type":"boolean","default":false},"orderBy":{"type":"string","default":"name","enum":["name","count","id"]},"order":{"type":"string","default":"ASC","enum":["ASC","DESC"]},"hideEmpty":{"type":"boolean","default":true},"displayType":{"type":"string","default":"list","enum":["list","color-swatches"]}},"editorScript":"file:./index.js","editorStyle":"file:./editor.scss","style":"file:./style.scss"}');(0,a.registerBlockType)(v.name,{...v,icon:{src:w,foreground:"#1e3a8a"},edit:function({attributes:e,setAttributes:t}){const{title:l,attributeSlug:a,selectedAttributes:i,showCount:g,maxVisible:d,isCollapsed:b,orderBy:p,order:h,hideEmpty:m,displayType:_}=e,[y,x]=(0,s.useState)([]),[w,v]=(0,s.useState)([]),[j,S]=(0,s.useState)(!0),[k,N]=(0,s.useState)(null),[P,T]=(0,s.useState)(b),B=(0,o.useBlockProps)({className:"blaze-filter-by-attribute is-editor"});(0,s.useEffect)(()=>{(async()=>{try{const e=await c()({path:"/blaze/v1/product-attributes"});v(e||[])}catch(e){console.error("Error fetching attributes:",e)}})()},[]),(0,s.useEffect)(()=>{(async()=>{if(!a)return x([]),void S(!1);S(!0),N(null);try{const e=await c()({path:`/blaze/v1/product-attribute-terms/${a}?orderby=${p}&order=${h}&hide_empty=${m}`});x(e||[])}catch(e){N(e.message),x([])}finally{S(!1)}})()},[a,p,h,m]);const E=w.map(e=>({label:e.label,value:e.slug})),D=(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(n.PanelBody,{title:(0,r.__)("Attribute Settings","blaze-gutenberg"),initialOpen:!1,children:[(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Product Attribute","blaze-gutenberg"),value:a,options:[{label:(0,r.__)("Select an attribute...","blaze-gutenberg"),value:""},...E],onChange:e=>t({attributeSlug:e}),help:(0,r.__)("Choose which product attribute to filter by","blaze-gutenberg")}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Display Type","blaze-gutenberg"),value:_,options:[{label:(0,r.__)("List","blaze-gutenberg"),value:"list"},{label:(0,r.__)("Color Swatches","blaze-gutenberg"),value:"color-swatches"}],onChange:e=>t({displayType:e}),help:(0,r.__)("How to display the attribute options","blaze-gutenberg")}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Order By","blaze-gutenberg"),value:p,options:[{label:(0,r.__)("Name","blaze-gutenberg"),value:"name"},{label:(0,r.__)("Product Count","blaze-gutenberg"),value:"count"},{label:(0,r.__)("ID","blaze-gutenberg"),value:"id"}],onChange:e=>t({orderBy:e})}),(0,u.jsx)(n.SelectControl,{label:(0,r.__)("Order","blaze-gutenberg"),value:h,options:[{label:(0,r.__)("Ascending","blaze-gutenberg"),value:"ASC"},{label:(0,r.__)("Descending","blaze-gutenberg"),value:"DESC"}],onChange:e=>t({order:e})}),(0,u.jsx)(n.ToggleControl,{label:(0,r.__)("Hide Empty","blaze-gutenberg"),checked:m,onChange:e=>t({hideEmpty:e}),help:(0,r.__)("Hide attributes with no products","blaze-gutenberg")})]})});return(0,u.jsxs)("div",{...B,children:[(0,u.jsx)(z,{attributes:e,setAttributes:t,additionalControls:D}),(0,u.jsxs)(f,{title:l,isCollapsed:P,onToggle:()=>T(!P),children:[!a&&(0,u.jsx)("div",{className:"blaze-filter-empty",children:(0,r.__)("Please select a product attribute in the block settings.","blaze-gutenberg")}),a&&j&&(0,u.jsxs)("div",{style:{textAlign:"center",padding:"2rem"},children:[(0,u.jsx)(n.Spinner,{}),(0,u.jsx)("p",{children:(0,r.__)("Loading...","blaze-gutenberg")})]}),a&&k&&(0,u.jsx)("div",{className:"blaze-filter-error",children:(0,r.__)("Error loading data: ","blaze-gutenberg")+k}),a&&!j&&!k&&0===y.length&&(0,u.jsx)("div",{className:"blaze-filter-empty",children:(0,r.__)("No attribute terms found.","blaze-gutenberg")}),a&&!j&&!k&&y.length>0&&(0,u.jsx)(C,{items:y,selectedItems:i,onSelectionChange:e=>{t({selectedAttributes:e})},showCount:g,maxVisible:d})]})]})},save:function(){return null}});const j=(0,b.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,b.createElement)(p.Path,{fillRule:"evenodd",d:"M19.75 11H21V8.667L19.875 4H4.125L3 8.667V11h1.25v8.75h15.5V11zm-1.5 0H5.75v7.25H10V13h4v5.25h4.25V11zm-5.5-5.5h2.067l.486 3.24.028.76H12.75v-4zm-3.567 0h2.067v4H8.669l.028-.76.486-3.24zm7.615 3.1l-.464-3.1h2.36l.806 3.345V9.5h-2.668l-.034-.9zM7.666 5.5h-2.36L4.5 8.845V9.5h2.668l.034-.9.464-3.1z",clipRule:"evenodd"})),S=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"blaze/filter-by-stock-status","version":"1.0.0","title":"Filter by Stock Status","category":"blaze-commerce","description":"Filter products by stock status including In Stock, Sale, New Arrivals with collapsible interface.","keywords":["filter","stock","sale","new arrivals","woocommerce","shop","commerce"],"textdomain":"blaze-gutenberg","supports":{"align":["wide","full"],"html":false,"spacing":{"margin":true,"padding":true}},"attributes":{"title":{"type":"string","default":"Shop"},"selectedStatuses":{"type":"array","default":[]},"showCount":{"type":"boolean","default":true},"maxVisible":{"type":"number","default":10},"isCollapsed":{"type":"boolean","default":false},"enabledStatuses":{"type":"object","default":{"instock":true,"onsale":true,"new":true,"outofstock":false,"backorder":false}}},"editorScript":"file:./index.js","editorStyle":"file:./editor.scss","style":"file:./style.scss"}');(0,a.registerBlockType)(S.name,{...S,icon:{src:j,foreground:"#1e3a8a"},edit:function({attributes:e,setAttributes:t}){const{title:l,selectedStatuses:a,showCount:i,maxVisible:g,isCollapsed:d,enabledStatuses:b}=e,[p,h]=(0,s.useState)([]),[m,_]=(0,s.useState)(!0),[y,x]=(0,s.useState)(null),[w,v]=(0,s.useState)(d),j=(0,o.useBlockProps)({className:"blaze-filter-by-stock-status is-editor"}),S={instock:{id:"instock",name:(0,r.__)("In Stock","blaze-gutenberg"),count:0},onsale:{id:"onsale",name:(0,r.__)("Sale","blaze-gutenberg"),count:0},new:{id:"new",name:(0,r.__)("New Arrivals","blaze-gutenberg"),count:0},outofstock:{id:"outofstock",name:(0,r.__)("Out of Stock","blaze-gutenberg"),count:0},backorder:{id:"backorder",name:(0,r.__)("On Backorder","blaze-gutenberg"),count:0}};(0,s.useEffect)(()=>{(async()=>{_(!0),x(null);try{const e=await c()({path:"/blaze/v1/product-stock-status-counts"}),t=[];Object.keys(b).forEach(l=>{if(b[l]&&S[l]){const a={...S[l]};a.count=e[l]||0,t.push(a)}}),h(t)}catch(e){x(e.message);const t=[];Object.keys(b).forEach(e=>{b[e]&&S[e]&&t.push(S[e])}),h(t)}finally{_(!1)}})()},[b]);const k=(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(n.PanelBody,{title:(0,r.__)("Stock Status Options","blaze-gutenberg"),initialOpen:!1,children:Object.keys(S).map(e=>(0,u.jsx)(n.ToggleControl,{label:S[e].name,checked:b[e]||!1,onChange:l=>((e,l)=>{t({enabledStatuses:{...b,[e]:l}})})(e,l),help:(0,r.__)("Show this stock status option in the filter","blaze-gutenberg")},e))})});return(0,u.jsxs)("div",{...j,children:[(0,u.jsx)(z,{attributes:e,setAttributes:t,showMaxVisibleOption:!1,additionalControls:k}),(0,u.jsxs)(f,{title:l,isCollapsed:w,onToggle:()=>v(!w),children:[m&&(0,u.jsxs)("div",{style:{textAlign:"center",padding:"2rem"},children:[(0,u.jsx)(n.Spinner,{}),(0,u.jsx)("p",{children:(0,r.__)("Loading...","blaze-gutenberg")})]}),y&&(0,u.jsx)("div",{className:"blaze-filter-error",children:(0,r.__)("Error loading data: ","blaze-gutenberg")+y}),!m&&0===p.length&&(0,u.jsx)("div",{className:"blaze-filter-empty",children:(0,r.__)("No stock status options enabled. Please enable some options in the block settings.","blaze-gutenberg")}),!m&&p.length>0&&(0,u.jsx)(C,{items:p,selectedItems:a,onSelectionChange:e=>{t({selectedStatuses:e})},showCount:i,maxVisible:g})]})]})},save:function(){return null}})},609:e=>{e.exports=window.React},848:(e,t,l)=>{e.exports=l(20)}},l={};function a(e){var r=l[e];if(void 0!==r)return r.exports;var o=l[e]={exports:{}};return t[e](o,o.exports,a),o.exports}a.m=t,e=[],a.O=(t,l,r,o)=>{if(!l){var n=1/0;for(u=0;u<e.length;u++){for(var[l,r,o]=e[u],s=!0,i=0;i<l.length;i++)(!1&o||n>=o)&&Object.keys(a.O).every(e=>a.O[e](l[i]))?l.splice(i--,1):(s=!1,o<n&&(n=o));if(s){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[l,r,o]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var l in t)a.o(t,l)&&!a.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={617:0,232:0};a.O.j=t=>0===e[t];var t=(t,l)=>{var r,o,[n,s,i]=l,c=0;if(n.some(t=>0!==e[t])){for(r in s)a.o(s,r)&&(a.m[r]=s[r]);if(i)var u=i(a)}for(t&&t(l);c<n.length;c++)o=n[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(u)},l=globalThis.webpackChunkblaze_gutenberg=globalThis.webpackChunkblaze_gutenberg||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var r=a.O(void 0,[232],()=>a(289));r=a.O(r)})();
=======
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

var didWarnAboutKeySpread = {};
function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    {
      if (hasOwnProperty.call(props, 'key')) {
        var componentName = getComponentNameFromType(type);
        var keys = Object.keys(props).filter(function (k) {
          return k !== 'key';
        });
        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

          didWarnAboutKeySpread[componentName + beforeExample] = true;
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "./src/blocks/category-grid/edit.js":
/*!******************************************!*\
  !*** ./src/blocks/category-grid/edit.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_CategoryCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/CategoryCard */ "./src/components/CategoryCard.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */


/**
 * Edit component
 */

function Edit({
  attributes,
  setAttributes
}) {
  const {
    selectedCategories,
    orderBy,
    order,
    limit,
    columnsDesktop,
    columnsTablet,
    columnsMobile,
    showProductCount,
    showDescription,
    hideEmpty,
    categoryNameColor,
    categoryDescriptionColor,
    productCountColor
  } = attributes;
  const [categories, setCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: "blaze-category-grid-editor"
  });

  // Fetch categories
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const categoriesData = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
          path: "/blaze/v1/product-categories"
        });
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Filter and sort categories based on settings
  const getFilteredCategories = () => {
    let filtered = [...categories];

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(cat => selectedCategories.includes(cat.id.toString()));
    }

    // Filter empty categories if hideEmpty is true
    if (hideEmpty) {
      filtered = filtered.filter(cat => cat.count > 0);
    }

    // Sort categories
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (orderBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "count":
          comparison = a.count - b.count;
          break;
        case "id":
          comparison = a.id - b.id;
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      return order === "DESC" ? -comparison : comparison;
    });

    // Limit results
    return filtered.slice(0, limit);
  };
  const filteredCategories = getFilteredCategories();

  // Options for select controls
  const orderByOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Name", "blaze-gutenberg"),
    value: "name"
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Product Count", "blaze-gutenberg"),
    value: "count"
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("ID", "blaze-gutenberg"),
    value: "id"
  }];
  const orderOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Ascending", "blaze-gutenberg"),
    value: "ASC"
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Descending", "blaze-gutenberg"),
    value: "DESC"
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Category Selection", "blaze-gutenberg"),
        initialOpen: true,
        children: [categories.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "blaze-category-selection",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Select categories to display (leave empty for all):", "blaze-gutenberg")
          }), categories.map(category => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
            label: `${category.name} (${category.count})`,
            checked: selectedCategories.includes(category.id.toString()),
            onChange: checked => {
              const newSelection = checked ? [...selectedCategories, category.id.toString()] : selectedCategories.filter(id => id !== category.id.toString());
              setAttributes({
                selectedCategories: newSelection
              });
            }
          }, category.id))]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide Empty Categories", "blaze-gutenberg"),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide categories that have no products", "blaze-gutenberg"),
          checked: hideEmpty,
          onChange: value => setAttributes({
            hideEmpty: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Sorting & Display", "blaze-gutenberg"),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Order By", "blaze-gutenberg"),
          value: orderBy,
          options: orderByOptions,
          onChange: value => setAttributes({
            orderBy: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Order", "blaze-gutenberg"),
          value: order,
          options: orderOptions,
          onChange: value => setAttributes({
            order: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Number of Categories", "blaze-gutenberg"),
          value: limit,
          onChange: value => setAttributes({
            limit: value
          }),
          min: 1,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Product Count", "blaze-gutenberg"),
          checked: showProductCount,
          onChange: value => setAttributes({
            showProductCount: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Description", "blaze-gutenberg"),
          checked: showDescription,
          onChange: value => setAttributes({
            showDescription: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Responsive Columns", "blaze-gutenberg"),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Columns (Desktop)", "blaze-gutenberg"),
          value: columnsDesktop,
          onChange: value => setAttributes({
            columnsDesktop: value
          }),
          min: 1,
          max: 6
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Columns (Tablet)", "blaze-gutenberg"),
          value: columnsTablet,
          onChange: value => setAttributes({
            columnsTablet: value
          }),
          min: 1,
          max: 4
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Columns (Mobile)", "blaze-gutenberg"),
          value: columnsMobile,
          onChange: value => setAttributes({
            columnsMobile: value
          }),
          min: 1,
          max: 3
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "blaze-category-grid-preview",
        children: [isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "blaze-loading",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Loading categories...", "blaze-gutenberg")
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "blaze-categories-grid",
          style: {
            display: "grid",
            gridTemplateColumns: `repeat(${columnsDesktop}, 1fr)`,
            gap: "20px",
            "--category-name-color": categoryNameColor,
            "--category-description-color": categoryDescriptionColor,
            "--product-count-color": productCountColor
          },
          children: filteredCategories.length > 0 ? filteredCategories.map(category => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_CategoryCard__WEBPACK_IMPORTED_MODULE_5__["default"], {
            category: category,
            isEditor: true,
            showProductCount: showProductCount,
            showDescription: showDescription,
            categoryNameColor: categoryNameColor,
            categoryDescriptionColor: categoryDescriptionColor,
            productCountColor: productCountColor
          }, category.id)) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "blaze-no-categories",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("No categories found. Please check your selection criteria.", "blaze-gutenberg")
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "blaze-grid-info",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Desktop: ", "blaze-gutenberg"), columnsDesktop, " |", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(" Tablet: ", "blaze-gutenberg"), columnsTablet, " |", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(" Mobile: ", "blaze-gutenberg"), columnsMobile]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Showing ", "blaze-gutenberg"), filteredCategories.length, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(" of ", "blaze-gutenberg"), categories.length, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(" categories", "blaze-gutenberg")]
          })]
        })]
      })
    })]
  });
}

/***/ }),

/***/ "./src/blocks/category-grid/editor.scss":
/*!**********************************************!*\
  !*** ./src/blocks/category-grid/editor.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/category-grid/index.js":
/*!*******************************************!*\
  !*** ./src/blocks/category-grid/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/category-grid/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/category-grid/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/category-grid/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/category-grid/editor.scss");
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */





/**
 * Block registration
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)("blaze/category-grid", {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("WooCommerce Category Grid", "blaze-gutenberg"),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display WooCommerce product categories in a customizable grid layout with responsive columns and sorting options.", "blaze-gutenberg"),
  category: "blaze-commerce",
  icon: {
    src: "grid-view",
    foreground: "#1e3a8a"
  },
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("category", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("grid", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("woocommerce", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("product", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("categories", "blaze-gutenberg")],
  supports: {
    align: ["wide", "full"],
    html: false
  },
  attributes: {
    selectedCategories: {
      type: "array",
      default: []
    },
    orderBy: {
      type: "string",
      default: "name"
    },
    order: {
      type: "string",
      default: "ASC"
    },
    limit: {
      type: "number",
      default: 12
    },
    columnsDesktop: {
      type: "number",
      default: 4
    },
    columnsTablet: {
      type: "number",
      default: 3
    },
    columnsMobile: {
      type: "number",
      default: 2
    },
    showProductCount: {
      type: "boolean",
      default: true
    },
    showDescription: {
      type: "boolean",
      default: false
    },
    hideEmpty: {
      type: "boolean",
      default: true
    },
    categoryNameColor: {
      type: "string",
      default: ""
    },
    categoryDescriptionColor: {
      type: "string",
      default: ""
    },
    productCountColor: {
      type: "string",
      default: ""
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/blocks/category-grid/save.js":
/*!******************************************!*\
  !*** ./src/blocks/category-grid/save.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Save component
 * 
 * Since this block uses server-side rendering,
 * we return null to let PHP handle the output
 */
function Save() {
  return null;
}

/***/ }),

/***/ "./src/blocks/category-grid/style.scss":
/*!*********************************************!*\
  !*** ./src/blocks/category-grid/style.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/index.js":
/*!*****************************!*\
  !*** ./src/blocks/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _product_slideshow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-slideshow */ "./src/blocks/product-slideshow/index.js");
/* harmony import */ var _category_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category-grid */ "./src/blocks/category-grid/index.js");
/* harmony import */ var _product_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-card */ "./src/blocks/product-card/index.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




/***/ }),

/***/ "./src/blocks/product-card/edit.js":
/*!*****************************************!*\
  !*** ./src/blocks/product-card/edit.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ProductCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ProductCard */ "./src/components/ProductCard.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


/**
 * Edit component
 */

function Edit({
  attributes,
  setAttributes
}) {
  const {
    primaryBackgroundColor,
    primaryFontColor,
    priceColor,
    showBadges,
    showRating,
    showColorSwatches,
    showAddToCart,
    showEnquireButton
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: "blaze-product-card-block"
  });

  // Create a dummy product for preview in editor
  const dummyProduct = {
    id: 1,
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Sample Product", "blaze-gutenberg"),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Sample Product", "blaze-gutenberg"),
    slug: "sample-product",
    image: "https://via.placeholder.com/300x300/cccccc/666666?text=Product+Image",
    hoverImage: "https://via.placeholder.com/300x300/bbbbbb/555555?text=Hover+Image",
    price: "$29.99",
    regularPrice: "39.99",
    salePrice: "29.99",
    onSale: true,
    isNew: true,
    rating: 4.5,
    reviewCount: 12,
    permalink: "#",
    addToCartUrl: "#",
    addToCartText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add to cart", "blaze-gutenberg"),
    attributes: [{
      name: "color",
      type: "color",
      value: "Red",
      color: "#ff0000"
    }, {
      name: "color",
      type: "color",
      value: "Blue",
      color: "#0000ff"
    }]
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display Settings", "blaze-gutenberg"),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          className: "components-base-control__help",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("This block displays the current product from the loop or page context. Configure the display options below.", "blaze-gutenberg")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Badges", "blaze-gutenberg"),
          checked: showBadges,
          onChange: value => setAttributes({
            showBadges: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display sale and new product badges.", "blaze-gutenberg")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Rating", "blaze-gutenberg"),
          checked: showRating,
          onChange: value => setAttributes({
            showRating: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display product rating and review count.", "blaze-gutenberg")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Color Swatches", "blaze-gutenberg"),
          checked: showColorSwatches,
          onChange: value => setAttributes({
            showColorSwatches: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display color variation swatches if available.", "blaze-gutenberg")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Add to Cart", "blaze-gutenberg"),
          checked: showAddToCart,
          onChange: value => setAttributes({
            showAddToCart: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display the add to cart button.", "blaze-gutenberg")
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Enquire Button", "blaze-gutenberg"),
          checked: showEnquireButton,
          onChange: value => setAttributes({
            showEnquireButton: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display the enquire now button.", "blaze-gutenberg")
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Color Settings", "blaze-gutenberg"),
        initialOpen: false,
        colorSettings: [{
          value: primaryBackgroundColor,
          onChange: value => setAttributes({
            primaryBackgroundColor: value
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Primary Background Color", "blaze-gutenberg")
        }, {
          value: primaryFontColor,
          onChange: value => setAttributes({
            primaryFontColor: value
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Primary Font Color", "blaze-gutenberg")
        }, {
          value: priceColor,
          onChange: value => setAttributes({
            priceColor: value
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Price Color", "blaze-gutenberg")
        }]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "blaze-product-card-editor-preview",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "editor-preview-notice",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Preview: This block will display the current product from the loop or page context.", "blaze-gutenberg")
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_ProductCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
        product: dummyProduct,
        isEditor: true,
        primaryBackgroundColor: primaryBackgroundColor,
        primaryFontColor: primaryFontColor,
        priceColor: priceColor,
        showBadges: showBadges,
        showRating: showRating,
        showColorSwatches: showColorSwatches,
        showAddToCart: showAddToCart,
        showEnquireButton: showEnquireButton
      })]
    })]
  });
}

/***/ }),

/***/ "./src/blocks/product-card/editor.scss":
/*!*********************************************!*\
  !*** ./src/blocks/product-card/editor.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/product-card/index.js":
/*!******************************************!*\
  !*** ./src/blocks/product-card/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/product-card/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/product-card/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/product-card/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/product-card/editor.scss");
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */





/**
 * Block registration
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("blaze/product-card", {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("WooCommerce Product Card", "blaze-gutenberg"),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display a single WooCommerce product card with customizable styling. Perfect for use in product loops, category pages, and related product sections.", "blaze-gutenberg"),
  category: "blaze-commerce",
  icon: {
    src: "products",
    foreground: "#1e3a8a"
  },
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("product", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("card", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("woocommerce", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("shop", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("commerce", "blaze-gutenberg")],
  supports: {
    align: ["wide", "full"],
    html: false,
    spacing: {
      margin: true,
      padding: true
    }
  },
  attributes: {
    productId: {
      type: "number",
      default: 0
    },
    primaryBackgroundColor: {
      type: "string",
      default: "#1e3a8a"
    },
    primaryFontColor: {
      type: "string",
      default: "#ffffff"
    },
    priceColor: {
      type: "string",
      default: "#1e3a8a"
    },
    showBadges: {
      type: "boolean",
      default: true
    },
    showRating: {
      type: "boolean",
      default: true
    },
    showColorSwatches: {
      type: "boolean",
      default: true
    },
    showAddToCart: {
      type: "boolean",
      default: true
    },
    showEnquireButton: {
      type: "boolean",
      default: true
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/blocks/product-card/save.js":
/*!*****************************************!*\
  !*** ./src/blocks/product-card/save.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Save component
 * 
 * Since this block uses server-side rendering, we return null
 * The actual rendering is handled by PHP in BlocksManager.php
 */
function Save() {
  return null;
}

/***/ }),

/***/ "./src/blocks/product-card/style.scss":
/*!********************************************!*\
  !*** ./src/blocks/product-card/style.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/product-slideshow/edit.js":
/*!**********************************************!*\
  !*** ./src/blocks/product-slideshow/edit.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_ProductCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/ProductCard */ "./src/components/ProductCard.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/**
 * WordPress dependencies
 */







/**
 * Internal dependencies
 */


/**
 * Edit component
 */

function Edit({
  attributes,
  setAttributes
}) {
  const {
    productsPerSlideDesktop,
    productsPerSlideTablet,
    productsPerSlideMobile,
    primaryBackgroundColor,
    primaryFontColor,
    priceColor,
    showArrows,
    showDots,
    autoplay,
    autoplayDelay,
    productIds,
    productCategory,
    productTag,
    orderBy,
    order,
    limit,
    featuredOnly
  } = attributes;
  const [products, setProducts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
  const [categories, setCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
  const [tags, setTags] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(true);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: "blaze-product-slideshow-editor"
  });

  // Fetch products, categories, and tags
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData, tagsData] = await Promise.all([_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default()({
          path: "/blaze/v1/products"
        }), _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default()({
          path: "/blaze/v1/product-categories"
        }), _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default()({
          path: "/blaze/v1/product-tags"
        })]);
        setProducts(productsData);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format options for select controls
  const categoryOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("All Categories", "blaze-gutenberg"),
    value: ""
  }, ...categories.map(cat => ({
    label: cat.name,
    value: cat.slug
  }))];
  const tagOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("All Tags", "blaze-gutenberg"),
    value: ""
  }, ...tags.map(tag => ({
    label: tag.name,
    value: tag.slug
  }))];
  const orderByOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Date", "blaze-gutenberg"),
    value: "date"
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Title", "blaze-gutenberg"),
    value: "title"
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Menu Order", "blaze-gutenberg"),
    value: "menu_order"
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Random", "blaze-gutenberg"),
    value: "rand"
  }];
  const orderOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Descending", "blaze-gutenberg"),
    value: "DESC"
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Ascending", "blaze-gutenberg"),
    value: "ASC"
  }];

  // Mock products for preview (first 4 products)
  const previewProducts = products.slice(0, productsPerSlideDesktop);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Slideshow Settings", "blaze-gutenberg"),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Products per slide (Desktop)", "blaze-gutenberg"),
          value: productsPerSlideDesktop,
          onChange: value => setAttributes({
            productsPerSlideDesktop: value
          }),
          min: 1,
          max: 6
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Products per slide (Tablet)", "blaze-gutenberg"),
          value: productsPerSlideTablet,
          onChange: value => setAttributes({
            productsPerSlideTablet: value
          }),
          min: 1,
          max: 4
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Products per slide (Mobile)", "blaze-gutenberg"),
          value: productsPerSlideMobile,
          onChange: value => setAttributes({
            productsPerSlideMobile: value
          }),
          min: 1,
          max: 2
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Navigation Arrows", "blaze-gutenberg"),
          checked: showArrows,
          onChange: value => setAttributes({
            showArrows: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Dots Navigation", "blaze-gutenberg"),
          checked: showDots,
          onChange: value => setAttributes({
            showDots: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Autoplay", "blaze-gutenberg"),
          checked: autoplay,
          onChange: value => setAttributes({
            autoplay: value
          })
        }), autoplay && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Autoplay Delay (ms)", "blaze-gutenberg"),
          value: autoplayDelay,
          onChange: value => setAttributes({
            autoplayDelay: value
          }),
          min: 1000,
          max: 10000,
          step: 500
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Product Selection", "blaze-gutenberg"),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Featured Products Only", "blaze-gutenberg"),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show only products marked as featured", "blaze-gutenberg"),
          checked: featuredOnly,
          onChange: value => setAttributes({
            featuredOnly: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Category", "blaze-gutenberg"),
          value: productCategory,
          options: categoryOptions,
          onChange: value => setAttributes({
            productCategory: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tag", "blaze-gutenberg"),
          value: productTag,
          options: tagOptions,
          onChange: value => setAttributes({
            productTag: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Order By", "blaze-gutenberg"),
          value: orderBy,
          options: orderByOptions,
          onChange: value => setAttributes({
            orderBy: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Order", "blaze-gutenberg"),
          value: order,
          options: orderOptions,
          onChange: value => setAttributes({
            order: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Maximum Products", "blaze-gutenberg"),
          value: limit,
          onChange: value => setAttributes({
            limit: value
          }),
          min: 1,
          max: 50
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Color Settings", "blaze-gutenberg"),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          style: {
            marginBottom: "20px"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Primary Background Color", "blaze-gutenberg")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
            color: primaryBackgroundColor,
            onChange: value => setAttributes({
              primaryBackgroundColor: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          style: {
            marginBottom: "20px"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Primary Font Color", "blaze-gutenberg")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
            color: primaryFontColor,
            onChange: value => setAttributes({
              primaryFontColor: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          style: {
            marginBottom: "20px"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Price Color", "blaze-gutenberg")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
            color: priceColor,
            onChange: value => setAttributes({
              priceColor: value
            })
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "blaze-product-slideshow-preview",
        children: [isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "blaze-loading",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Loading products...", "blaze-gutenberg")
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "blaze-products-grid",
          style: {
            display: "grid",
            gridTemplateColumns: `repeat(${productsPerSlideDesktop}, 1fr)`,
            gap: "20px",
            "--primary-bg-color": primaryBackgroundColor,
            "--primary-font-color": primaryFontColor,
            "--price-color": priceColor
          },
          children: previewProducts.length > 0 ? previewProducts.map(product => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ProductCard__WEBPACK_IMPORTED_MODULE_6__["default"], {
            product: product,
            isEditor: true,
            primaryBackgroundColor: primaryBackgroundColor,
            primaryFontColor: primaryFontColor,
            priceColor: priceColor
          }, product.id)) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            className: "blaze-no-products",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("No products found. Please check your selection criteria.", "blaze-gutenberg")
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "blaze-slideshow-info",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("p", {
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Desktop: ", "blaze-gutenberg"), productsPerSlideDesktop, " |", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(" Tablet: ", "blaze-gutenberg"), productsPerSlideTablet, " |", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(" Mobile: ", "blaze-gutenberg"), productsPerSlideMobile]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("p", {
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Arrows: ", "blaze-gutenberg"), showArrows ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Yes", "blaze-gutenberg") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("No", "blaze-gutenberg"), " ", "|", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(" Dots: ", "blaze-gutenberg"), showDots ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Yes", "blaze-gutenberg") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("No", "blaze-gutenberg")]
          })]
        })]
      })
    })]
  });
}

/***/ }),

/***/ "./src/blocks/product-slideshow/index.js":
/*!***********************************************!*\
  !*** ./src/blocks/product-slideshow/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/product-slideshow/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/product-slideshow/save.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/product-slideshow/style.scss");
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */




/**
 * Block registration
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("blaze/product-slideshow", {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("WooCommerce Product Slideshow", "blaze-gutenberg"),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display WooCommerce products in an interactive slideshow with hover effects, badges, and customizable settings.", "blaze-gutenberg"),
  category: "blaze-commerce",
  icon: {
    src: "slides",
    foreground: "#1e3a8a"
  },
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("product", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("slideshow", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("woocommerce", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("carousel", "blaze-gutenberg"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("slider", "blaze-gutenberg")],
  supports: {
    align: ["wide", "full"],
    html: false
  },
  attributes: {
    productsPerSlideDesktop: {
      type: "number",
      default: 4
    },
    productsPerSlideTablet: {
      type: "number",
      default: 3
    },
    productsPerSlideMobile: {
      type: "number",
      default: 1
    },
    primaryBackgroundColor: {
      type: "string",
      default: "#1e3a8a"
    },
    primaryFontColor: {
      type: "string",
      default: "#ffffff"
    },
    priceColor: {
      type: "string",
      default: "#1e3a8a"
    },
    showArrows: {
      type: "boolean",
      default: true
    },
    showDots: {
      type: "boolean",
      default: true
    },
    autoplay: {
      type: "boolean",
      default: false
    },
    autoplayDelay: {
      type: "number",
      default: 3000
    },
    productIds: {
      type: "array",
      default: []
    },
    productCategory: {
      type: "string",
      default: ""
    },
    productTag: {
      type: "string",
      default: ""
    },
    orderBy: {
      type: "string",
      default: "date"
    },
    order: {
      type: "string",
      default: "DESC"
    },
    limit: {
      type: "number",
      default: 12
    },
    featuredOnly: {
      type: "boolean",
      default: false
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/blocks/product-slideshow/save.js":
/*!**********************************************!*\
  !*** ./src/blocks/product-slideshow/save.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Save component
 * 
 * Since this block uses server-side rendering,
 * we return null to let PHP handle the output
 */
function Save() {
  return null;
}

/***/ }),

/***/ "./src/blocks/product-slideshow/style.scss":
/*!*************************************************!*\
  !*** ./src/blocks/product-slideshow/style.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/CategoryCard.js":
/*!****************************************!*\
  !*** ./src/components/CategoryCard.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoryCard)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/**
 * WordPress dependencies
 */


/**
 * CategoryCard component for displaying individual category items
 */

function CategoryCard({
  category,
  isEditor = false,
  showProductCount = true,
  showDescription = false,
  categoryNameColor = "",
  categoryDescriptionColor = "",
  productCountColor = ""
}) {
  const {
    id,
    name,
    slug,
    description,
    count,
    image,
    link
  } = category;
  const cardStyles = {
    "--category-name-color": categoryNameColor,
    "--category-description-color": categoryDescriptionColor,
    "--product-count-color": productCountColor
  };
  const CardWrapper = isEditor ? "div" : "a";
  const cardProps = isEditor ? {
    className: "blaze-category-card"
  } : {
    className: "blaze-category-card",
    href: link,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`View ${name} category`, "blaze-gutenberg")
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(CardWrapper, {
    ...cardProps,
    style: cardStyles,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "blaze-category-card__image",
      children: image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
        src: image,
        alt: name,
        loading: "lazy",
        className: "blaze-category-image"
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "blaze-category-placeholder",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "blaze-category-icon",
          children: "\uD83D\uDCE6"
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "blaze-category-card__content",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
        className: "blaze-category-card__name",
        children: name
      }), showDescription && description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        className: "blaze-category-card__description",
        children: description
      }), showProductCount && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        className: "blaze-category-card__count",
        children: count === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("1 product", "blaze-gutenberg") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`${count} products`, "blaze-gutenberg")
      })]
    })]
  });
}

/***/ }),

/***/ "./src/components/ProductCard.js":
/*!***************************************!*\
  !*** ./src/components/ProductCard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductCard)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/**
 * WordPress dependencies
 */



/**
 * Product Card Component
 */

function ProductCard({
  product,
  isEditor = false,
  primaryBackgroundColor = "#1e3a8a",
  primaryFontColor = "#ffffff",
  priceColor = "#1e3a8a",
  showBadges = true,
  showRating = true,
  showColorSwatches = true,
  showAddToCart = true,
  showEnquireButton = true
}) {
  const [isHovered, setIsHovered] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // Mock product data for editor preview
  const mockProduct = {
    id: product?.id || 1,
    title: product?.title || "Sample Product",
    slug: product?.slug || "sample-product",
    price: "$99.99",
    salePrice: "$79.99",
    regularPrice: "$99.99",
    onSale: true,
    isNew: false,
    rating: 4.5,
    reviewCount: 15,
    image: "https://via.placeholder.com/300x300?text=Product+Image",
    hoverImage: "https://via.placeholder.com/300x300?text=Hover+Image",
    attributes: [{
      name: "Color",
      value: "Blue",
      type: "color",
      color: "#3b82f6"
    }, {
      name: "Color",
      value: "Red",
      type: "color",
      color: "#ef4444"
    }],
    addToCartUrl: "#",
    enquireUrl: "#"
  };
  const productData = isEditor ? mockProduct : product;
  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "star full",
        children: "\u2605"
      }, i));
    }
    if (hasHalfStar) {
      stars.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "star half",
        children: "\u2605"
      }, "half"));
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "star empty",
        children: "\u2606"
      }, `empty-${i}`));
    }
    return stars;
  };
  const renderColorSwatches = attributes => {
    const colorAttributes = attributes?.filter(attr => attr.type === "color" && attr.name.toLowerCase() === "color") || [];
    if (colorAttributes.length === 0) return null;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "product-swatches",
      children: colorAttributes.map((attr, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "color-swatch-border",
        style: {
          borderColor: primaryBackgroundColor
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "color-swatch",
          style: {
            backgroundColor: attr.color
          },
          title: attr.value
        })
      }, index))
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "blaze-product-card",
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    style: {
      "--primary-bg-color": primaryBackgroundColor,
      "--primary-font-color": primaryFontColor,
      "--price-color": priceColor
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "product-image-container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
        src: isHovered && productData.hoverImage ? productData.hoverImage : productData.image,
        alt: productData.title,
        className: "product-image"
      }), showBadges && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "product-badges",
        children: [productData.onSale && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "badge sale-badge",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("SALE", "blaze-gutenberg")
        }), productData.isNew && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "badge new-badge",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("NEW", "blaze-gutenberg")
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "product-info",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
        className: "product-title",
        children: isEditor ? productData.title : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
          href: `/product/${productData.slug}`,
          children: productData.title
        })
      }), showColorSwatches && renderColorSwatches(productData.attributes), showRating && productData.rating > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "product-reviews",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "stars",
          children: renderStars(productData.rating)
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
          className: "review-count",
          children: [productData.rating, " (", productData.reviewCount, " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("reviews", "blaze-gutenberg"), ")"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "product-price",
        children: productData.onSale ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
            className: "sale-price",
            children: productData.salePrice
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
            className: "regular-price",
            children: productData.regularPrice
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "current-price",
          children: productData.price
        })
      }), (showAddToCart || showEnquireButton) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "product-actions",
        children: [showAddToCart && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
          className: "btn btn-primary add-to-cart",
          onClick: isEditor ? e => e.preventDefault() : undefined,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("SELECT OPTIONS", "blaze-gutenberg")
        }), showEnquireButton && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
          className: "btn btn-secondary enquire-now",
          onClick: isEditor ? e => e.preventDefault() : undefined,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("ENQUIRE NOW", "blaze-gutenberg")
        })]
      })]
    })]
  });
}

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks": 0,
/******/ 			"./style-blocks": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkblaze_gutenberg"] = globalThis["webpackChunkblaze_gutenberg"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-blocks"], () => (__webpack_require__("./src/blocks/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=blocks.js.map
>>>>>>> feat/product-card
