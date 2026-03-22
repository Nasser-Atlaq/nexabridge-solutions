import {
  Globe,
  Smartphone,
  Code2,
  Plug,
  Brain,
  TrendingUp,
  Lightbulb,
  Cog,
  Shield,
  Users,
  Zap,
  Clock,
  Monitor,
  Server,
  Cloud,
  Building2,
} from "lucide-react";
import type {
  NavLink,
  ServiceCard,
  ServiceCategory,
  TeamMember,
  Testimonial,
  Stat,
  FeatureHighlight,
  CoreValue,
  ContactInfo,
  EngineeringMetric,
  CapabilityDomain,
  EngineeringPrinciple,
} from "./types";

// ── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ── Hero ────────────────────────────────────────────────────────────────────

export const HERO = {
  badge: "Bridging Ideas to Innovation",
  headline: "We Engineer",
  headlineAccent: "Digital",
  headlineSecondary: "Precision.",
  subtitle:
    "Custom-built software, intelligent automation, and strategic IT consulting — turning ambitious ideas into scalable, market-ready products.",
  primaryCta: "Start Your Project",
  secondaryCta: "Explore Services",
  primaryCtaHref: "/contact",
  secondaryCtaHref: "/services",
};

export const HERO_FEATURES = [
  "150+ Projects Delivered",
  "98% Client Retention",
  "24/7 Dedicated Support",
];

// ── Stats (placeholder — update with real data) ─────────────────────────────

export const STATS: Stat[] = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Retention" },
  { value: "50+", label: "Engineers" },
  { value: "12", label: "Countries Served" },
];

// ── Services ────────────────────────────────────────────────────────────────

