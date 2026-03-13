"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function parseValue(val: string): { num: number; suffix: string; prefix: string } {
  const match = val.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: val, prefix: "" };
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
}

const subscribe = () => () => {};
function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const { prefix, num, suffix } = parseValue(value);
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(reducedMotion ? num : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = performance.now();

          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * num));

            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num, reducedMotion]);

  return (
    <span ref={ref} className={className} style={{ fontFamily: "var(--font-mono)" }}>
      {prefix}{count}{suffix}
    </span>
  );
}
