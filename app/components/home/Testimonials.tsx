import { useState, useRef, useEffect } from 'react';
import { Image } from '@shopify/hydrogen'; // Keep if using Hydrogen's Image, otherwise standard img is fine
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



interface TestimonialImage {
    url: string;
    altText?: string;
    alt?: string;
    width?: number;
    height?: number;
}

interface TestimonialData {
    id?: string;
    customer_name?: string;
    name?: string;
    message?: string;
    quote?: string;
    rating?: string | number;
    image?: TestimonialImage;
    location?: string;
    [key: string]: any;
}

const DEFAULT_TESTIMONIALS: TestimonialData[] = [
    {
        id: '1',
        name: 'Aman Singh',
        location: 'Jaipur',
        message: 'It didn’t feel like buying clothes. It felt like being introduced to craft.',
        image: { url: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-hero.jpg?v=123', altText: 'Aman Singh' } // Placeholder or reuse existing
    },
    {
        id: '1-original',
        name: 'Liam Bennett',
        location: 'London',
        message: 'The scaling system is a game-changer—it’s exactly what I was missing and is now my fluid scaling solution for every project.',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a1ad3054186d3c6711_avatar-5.avif', altText: 'Liam Bennett' }
    },
    {
        id: '2',
        name: 'Sophia Carter',
        location: 'New York',
        message: 'It saves you a tremendous amount of time, delivers exceptional quality, and enhances creativity in your projects.',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a1af65ba866dc30020_avatar-2.avif', altText: 'Sophia Carter' }
    },
    {
        id: '3',
        name: 'Lucas Mitchell',
        location: 'Toronto',
        message: 'Visually powerful but also robust, and the best thing is, it’s only going to get better as more resources get added!',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a18cb9163202902407_avatar-1.avif', altText: 'Lucas Mitchell' }
    }
];

export function Testimonials({ testimonials }: { testimonials?: TestimonialData[] }) {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    // Use passed testimonials or fall back to default, ensure we have the specific custom one first if desired
    // For this design, let's mix the default provided data with our new header style
    const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            if (headingRef.current) {
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
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="testimonials-section md:py-24 py-16 bg-[#F9F8F4] relative overflow-hidden">
            {/* Background Texture/Noise could go here */}

            <div className="container-global mx-auto max-w-7xl px-4 md:px-8">
                {/* Section Header */}
                <div ref={headingRef} className="text-center md:mb-16 mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-[#D4AF37]"></div>
                        <h2 className="!text-3xl md:text-5xl font-extrabold !m-0 text-[#2A2A2A]">
                            Stories of Craft
                        </h2>
                        <div className="h-px w-12 bg-[#D4AF37]"></div>
                    </div>
                </div>

                {/* Swiper Slider */}
                <div className="max-w-6xl mx-auto">
                    <Swiper
                        modules={[Navigation, EffectFade, Autoplay, Pagination]}
                        effect={'fade'}
                        fadeEffect={{ crossFade: true }}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        speed={1000}
                        pagination={{
                            clickable: true,
                            el: '.custom-pagination',
                            bulletClass: 'testimonial-bullet',
                            bulletActiveClass: 'testimonial-bullet-active'
                        }}
                        navigation={{
                            nextEl: '.testi-next',
                            prevEl: '.testi-prev',
                        }}
                        className="testimonial-swiper"
                    >
                        {displayTestimonials.map((item, idx) => (
                            <SwiperSlide key={item.id || idx}>
                                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">

                                    {/* Left: Image (Portrait) */}
                                    <div className="w-full md:w-5/12 relative">
                                        <div className="aspect-4/5 relative overflow-hidden rounded-[2px] shadow-xl">
                                            {/* Image Frame/Border Effect */}
                                            <div className="absolute inset-2 border border-white/20 z-10 pointer-events-none"></div>

                                            {item.image?.url ? (
                                                <img
                                                    src={item.image.url}
                                                    alt={item.image.altText || item.name}
                                                    className="w-full h-full object-cover contrast-[1.1] transition-all duration-700 hover:scale-105 rounded-2xl"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Decorative Shadow/Element to blend */}
                                        <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#642826]/10 -z-10 rounded-[2px]"></div>
                                    </div>

                                    {/* Right: Content */}
                                    <div className="w-full md:w-7/12 text-center md:text-left space-y-8">

                                        {/* Quote Icon */}
                                        {/* <div className="text-6xl text-[#D4AF37] font-serif leading-none opacity-50 md:text-left text-center">
                                            “
                                        </div> */}

                                        {/* Main Quote */}
                                        <h3 className="!text-2xl md:text-3xl font-serif text-[#1a1a1a] leading-[1.2] md:leading-[1.15]">
                                            <span className="text-[#642826]">“</span>
                                            <span className="text-[#642826]">{item.message}</span>
                                            <span className="text-[#642826]">”</span>
                                        </h3>

                                        {/* Author Details */}
                                        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mt-8">
                                            <div className="h-px w-12 bg-[#642826] mt-3 hidden md:block"></div>
                                            <div>
                                                <p className="text-lg font-bold text-[#642826] tracking-wide">
                                                    {item.name?.toUpperCase()}
                                                </p>
                                                <p className="text-sm text-gray-500 italic font-serif">
                                                    {item.location || 'Customer'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation & Control */}
                    <div className="flex items-center justify-center md:justify-end gap-8 mt-12 md:-mt-8 relative z-20">
                        {/* Pagination Dots */}
                        <div className="custom-pagination flex items-center justify-center mx-auto"></div>

                        <div className="md:flex gap-4 hidden">
                            <button className="testi-prev w-12 h-12 rounded-full border border-[#642826]/20 flex items-center justify-center text-[#642826] hover:bg-[#642826] hover:text-white transition-all duration-300">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M19 12H5m7-7l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="testi-next w-12 h-12 rounded-full border border-[#642826]/20 flex items-center justify-center text-[#642826] hover:bg-[#642826] hover:text-white transition-all duration-300">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .testimonial-bullet {
                    width: 0.5rem;
                    height: 0.5rem;
                    border-radius: 9999px;
                    background-color: #642826;
                    opacity: 0.3;
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                    cursor: pointer;
                    transition: all 300ms;
                    display: inline-block;
                }
                .testimonial-bullet-active {
                    opacity: 1 !important;
                    background-color: #642826 !important;
                }
            `}</style>
        </section>
    );
}
