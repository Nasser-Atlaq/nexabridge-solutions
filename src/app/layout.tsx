import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { BackgroundEffects } from "@/components/layout/BackgroundEffects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nexabridge.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NexaBridge Solutions — Bridging Ideas to Innovation",
    template: "%s | NexaBridge Solutions",
  },
  description:
    "We design and engineer digital products and IT strategies that turn your boldest ideas into market-ready reality. Web development, mobile apps, AI automation, and IT consulting.",
  openGraph: {
    title: "NexaBridge Solutions — Bridging Ideas to Innovation",
    description:
      "Custom software development, AI automation, and IT consulting for startups, SMBs, and enterprises.",
    type: "website",
    locale: "en_US",
    siteName: "NexaBridge Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexaBridge Solutions — Bridging Ideas to Innovation",
    description:
      "Custom software development, AI automation, and IT consulting for startups, SMBs, and enterprises.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${syne.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-[#050510] text-zinc-100 antialiased touch-action-manipulation">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NexaBridge Solutions",
              url: SITE_URL,
              logo: `${SITE_URL}/icon.svg`,
              description:
                "Custom software development, AI automation, and IT consulting for startups, SMBs, and enterprises.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@nexabridge.com",
                telephone: "+79692076774",
                contactType: "sales",
              },
              sameAs: [],
            }),
          }}
        />
        <SmoothScroll>
          <BackgroundEffects />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-950"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
        </SmoothScroll>
      </body>
    </html>
  );
}
