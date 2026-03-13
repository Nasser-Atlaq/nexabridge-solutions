"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO, STATS } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const HeroCanvas = dynamic(
  () =>
    Promise.all([
      import("@/components/three/Scene"),
      import("@/components/three/ParticleHero"),
    ]).then(([sceneMod, particleMod]) => {
      const { Scene } = sceneMod;
      const { ParticleHero } = particleMod;
      return {
        default: () => (
          <Scene className="h-full w-full">
            <ParticleHero />
          </Scene>
        ),
      };
    }),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center pt-24 pb-40 sm:pb-32 lg:pb-32">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        {/* Text — left 60% */}
        <div className="flex-[3] text-center lg:text-left">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {HERO.badge}
              </span>
            </motion.div>

            <div className="mt-8">
              <TextReveal
                as="h1"
                className="text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight text-zinc-50 md:text-5xl lg:text-6xl xl:text-7xl"
                stagger={0.025}
              >
                {`${HERO.headline} ${HERO.headlineAccent} ${HERO.headlineSecondary}`}
              </TextReveal>
            </div>

            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg lg:max-w-xl"
            >
              {HERO.subtitle}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <MagneticButton variant="amber" href={HERO.primaryCtaHref}>
                {HERO.primaryCta}
                <ArrowRight size={16} />
              </MagneticButton>
              <Button href={HERO.secondaryCtaHref} variant="secondary">
                {HERO.secondaryCta}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* 3D Canvas — right 40% */}
        <div className="hidden flex-[2] lg:block">
          <div className="relative h-[500px] w-full">
            <Suspense fallback={null}>
              <HeroCanvas />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Stats bar — bottom */}
      <div className="absolute right-0 bottom-0 left-0 mt-16 border-t border-white/[0.06]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter
                value={stat.value}
                className="text-xl sm:text-2xl font-bold text-zinc-50 md:text-3xl"
              />
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
