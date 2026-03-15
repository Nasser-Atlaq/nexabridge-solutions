"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "amber" | "primary" | "secondary";
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  strength?: number;
}

export function MagneticButton({
  children,
  variant = "amber",
  href,
  className,
  type = "button",
  onClick,
  disabled,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    setTransform({ x: dx, y: dy });
  };

  const handleMouseLeave = () => setTransform({ x: 0, y: 0 });

  const variants = {
    amber:
      "bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-semibold shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]",
    primary:
      "bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]",
    secondary:
      "border border-white/[0.1] text-zinc-200 font-medium hover:border-cyan-500/30 hover:bg-white/[0.04]",
  };

  const style = {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    transition: transform.x === 0 ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" : "transform 0.15s ease-out",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm cursor-pointer transition-all duration-300 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      style={style}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
