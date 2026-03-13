import type { Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Framer Motion Variants ──────────────────────────────────────────────────

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export const viewportOnce = { once: true, margin: "-40px" as const };

// ── GSAP Helpers ────────────────────────────────────────────────────────────

export function gsapFadeUp(element: string | Element, trigger?: string | Element) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger || element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function gsapStaggerReveal(
  elements: string | Element[],
  trigger: string | Element,
  stagger = 0.1
) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger,
      scrollTrigger: {
        trigger,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function gsapCharacterSplit(
  element: HTMLElement,
  options?: { duration?: number; stagger?: number; delay?: number }
) {
  const text = element.textContent || "";
  element.textContent = "";
  element.style.visibility = "visible";

  const chars = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(20px)";
    element.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: options?.duration ?? 0.5,
    stagger: options?.stagger ?? 0.02,
    delay: options?.delay ?? 0,
    ease: "power3.out",
  });
}

export function createHorizontalScroll(
  container: HTMLElement,
  panels: HTMLElement,
  options?: { scrub?: number }
) {
  const totalScroll = panels.scrollWidth - container.offsetWidth;

  return gsap.to(panels, {
    x: -totalScroll,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: options?.scrub ?? 1,
      end: () => `+=${totalScroll}`,
      invalidateOnRefresh: true,
    },
  });
}
