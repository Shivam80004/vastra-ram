import React from 'react';

const LongBanner = () => {
    return (
        <section className="relative w-full h-[200px] sm:h-[300px] md:h-[470px] my-16 md:my-24 flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        'url("https://cdn.shopify.com/s/files/1/0744/6108/5884/files/home-page-long-banner.png?v=1766979391")',
                }}
            />

            {/* Taller Centered Image */}
            <div className="relative w-full h-full flex items-center justify-center">
                <img
                    src="https://cdn.shopify.com/s/files/1/0744/6108/5884/files/banner-png.png?v=1766979354"
                    alt="Banner Overlay"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] sm:h-[130%] md:h-[200%] w-auto max-w-none object-contain z-10"
                />
            </div>
        </section>
    );
};

export default LongBanner;
