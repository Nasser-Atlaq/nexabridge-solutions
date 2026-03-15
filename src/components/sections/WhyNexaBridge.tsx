"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURE_HIGHLIGHTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const PAD = ["01", "02", "03", "04"];

export function WhyNexaBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const isReduced = useRef(false);
  const isDesktop = useSyncExternalStore(
    useCallback((cb: () => void) => {
      const mql = window.matchMedia("(min-width: 1024px)");
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    }, []),
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => true,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // GSAP horizontal scroll — desktop only
  useEffect(() => {
    isReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isDesktop || isReduced.current || !containerRef.current || !panelsRef.current) return;

    const panels = panelsRef.current;
    const totalScroll = panels.scrollWidth - containerRef.current.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.to(panels, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isDesktop]);

  // Mobile scroll tracking for dot indicators
  const handleScroll = useCallback(() => {
    const el = panelsRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / FEATURE_HIGHLIGHTS.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, FEATURE_HIGHLIGHTS.length - 1));
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    const el = panelsRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isDesktop, handleScroll]);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why NexaBridge"
          title="Built for"
          titleAccent="Scale & Speed"
          subtitle="We combine deep technical expertise with agile execution to deliver solutions that grow with your business."
        />
      </div>

      <div
        ref={containerRef}
        className={cn(isDesktop && "overflow-hidden")}
      >
        <div
          ref={panelsRef}
          className={cn(
            "flex px-4 sm:px-6 lg:px-8",
            isDesktop
              ? "gap-6"
              : "no-scrollbar gap-4 overflow-x-auto snap-x snap-mandatory"
          )}
          style={isDesktop ? { width: "max-content" } : undefined}
          {...(!isDesktop && { "data-lenis-prevent-touch": "" })}
        >
          {FEATURE_HIGHLIGHTS.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-cyan-500/15 active:border-cyan-500/15 hover:shadow-[0_0_30px_rgba(6,182,212,0.06)]",
                  isDesktop
                    ? "w-[85vw] sm:w-[60vw] lg:w-[400px]"
                    : "w-[85vw] snap-start sm:w-[70vw]"
                )}
              >
                <span
                  className="absolute top-4 right-6 text-[5rem] font-bold leading-none text-white/[0.08]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {PAD[i]}
                </span>

                <div className="relative">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                    <Icon size={20} className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-50">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators — mobile only */}
      {!isDesktop && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {FEATURE_HIGHLIGHTS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to card ${i + 1}`}
              onClick={() => {
                const el = panelsRef.current;
                if (!el) return;
                const cardWidth = el.scrollWidth / FEATURE_HIGHLIGHTS.length;
                el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
              }}
              className={cn(
                "rounded-full transition-all duration-300",
                i === activeIndex
                  ? "h-2.5 w-7 bg-cyan-400"
                  : "h-2.5 w-2.5 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      )}

      {/* Reduced motion fallback — vertical grid */}
      <noscript>
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {FEATURE_HIGHLIGHTS.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                  <Icon size={20} className="text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-zinc-50">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </noscript>
    </section>
  );
}
