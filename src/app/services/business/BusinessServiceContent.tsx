"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { BUSINESS_SERVICES } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Badge } from "@/components/ui/Badge";
import { AnimateInView } from "@/components/ui/AnimateInView";
import { cn } from "@/lib/utils";

export function BusinessServiceContent() {
  return (
    <div className="pt-28">
      <SectionWrapper>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="blue">Business Solutions</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            IT Business{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Strategic consulting and intelligent automation that transform how your
            business operates, competes, and grows — from legacy modernization to
            AI-powered workflows.
          </p>
        </motion.div>
      </SectionWrapper>

      {BUSINESS_SERVICES.map((service, index) => {
        const Icon = service.icon;
        const isOdd = index % 2 === 1;
        return (
          <SectionWrapper key={service.title} withDivider>
            <AnimateInView
              variants={staggerContainer}
              className={cn(
                "grid items-center gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-2",
                isOdd && "lg:[direction:rtl]"
              )}
            >
              <motion.div variants={staggerItem} className="lg:[direction:ltr]">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-zinc-400">
                  {service.description}
                </p>

                {service.technologies && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <Badge key={tech} variant="blue">{tech}</Badge>
                    ))}
                  </div>
                )}
              </motion.div>

              <motion.div variants={staggerItem} className="lg:[direction:ltr]">
                <div className="grid gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                        <Check size={13} className="text-blue-400" />
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-300">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimateInView>
          </SectionWrapper>
        );
      })}

      <SectionWrapper withDivider>
        <AnimateInView
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
            Ready to Transform Your Business?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-400">
            Let&apos;s discuss your challenges and map out a strategy that delivers
            measurable results.
          </p>
          <div className="mt-8">
            <MagneticButton variant="amber" href="/contact">
              Schedule a Call
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </AnimateInView>
      </SectionWrapper>
    </div>
  );
}
