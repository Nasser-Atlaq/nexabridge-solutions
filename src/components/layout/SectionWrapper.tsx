import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  withDivider?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  withDivider = false,
}: SectionWrapperProps) {
  return (
    <>
      {withDivider && (
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
      )}
      <section
        id={id}
        className={cn("py-14 sm:py-20 md:py-28", className)}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    </>
  );
}
