'use client';

import { useEffect, useRef } from 'react';
import { Image } from '@shopify/hydrogen';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/dist/Draggable';
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
}

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
    [key: string]: any;
}

const DEFAULT_TESTIMONIALS: TestimonialData[] = [
    {
        id: '1',
        name: 'Liam Bennett',
        message: 'Osmo is my new go-to resource for the best Webflow cloneables and code snippets. It saves me a lot of time and elevates my workflow. The scaling system, in particular, is a game-changer—it\'s exactly what I was missing and is now my fluid scaling solution for every project.',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a1ad3054186d3c6711_avatar-5.avif', altText: '' }
    },
    {
        id: '2',
        name: 'Sophia Carter',
        message: 'The Osmo Vault is a must-have for freelancers and agencies. It saves you a tremendous amount of time, delivers exceptional quality, and enhances creativity in your projects.',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a1af65ba866dc30020_avatar-2.avif', altText: '' }
    },
    {
        id: '3',
        name: 'Ethan Harper',
        message: 'The creative developer\'s cheat code. Osmo is a one-stop shop, offering everything from snippets to help you set up your site to advanced animations and interactions that elevate it to the next level.',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a1a74f278cb103f171_avatar-3.avif', altText: '' }
    },
    {
        id: '4',
        name: 'Mia Reynolds',
        message: 'Osmo combines high-quality resources with intuitive guides, making the process of designing standout websites faster and easier, helping creatives to achieve great results in less time.',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a1014f1ec2c349acc8_avatar-6.avif', altText: '' }
    },
    {
        id: '5',
        name: 'Noah Brooks',
        message: 'One of a kind platform for any developers out there. It\'s incredible to be able to see and learn how the pros implement their animations. If you love web animations and creative development, this platform this a no brainer—just sign up already.',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a154378639f0c3b8cb_avatar-4.avif', altText: '' }
    },
    {
        id: '6',
        name: 'Olivia Porter',
        message: 'Flawless UI—detailed, easy to implement, and straight-up reliable. The code is clean, well-explained, and ready to drop into Webflow without a hitch. You can tell it\'s built by pros.',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a1a49715653617490f_avatar-8.avif', altText: '' }
    },
    {
        id: '7',
        name: 'Lucas Mitchell',
        message: 'Osmo is full of awesome (and easy to use) interactions that save so much time. They\'re visually powerful but also robust, and the best thing is, it\'s only going to get better as more even resources get added!',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a18cb9163202902407_avatar-1.avif', altText: '' }
    },
    {
        id: '8',
        name: 'Ava Thompson',
        message: 'It\'s nice to get access to some creative dev best kept secrets - they\'re a great a source of inspiration for animations and interactions. Already found out some tricks for some issues that were giving me headaches before!',
        image: { url: 'https://cdn.prod.website-files.com/67eeaec872efc86f0f0af614/67eec8a088b02147174966b6_avatar-7.avif', altText: '' }
    }
];

