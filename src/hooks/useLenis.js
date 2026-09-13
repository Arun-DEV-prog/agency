import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      });
      lenisRef.current = lenis;

      function raf(time) {
        try {
          lenis.raf(time);
        } catch (e) {
          // Silently handle Lenis raf errors
          console.debug("Lenis raf error (safe to ignore):", e);
        }
        rafIdRef.current = requestAnimationFrame(raf);
      }

      rafIdRef.current = requestAnimationFrame(raf);
    } catch (e) {
      console.error("Failed to initialize Lenis:", e);
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        try {
          lenisRef.current.destroy?.();
        } catch (e) {
          // Silently catch destroy errors from Lenis
          console.debug("Lenis destroy error (safe to ignore):", e);
        }
        lenisRef.current = null;
      }
    };
  }, []);
}


