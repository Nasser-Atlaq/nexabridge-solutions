"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "scroll" | "mount";
}

export function TextReveal({
  children,
  as: Tag = "h1",
  className,
  delay = 0,
  stagger = 0.02,
  trigger = "mount",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const hasAnimated = useRef(false);

  const words = children.split(" ");

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      containerRef.current.style.visibility = "visible";
      charRefs.current.forEach((span) => {
        if (span) {
          span.style.opacity = "1";
          span.style.transform = "none";
        }
      });
      return;
    }

    const el = containerRef.current;
    el.style.visibility = "visible";

    const chars = charRefs.current.filter(Boolean);

    const animate = () => {
      hasAnimated.current = true;
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger,
        delay,
        ease: "power3.out",
      });
    };

    if (trigger === "scroll") {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: animate,
        once: true,
      });
    } else {
      animate();
    }

    const safetyTimer = setTimeout(() => {
      if (!hasAnimated.current) {
        chars.forEach((span) => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        });
      }
    }, 3000);

    return () => {
      clearTimeout(safetyTimer);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, delay, stagger, trigger]);

  let charIndex = 0;

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={className}
      style={{ visibility: "hidden" }}
      aria-label={children}
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.split("").map((char) => {
            const idx = charIndex++;
            return (
              <span
                key={idx}
                ref={(el) => {
                  if (el) charRefs.current[idx] = el;
                }}
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  opacity: 0,
                  transform: "translateY(24px)",
                }}
              >
                {char}
              </span>
            );
          })}
          {wordIdx < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
