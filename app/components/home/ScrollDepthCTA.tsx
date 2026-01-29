import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollDepthCTAProps {
    text: string;
    url: string;
}

export function ScrollDepthCTA({ text, url }: ScrollDepthCTAProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const underlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        console.log('ScrollDepthCTA mounted for:', text);
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        const textEl = textRef.current;
        const underline = underlineRef.current;

        if (!container || !textEl || !underline) return;

        // --- Initial State (Pure Silence: 0-20%) ---
        gsap.set(container, {
            autoAlpha: 0, // Start hidden
            pointerEvents: "none"
        });
        gsap.set(underline, {
            scaleX: 0,
            transformOrigin: "left"
        });

        // --- Scroll Interaction Timeline ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "100vh top", // Assuming mapping corresponds to first viewport height
                scrub: 0.1, // Slight smoothness
                markers: true, // DEBUG: Enable if needed
            }
        });

        // 0-20% is handled by initial set (opacity 0)

        // 20-40%: Dormant (Opacity 0 -> 0.15)
        // Timeline runs from 0 to 1 based on scrollTrigger progress.
        // We map time 0.2 to 20%, 0.4 to 40%, etc.

        // Note: tweening from 0.2 to 0.4 means duration is 0.2.

        // At 20% scroll (t=0.2): Start fading in
        tl.to(container, {
            autoAlpha: 0.15,
            duration: 0.2, // spans 20% to 40%
            ease: "none",
            pointerEvents: "none" // Still no interaction
        }, 0.2);

        // 40-60%: Aware (Opacity 0.15 -> 0.5)
        tl.to(container, {
            autoAlpha: 0.5,
            duration: 0.2, // spans 40% to 60%
            ease: "none",
            pointerEvents: "auto" // Interaction enabled
        }, 0.4);

        // 60-80%: Intent (Opacity 0.5 -> 0.8)
        tl.to(container, {
            autoAlpha: 0.8,
            duration: 0.2, // spans 60% to 80%
            ease: "none"
        }, 0.6);

        // 80-100%: Locks (Opacity stays high, mapped to 1 if we want visible)
        tl.to(container, {
            autoAlpha: 1, // Full visibility at lock
            duration: 0.2,
            ease: "none"
        }, 0.8);


        // --- Hover Animations (Logic based on opacity state is complex, 
        // using simple hover assuming user is in interacting phase) ---

        const onMouseEnter = () => {
            // Check if we are in interaction phase (roughly opacity > 0.4)
            // But simplifying: just animate if not hidden

            // "Thin underline grows from left -> right"
            gsap.to(underline, {
                scaleX: 1,
                duration: 0.75, // 0.6-0.9s
                ease: "power2.out"
            });

            // "Slight letter-spacing tightening on hover"
            gsap.to(textEl, {
                letterSpacing: "-0.01em", // Tightening
                duration: 0.6,
                ease: "power2.out"
            });
        };

        const onMouseLeave = () => {
            gsap.to(underline, {
                scaleX: 0,
                duration: 0.6,
                ease: "power2.out"
            });
            gsap.to(textEl, {
                letterSpacing: "0.1em", // Return to original tracking
                duration: 0.6,
                ease: "power2.out"
            });
        };

        container.addEventListener('mouseenter', onMouseEnter);
        container.addEventListener('mouseleave', onMouseLeave);

        return () => {
            // Cleanup
            container.removeEventListener('mouseenter', onMouseEnter);
            container.removeEventListener('mouseleave', onMouseLeave);
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, []);

    if (!text) return null;

    return (
        <div
            ref={containerRef}
            className="fixed bottom-12 right-8 md:bottom-16 md:right-16 z-[100] mix-blend-difference"
        >
            <NavLink
                to={url || '#'}
                className="group flex flex-col items-end cursor-pointer no-underline"
            >
                <span
                    ref={textRef}
                    className="text-white text-sm md:text-base font-light uppercase tracking-[0.1em] mb-1"
                >
                    {text}
                </span>
                <div
                    className="w-full h-[1px] bg-white/30 overflow-hidden relative"
                >
                    {/* Base line always visible? "No underline" at start. So base line is opacity 0 or handled by overlay?
                         Prompt says: "Thin underline grows...". 
                         Let's use the ref on the growing part.
                     */}
                    <div
                        ref={underlineRef}
                        className="absolute top-0 left-0 w-full h-full bg-white"
                    />
                </div>
            </NavLink>
        </div>
    );
}
