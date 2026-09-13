import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      duration = 0.8,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
      stagger = null,
    } = options;

    const targets = stagger ? el.querySelectorAll(stagger.selector || '.stagger-item') : el;

    const anim = gsap.fromTo(
      targets,
      from,
      {
        ...to,
        duration,
        delay,
        ease,
        stagger: stagger ? stagger.amount || 0.1 : undefined,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return ref;
}

export function useParallax(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = gsap.to(el, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      anim.kill();
    };
  }, [speed]);

  return ref;
}


