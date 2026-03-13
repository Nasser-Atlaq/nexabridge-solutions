"use client";

import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimateInView } from "@/components/ui/AnimateInView";

export function CTASection() {
  return (
    <SectionWrapper withDivider>
      <AnimateInView
        variants={fadeUp}
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] p-6 text-center sm:p-10 md:p-16"
      >
        {/* Localized dot pattern bg */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl lg:text-5xl">
            Ready to Build Something{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Extraordinary?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            Whether you need a full product build, a strategic technology partner,
            or intelligent automation — we&apos;re here to make it happen.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton variant="amber" href="/contact">
              Get a Free Consultation
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </AnimateInView>
    </SectionWrapper>
  );
}
