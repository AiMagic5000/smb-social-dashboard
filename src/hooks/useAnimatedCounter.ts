import { useState, useEffect, useRef } from 'react';

export function useAnimatedCounter(
  endValue: number,
  duration: number = 2000,
  startOnMount: boolean = true
): { value: number; start: () => void } {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut);

      setValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (startOnMount) {
      // Small delay for visual effect
      const timeout = setTimeout(start, 300);
      return () => {
        clearTimeout(timeout);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [endValue, startOnMount]);

  return { value, start };
}

export function useIntersectionObserver(
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const ref = useRef<HTMLDivElement | null>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !calledRef.current) {
          calledRef.current = true;
          callback();
        }
      });
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [callback, options]);

  return ref;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toLocaleString();
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(num);
}
