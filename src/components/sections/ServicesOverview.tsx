"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TECHNICAL_SERVICES, BUSINESS_SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { cn } from "@/lib/utils";
import type { ServiceCard } from "@/lib/types";

const ALL_SERVICES: ServiceCard[] = [...TECHNICAL_SERVICES, ...BUSINESS_SERVICES];

export function ServicesOverview() {
  return (
    <SectionWrapper withDivider>
      <SectionHeading
        eyebrow="What We Do"
        title="Solutions That"
        titleAccent="Drive Results"
        subtitle="From product engineering to strategic IT consulting — we deliver end-to-end technology solutions that help your business grow."
      />

      <BentoGrid>
        {ALL_SERVICES.map((service) => {
          const Icon = service.icon;
          const isCyan = service.accent === "cyan";
          return (
            <BentoItem key={service.title} size={service.bentoSize}>
              <Link href={service.href} className="block h-full cursor-pointer">
                <div className="flex h-full flex-col">
                  <div
                    className={cn(
                      "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg",
                      isCyan
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "bg-blue-500/10 text-blue-400"
                    )}
                  >
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-bold text-zinc-50">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {service.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors group-hover:text-cyan-400">
                    Learn more
                    <ArrowUpRight size={14} className="transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-400" />
                  </div>
                </div>
              </Link>
            </BentoItem>
          );
        })}
      </BentoGrid>
    </SectionWrapper>
  );
}
