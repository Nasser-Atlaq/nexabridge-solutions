import Link from "next/link";
import { NAV_LINKS, CONTACT_INFO, COMPANY } from "@/lib/constants";

export function Footer() {
  return (
    <footer>
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-lg font-bold tracking-tight"
            >
              <span className="text-zinc-50">Nexa</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Bridge
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
              {COMPANY.tagline}. {COMPANY.mission}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-300">Navigation</h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services/web"
                  className="text-sm text-zinc-400 transition-colors hover:text-cyan-400"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mobile"
                  className="text-sm text-zinc-400 transition-colors hover:text-cyan-400"
                >
                  Mobile Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-300">Contact</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="transition-colors hover:text-cyan-400"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-cyan-400"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-500">
            Designed & built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
