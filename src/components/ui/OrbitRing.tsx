"use client";

import { cn } from "@/lib/utils";
import { TechNode } from "./TechNode";
import type { TechStackItem } from "@/lib/types";

const RING_BORDER_ACCENT = {
  1: "border-cyan-500/[0.06]",
  2: "border-blue-500/[0.06]",
  3: "border-amber-500/[0.06]",
} as const;

interface OrbitRingProps {
  items: TechStackItem[];
  radius: number;
  orbitClass: string;
  counterOrbitClass: string;
  ring: 1 | 2 | 3;
  mousePos: React.RefObject<{ x: number; y: number } | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
}

export function OrbitRing({
  items,
  radius,
  orbitClass,
  counterOrbitClass,
  ring,
  mousePos,
  containerRef,
  isMobile,
}: OrbitRingProps) {
  const diameter = radius * 2;

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: diameter, height: diameter }}
    >
      {/* Faint ring track */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border animate-line-pulse",
          RING_BORDER_ACCENT[ring]
        )}
      />

      {/* Rotating container */}
      <div
        className={cn("absolute inset-0", orbitClass)}
        aria-hidden="true"
      >
        {items.map((tech, i) => {
          const angle = (360 / items.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = radius + Math.cos(rad) * radius - 22; // 22 = half of 44px node
          const y = radius + Math.sin(rad) * radius - 22;

          return (
            <div
              key={tech.name}
              className="absolute"
              style={{ left: x, top: y }}
            >
              <TechNode
                tech={tech}
                counterRotationClass={counterOrbitClass}
                mousePos={mousePos}
                containerRef={containerRef}
                isMobile={isMobile}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
