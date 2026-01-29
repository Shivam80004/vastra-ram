import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import type { Image as ImageType } from '@shopify/hydrogen/storefront-api-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



interface Collection {
    id: string;
    handle: string;
    title: string;
    image?: ImageType;
}

interface ShopTheOccasionProps {
    collections: Collection[];
}

const CARD_STYLES = [
    {
        color: '#4A1D1F', // Deep Maroon
        label: 'WEDDING'
    },
    {
        color: '#263A75', // Royal Blue
        label: 'FESTIVE'
    },
    {
        color: '#5A7263', // Sage Green
        label: 'MODERN'
    },
    {
        color: '#2A2A2A', // Charcoal
        label: 'BESPOKE'
    }
];

export function ShopTheOccasion({ collections }: ShopTheOccasionProps) {
    const [isMounted, setIsMounted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !sectionRef.current || !headingRef.current || !cardsRef.current) return;

        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            gsap.fromTo(headingRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );

            gsap.fromTo('.occasion-card-anim',
                { y: 10, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 100%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isMounted]);

    const getCardStyle = (index: number) => CARD_STYLES[index % CARD_STYLES.length];

    // Mughal Arch Path Definition
    const refinedArchPath = "M 0 1 L 0 0.38 C 0 0.28 0.08 0.22 0.18 0.18 C 0.30 0.12 0.42 0.12 0.5 0.03 C 0.58 0.12 0.70 0.12 0.82 0.18 C 0.92 0.22 1 0.28 1 0.38 L 1 1 Z";

    return (
        <section ref={sectionRef} className="shop-the-occasion md:py-24 py-16 bg-[#FFFCF7]">
            <div className="container-global mx-auto max-w-7xl px-4 md:px-8">
                {/* Header */}
                <div ref={headingRef} className="text-center md:mb-16 mb-7 space-y-4">
                    {/* <div className="text-center">
                        <h2 className="tracking-wider text-[#642826] text-sm font-bold uppercase mb-2">
                            Curated For You
                        </h2>
                    </div> */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-[#D4AF37]"></div>
                        <h2 className="!text-3xl md:text-5xl font-extrabold m-0! text-[#2A2A2A]">
                            SHOP THE OCCASION
                        </h2>
                        <div className="h-px w-12 bg-[#D4AF37]"></div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {collections.slice(0, 4).map((collection, index) => {
                        const style = getCardStyle(index);
                        const clipId = `arch-clip-${index}`;

                        return (
                            <Link
                                key={collection.id}
                                to={`/collections/${collection.handle}`}
                                className="occasion-card-anim group relative block w-full aspect-3/5 rounded-[24px] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                style={{ backgroundColor: style.color }}
                            >
                                {/* Inner Content Container with Padding */}
                                <div className="absolute inset-4 sm:inset-5">

                                    {/* The Arch Frame Content */}
                                    <div className="relative w-full h-full">

                                        {/* SVG Definition for Clip Path */}
                                        <svg height="0" width="0" className="absolute">
                                            <defs>
                                                <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                                                    <path d={refinedArchPath} />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        {/* Gold Border SVG (Overlay) */}
                                        <div className="absolute inset-0 z-20 pointer-events-none">
                                            <svg
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                className="w-full h-full"
                                            >
                                                <path
                                                    d="M 0 100 L 0 38 C 0 28 8 22 18 18 C 30 12 42 12 50 3 C 58 12 70 12 82 18 C 92 22 100 28 100 38 L 100 100 Z"
                                                    fill="none"
                                                    stroke="#D4AF37"
                                                    strokeWidth="0.8"
                                                    vectorEffect="non-scaling-stroke"
                                                />
                                            </svg>
                                        </div>

                                        {/* Masked Content Area */}
                                        <div
                                            className="w-full h-full relative z-10 bg-black/10"
                                            style={{ clipPath: `url(#${clipId})` }}
                                        >
                                            {/* Image */}
                                            {collection.image && (
                                                <div className="absolute inset-0 h-full w-full overflow-hidden">
                                                    <Image
                                                        data={collection.image}
                                                        alt={collection.title}
                                                        sizes="(min-width: 45em) 25vw, 50vw"
                                                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-110"
                                                    />
                                                </div>
                                            )}

                                            {/* Gradient Fade using inline style for dynamic color */}
                                            <div
                                                className="absolute bottom-0 h-[35%] w-full overflow-hidden"
                                                style={{ background: `linear-gradient(to top, ${style.color}, transparent)` }}
                                            ></div>

                                            {/* Text Area (Bottom of the Arch Shape) */}
                                            <div className="absolute bottom-0 left-0 right-0 h-[15%] flex flex-col items-center justify-center pb-2">
                                                <h3 className="text-xl lg:text-2xl font-serif text-white tracking-widest uppercase font-medium drop-shadow-md">
                                                    {style.label}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .occasion-card-anim {
                    will-change: transform, opacity;
                }
            `}</style>
        </section>
    );
}
