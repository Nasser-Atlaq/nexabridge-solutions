import type { LucideIcon } from "lucide-react";

export type BentoItemSize = "sm" | "md" | "lg";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  features: string[];
  useCases?: string[];
  technologies?: string[];
  bentoSize?: BentoItemSize;
  accent?: "cyan" | "blue";
}

export interface ServiceCategory {
  title: string;
  description: string;
  accent: "cyan" | "blue";
  services: ServiceCard[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface FeatureHighlight {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

// ── Engineering Capabilities ────────────────────────────────────────────────

export interface EngineeringMetric {
  value: string;
  label: string;
}

export interface CapabilityDomain {
  title: string;
  description: string;
  icon: LucideIcon;
  technologies: string[];
  accent: "cyan" | "blue" | "violet" | "amber";
}

export interface EngineeringPrinciple {
  title: string;
  description: string;
}

// ── Tech Stack Orbit ────────────────────────────────────────────────────────

export type TechCategory = "frontend" | "backend" | "data";

export interface TechStackItem {
  name: string;
  description: string;
  category: TechCategory;
  ring: 1 | 2 | 3;
  accent: "cyan" | "blue" | "violet" | "amber";
}
