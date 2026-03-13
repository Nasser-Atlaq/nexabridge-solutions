# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## MANDATORY: Load Frontend Design Skill Before Every Implementation

**BEFORE writing any code, creating any component, building any page, or making any visual change**, you MUST **load the skill frontend-design**. This is non-negotiable for every task — full pages, small components, spacing adjustments, visual bug fixes. Do not skip this step. Do not assume you remember it from a previous task.

Workflow: Load skill → Think about design direction → Plan aesthetic choices (font pairing, layout, animation, visual details) → Write code.

---

## Commands

```bash
npm run dev      # Start development server (Next.js, hot reload)
npm run build    # Production build (type-checks + bundles)
npm run start    # Serve production build
npm run lint     # ESLint
```

No test framework is configured.

---

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (using `@theme inline` in globals.css, no tailwind.config file)
- **Animations**: Framer Motion (component entrance) + GSAP with ScrollTrigger (scroll-linked orchestration)
- **3D**: Three.js via @react-three/fiber + @react-three/drei (hero particle field)
- **Smooth Scroll**: Lenis (integrated with GSAP ticker)
- **Icons**: Lucide React
- **Utilities**: clsx + tailwind-merge (`cn()` helper in `lib/utils.ts`)

### Page Structure

```
/                    → HeroSection, ServicesOverview, WhyNexaBridge, TechStackOrbit, CTASection
/services            → ServicesPageContent (all 8 services hub)
/services/web        → WebServiceContent
/services/mobile     → MobileServiceContent
/services/business   → BusinessServiceContent
/about               → AboutPageContent (story, team, values, engineering metrics)
/contact             → ContactPageContent (form + contact info)
```

Each page route (`page.tsx`) exports metadata and renders a `*Content` component that contains the actual page sections.

### Component Organization

- **`components/layout/`** — BackgroundEffects (fixed multi-layer background), Navbar, Footer, SectionWrapper (consistent section container with optional gradient divider), SmoothScroll (Lenis provider)
- **`components/sections/`** — Page-specific sections (HeroSection, ServicesOverview, WhyNexaBridge, TechStackOrbit, TestimonialsSection, CTASection)
- **`components/ui/`** — Reusable primitives: Button (primary/secondary/amber), MagneticButton (mouse-follow), Card (glow hover), Badge (cyan/blue/violet/amber), SectionHeading, AnimateInView, AnimatedCounter, GradientText, TextReveal (GSAP character-by-character), BentoGrid, Marquee, OrbitRing, TechNode, ScrollSection, ScrollToTop
- **`components/three/`** — Scene (canvas wrapper, dynamically imported with `ssr: false`) + ParticleHero

### Content Centralization

**All website copy lives in `lib/constants.ts`** — components import and render data, never hardcode strings. This is the single file to edit for content changes. Organized into: `NAV_LINKS`, `HERO`, `STATS`, `TECHNICAL_SERVICES`, `BUSINESS_SERVICES`, `SERVICE_CATEGORIES`, `FEATURE_HIGHLIGHTS`, `CORE_VALUES`, `TEAM_MEMBERS`, `ENGINEERING_METRICS`, `CAPABILITY_DOMAINS`, `ENGINEERING_PRINCIPLES`, `TECH_STACK`, `TESTIMONIALS`, `CONTACT_INFO`, `COMPANY`.

All TypeScript interfaces live in `lib/types.ts`.

### Animation System (Dual Library)

**Framer Motion** — Component-level entrance animations. Variants defined in `lib/animations.ts` (fadeUp, fadeIn, scaleIn, slideInLeft, slideInRight, staggerContainer/staggerItem). Components use `AnimateInView` wrapper or direct `whileInView` with `viewport={{ once: true }}`. Safety pattern: 2-second timeout forces visibility if animation fails to trigger.

**GSAP + ScrollTrigger** — Scroll-linked orchestration. Used in `TextReveal` (character split reveal), `WhyNexaBridge` (horizontal scroll on desktop ≥1024px, snap scroll on mobile), and orbit animations. Lenis hooks into GSAP ticker for smooth scroll coordination.

### Root Layout

The root layout (`app/layout.tsx`) loads three Google Fonts via `next/font`:
- **Syne** (`--font-heading`) — headings
- **Plus Jakarta Sans** (`--font-body`) — body text
- **JetBrains Mono** (`--font-mono`) — code/stats

Wraps the app in `SmoothScroll`, renders fixed `BackgroundEffects` (persists across route changes), `Navbar`, main content, `Footer`, `ScrollToTop`.

### Theme Tokens (globals.css `@theme inline`)

