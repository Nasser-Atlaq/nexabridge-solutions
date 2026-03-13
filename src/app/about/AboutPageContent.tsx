"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Eye } from "lucide-react";
import {
  COMPANY,
  CORE_VALUES,
  ENGINEERING_METRICS,
  CAPABILITY_DOMAINS,
  ENGINEERING_PRINCIPLES,
} from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Badge } from "@/components/ui/Badge";
import { TextReveal } from "@/components/ui/TextReveal";
import { AnimateInView } from "@/components/ui/AnimateInView";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const ACCENT_MAP = {
  cyan: {
    icon: "from-cyan-500/20 to-cyan-500/5",
    text: "text-cyan-400",
    glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]",
    border: "hover:border-cyan-500/20",
    tag: "bg-cyan-500/10 text-cyan-400/80",
  },
  blue: {
    icon: "from-blue-500/20 to-blue-500/5",
    text: "text-blue-400",
    glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]",
    border: "hover:border-blue-500/20",
    tag: "bg-blue-500/10 text-blue-400/80",
  },
  violet: {
    icon: "from-violet-500/20 to-violet-500/5",
    text: "text-violet-400",
    glow: "hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]",
    border: "hover:border-violet-500/20",
    tag: "bg-violet-500/10 text-violet-400/80",
  },
  amber: {
    icon: "from-amber-500/20 to-amber-500/5",
    text: "text-amber-400",
    glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]",
    border: "hover:border-amber-500/20",
    tag: "bg-amber-500/10 text-amber-400/80",
  },
} as const;

export function AboutPageContent() {

  return (
    <div className="pt-28">
      {/* Asymmetric hero with overlapping text */}
      <SectionWrapper>
        <div className="grid items-start gap-8 lg:grid-cols-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <Badge variant="cyan">About Us</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Bridging Ideas to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 lg:mt-16"
          >
            <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
              {COMPANY.story}
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Mission & Vision — large typography */}
      <SectionWrapper withDivider>
        <div className="grid gap-10 lg:grid-cols-2">
          <AnimateInView
            variants={fadeUp}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 lg:p-10"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15">
              <Target size={20} className="text-cyan-400" />
            </div>
            <h3 className="text-sm font-medium uppercase tracking-widest text-cyan-400">
              Our Mission
            </h3>
            <div className="mt-4">
              <TextReveal
                as="p"
                className="text-xl font-medium leading-relaxed text-zinc-200 sm:text-2xl"
                trigger="scroll"
                stagger={0.015}
              >
                {COMPANY.mission}
              </TextReveal>
            </div>
          </AnimateInView>

          <AnimateInView
            variants={fadeUp}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 lg:p-10"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15">
              <Eye size={20} className="text-blue-400" />
            </div>
            <h3 className="text-sm font-medium uppercase tracking-widest text-blue-400">
              Our Vision
            </h3>
            <div className="mt-4">
              <TextReveal
                as="p"
                className="text-xl font-medium leading-relaxed text-zinc-200 sm:text-2xl"
                trigger="scroll"
                stagger={0.015}
              >
                {COMPANY.vision}
              </TextReveal>
            </div>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* Core Values — horizontal strip */}
      <SectionWrapper withDivider>
        <SectionHeading
          eyebrow="Our Values"
          title="What We"
          titleAccent="Stand For"
          subtitle="These principles guide every decision we make, every line of code we write, and every relationship we build."
        />
        <AnimateInView
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CORE_VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={staggerItem}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-cyan-500/20 hover:shadow-[0_0_40px_rgba(6,182,212,0.06)]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                  <Icon size={18} className="text-cyan-400" />
                </div>
                <h3 className="text-base font-bold text-zinc-50">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </AnimateInView>
      </SectionWrapper>

      {/* Technical Excellence */}
      <SectionWrapper withDivider>
        <SectionHeading
          eyebrow="Engineering"
          title="Technical"
          titleAccent="Excellence"
          subtitle="We don't just write code — we engineer systems that perform under pressure, scale on demand, and evolve without rewrites."
        />

        {/* Block 1 — Metrics Strip */}
        <AnimateInView variants={fadeUp}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-center gap-y-6">
              {ENGINEERING_METRICS.map((metric, i) => (
                <div key={metric.label} className="flex items-center">
                  <div className="px-4 text-center sm:px-8">
                    <AnimatedCounter
                      value={metric.value}
                      className="text-2xl font-bold text-zinc-50 sm:text-3xl"
                    />
                    <p className="mt-1 text-xs tracking-wide text-zinc-500 sm:text-sm">
                      {metric.label}
                    </p>
                  </div>
                  {i < ENGINEERING_METRICS.length - 1 && (
                    <div className="hidden h-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimateInView>

        {/* Block 2 — Capability Domain Cards */}
        <AnimateInView
          variants={staggerContainer}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITY_DOMAINS.map((domain, i) => {
            const Icon = domain.icon;
            const accent = ACCENT_MAP[domain.accent];
            return (
              <motion.div
                key={domain.title}
                variants={staggerItem}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 ${accent.glow} ${accent.border} hover:-translate-y-0.5`}
              >
                <span className="pointer-events-none absolute top-4 right-5 text-5xl font-bold leading-none text-white/[0.03]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent.icon}`}>
                  <Icon size={18} className={accent.text} />
                </div>
                <h3 className="text-base font-bold text-zinc-50">{domain.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {domain.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {domain.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${accent.tag}`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimateInView>

        {/* Block 3 — Engineering Principles */}
        <AnimateInView
          variants={staggerContainer}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ENGINEERING_PRINCIPLES.map((principle, i) => (
            <motion.div
              key={principle.title}
              variants={staggerItem}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <span
                className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-sm font-bold text-transparent"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-2 text-sm font-bold text-zinc-50">{principle.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </AnimateInView>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper withDivider>
        <AnimateInView
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
            Want to Work With Us?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-400">
            We&apos;re always looking for exciting projects and great partners.
            Let&apos;s build something remarkable together.
          </p>
          <div className="mt-8">
            <MagneticButton variant="amber" href="/contact">
              Let&apos;s Build Together
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </AnimateInView>
      </SectionWrapper>
    </div>
  );
}
