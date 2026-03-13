import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm",
        hover &&
          "cursor-pointer transition-all duration-300 hover:border-cyan-500/20 hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}
