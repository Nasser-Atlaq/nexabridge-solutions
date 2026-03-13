"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimateInViewProps {
  children: React.ReactNode;
  variants: Variants;
  className?: string;
  delay?: number;
}

export function AnimateInView({ children, variants, className, delay }: AnimateInViewProps) {
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setForceVisible(true), 2000 + (delay ?? 0));
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...(forceVisible ? { animate: "visible" } : {})}
      className={className}
    >
      {children}
    </motion.div>
  );
}
