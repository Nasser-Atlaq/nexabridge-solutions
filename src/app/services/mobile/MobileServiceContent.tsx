"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { TECHNICAL_SERVICES } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Badge } from "@/components/ui/Badge";
import { AnimateInView } from "@/components/ui/AnimateInView";

const service = TECHNICAL_SERVICES[1];

export function MobileServiceContent() {
  return (
    <div className="pt-28">
      <SectionWrapper>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="cyan">Technical Solutions</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            Mobile Application{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Development
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {service.description}
          </p>
        </motion.div>
      </SectionWrapper>

      <SectionWrapper withDivider>
        <SectionHeading
          eyebrow="Capabilities"
          title="Mobile-First"
          titleAccent="Engineering"
          subtitle="We build mobile apps that users love — optimized for performance, designed for delight, and engineered for scale."
        />
        <AnimateInView
          variants={staggerContainer}
          className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {service.features.map((feature) => (
            <motion.div
              key={feature}
              variants={staggerItem}
              className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/15">
                <Check size={13} className="text-cyan-400" />
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">{feature}</p>
            </motion.div>
          ))}
        </AnimateInView>
      </SectionWrapper>

      {service.technologies && (
        <SectionWrapper withDivider>
          <SectionHeading
            eyebrow="Tech Stack"
            title="Platforms &"
            titleAccent="Frameworks"
            subtitle="Proven, cross-platform technologies that deliver native performance on both iOS and Android."
          />
          <AnimateInView
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-3"
          >
            {service.technologies.map((tech) => (
              <motion.div key={tech} variants={staggerItem}>
                <Badge variant="cyan">{tech}</Badge>
              </motion.div>
            ))}
          </AnimateInView>
        </SectionWrapper>
      )}

      {service.useCases && (
        <SectionWrapper withDivider>
          <SectionHeading
            eyebrow="Use Cases"
            title="Apps for"
            titleAccent="Every Industry"
            subtitle="From fintech to healthcare — we've shipped mobile apps that millions of users depend on daily."
          />
          <AnimateInView
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2"
          >
            {service.useCases.map((useCase) => (
              <motion.div
                key={useCase}
                variants={staggerItem}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <h4 className="font-semibold text-zinc-100">{useCase}</h4>
                <p className="mt-1 text-sm text-zinc-500">
                  Purpose-built mobile experiences for {useCase.toLowerCase()} with intuitive UX and native performance.
                </p>
              </motion.div>
            ))}
          </AnimateInView>
        </SectionWrapper>
      )}

      <SectionWrapper withDivider>
        <AnimateInView
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
            Ready to Launch Your Mobile App?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-400">
            From concept to App Store — tell us your vision and we&apos;ll map the
            fastest path to launch.
          </p>
          <div className="mt-8">
            <MagneticButton variant="amber" href="/contact">
              Tell Us Your Idea
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </AnimateInView>
      </SectionWrapper>
    </div>
  );
}
