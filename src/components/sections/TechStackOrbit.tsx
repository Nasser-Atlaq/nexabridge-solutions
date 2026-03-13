"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateInView } from "@/components/ui/AnimateInView";
import { OrbitRing } from "@/components/ui/OrbitRing";
import { TECH_STACK, TECH_CATEGORIES } from "@/lib/constants";
import { scaleIn, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const RING_CONFIG = [
  { ring: 1 as const, radius: 120, orbitClass: "animate-orbit-cw-60", counterClass: "animate-orbit-ccw-60" },
  { ring: 2 as const, radius: 200, orbitClass: "animate-orbit-ccw-90", counterClass: "animate-orbit-cw-90" },
  { ring: 3 as const, radius: 280, orbitClass: "animate-orbit-cw-120", counterClass: "animate-orbit-ccw-120" },
] as const;

const ACCENT_DOT = {
  cyan: "bg-cyan-400",
  blue: "bg-blue-400",
  amber: "bg-amber-400",
};

export function TechStackOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [orbitScale, setOrbitScale] = useState(1);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setOrbitScale(w < 640 ? 320 / 600 : w < 768 ? 500 / 600 : 1);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  return (
    <SectionWrapper id="tech-stack" withDivider>
      <SectionHeading
        eyebrow="Our Stack"
        title="Technologies We"
        titleAccent="Master"
        subtitle="16 battle-tested technologies across frontend, backend, cloud, and AI — the building blocks behind every solution we deliver."
      />

      <div className="flex flex-col items-center gap-12">
        {/* Orbit container */}
        <AnimateInView variants={scaleIn} className="relative">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative mx-auto aspect-square w-[320px] sm:w-[500px] md:w-[600px]"
            role="img"
            aria-label="Interactive visualization of NexaBridge's technology stack organized in orbital rings: frontend technologies in the inner ring, backend and cloud in the middle, data and AI in the outer ring"
          >
            {/* Scale wrapper — rings are authored at 600px, scaled down on smaller screens */}
            <div
              className="absolute left-1/2 top-1/2 origin-center"
              style={{
                width: 600,
                height: 600,
                transform: `translate(-50%, -50%) scale(${orbitScale})`,
              }}
            >
              {/* Center glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Outer glow */}
                <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 blur-2xl" />
                {/* Inner core */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-sm">
                  <span className="bg-gradient-to-br from-cyan-400 to-violet-400 bg-clip-text text-lg font-bold text-transparent">
                    NB
                  </span>
                </div>
              </div>

              {/* Gradient rings between tracks */}
              {[155, 238].map((r) => (
                <div
                  key={r}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-line-pulse"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    background: `radial-gradient(circle, transparent ${r - 4}px, rgba(255,255,255,0.03) ${r - 2}px, transparent ${r}px)`,
                  }}
                />
              ))}

              {/* Orbit rings */}
              {RING_CONFIG.map((config, i) => (
                <motion.div
                  key={config.ring}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <OrbitRing
                    items={TECH_STACK.filter((t) => t.ring === config.ring)}
                    radius={config.radius}
                    orbitClass={config.orbitClass}
                    counterOrbitClass={config.counterClass}
                    ring={config.ring}
                    mousePos={mousePos}
                    containerRef={containerRef}
                    isMobile={isMobile}
                  />
                </motion.div>
              ))}
            </div>

          </div>
        </AnimateInView>

        {/* Category legend */}
        <AnimateInView variants={fadeUp}>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {TECH_CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex items-center gap-2">
                <div className={cn("h-2.5 w-2.5 rounded-full", ACCENT_DOT[cat.accent])} />
                <span className="text-sm text-zinc-400">{cat.label}</span>
              </div>
            ))}
          </div>
        </AnimateInView>
      </div>
    </SectionWrapper>
  );
}