export const TECHNICAL_SERVICES: ServiceCard[] = [
  {
    title: "Web Application Development",
    description:
      "Modern, scalable web applications built with cutting-edge frameworks — delivering sub-second load times and 99.9% uptime.",
    icon: Globe,
    href: "/services/web",
    bentoSize: "lg",
    accent: "cyan",
    features: [
      "Responsive, SEO-optimized architecture",
      "Custom dashboards & admin panels",
      "Scalable cloud deployment",
      "Performance-first engineering",
      "Progressive Web App capabilities",
    ],
    technologies: [
      "React",
      "Next.js",
      "Vue",
      "Node.js",
      "Python",
      "PostgreSQL",
    ],
    useCases: [
      "SaaS platforms",
      "E-commerce storefronts",
      "Internal tools & portals",
      "Client-facing dashboards",
    ],
  },
  {
    title: "Mobile Application Development",
    description:
      "Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android — from concept to App Store.",
    icon: Smartphone,
    href: "/services/mobile",
    bentoSize: "md",
    accent: "cyan",
    features: [
      "Cross-platform efficiency",
      "Offline-first capabilities",
      "Push notification systems",
      "App Store optimization",
      "Intuitive, gesture-driven UX",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    useCases: [
      "On-demand services",
      "Fintech applications",
      "Health & wellness",
      "Enterprise mobility",
    ],
  },
  {
    title: "Custom Software Development",
    description:
      "Bespoke software solutions engineered from the ground up for your unique workflows, challenges, and growth trajectory.",
    icon: Code2,
    href: "/services/web",
    bentoSize: "sm",
    accent: "cyan",
    features: [
      "Tailored architecture design",
      "Seamless system integration",
      "Scalable, future-proof design",
      "Dedicated development team",
    ],
    useCases: [
      "ERP systems",
      "CRM platforms",
      "Inventory management",
      "Data pipelines",
    ],
  },
  {
    title: "API Development & Integration",
    description:
      "Robust API design and third-party integrations that connect your systems, automate workflows, and unlock new capabilities.",
    icon: Plug,
    href: "/services/web",
    bentoSize: "sm",
    accent: "cyan",
    features: [
      "RESTful & GraphQL APIs",
      "Secure authentication & authorization",
      "Webhook & event systems",
      "Third-party service integrations",
    ],
    useCases: [
      "Payment processing",
      "Data synchronization",
      "Partner integrations",
      "Microservices architecture",
    ],
  },
];

export const BUSINESS_SERVICES: ServiceCard[] = [
  {
    title: "IT Consulting & Strategy",
    description:
      "Strategic technology consulting that aligns your IT investments with business goals — turning complexity into competitive advantage.",
    icon: Lightbulb,
    href: "/services/business",
    bentoSize: "sm",
    accent: "blue",
    features: [
      "Technology audits & assessments",
      "Digital roadmap planning",
      "Vendor evaluation & selection",
      "Architecture reviews",
      "Cost optimization strategies",
    ],
  },
  {
    title: "Digital Transformation",
    description:
      "End-to-end digital transformation services that modernize your operations, workflows, and customer experience.",
    icon: TrendingUp,
    href: "/services/business",
    bentoSize: "md",
    accent: "blue",
    features: [
      "Process digitization",
      "Legacy system migration",
      "Cloud adoption strategy",
      "Change management",
    ],
  },
  {
    title: "AI Automation",
    description:
      "Leverage artificial intelligence to automate complex workflows, enhance decision-making, and unlock new capabilities across your organization.",
    icon: Brain,
    href: "/services/business",
    bentoSize: "lg",
    accent: "blue",
    features: [
      "AI-powered chatbots & assistants",
      "Intelligent document processing",
      "Predictive analytics",
      "Custom LLM integrations",
      "AI workflow orchestration",
    ],
    technologies: [
      "OpenAI",
      "Claude API",
      "LangChain",
      "Custom ML Models",
      "Vector Databases",
    ],
  },
  {
    title: "Process Automation",
    description:
      "Automate repetitive business processes to save time, reduce errors, and free your team to focus on what matters most.",
    icon: Cog,
    href: "/services/business",
    bentoSize: "sm",
    accent: "blue",
    features: [
      "Workflow automation",
      "Robotic process automation (RPA)",
      "Intelligent document processing",
      "Automated reporting & analytics",
    ],
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: "IT Technical Solutions",
    description:
      "End-to-end engineering — from web and mobile applications to custom software and seamless API integrations.",
    accent: "cyan",
    services: TECHNICAL_SERVICES,
  },
  {
    title: "IT Business Solutions",
    description:
      "Strategic consulting and intelligent automation that transform how your business operates and competes.",
    accent: "blue",
    services: BUSINESS_SERVICES,
  },
];

// ── Why NexaBridge ──────────────────────────────────────────────────────────

export const FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
  {
    title: "Scalable Solutions",
    description:
      "Architecture designed to grow with your business — from first user to millions, without a rebuild.",
    icon: Zap,
  },
  {
    title: "Expert Team",
    description:
      "Senior engineers, designers, and strategists with deep expertise across modern tech stacks.",
    icon: Users,
  },
  {
    title: "End-to-End Delivery",
    description:
      "From discovery and design through development, deployment, and ongoing support — we own the entire lifecycle.",
    icon: Shield,
  },
  {
    title: "Rapid Execution",
    description:
      "Agile processes, clear milestones, and transparent communication that keep your project moving fast.",
    icon: Clock,
  },
];

// ── Core Values ─────────────────────────────────────────────────────────────

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Innovation First",
    description:
      "We stay ahead of the curve, adopting modern technologies and creative approaches to solve complex challenges.",
    icon: Lightbulb,
  },
  {
    title: "Client Partnership",
    description:
      "We don't just deliver projects — we build lasting partnerships rooted in trust, collaboration, and shared success.",
    icon: Users,
  },
  {
    title: "Quality Without Compromise",
    description:
      "Every line of code, every design decision, every strategy is held to the highest standard.",
    icon: Shield,
  },
  {
    title: "Transparency",
    description:
      "Open communication, honest timelines, and clear deliverables — no surprises, no hidden agendas.",
    icon: TrendingUp,
  },
];

