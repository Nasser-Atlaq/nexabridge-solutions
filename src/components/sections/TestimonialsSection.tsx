import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { Marquee } from "@/components/ui/Marquee";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARD_ACCENTS = [
  { border: "border-cyan-400/20", quote: "text-cyan-400/40", ring: "ring-cyan-400/30", avatar: "from-cyan-500/20 to-cyan-400/10", initial: "text-cyan-400" },
  { border: "border-violet-400/20", quote: "text-violet-400/40", ring: "ring-violet-400/30", avatar: "from-violet-500/20 to-violet-400/10", initial: "text-violet-400" },
  { border: "border-blue-400/20", quote: "text-blue-400/40", ring: "ring-blue-400/30", avatar: "from-blue-500/20 to-blue-400/10", initial: "text-blue-400" },
  { border: "border-amber-400/20", quote: "text-amber-400/40", ring: "ring-amber-400/30", avatar: "from-amber-500/20 to-amber-400/10", initial: "text-amber-400" },
  { border: "border-emerald-400/20", quote: "text-emerald-400/40", ring: "ring-emerald-400/30", avatar: "from-emerald-500/20 to-emerald-400/10", initial: "text-emerald-400" },
];

function TestimonialCard({ quote, name, role, company, accentIndex = 0 }: {
  quote: string;
  name: string;
  role: string;
  company: string;
  accentIndex?: number;
}) {
  const accent = CARD_ACCENTS[accentIndex % CARD_ACCENTS.length];
  return (
    <div className={`w-[min(340px,85vw)] shrink-0 rounded-2xl border ${accent.border} bg-white/[0.02] p-6 backdrop-blur-sm sm:w-[380px]`}>
      <Quote size={18} className={`mb-3 ${accent.quote}`} aria-hidden="true" />
      <p className="text-sm leading-relaxed text-zinc-300">{quote}</p>
      <div className="mt-5 flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${accent.avatar} ring-1 ${accent.ring} text-xs font-bold ${accent.initial}`}>
          {name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-200">{name}</p>
          <p className="text-xs text-zinc-400">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const firstRow = TESTIMONIALS.slice(0, 3);
  const secondRow = TESTIMONIALS.slice(2).concat(TESTIMONIALS.slice(0, 2));

  return (
    <SectionWrapper withDivider>
      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted by"
        titleAccent="Ambitious Teams"
        subtitle="See what our clients have to say about working with NexaBridge."
      />

      <div className="flex flex-col gap-6">
        <Marquee direction="left" speed="35s">
          {firstRow.map((t, i) => (
            <TestimonialCard key={t.name} {...t} accentIndex={i} />
          ))}
        </Marquee>
        <Marquee direction="right" speed="40s">
          {secondRow.map((t, i) => (
            <TestimonialCard key={`r-${t.name}`} {...t} accentIndex={i + firstRow.length} />
          ))}
        </Marquee>
      </div>
    </SectionWrapper>
  );
}
