import React from 'react';
import { AnimatedButton } from '../animation/AnimatedButton';
import ParallaxImage from '../animation/ParallaxImage';

const LongBanner = () => {
    return (
        <section className="relative w-full h-[400px] overflow-hidden sm:h-[300px] md:h-screen bg-black flex items-center justify-center">
            {/* Background Image */}
            {/* <div
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-75 bg-no-repeat"
                style={{
                    backgroundImage:
                        'url("https://cdn.shopify.com/s/files/1/0744/6108/5884/files/door-step-bg.jpg?v=1768466754")',
                }}
            /> */}

            <ParallaxImage
                src="https://cdn.shopify.com/s/files/1/0744/6108/5884/files/door-step-bg.jpg?v=1768466754"
                alt="Banner Overlay"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] sm:h-[130%] md:h-[100%] w-full max-w-none object-contain z-10"
                scale={1}
                yMove={80}
            />

            {/* Decorative Medallion Overlay */}
            {/* <div className="relative w-full h-full flex items-center justify-center">
                <img
                    src="https://cdn.shopify.com/s/files/1/0744/6108/5884/files/banner-png.png?v=1766979354"
                    alt="Banner Overlay"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] sm:h-[130%] md:h-[200%] w-auto max-w-none object-contain z-10"
                />
            </div> */}

            {/* Content Overlay */}
            <div className="absolute inset-0 md:inset-auto md:left-28 md:top-[40%] z-20 flex flex-col items-start justify-center text-left px-4 max-w-md md:max-w-2xl mx-auto md:mx-0">
                {/* Title */}
                <h2 className="!text-3xl md:!text-5xl mb-3 sm:mb-4 md:!mb-4 !text-white tracking-wide leading-10 z-20 drop-shadow-md">
                    A Personal Trial, At Your Doorstep!
                </h2>

                {/* Description */}
                <p className="!text-base md:!text-xl text-white/95 mb-4 md:mb-6 max-w-xl font-light leading-relaxed z-20 drop-shadow-sm">
                    Select your outfit online and try it at home with guidance from our style specialist.
                </p>

                {/* CTA Button */}
                <AnimatedButton
                    text="Book Home Trial"
                    href="/book-trial"
                    variant="filled"
                    className="z-20"
                    textColor="#4a1d1c"
                    bgPrimary="#fff"
                    bgSecondary="#fff"
                    arrowColor="#4a1d1c"
                />


            </div>
            {/* Overlay Image */}
            <div
                className="absolute top-0 left-0 bg-gradient-to-r from-[#000000] to-transparent !z-10 h-full w-1/2 max-w-none object-contain"
            ></div>
            {/* Image */}
            {/* <img
                src="https://cdn.shopify.com/s/files/1/0744/6108/5884/files/banner-png.png?v=1766979354"
                alt="Banner Overlay"
                className="absolute top-[20vh] right-5 -z-10 h-[120%] sm:h-[130%] md:h-[27rem] w-auto max-w-none object-contain z-10"
            /> */}
        </section>
    );
};

export default LongBanner;
