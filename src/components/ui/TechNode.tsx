"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TechStackItem } from "@/lib/types";

const ACCENT_CLASSES = {
  cyan: {
    bg: "bg-cyan-500/20",
    border: "border-cyan-400/30",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    glowHover: "shadow-[0_0_30px_rgba(6,182,212,0.4)]",
    text: "text-cyan-300",
    tooltip: "border-cyan-500/30 bg-cyan-950/80",
  },
  blue: {
    bg: "bg-blue-500/20",
    border: "border-blue-400/30",
    glow: "shadow-[0_0_20px_rgba(37,99,235,0.25)]",
    glowHover: "shadow-[0_0_30px_rgba(37,99,235,0.4)]",
    text: "text-blue-300",
    tooltip: "border-blue-500/30 bg-blue-950/80",
  },
  violet: {
    bg: "bg-violet-500/20",
    border: "border-violet-400/30",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.25)]",
    glowHover: "shadow-[0_0_30px_rgba(139,92,246,0.4)]",
    text: "text-violet-300",
    tooltip: "border-violet-500/30 bg-violet-950/80",
  },
  amber: {
    bg: "bg-amber-500/20",
    border: "border-amber-400/30",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    glowHover: "shadow-[0_0_30px_rgba(245,158,11,0.4)]",
    text: "text-amber-300",
    tooltip: "border-amber-500/30 bg-amber-950/80",
  },
};

interface TechNodeProps {
  tech: TechStackItem;
  counterRotationClass: string;
  mousePos: React.RefObject<{ x: number; y: number } | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
}

export function TechNode({
  tech,
  counterRotationClass,
  mousePos,
  containerRef,
  isMobile,
}: TechNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const accent = ACCENT_CLASSES[tech.accent];

  const updateProximity = useCallback(() => {
    if (isMobile || !nodeRef.current || !containerRef.current || !mousePos.current) return;

    const nodeRect = nodeRef.current.getBoundingClientRect();
    const nodeCenterX = nodeRect.left + nodeRect.width / 2;
    const nodeCenterY = nodeRect.top + nodeRect.height / 2;

    const dx = mousePos.current.x - nodeCenterX;
    const dy = mousePos.current.y - nodeCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const RADIUS = 150;
    const MAX_OFFSET = 12;

    if (dist < RADIUS && dist > 0) {
      const strength = (1 - dist / RADIUS) * MAX_OFFSET;
      const ox = (dx / dist) * strength;
      const oy = (dy / dist) * strength;
      nodeRef.current.style.translate = `${ox}px ${oy}px`;
    } else {
      nodeRef.current.style.translate = "0px 0px";
    }

    rafRef.current = requestAnimationFrame(updateProximity);
  }, [isMobile, mousePos, containerRef]);

  useEffect(() => {
    if (isMobile) return;
    rafRef.current = requestAnimationFrame(updateProximity);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateProximity, isMobile]);

  const handleInteraction = () => {
    if (isMobile) setShowTooltip((prev) => !prev);
  };

  return (
    <div
      className={cn("absolute", counterRotationClass)}
      style={{ width: 44, height: 44 }}
    >
      <div
        ref={nodeRef}
        className={cn(
          "group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-300",
          accent.bg,
          accent.border,
          accent.glow,
          "hover:scale-[1.15]",
          showTooltip && accent.glowHover
        )}
        onMouseEnter={() => !isMobile && setShowTooltip(true)}
        onMouseLeave={() => !isMobile && setShowTooltip(false)}
        onClick={handleInteraction}
        role="img"
        aria-label={`${tech.name}: ${tech.description}`}
      >
        <span className={cn("text-[11px] font-bold leading-none select-none", accent.text)}>
          {tech.name.length > 4 ? tech.name.slice(0, 3) : tech.name}
        </span>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "pointer-events-none absolute -top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border px-3 py-2 backdrop-blur-md",
                accent.tooltip
              )}
            >
              <p className="text-xs font-semibold text-zinc-100">{tech.name}</p>
              <p className="text-[10px] text-zinc-400">{tech.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
