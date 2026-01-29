import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { AddToCartButton } from './AddToCartButton';

/**
 * A reusable Product Card component for the store.
 * @param {Object} props
 * @param {import('@shopify/hydrogen/storefront-api-types').Product} props.product
 * @param {string} [props.className]
 * @param {string} [props.imageAspectRatio]
 */
export function ProductCard({ product, className = '', imageAspectRatio = '3/4' }) {
    if (!product) return null;

    const defaultVariant = product.variants?.nodes?.[0] || product.selectedOrFirstAvailableVariant;
    const variantUrl = useVariantUrl(product.handle, defaultVariant?.selectedOptions || []);
    const featuredImage = product.featuredImage || defaultVariant?.image;

    return (
        <div
            className={`product-card group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#f0f0f0] ${className}`}
        >
            {/* Product Image Area */}
            <Link
                to={variantUrl}
                prefetch="intent"
                className={`block relative overflow-hidden bg-[#e8e8e8] m-2 rounded-xl aspect-${imageAspectRatio.replace('/', '-')}`}
            >
                {featuredImage ? (
                    <Image
                        data={featuredImage}
                        alt={featuredImage.altText || product.title}
                        aspectRatio={imageAspectRatio}
                        sizes="(min-width: 45em) 25vw, 50vw"
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}

                {/* Hover Overlay Shade */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Product Details */}
            <div className="p-4 pt-1 flex flex-col items-center grow text-center">
                <Link to={variantUrl} prefetch="intent" className="group-hover:text-[#642826] transition-colors duration-300">
                    <h3 className="font-extrabold text-lg md:text-xl text-[#2A2A2A] leading-tight line-clamp-2 min-h-12 flex items-center justify-center">
                        {product.title}
                    </h3>
                </Link>

                {/* Price and Add to Cart Section */}
                <div className="mt-auto w-full relative gap-3 flex items-center justify-between flex-col overflow-hidden">
                    {/* Price */}
                    <div className=" inset-0 flex items-center justify-center transition-all duration-500 ease-in-out">
                        <span className="font-sans font-bold text-[#642826] text-lg">
                            <Money data={product.priceRange.minVariantPrice} />
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex items-center justify-center transition-all duration-500 ease-in-out">

                        <Link
                            to={variantUrl}
                            className="w-full mx-2 bg-[#642826] !text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-bold tracking-widest uppercase hover:bg-[#4A1D1C] transition-colors duration-300"
                        >
                            Add to Bag
                        </Link>

                    </div>
                </div>
            </div>

            <style>{`
        .product-card {
           backface-visibility: hidden;
        }
        .aspect-3-4 {
          aspect-ratio: 3/4;
        }
      `}</style>
        </div>
    );
}
