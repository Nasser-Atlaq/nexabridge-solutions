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
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      containerRef.current.style.visibility = "visible";
      return;
    }

    const el = containerRef.current;
    const text = children;
    el.textContent = "";
    el.style.visibility = "visible";

    const words = text.split(" ");
    const charSpans: HTMLSpanElement[] = [];

    words.forEach((word, wordIdx) => {
      const wordWrapper = document.createElement("span");
      wordWrapper.style.display = "inline-block";
      wordWrapper.style.whiteSpace = "nowrap";

      word.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(24px)";
        wordWrapper.appendChild(span);
        charSpans.push(span);
      });

      el.appendChild(wordWrapper);

      if (wordIdx < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        el.appendChild(space);
      }
    });

    const animate = () => {
      hasAnimated.current = true;
      gsap.to(charSpans, {
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
      if (!hasAnimated.current && containerRef.current) {
        containerRef.current.style.visibility = "visible";
        containerRef.current.style.opacity = "1";
        charSpans.forEach((span) => {
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

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={className}
      style={{ visibility: "hidden" }}
    >
      {children}
    </Tag>
  );
}
