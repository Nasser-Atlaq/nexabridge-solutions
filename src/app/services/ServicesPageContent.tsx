"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TECHNICAL_SERVICES, BUSINESS_SERVICES } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { AnimateInView } from "@/components/ui/AnimateInView";
import { cn } from "@/lib/utils";
import type { ServiceCard } from "@/lib/types";

function ServiceBentoGrid({ services, label, accentColor }: {
  services: ServiceCard[];
  label: string;
  accentColor: "cyan" | "blue";
}) {
  const isCyan = accentColor === "cyan";
  return (
    <div>
      <div className="mb-8">
        <span className={cn(
          "mb-2 inline-block text-xs font-medium",
          isCyan ? "text-cyan-400" : "text-blue-400"
        )}>
          {label}
        </span>
        <h3 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
          {isCyan ? "Engineering & Development" : "Strategy & Automation"}
        </h3>
      </div>

      <BentoGrid>
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <BentoItem key={service.title} size={service.bentoSize}>
              <Link href={service.href} className="block h-full">
                <div className="flex h-full flex-col">
                  <div className={cn(
                    "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg",
                    isCyan ? "bg-cyan-500/10 text-cyan-400" : "bg-blue-500/10 text-blue-400"
                  )}>
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-50">{service.title}</h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                  <div className={cn(
                    "mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors",
                    isCyan ? "text-cyan-400 group-hover:text-cyan-300" : "text-blue-400 group-hover:text-blue-300"
                  )}>
                    Learn more
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </BentoItem>
          );
        })}
      </BentoGrid>
    </div>
  );
}

export function ServicesPageContent() {
  return (
    <div className="pt-28">
      <SectionWrapper>
        <SectionHeading
          eyebrow="Our Services"
          title="Technology Solutions"
          titleAccent="That Deliver"
          subtitle="A comprehensive suite of IT technical and business solutions designed to accelerate your growth and streamline your operations."
        />
      </SectionWrapper>

      <SectionWrapper>
        <ServiceBentoGrid services={TECHNICAL_SERVICES} label="Technical Solutions" accentColor="cyan" />
      </SectionWrapper>

      <SectionWrapper withDivider>
        <ServiceBentoGrid services={BUSINESS_SERVICES} label="Business Solutions" accentColor="blue" />
      </SectionWrapper>

      <SectionWrapper withDivider>
        <AnimateInView
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
            Not sure which service fits your needs?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-400">
            Tell us about your project and we&apos;ll recommend the right approach —
            no commitment, no pressure.
          </p>
          <div className="mt-8">
            <MagneticButton variant="amber" href="/contact">
              Let&apos;s Talk
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </AnimateInView>
      </SectionWrapper>
    </div>
  );
}
