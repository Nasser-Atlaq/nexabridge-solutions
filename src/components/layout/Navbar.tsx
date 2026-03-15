"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? y / docHeight : 0;

        setScrolled(y > 20);
        setHidden(y > 100 && y > lastScrollY.current);
        setScrollProgress(progress);
        lastScrollY.current = y;
        rafId = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
        style={{
          background: `linear-gradient(to right, #06b6d4, #2563eb)`,
          width: `${scrollProgress * 100}%`,
          transition: "width 0.1s ease-out",
        }}
      />

      <nav
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          hidden && !mobileOpen && "-translate-y-full",
          scrolled
            ? "border-b border-white/[0.06] bg-[#050510]/80 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-1 rounded-lg text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50" aria-label="NexaBridge — Home">
            <span className="text-zinc-50">Nexa</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Bridge
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200",
                    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-400 after:transition-all after:duration-300",
                    !isActive && "hover:after:w-full",
                    isActive && "after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href="/contact" variant="amber" className="px-5 py-2.5 text-sm">
              Get in Touch
            </Button>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-zinc-400 transition-colors hover:text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-b border-white/[0.06] bg-[#050510]/95 backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3.5 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-white/[0.06] text-white"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2" onClick={closeMobile}>
                  <Button href="/contact" variant="amber" className="w-full px-5 py-2.5 text-sm">
                    Get in Touch
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
