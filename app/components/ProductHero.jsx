import { Image, Money } from '@shopify/hydrogen';
import { ProductForm } from '~/components/ProductForm';
import { useState } from 'react';

/**
 * @param {{
 *   product: any;
 *   selectedVariant: any;
 *   productOptions: any;
 *   galleryImages: any[];
 * }}
 */
export function ProductHero({ product, selectedVariant, productOptions, galleryImages }) {
    const [activeImage, setActiveImage] = useState(selectedVariant?.image || galleryImages?.[0]);

    const allImages = galleryImages && galleryImages.length > 0 ? galleryImages : [selectedVariant?.image].filter(Boolean);

    return (
        <section className="bg-white py-12">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_450px] gap-0 lg:gap-12 items-start">

                    {/* Left: Thumbnails (Desktop) */}
                    <div className="hidden lg:flex flex-col gap-4 sticky top-[100px] max-h-[80vh] overflow-y-auto pr-2 no-scrollbar">
                        {allImages.map((image, index) => (
                            <button
                                key={image?.id || index}
                                onClick={() => setActiveImage(image)}
                                className={`border-2 transition-all duration-300 aspect-3/4 overflow-hidden ${activeImage?.url === image?.url ? 'border-black' : 'border-transparent'
                                    }`}
                            >
                                <Image
                                    data={image}
                                    className="w-full h-full object-cover"
                                    sizes="100px"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Center: Gallery (Main Image on Desktop, Slider on Mobile) */}
                    <div className="lg:bg-[#f9f9f9] -mx-6 lg:mx-0">
                        {/* Mobile Slider */}
                        <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
                            {allImages.map((image, index) => (
                                <div key={image?.id || index} className="flex-none w-full snap-center aspect-3/4">
                                    <Image
                                        data={image}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                        sizes="100vw"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Desktop Main Image */}
                        <div className="hidden lg:block w-full relative aspect-3/4">
                            {activeImage && (
                                <Image
                                    data={activeImage}
                                    alt={product.title}
                                    className="w-full h-full object-cover shadow-sm"
                                    sizes="(min-width: 45em) 50vw, 100vw"
                                />
                            )}
                        </div>

                        {/* Mobile Dots (Optional but nice) */}
                        <div className="lg:hidden flex justify-center gap-2 py-4">
                            {allImages.map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                            ))}
                        </div>
                    </div>

                    {/* Right: Sticky Info */}
                    <div className="lg:sticky lg:top-[100px]">
                        <div className="product-info-panel">
                            <h1 className="font-agatho text-3xl lg:text-4xl leading-tight text-neutral-900 mb-4">
                                {product.title}
                            </h1>

                            <div className="flex items-baseline gap-3 mb-8">
                                <span className="text-2xl font-medium text-neutral-900">
                                    <Money data={selectedVariant?.price || product.priceRange.minVariantPrice} />
                                </span>
                                <span className="text-xs text-neutral-500 font-light">
                                    MRP (Inclusive of all taxes)
                                </span>
                            </div>

                            {/* Sizes and CTA via ProductForm */}
                            <div className="product-form-wrapper-manyavar">
                                <ProductForm
                                    productOptions={productOptions}
                                    selectedVariant={selectedVariant}
                                />
                            </div>

                            {/* Additional Manyavar-style CTAs */}
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 border border-neutral-200 py-3 text-sm uppercase tracking-widest hover:bg-neutral-50 transition">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    Wishlist
                                </button>
                                <button className="flex items-center justify-center gap-2 border border-neutral-200 py-3 text-sm uppercase tracking-widest hover:bg-neutral-50 transition">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                                    </svg>
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
