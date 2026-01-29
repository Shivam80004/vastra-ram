import { Suspense, useRef, useEffect, useState } from 'react';
import { Await, Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedButton } from '../animation/AnimatedButton';



export function RecommendedProducts({ products }) {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !sectionRef.current || !headingRef.current) return;

        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            // Animate Heading
            gsap.fromTo(headingRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Animate Cards (will target via class after data load)
            // Note: Since data is async, we might need to rely on a valid DOM presence.
            // For simplicity, we trigger specific animation in the ProductCard component or wait for suspense.
            // But doing a batch simple trigger here:
            ScrollTrigger.batch(".product-card-anim", {
                start: "top 85%",
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power3.out"
                }),
                once: true
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [isMounted]);

    return (
        <section ref={sectionRef} className="recommended-products py-24 bg-[#F9F8F4] relative overflow-hidden">
            {/* Decorative Background Blur */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

            <div className="container-global mx-auto max-w-7xl px-4 md:px-8 relative z-10">
                {/* Header */}
                <div ref={headingRef} className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-[#D4AF37]"></div>
                        <span className="text-xs font-bold tracking-[0.2em] text-[#642826] uppercase">Curated For You</span>
                        <div className="h-px w-12 bg-[#D4AF37]"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl text-[#1a1a1a] leading-tight">
                        Signature Selections
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    <Suspense fallback={<RecommendedProductsSkeleton />}>
                        <Await resolve={products}>
                            {(data) => {
                                const productsList = data?.products?.nodes || [];
                                if (productsList.length === 0) return <div className="text-center col-span-full">No recommendations found.</div>;

                                return productsList.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ));
                            }}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product }) {
    // Custom hook usage from lib/variants or manually construct. 
    // Assuming /products/handle is the standard URL structure in Hydrogen.
    const variantUrl = `/products/${product.handle}`;
    const image = product.featuredImage;

    return (
        <div className="product-card-anim opacity-0 translate-y-10 group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#f0f0f0]">
            <Link to={variantUrl} className="block relative aspect-3/4 md:h-[60vh] overflow-hidden bg-[#F5F5F0] m-2">
                {image ? (
                    <Image
                        data={image}
                        alt={image.altText || product.title}
                        aspectRatio="3/4"
                        sizes="(min-width: 45em) 25vw, 50vw"
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}

                {/* Quick Add Overlay (Optional, enhances Awwwards feel) */}
                {/* <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
            </Link>

            <div className="p-2 flex flex-col items-center grow text-center">
                <Link to={variantUrl} className="group-hover:text-[#642826] transition-colors duration-300">
                    <h3 className="font-extrabold text-[22px] text-[#2A2A2A] mb-1 leading-tight min-h-14 flex items-center justify-center">
                        {product.title}
                    </h3>
                </Link>

                {/* Description or Subtitle placeholder */}
                {/* <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {product.description || 'Elegant traditional wear for the modern occasion.'}
                </p> */}

                <div className="mt-auto mb-2 w-full px-2 relative h-10 flex items-center justify-center">
                    <span className="font-sans font-bold text-[#642826] text-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:opacity-0 delay-75">
                        <Money data={product.priceRange.minVariantPrice} />
                    </span>

                    <div className="absolute left-0 right-0 flex items-center justify-center opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Link to={variantUrl} className='w-full mx-4'>
                            <button className="w-full bg-[#4a1d1c] text-white px-4 py-2 rounded-full shadow-md text-sm font-medium tracking-wide">
                                Add to Cart
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RecommendedProductsSkeleton() {
    return (
        <>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100">
                    <div className="bg-gray-200 aspect-3/4 w-full"></div>
                    <div className="p-6 flex flex-col items-center space-y-4">
                        <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                        <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                        <div className="h-10 bg-gray-200 w-32 rounded mt-2"></div>
                    </div>
                </div>
            ))}
        </>
    );
}
