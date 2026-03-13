import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "violet" | "cyan" | "amber";
  className?: string;
}

const variantStyles = {
  blue: "border-blue-500/20 text-blue-400 bg-blue-500/[0.08]",
  violet: "border-violet-500/20 text-violet-400 bg-violet-500/[0.08]",
  cyan: "border-cyan-500/20 text-cyan-400 bg-cyan-500/[0.08]",
  amber: "border-amber-500/20 text-amber-400 bg-amber-500/[0.08]",
};

export function Badge({ children, variant = "cyan", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
