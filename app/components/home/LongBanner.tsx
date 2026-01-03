import React from 'react';
import { Link } from 'react-router';

const LongBanner = () => {
    return (
        <section className="relative w-full h-[200px] sm:h-[300px] md:h-[470px] my-16 md:my-64 flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        'url("https://cdn.shopify.com/s/files/1/0744/6108/5884/files/home-page-long-banner.png?v=1766979391")',
                }}
            />

            {/* Decorative Medallion Overlay */}
            <div className="relative w-full h-full flex items-center justify-center">
                <img
                    src="https://cdn.shopify.com/s/files/1/0744/6108/5884/files/banner-png.png?v=1766979354"
                    alt="Banner Overlay"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] sm:h-[130%] md:h-[200%] w-auto max-w-none object-contain z-10"
                />
            </div>

            {/* Content Overlay */}
            <div className="absolute z-20 flex flex-col items-center justify-center text-center px-4 max-w-2xl">
                {/* Title */}
                <h1 className="mb-3 sm:mb-4 md:mb-6 !text-white tracking-wide leading-tight">
                    A Personal Trial, At Your Doorstep
                </h1>

                {/* Description */}
                <p className="text-sm md:text-xl text-white/90 mb-6 md:mb-10 max-w-xl font-light leading-relaxed">
                    Select your outfit online and try it at home with guidance from our style specialist.
                </p>

                {/* CTA Button */}
                <Link
                    to="/book-trial"
                    className="group relative !no-underline inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-semibold text-black bg-linear-to-r from-[#ffb11f] to-[#ffc64f] rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
                    style={{
                        boxShadow: '0 10px 30px rgba(217, 119, 6, 0.3)',
                    }}
                >
                    {/* Shine Effect */}
                    <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

                    <span className="relative flex items-center gap-2 tracking-wide">
                        <h3 className="text-red-900 font-bold !text-2xl no-underline"> Book Home Trial</h3>
                        <svg
                            className="w-8 h-8 transition-transform ml-2 mb-1 group-hover:translate-x-1"
                            fill="none"
                            stroke="#82181a"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default LongBanner;
