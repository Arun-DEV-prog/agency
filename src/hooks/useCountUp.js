import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Custom CountUp hook — replaces react-countup (which has ESM/React 19 issues)
 */
export function useCountUp(end, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    let animId;
    const delayTimer = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCount(Math.floor(eased * end));
        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      animId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [inView, end, duration, delay]);

  return { ref, count };
}


