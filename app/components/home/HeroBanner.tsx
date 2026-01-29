import { useState, useEffect } from 'react';
import { Image } from '@shopify/hydrogen';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AnimatedButton } from '../animation/AnimatedButton';
import { ScrollDepthCTA } from './ScrollDepthCTA';

interface BannerImage {
    url: string;
    altText?: string;
    alt?: string;
    width?: number;
    height?: number;
}

interface BannerData {
    id?: string;
    heading?: string;
    sub_heading?: string;
    cta?: string;
    link_url?: string;
    images?: BannerImage;
    [key: string]: any;
}

export function HeroBanner({ banners }: { banners: BannerData[] }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!banners || banners.length === 0) return null;

    // Render placeholder during SSR to avoid useLayoutEffect warning
    if (!isMounted) {
        const firstBanner = banners[0];
        const image = firstBanner?.images || (firstBanner as any)?.image;
        const imageData = image ? { ...image, altText: image.altText || image.alt || 'Hero Banner' } : null;
        return (
            <div className="hero-banner-slider w-full relative">
                <div className="h-[600px] md:h-screen w-full relative overflow-hidden">
                    {imageData?.url && (
                        <Image
                            data={imageData}
                            sizes="100vw"
                            className="w-full h-full object-cover"
                            loading="eager"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="hero-banner-slider w-full relative group/hero">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={banners.length > 1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.hero-pagination',
                }}
                navigation={{
                    nextEl: '.hero-next',
                    prevEl: '.hero-prev',
                }}
                className="h-[600px] md:h-screen w-full"
            >
                {banners.map((banner, index) => {
                    const image = banner.images || banner.image;
                    const heading = banner.heading || banner.title;
                    const subHeading = banner.sub_heading;
                    const cta = banner.cta;
                    const link_url = banner.link_url;

                    const imageData = image
                        ? {
                            ...image,
                            altText: image.altText || image.alt || heading || 'Hero Banner',
                        }
                        : null;

                    if (!imageData?.url) return null;

                    return (
                        <SwiperSlide key={banner.id || index}>
                            <div className="relative w-full h-full overflow-hidden bg-[#2f1303]">
                                {/* Image Background */}
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        data={imageData}
                                        sizes="100vw"
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                    />
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/90 via-black/40 to-transparent z-0 pointer-events-none" />

                                {/* Content */}
                                <div className="absolute inset-0 w-full flex flex-col items-start justify-center text-left p-6 md:pl-20 lg:pl-32 text-white z-10 gap-2 md:w-[60%]">
                                    {heading && (
                                        <h2
                                            className="text-4xl md:text-6xl lg:!text-6xl !font-normal tracking-tight mb-0! drop-shadow-2xl !text-white"
                                        >
                                            {heading}
                                        </h2>
                                    )}
                                    {subHeading && (
                                        <p
                                            className="!text-lg md:text-2xl mb-6 !font-light max-w-2xl text-gray-100 drop-shadow-lg"
                                        >
                                            {subHeading}
                                        </p>
                                    )}

                                    {cta && (
                                        <AnimatedButton
                                            text={cta}
                                            href={link_url || '/'}
                                            variant="filled"
                                            textColor="#4a1d1c"
                                            bgPrimary="#fff"
                                            bgSecondary="#fff"
                                            arrowColor="#4a1d1c"
                                        />
                                    )}

                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}

                {/* Custom Navigation */}
                <button className="hero-prev absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md transition-all opacity-0 group-hover/hero:opacity-100 cursor-pointer border border-white/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="hero-next absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md transition-all opacity-0 group-hover/hero:opacity-100 cursor-pointer border border-white/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Custom Pagination Container */}
                <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3" />
            </Swiper>

            <style>{`
        .hero-pagination .swiper-pagination-bullet {
          width: 40px;
          height: 3px;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          background: #fff;
          width: 60px;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>
        </div>
    );
}