// ── Team Members (placeholder — update with real data) ──────────────────────

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former engineering lead at a Fortune 500 tech company. Sarah brings 15 years of experience building and scaling technology teams across three continents.",
    initials: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "CTO & Co-Founder",
    bio: "Full-stack architect with a passion for distributed systems. Marcus has designed infrastructure serving millions of users at startups and enterprises alike.",
    initials: "MR",
  },
  {
    name: "Amara Osei",
    role: "Head of Design",
    bio: "Award-winning product designer specializing in complex B2B interfaces. Amara turns intricate workflows into intuitive, delightful experiences.",
    initials: "AO",
  },
  {
    name: "James Whitfield",
    role: "VP of Engineering",
    bio: "Cloud infrastructure expert and DevOps evangelist. James ensures every system we build is resilient, secure, and ready to scale.",
    initials: "JW",
  },
  {
    name: "Priya Sharma",
    role: "Head of AI & Automation",
    bio: "Machine learning researcher turned product builder. Priya leads our AI practice, helping clients harness intelligent automation for real business impact.",
    initials: "PS",
  },
];

// ── Engineering Capabilities ────────────────────────────────────────────────

export const ENGINEERING_METRICS: EngineeringMetric[] = [
  { value: "2.4M+", label: "Lines Shipped" },
  { value: "99.97%", label: "Uptime SLA" },
  { value: "<80ms", label: "Avg API Response" },
  { value: "94%", label: "Test Coverage" },
  { value: "<15min", label: "Deploy Cycle" },
];

export const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  {
    title: "Frontend Engineering",
    description:
      "Pixel-perfect interfaces with sub-second TTI, accessible by default, animated with intent.",
    icon: Monitor,
    technologies: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "cyan",
  },
  {
    title: "Backend & APIs",
    description:
      "Distributed systems that handle millions of requests without breaking a sweat.",
    icon: Server,
    technologies: ["Node.js", "Python", "Rust", "GraphQL", "PostgreSQL", "Redis"],
    accent: "blue",
  },
  {
    title: "Mobile",
    description:
      "Cross-platform apps with native feel — one codebase, zero compromises on UX.",
    icon: Smartphone,
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
    accent: "violet",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Infrastructure as code, zero-downtime deploys, and auto-scaling that sleeps when you do.",
    icon: Cloud,
    technologies: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "Vercel"],
    accent: "cyan",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Production-grade AI pipelines — from RAG systems to fine-tuned models serving real traffic.",
    icon: Brain,
    technologies: ["OpenAI", "Claude API", "LangChain", "PyTorch", "Vector DBs"],
    accent: "amber",
  },
  {
    title: "Business Systems",
    description:
      "ERPs, CRMs, and workflow engines that replace spreadsheet chaos with structured automation.",
    icon: Building2,
    technologies: ["Salesforce", "SAP", "RPA", "Power Automate", "Custom ERP"],
    accent: "blue",
  },
];

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    title: "Ship Incrementally",
    description: "Small deploys, fast feedback. Every merge request moves the needle.",
  },
  {
    title: "Measure Everything",
    description: "If it isn't instrumented, it doesn't exist. Data drives every decision.",
  },
  {
    title: "Design for Failure",
    description: "Graceful degradation, circuit breakers, retries. Systems fail — ours recover.",
  },
  {
    title: "Code Is a Liability",
    description: "Less code means fewer bugs. We delete more than we write.",
  },
];

// ── Testimonials (placeholder — update with real data) ──────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "NexaBridge didn't just build our platform — they became a true extension of our team. The quality of their engineering and the speed of delivery exceeded every expectation.",
    name: "David Park",
    role: "CTO",
    company: "Elevate Health",
  },
  {
    quote:
      "Their AI automation work cut our document processing time by 80%. The ROI was visible within the first month. We've since expanded the engagement to three more initiatives.",
    name: "Rachel Nguyen",
    role: "VP of Operations",
    company: "FinCore Systems",
  },
  {
    quote:
      "From strategy to execution, NexaBridge brought clarity to a complex digital transformation. They helped us modernize a decade-old system in under six months.",
    name: "Michael Torres",
    role: "CEO",
    company: "Atlas Logistics",
  },
  {
    quote:
      "We needed a mobile app that could handle real-time data from thousands of IoT sensors. NexaBridge delivered a solution that's been rock-solid since day one.",
    name: "Lisa Yamamoto",
    role: "Director of Product",
    company: "GreenGrid Energy",
  },
  {
    quote:
      "Their consulting team identified $2M in annual savings by restructuring our cloud infrastructure. The engagement paid for itself in the first quarter.",
    name: "Robert Ainsworth",
    role: "CFO",
    company: "Meridian Capital",
  },
];

