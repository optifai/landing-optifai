import type { LucideIcon } from "lucide-react";

/** Keys used to look up copy inside `messages/*.json`. */
export type TranslationKey = string;

export type ServiceTier = "primary" | "secondary";

export interface Service {
  /** Stable id, also used as the translation key under `services.items`. */
  id: string;
  icon: LucideIcon;
  tier: ServiceTier;
  /** Number of example bullets defined in the message files. */
  exampleCount: number;
}

export type ProjectCategory = "management" | "landing" | "ecommerce";

export interface Project {
  id: string;
  /** Client name. Empty string while the entry is a placeholder. */
  client: string;
  category: ProjectCategory;
  /** Path under `public/` or `null` to render the generated mockup instead. */
  image: string | null;
  /** Public site, when the client allows linking it. */
  url?: string;
  /** Source repository, when it is public. */
  repository?: string;
  technologies: string[];
  featured: boolean;
  order: number;
  /**
   * Marks the entry as sample content. Placeholder entries are labelled in the
   * UI so a visitor is never shown invented work as if it were real.
   */
  isPlaceholder: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: {
    es: string;
    en: string;
  };
  /** Path under `public/`. */
  photo?: string;
  /** Id of a project in `data/projects.ts`. */
  relatedProject?: string;
  order: number;
  isPlaceholder: boolean;
}

export interface Client {
  name: string;
  /** Local SVG, PNG or WebP path under `public/`. */
  logo: string;
  alt: string;
  url?: string;
}

export interface FaqItem {
  /** Translation key under `faq.items`. */
  id: string;
}

export interface ProcessStep {
  id: string;
  icon: LucideIcon;
}

export interface Benefit {
  id: string;
  icon: LucideIcon;
}
