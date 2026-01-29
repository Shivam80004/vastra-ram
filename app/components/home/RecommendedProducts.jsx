import { Suspense, useRef, useEffect, useState } from 'react';
import { Await, Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedButton } from '../animation/AnimatedButton';
import { ProductCard } from '../ProductCard';



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
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        className="product-card-anim opacity-0 translate-y-10"
                                    />
                                ));
                            }}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </section>
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
