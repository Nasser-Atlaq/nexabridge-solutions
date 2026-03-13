"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import type { BentoItemSize } from "@/lib/types";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setForceVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...(forceVisible ? { animate: "visible" } : {})}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  size?: BentoItemSize;
  className?: string;
}

const sizeMap = {
  sm: "lg:col-span-1",
  md: "lg:col-span-2",
  lg: "sm:col-span-2 lg:col-span-2",
};

export function BentoItem({ children, size = "sm", className }: BentoItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20 active:border-cyan-500/20 hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]",
        sizeMap[size],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
