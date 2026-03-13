import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  className?: string;
  speed?: string;
}

export function Marquee({
  children,
  direction = "left",
  className,
  speed = "30s",
}: MarqueeProps) {
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className={cn("group/marquee overflow-hidden", className)}
      aria-label="Scrolling testimonials"
    >
      <div
        className={cn("flex w-max gap-6 group-hover/marquee:[animation-play-state:paused]", animClass)}
        style={{ animationDuration: speed }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
