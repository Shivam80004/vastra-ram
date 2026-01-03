import { useEffect } from 'react';

/**
 * Hook to initialize Lenis smooth scroll on the client side only.
 * This approach avoids SSR issues by only running in useEffect.
 */
export function useSmoothScroll() {
    useEffect(() => {
        // Only run on the client
        if (typeof window === 'undefined') return;

        let lenis = null;
        let rafHandle = null;

        const initLenis = async () => {
            try {
                // Dynamically import to avoid SSR bundling issues
                const Lenis = (await import('lenis')).default;
                const { gsap } = await import('gsap');
                const { ScrollTrigger } = await import('gsap/ScrollTrigger');

                gsap.registerPlugin(ScrollTrigger);

                // Initialize Lenis smooth scroll
                lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                    wheelMultiplier: 1,
                    touchMultiplier: 2,
                    infinite: false,
                });

                // Integrate Lenis with GSAP ScrollTrigger
                lenis.on('scroll', ScrollTrigger.update);

                rafHandle = (time) => {
                    lenis.raf(time * 1000);
                };

                gsap.ticker.add(rafHandle);
                gsap.ticker.lagSmoothing(0);
            } catch (error) {
                console.error('Failed to initialize Lenis:', error);
            }
        };

        initLenis();

        // Cleanup on unmount
        return () => {
            if (lenis) {
                lenis.destroy();
            }
        };
    }, []);
}
