/**
 * AI-YOOO Promo - Core Application Scripts
 * Lightweight, optimized animations powered by GSAP & ScrollTrigger
 */

(function () {
    'use strict';

    // Register GSAP Plugins
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        if (typeof CustomEase !== 'undefined') {
            gsap.registerPlugin(CustomEase);
            try {
                CustomEase.create('smooth-ease', '0.32, 0.72, 0, 1');
            } catch (e) {
                // Fallback silently if custom ease already exists
            }
        }
    }

    // 1. Marquee SVG TextPath Scroll Animation
    function initMarquee() {
        const marqueeEls = document.querySelectorAll('[data-marquee]');
        marqueeEls.forEach(marquee => {
            const textPath = marquee.querySelector('[data-marquee-svg] textPath');
            if (!textPath || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

            gsap.timeline({
                scrollTrigger: {
                    trigger: marquee,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5
                }
            }).fromTo(
                textPath,
                { attr: { startOffset: '-30%' } },
                { attr: { startOffset: '-60%' }, ease: 'none' }
            );
        });
    }

    // 2. Interactive Card Inertia & Hover Tilt
    function initInertiaCards() {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        if (typeof gsap === 'undefined') return;

        const clampX = gsap.utils.clamp(-25, 25);
        const clampY = gsap.utils.clamp(-25, 25);
        const clampRot = gsap.utils.clamp(-8, 8);

        document.querySelectorAll('[data-inertia]').forEach(container => {
            let lastX = 0;
            let lastY = 0;
            let deltaX = 0;
            let deltaY = 0;

            container.addEventListener('mousemove', e => {
                deltaX = e.clientX - lastX;
                deltaY = e.clientY - lastY;
                lastX = e.clientX;
                lastY = e.clientY;
            });

            container.querySelectorAll('[data-inertia-item]').forEach(item => {
                const child = item.querySelector('[data-inertia-item-child]') || item;

                item.addEventListener('mouseenter', e => {
                    const rect = child.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const offsetX = e.clientX - centerX;
                    const offsetY = e.clientY - centerY;

                    gsap.to(child, {
                        x: clampX(deltaX * 1.2 + (offsetX / rect.width) * 16),
                        y: clampY(deltaY * 1.2 + (offsetY / rect.height) * 16),
                        rotation: clampRot((offsetX / rect.width) * 6),
                        duration: 0.6,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                });

                item.addEventListener('mouseleave', () => {
                    gsap.to(child, {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                });
            });
        });
    }

    // 3. Hero Text Entrance Reveal
    function initEntranceAnimation() {
        if (typeof gsap === 'undefined') return;

        const heroLines = document.querySelectorAll('.hero-heading .split-line');
        if (heroLines.length) {
            gsap.from(heroLines, {
                y: 50,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: 'power3.out'
            });
        }

        const paraLines = document.querySelectorAll('.stage-paragraph-wrap .split-line');
        if (paraLines.length) {
            gsap.from(paraLines, {
                y: 25,
                opacity: 0,
                duration: 0.7,
                delay: 0.35,
                stagger: 0.08,
                ease: 'power2.out'
            });
        }
    }

    // 4. Video Playback & Viewport Optimization
    function initVideoOptimization() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.muted = true;
            video.playsInline = true;

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Browser autoplay policy might require interaction
                });
            }

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                video.play().catch(() => {});
                            } else {
                                video.pause();
                            }
                        });
                    },
                    { threshold: 0.15 }
                );
                observer.observe(video);
            }
        });
    }

    // Initialize all modules when DOM is ready
    function init() {
        initMarquee();
        initInertiaCards();
        initEntranceAnimation();
        initVideoOptimization();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