| Token | Value | Note |
|---|---|---|
| `--color-background` | `#050510` | Near-black base |
| `--color-foreground` | `#e4e4e7` | Primary text |
| `--color-muted` | `#a1a1aa` | Body/descriptions |
| `--color-card` | `rgba(255,255,255,0.02)` | Card surfaces |
| `--color-border` | `rgba(255,255,255,0.06)` | Subtle borders |
| `--color-accent-cyan` | `#06b6d4` | Technical services, primary CTA glow |
| `--color-accent-blue` | `#2563eb` | Business services |
| `--color-accent-violet` | `#8b5cf6` | Gradient end |
| `--color-accent-amber` | `#f59e0b` | Alternate accent |
| `--color-glow` | `rgba(6,182,212,0.12)` | Hover glow |

### Key Patterns

- **Service accent system**: Technical services = cyan, Business services = blue. Consistent across bento grids, cards, badges.
- **SectionWrapper**: All page sections use this for consistent max-width (6xl), padding, and optional top gradient divider.
- **No global state**: Local `useState` only. No Redux, Context providers, or state management libraries.
- **Three.js SSR safety**: Scene component is dynamically imported with `{ ssr: false }` and wrapped in Suspense.
- **Responsive behavior via JS**: WhyNexaBridge uses `matchMedia` listener (not CSS) to switch between horizontal scroll (desktop) and snap scroll (mobile) at 1024px.
- **Orbit scaling via transform**: TechStackOrbit sizes a 600px container and scales it down with `transform: scale(...)` for mobile, not responsive Tailwind widths.

---

## Design Direction

Dark-themed, modern, techy — inspired by [reacticx.com](https://www.reacticx.com/).

- **Dark background** (`#050510`) as the primary surface
- **Glow effects** on cards, buttons, headings (soft colored box-shadows / radial gradients)
- **Gradient accents** — cyan-to-violet or blue-to-violet on text, borders, CTAs
- **Glass-morphism** — translucent cards with backdrop blur
- **Generous whitespace** — sections breathe; avoid cramped layouts
- **Distinctive typography** — never use generic fonts (Inter, Roboto, Arial). Use characterful pairings per the skill frontend-design.

### Background Implementation (Critical)

The `BackgroundEffects` component is the defining visual element. Multi-layered fixed composition:

1. Solid dark base (`#050510`)
2. Dot grid pattern (radial-gradient, 20px grid, ~20% opacity)
3. 4 ambient glow blobs (cyan, violet, cyan, amber) — large (400–800px), heavy blur (100–140px), very low opacity (8–15%)
4. Optional SVG noise overlay (feTurbulence, ~3% opacity)

**Never remove or simplify the background.** Glow blobs must remain large, blurry, and atmospheric — not small or sharp.

### Content Glow Effects

- Hero heading: gradient text (`bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400`)
- Cards on hover: `hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]` + border brightness
- CTA buttons: gradient background + soft glow shadow
- Section dividers: `h-px bg-gradient-to-r from-transparent via-white/10 to-transparent`

---

## Content Generation Rules

Generate all website content autonomously. No placeholder text ("Lorem ipsum", "[Your text here]"). Every rendered string must read like professional copywriting.

### Company Profile

- **Name**: NexaBridge Solutions
- **Tagline**: "Bridging Ideas to Innovation"
- **Industry**: IT Services & Technology Consulting
- **Target**: Startups, SMBs, enterprises seeking technology partners
- **Mission**: Empower businesses with technology that drives growth, efficiency, and competitive advantage
- **Vision**: Most trusted technology partner worldwide — known for quality, innovation, and lasting impact
- **Contact**: hello@nexabridge.com, +1 (555) 012-3456, 123 Innovation Drive, San Francisco, CA 94105

### Services

**IT Technical Solutions** (cyan accent): Web App Dev, Mobile App Dev, Custom Software, API Integration
**IT Business Solutions** (blue accent): IT Consulting, Digital Transformation, AI Automation, Process Automation

### Content Voice

- Professional but approachable — not stiff corporate
- Confident and action-oriented — active voice, strong CTAs
- Concise — short paragraphs, scannable sections
- "We" for NexaBridge, "you/your" for client
- Vary CTA text across pages ("Start Your Project", "Let's Build Together", "Get a Free Consultation")
- Stats (placeholder): "150+ Projects Delivered", "98% Client Retention", "50+ Engineers", "12 Countries Served"

---

## Rules

- **Always load skill frontend-design before any visual code** — the #1 rule
- Dark mode only — no light theme or toggle
- No placeholder/filler text — generate real production copy
- No generic fonts — use distinctive, characterful pairings
- No inline styles — Tailwind classes only
- Don't hardcode content in components — use `lib/constants.ts`
- Keep dependencies lean — justify any additions
- Mobile-responsive (test at 375px, 768px, 1024px, 1440px)
- Semantic HTML with proper heading hierarchy, alt text, focus states
- Use `cn()` from `lib/utils.ts` for conditional class merging
- Define reusable animation variants in `lib/animations.ts`
- Every page must export meaningful `metadata` (title, description)
