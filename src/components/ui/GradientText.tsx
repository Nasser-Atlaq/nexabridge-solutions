import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  from?: string;
  to?: string;
  className?: string;
}

export function GradientText({
  children,
  as: Tag = "span",
  from = "from-cyan-400",
  to = "to-blue-400",
  className,
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        to,
        className
      )}
    >
      {children}
    </Tag>
  );
}
