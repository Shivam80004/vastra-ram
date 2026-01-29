import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import type { Image as ImageType } from '@shopify/hydrogen/storefront-api-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Collection {
    id: string;
    handle: string;
    title: string;
    image?: ImageType;
}

interface FeaturedCollectionProps {
    collections: Collection[];
}

export function FeaturedCollection({ collections }: FeaturedCollectionProps) {
    const [isMounted, setIsMounted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !sectionRef.current || !headingRef.current) return;

        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            // Animate Heading
            gsap.fromTo(headingRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );

            // Animate Cards (Staggered)
            gsap.fromTo('.collection-card-anim',
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isMounted]);

    const CardContent = ({ collection }: { collection: Collection }) => (
        <>
            {collection.image ? (
                <div className="relative w-full h-[400px] md:h-[32rem] overflow-hidden rounded-[32px] shadow-lg">
                    <Image
                        data={collection.image}
                        alt={collection.title}
                        sizes="(min-width: 45em) 33vw, 50vw"
                        className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center text-center transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                        <h3 className="text-3xl md:text-3xl text-white mb-4 leading-tight drop-shadow-md">
                            {collection.title}
                        </h3>

                        <div className="hidden md:block mt-2 px-8 py-3 bg-[#fff]/90 backdrop-blur-3xl text-black text-xs font-bold tracking-widest uppercase rounded-full shadow-md transition-all duration-300 hover:bg-[#fff]/70 hover:shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                            View Collection
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-[500px] bg-gray-200 rounded-[32px] flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                </div>
            )}
        </>
    );

    return (
        <section ref={sectionRef} className="featured-collections py-12 pb-22 md:py-24 bg-[#FFFCF7] overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-[#642826]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container-global mx-auto max-w-7xl relative z-10 px-4 md:px-8">
                {/* Header */}
                <div ref={headingRef} className="text-center mb-8 md:mb-16 space-y-4">
                    <div className="text-center">
                        <h2 className="!text-3xl md:text-5xl font-extrabold !m-0 text-[#2A2A2A]">
                            WHAT'S YOUR VIBE?
                        </h2>
                    </div>
                    {/* <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2A2A2A] tracking-wide">
                        SIGNATURE COLLECTIONS
                    </h2> */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-16 bg-[#D4AF37]"></div>
                        <span className="text-[#D4AF37] text-xl">✦</span>
                        <div className="h-px w-16 bg-[#D4AF37]"></div>
                    </div>
                </div>

                {/* Content */}
                {!isMounted ? (
                    // SSR Static Grid
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collections.slice(0, 3).map((collection) => (
                            <Link
                                key={collection.id}
                                to={`/collections/${collection.handle}`}
                                className="collection-card block group"
                            >
                                <CardContent collection={collection} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    // Client Swiper
                    <div className="relative">
                        <Swiper
                            modules={[Navigation, Autoplay, Pagination]}
                            spaceBetween={32}
                            slidesPerView={1.2}
                            // centeredSlides={true}
                            // loop={true}
                            // autoplay={{
                            //     delay: 3000,
                            //     disableOnInteraction: false,
                            //     pauseOnMouseEnter: true,
                            // }}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            navigation={{
                                nextEl: '.custom-swiper-next',
                                prevEl: '.custom-swiper-prev',
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 24,
                                    // centeredSlides: true,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 32,
                                    // centeredSlides: true,
                                },
                            }}
                            className="overflow-visible! py-10"
                        >
                            {collections.map((collection) => (
                                <SwiperSlide key={collection.id} className="collection-card-anim">
                                    <Link
                                        to={`/collections/${collection.handle}`}
                                        className="block group h-full"
                                    >
                                        <CardContent collection={collection} />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-12 z-20 hidden md:flex">
                            <button
                                className="custom-swiper-prev w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center text-[#2A2A2A] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 group disabled:opacity-50"
                                aria-label="Previous"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M19 12H5m7-7l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-12 z-20 hidden md:flex">
                            <button
                                className="custom-swiper-next w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center text-[#2A2A2A] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 group disabled:opacity-50"
                                aria-label="Next"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .swiper-slide {
                    transition: transform 0.5s ease;
                }
                .swiper-slide-active {
                    transform: scale(1.02);
                }
                .swiper-pagination {
                   bottom: -24px !important;
                }
                .swiper-pagination-bullet {
                    background-color: #D4AF37 !important;
                    opacity: 0.5;
                    width: 10px;
                    height: 10px;
                }
                .swiper-pagination-bullet-active {
                    opacity: 1 !important;
                    background-color: #642826 !important;
                    width: 24px;
                    border-radius: 6px;
                    transition: width 0.3s ease;
                }
            `}</style>
        </section >
    );
}