// ── Tech Stack Orbit ────────────────────────────────────────────────────────

export const TECH_STACK: import("./types").TechStackItem[] = [
  // Ring 1 — Frontend (cyan, CW 60s)
  { name: "React", description: "Component-driven UI library", category: "frontend", ring: 1, accent: "cyan" },
  { name: "Next.js", description: "Full-stack React framework", category: "frontend", ring: 1, accent: "cyan" },
  { name: "Vue", description: "Progressive web framework", category: "frontend", ring: 1, accent: "cyan" },
  { name: "Flutter", description: "Cross-platform UI toolkit", category: "frontend", ring: 1, accent: "cyan" },
  { name: "React Native", description: "Native mobile with React", category: "frontend", ring: 1, accent: "cyan" },

  // Ring 2 — Backend & Cloud (blue/violet, CCW 90s)
  { name: "Node.js", description: "JavaScript runtime", category: "backend", ring: 2, accent: "blue" },
  { name: "Python", description: "Versatile backend language", category: "backend", ring: 2, accent: "blue" },
  { name: "Rust", description: "Systems-level performance", category: "backend", ring: 2, accent: "violet" },
  { name: "AWS", description: "Cloud infrastructure", category: "backend", ring: 2, accent: "blue" },
  { name: "Docker", description: "Container platform", category: "backend", ring: 2, accent: "violet" },
  { name: "Kubernetes", description: "Container orchestration", category: "backend", ring: 2, accent: "blue" },
  { name: "Vercel", description: "Edge deployment platform", category: "backend", ring: 2, accent: "violet" },

  // Ring 3 — Data & AI (amber, CW 120s)
  { name: "OpenAI", description: "Large language models", category: "data", ring: 3, accent: "amber" },
  { name: "LangChain", description: "LLM orchestration framework", category: "data", ring: 3, accent: "amber" },
  { name: "PostgreSQL", description: "Relational database", category: "data", ring: 3, accent: "amber" },
  { name: "MongoDB", description: "Document database", category: "data", ring: 3, accent: "amber" },
];

export const TECH_CATEGORIES = [
  { key: "frontend" as const, label: "Frontend & Mobile", accent: "cyan" as const },
  { key: "backend" as const, label: "Backend & Cloud", accent: "blue" as const },
  { key: "data" as const, label: "Data & AI", accent: "amber" as const },
];

// ── Contact ─────────────────────────────────────────────────────────────────

export const CONTACT_INFO: ContactInfo = {
  email: "nexabridge.teck@gmail.com",
  phone: "+7 (969) 207-6774",
};

export const CONTACT_FORM_SERVICES = [
  "Web Application Development",
  "Mobile Application Development",
  "Custom Software Development",
  "API Development & Integration",
  "IT Consulting & Strategy",
  "Digital Transformation",
  "AI Automation",
  "Process Automation",
  "Other",
];

// ── Company Info ─────────────────────────────────────────────────────────────

export const COMPANY = {
  name: "NexaBridge Solutions",
  tagline: "Bridging Ideas to Innovation",
  mission:
    "To empower businesses with technology solutions that drive growth, efficiency, and competitive advantage.",
  vision:
    "To become the most trusted technology partner for businesses worldwide — known for quality, innovation, and lasting impact.",
  story:
    "NexaBridge Solutions was founded on the belief that great technology should be accessible to every business. We bridge the gap between ambitious ideas and real-world innovation — delivering custom-built digital products and strategic IT consulting that help businesses thrive in a rapidly evolving landscape. Our team of engineers, designers, and strategists works as an extension of your team, bringing deep technical expertise and a relentless focus on results.",
};
