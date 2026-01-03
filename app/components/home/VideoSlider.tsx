import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface VideoSliderProps {
    videos: {
        id: number;
        url: string;
        poster: string;
        productCount: number;
    }[];
}

export function VideoSlider({ videos }: VideoSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [playingStates, setPlayingStates] = useState<boolean[]>([]);

    useEffect(() => {
        setPlayingStates(new Array(videos.length).fill(false));
    }, [videos.length]);

    const handleSlideChange = (swiper: SwiperType) => {
        const newIndex = swiper.realIndex;

        // Pause all videos
        videoRefs.current.forEach((video, index) => {
            if (video && index !== newIndex) {
                video.pause();
                setPlayingStates(prev => {
                    const newStates = [...prev];
                    newStates[index] = false;
                    return newStates;
                });
            }
        });

        setActiveIndex(newIndex);
    };

    const togglePlay = (index: number) => {
        const video = videoRefs.current[index];
        if (!video) return;

        if (video.paused) {
            video.play();
            setPlayingStates(prev => {
                const newStates = [...prev];
                newStates[index] = true;
                return newStates;
            });
        } else {
            video.pause();
            setPlayingStates(prev => {
                const newStates = [...prev];
                newStates[index] = false;
                return newStates;
            });
        }
    };

    return (
        <section className="video-slider-section py-16 bg-black">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
                    hello
                </h2>

                <div className="relative max-w-7xl mx-auto">
                    <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        navigation={{
                            prevEl: '.video-slider-prev',
                            nextEl: '.video-slider-next',
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.5,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        onSlideChange={handleSlideChange}
                        className="video-swiper pb-12!"
                    >
                        {videos.map((video, index) => (
                            <SwiperSlide key={video.id}>
                                <div className="relative rounded-2xl overflow-hidden aspect-3/4 bg-gray-900 group">
                                    <video
                                        ref={(el) => (videoRefs.current[index] = el)}
                                        className="w-full h-full object-cover"
                                        poster={video.poster}
                                        loop
                                        playsInline
                                        muted
                                    >
                                        <source src={video.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Play/Pause Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={() => togglePlay(index)}
                                            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 group-hover:opacity-100 opacity-0"
                                            aria-label={playingStates[index] ? 'Pause video' : 'Play video'}
                                        >
                                            {playingStates[index] ? (
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    {/* Product Count Badge */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <span className="text-white text-sm font-medium">
                                            {video.productCount} Product{video.productCount > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button
                        className="video-slider-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className="video-slider-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    .video-swiper .swiper-pagination {
                        bottom: 0 !important;
                    }
                    
                    .video-swiper .swiper-pagination-bullet {
                        background: white;
                        opacity: 0.5;
                        width: 8px;
                        height: 8px;
                        transition: all 0.3s ease;
                    }
                    
                    .video-swiper .swiper-pagination-bullet-active {
                        opacity: 1;
                        width: 24px;
                        border-radius: 4px;
                    }

                    .video-swiper .swiper-slide {
                        transition: all 0.5s ease;
                        opacity: 0.6;
                        transform: scale(0.9);
                    }

                    .video-swiper .swiper-slide-active {
                        opacity: 1;
                        transform: scale(1);
                    }

                    .video-swiper .swiper-slide-prev,
                    .video-swiper .swiper-slide-next {
                        opacity: 0.8;
                        transform: scale(0.95);
                    }
                `
            }} />
        </section>
    );
}
