import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import type { Image as ImageType } from '@shopify/hydrogen/storefront-api-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Render static grid during SSR to avoid useLayoutEffect warning
    const renderCollectionCard = (collection: Collection) => (
        <Link
            to={`/collections/${collection.handle}`}
            className="collection-card block group"
        >
            {collection.image && (
                <div className="relative">
                    <div className="relative w-full h-[460px] aspect-square rounded-t-full overflow-hidden bg-white shadow-xl"
                        style={{
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            borderRadius: '999px 999px 0 0'
                        }}
                    >
                        <Image
                            data={collection.image}
                            alt={collection.title}
                            sizes="(min-width: 45em) 33vw, 50vw"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
                        <h3 className="text-2xl md:text-3xl font-bold tracking-wider text-white drop-shadow-lg">
                            {collection.title.toUpperCase()}
                        </h3>
                    </div>
                </div>
            )}
        </Link>
    );

    return (
        <section className="featured-collections py-18">
            <div className="container-global mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="tracking-wider">
                        WHAT'S YOUR VIBE?
                    </h2>
                </div>

                {/* Static grid for SSR, Swiper for client */}
                {!isMounted ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-16">
                        {collections.slice(0, 3).map((collection) => (
                            <div key={collection.id}>
                                {renderCollectionCard(collection)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative px-16">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={24}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '.featured-next',
                                prevEl: '.featured-prev',
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 24,
                                },
                            }}
                            className="featured-swiper"
                        >
                            {collections.map((collection) => (
                                <SwiperSlide key={collection.id}>
                                    <Link
                                        to={`/collections/${collection.handle}`}
                                        className="collection-card block group"
                                    >
                                        {collection.image && (
                                            <div className="relative">
                                                {/* Arch background */}
                                                <div className="relative w-full h-[500px] aspect-square rounded-t-full overflow-hidden bg-white shadow-xl"
                                                    style={{
                                                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                                        borderRadius: '999px 999px 0 0'
                                                    }}
                                                >
                                                    <Image
                                                        data={collection.image}
                                                        alt={collection.title}
                                                        sizes="(min-width: 45em) 33vw, 50vw"
                                                        className="h-full w-full object-cover"
                                                    />
                                                    {/* Gradient overlay for better text visibility */}
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent"></div>
                                                </div>

                                                {/* Collection Title Overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
                                                    <h3
                                                        className="text-2xl md:text-3xl font-bold tracking-wider text-white drop-shadow-lg"
                                                    >
                                                        {collection.title.toUpperCase()}
                                                    </h3>
                                                </div>
                                            </div>
                                        )}
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Buttons */}
                        <button
                            className="featured-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            aria-label="Previous collections"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <button
                            className="featured-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            aria-label="Next collections"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Custom Styles for Swiper Navigation */}
            <style>{`
                .featured-swiper .swiper-button-disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                    pointer-events: none;
                }
                
                .featured-prev.swiper-button-disabled,
                .featured-next.swiper-button-disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
            `}</style>
        </section>
    );
}