export function Testimonials({ testimonials }: { testimonials?: TestimonialData[] }) {
    const sliderWrapperRef = useRef<HTMLDivElement>(null);
    const cleanupRef = useRef<(() => void) | null>(null);

    const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

    useEffect(() => {
        if (typeof window === 'undefined' || !sliderWrapperRef.current) return;

        // Custom ease
        gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

        const CustomEase = gsap.parseEase("cubic-bezier(0.625, 0.05, 0, 1)");

        const sliderWrapper = sliderWrapperRef.current;
        const slides = gsap.utils.toArray(sliderWrapper.querySelectorAll('[data-centered-slider="slide"]')) as HTMLElement[];
        const bullets = gsap.utils.toArray(sliderWrapper.querySelectorAll('[data-centered-slider="bullet"]')) as HTMLElement[];
        const prevButton = sliderWrapper.querySelector('[data-centered-slider="prev-button"]') as HTMLElement | null;
        const nextButton = sliderWrapper.querySelector('[data-centered-slider="next-button"]') as HTMLElement | null;

        let activeElement: HTMLElement | null = null;
        let activeBullet: HTMLElement | null = null;
        let currentIndex = 0;
        let autoplay: gsap.core.Tween | null = null;

        const autoplayEnabled = sliderWrapper.getAttribute('data-slider-autoplay') === 'true';
        const autoplayDuration = autoplayEnabled ? parseFloat(sliderWrapper.getAttribute('data-slider-autoplay-duration') || '0') : 0;

        // Assign IDs to slides
        slides.forEach((slide, i) => {
            slide.setAttribute("id", `slide-${i}`);
        });

        // Set ARIA attributes on bullets
        if (bullets && bullets.length > 0) {
            bullets.forEach((bullet, i) => {
                bullet.setAttribute("aria-controls", `slide-${i}`);
                bullet.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
            });
        }

        const loop = horizontalLoop(slides, {
            paused: true,
            draggable: true,
            center: true,
            onChange: (element: HTMLElement, index: number) => {
                currentIndex = index;

                if (activeElement) activeElement.classList.remove("active");
                element.classList.add("active");
                activeElement = element;

                if (bullets && bullets.length > 0) {
                    if (activeBullet) activeBullet.classList.remove("active");
                    if (bullets[index]) {
                        bullets[index].classList.add("active");
                        activeBullet = bullets[index];
                    }
                    bullets.forEach((bullet, i) => {
                        bullet.setAttribute("aria-selected", i === index ? "true" : "false");
                    });
                }
            }
        });

        // Initialize to slide 2
        loop.toIndex(2, { duration: 0.01 });

        function startAutoplay() {
            if (autoplayDuration > 0 && !autoplay) {
                const repeat = () => {
                    loop.next({ ease: CustomEase, duration: 0.725 });
                    autoplay = gsap.delayedCall(autoplayDuration, repeat);
                };
                autoplay = gsap.delayedCall(autoplayDuration, repeat);
            }
        }

        function stopAutoplay() {
            if (autoplay) {
                autoplay.kill();
                autoplay = null;
            }
        }

        // ScrollTrigger for autoplay
        const st = ScrollTrigger.create({
            trigger: sliderWrapper,
            start: "top bottom",
            end: "bottom top",
            onEnter: startAutoplay,
            onLeave: stopAutoplay,
            onEnterBack: startAutoplay,
            onLeaveBack: stopAutoplay
        });

        // Pause on hover
        sliderWrapper.addEventListener("mouseenter", stopAutoplay);
        sliderWrapper.addEventListener("mouseleave", () => {
            if (ScrollTrigger.isInViewport(sliderWrapper)) startAutoplay();
        });

        // Slide click
        slides.forEach((slide, i) => {
            slide.addEventListener("click", () => {
                loop.toIndex(i, { ease: CustomEase, duration: 0.725 });
            });
        });

        // Bullet click
        if (bullets && bullets.length > 0) {
            bullets.forEach((bullet, i) => {
                bullet.addEventListener("click", () => {
                    loop.toIndex(i, { ease: CustomEase, duration: 0.725 });
                    if (activeBullet) activeBullet.classList.remove("active");
                    bullet.classList.add("active");
                    activeBullet = bullet;
                    bullets.forEach((b, j) => {
                        b.setAttribute("aria-selected", j === i ? "true" : "false");
                    });
                });
            });
        }

        // Prev/Next buttons
        if (prevButton) {
            prevButton.addEventListener("click", () => {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = slides.length - 1;
                loop.toIndex(newIndex, { ease: CustomEase, duration: 0.725 });
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                let newIndex = currentIndex + 1;
                if (newIndex >= slides.length) newIndex = 0;
                loop.toIndex(newIndex, { ease: CustomEase, duration: 0.725 });
            });
        }

        // Cleanup
        cleanupRef.current = () => {
            st.kill();
            stopAutoplay();
        };

        return () => {
            if (cleanupRef.current) cleanupRef.current();
        };
    }, [displayTestimonials]);

    return (
        <div
            ref={sliderWrapperRef}
            data-slider-autoplay-duration="4"
            aria-label="Testimonial Slider"
            data-centered-slider="wrapper"
            data-slider-autoplay="true"
            className="centered-slider-group py-32"
        >

            <h2 className="tracking-wider text-center py-4">WHAT'S PEOPLE SAYS?</h2>
            <div className="container mx-auto">
                <div className="centered-slider-content">
                    <ul role="tablist" className="centered-slider-bullet__list">
                        {displayTestimonials.map((testimonial, index) => {
                            const name = testimonial.customer_name || testimonial.name || 'Valued Customer';
                            const imageData = testimonial.image && testimonial.image.url ? {
                                ...testimonial.image,
                                altText: testimonial.image.altText || testimonial.image.alt || name
                            } : null;

                            return (
                                <li key={`bullet-${index}`} className="centered-slider-bullet__item">
                                    <button
                                        data-centered-slider="bullet"
                                        role="tab"
                                        aria-selected="false"
                                        className="centered-slider-bullet"
                                    >
                                        {imageData ? (
                                            <img
                                                src={imageData.url}
                                                alt={imageData.altText || ''}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold rounded-full">
                                                {name.charAt(0)}
                                            </div>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="centered-slider-row">
                <div aria-label="slides" data-centered-slider="list" role="group" className="centered-slider-list">
                    {displayTestimonials.map((testimonial, index) => {
                        const name = testimonial.customer_name || testimonial.name || 'Valued Customer';
                        const message = testimonial.message || testimonial.quote || '';
                        const imageData = testimonial.image && testimonial.image.url ? {
                            ...testimonial.image,
                            altText: testimonial.image.altText || testimonial.image.alt || name
                        } : null;

                        return (
                            <div key={`slide-${index}`} data-centered-slider="slide" className="centered-slider-slide">
                                <div className="centered-slider-slide__inner">
                                    <p className="slide-demo__description">{message}</p>
                                    <div className="slide-demo__details">
                                        {imageData ? (
                                            <img
                                                src={imageData.url}
                                                alt={imageData.altText || ''}
                                                className="slide-demo__avatar"
                                            />
                                        ) : (
                                            <div className="slide-demo__avatar flex items-center justify-center bg-gray-200 text-gray-600 font-bold">
                                                {name.charAt(0)}
                                            </div>
                                        )}
                                        <span className="slide-demo__eyebrow">{name}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="container mx-auto">
                <div className="centered-slider-content">
                    <div className="centered-slider-buttons">
                        <button
                            aria-label="previous slide"
                            data-centered-slider="prev-button"
                            className="centered-slider-button is--prev"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="slider-button-arrow">
                                <path d="M14 19L21 12L14 5" stroke="currentColor" strokeMiterlimit="10"></path>
                                <path d="M21 12H2" stroke="currentColor" strokeMiterlimit="10"></path>
                            </svg>
                        </button>
                        <button
                            aria-label="next slide"
                            data-centered-slider="next-button"
                            className="centered-slider-button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="slider-button-arrow">
                                <path d="M14 19L21 12L14 5" stroke="currentColor" strokeMiterlimit="10"></path>
                                <path d="M21 12H2" stroke="currentColor" strokeMiterlimit="10"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// GSAP Helper function to create a looping slider
function horizontalLoop(items: HTMLElement[], config: any) {
    config = config || {};

    let timeline: gsap.core.Timeline;
    const ctx = gsap.context(() => {
        let onChange = config.onChange,
            lastIndex = 0,
            tl = gsap.timeline({
                repeat: config.repeat,
                onUpdate: onChange && function () {
                    let i = tl.closestIndex();
                    if (lastIndex !== i) {
                        lastIndex = i;
                        onChange(items[i], i);
                    }
                },
                paused: config.paused,
                defaults: { ease: "none" },
                onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100); }
            }),
            length = items.length,
            startX = items[0].offsetLeft,
            times: number[] = [],
            widths: number[] = [],
            spaceBefore: number[] = [],
            xPercents: number[] = [],
            curIndex = 0,
            indexIsDirty = false,
            center = config.center,
            pixelsPerSecond = (config.speed || 1) * 100,
            snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
            timeOffset = 0,
            container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
            totalWidth: number,
            getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * (parseFloat(gsap.getProperty(items[length - 1], "scaleX") as string) || 1) + (parseFloat(config.paddingRight) || 0),
            populateWidths = () => {
                let b1 = (container as HTMLElement).getBoundingClientRect(), b2;
                items.forEach((el, i) => {
                    widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i] * 100 + parseFloat(gsap.getProperty(el, "xPercent") as string));
                    b2 = el.getBoundingClientRect();
                    spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
                    b1 = b2;
                });
                gsap.set(items, {
                    xPercent: (i: number) => xPercents[i]
                });
                totalWidth = getTotalWidth();
            },
            timeWrap: (value: number) => number,
            populateOffsets = () => {
                timeOffset = center ? tl.duration() * ((container as HTMLElement).offsetWidth / 2) / totalWidth : 0;
                center && times.forEach((t, i) => {
                    times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
                });
            },
            getClosest = (values: number[], value: number, wrap: number) => {
                let i = values.length,
                    closest = 1e10,
                    index = 0,
                    d;
                while (i--) {
                    d = Math.abs(values[i] - value);
                    if (d > wrap / 2) {
                        d = wrap - d;
                    }
                    if (d < closest) {
                        closest = d;
                        index = i;
                    }
                }
                return index;
            },
            populateTimeline = () => {
                let i, item, curX, distanceToStart, distanceToLoop;
                tl.clear();
                for (i = 0; i < length; i++) {
                    item = items[i];
                    curX = xPercents[i] / 100 * widths[i];
                    distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
                    distanceToLoop = distanceToStart + widths[i] * parseFloat(gsap.getProperty(item, "scaleX") as string);
                    tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                        .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                        .add("label" + i, distanceToStart / pixelsPerSecond);
                    times[i] = distanceToStart / pixelsPerSecond;
                }
                timeWrap = gsap.utils.wrap(0, tl.duration());
            },
            refresh = (deep?: boolean) => {
                let progress = tl.progress();
                tl.progress(0, true);
                populateWidths();
                deep && populateTimeline();
                populateOffsets();
                deep && (tl as any).draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
            },
            onResize = () => refresh(true),
            proxy: HTMLElement;

        gsap.set(items, { x: 0 });
        populateWidths();
        populateTimeline();
        populateOffsets();
        window.addEventListener("resize", onResize);

        function toIndex(index: number, vars?: any) {
            vars = vars || {};
            (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
            let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex];
            if (time > tl.time() !== index > curIndex && index !== curIndex) {
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }
            if (time < 0 || time > tl.duration()) {
                vars.modifiers = { time: timeWrap };
            }
            curIndex = newIndex;
            vars.overwrite = true;
            gsap.killTweensOf(proxy);
            return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
        }

        (tl as any).toIndex = (index: number, vars?: any) => toIndex(index, vars);
        (tl as any).closestIndex = (setCurrent?: boolean) => {
            let index = getClosest(times, tl.time(), tl.duration());
            if (setCurrent) {
                curIndex = index;
                indexIsDirty = false;
            }
            return index;
        };
        (tl as any).current = () => indexIsDirty ? (tl as any).closestIndex(true) : curIndex;
        (tl as any).next = (vars?: any) => toIndex((tl as any).current() + 1, vars);
        (tl as any).previous = (vars?: any) => toIndex((tl as any).current() - 1, vars);
        (tl as any).times = times;
        tl.progress(1, true).progress(0, true);

        if (config.reversed) {
            tl.vars.onReverseComplete?.();
            tl.reverse();
        }

        if (config.draggable && typeof Draggable === "function") {
            proxy = document.createElement("div");
            let wrap = gsap.utils.wrap(0, 1),
                ratio: number,
                startProgress: number,
                draggable: any,
                lastSnap: number,
                initChangeX: number,
                wasPlaying: boolean,
                align = () => { tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)); },
                syncIndex = () => (tl as any).closestIndex(true);

            draggable = Draggable.create(proxy, {
                trigger: items[0].parentElement,
                type: "x",
                onPressInit() {
                    let x = this.x;
                    gsap.killTweensOf(tl);
                    wasPlaying = !tl.paused();
                    tl.pause();
                    startProgress = tl.progress();
                    refresh();
                    ratio = 1 / totalWidth;
                    initChangeX = (startProgress / -ratio) - x;
                    gsap.set(proxy, { x: startProgress / -ratio });
                },
                onDrag: align,
                onThrowUpdate: align,
                overshootTolerance: 0,
                inertia: true,
                snap(value: number) {
                    if (Math.abs(startProgress / -ratio - this.x) < 10) {
                        return lastSnap + initChangeX;
                    }
                    let time = -(value * ratio) * tl.duration(),
                        wrappedTime = timeWrap(time),
                        snapTime = times[getClosest(times, wrappedTime, tl.duration())],
                        dif = snapTime - wrappedTime;
                    Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
                    lastSnap = (time + dif) / tl.duration() / -ratio;
                    return lastSnap;
                },
                onRelease() {
                    syncIndex();
                    draggable.isThrowing && (indexIsDirty = true);
                },
                onThrowComplete: () => {
                    syncIndex();
                    wasPlaying && tl.play();
                }
            })[0];
            (tl as any).draggable = draggable;
        }

        (tl as any).closestIndex(true);
        lastIndex = curIndex;
        onChange && onChange(items[curIndex], curIndex);
        timeline = tl;

        return () => window.removeEventListener("resize", onResize);
    });

    // The context callback executes synchronously, so timeline is now assigned
    return timeline!;
}
