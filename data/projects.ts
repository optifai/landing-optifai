import type { Project } from "@/types";

/**
 * Verifiable projects and support for explicitly labelled pending entries.
 *
 * To publish a real case study:
 *   1. Set `client` to the real client name (or leave "" if not authorised).
 *   2. Drop a screenshot in `public/projects/` and point `image` at it, e.g.
 *      `image: "/projects/acme-dashboard.png"`. Recommended size 1200×800.
 *      While `image` is `null` the generated CSS mockup is rendered instead.
 *   3. Fill `url` / `repository` only if they are public.
 *   4. Set `isPlaceholder: false`.
 *   5. Replace the `problem` / `solution` / `name` copy under
 *      `projects.items.<id>` in `messages/es.json` and `messages/en.json`.
 *   6. Add an optional `result` key next to them for a verified outcome —
 *      only if it is a real, measurable figure.
 *
 * If any entry is pending, keep `siteConfig.pending.projectsArePlaceholder`
 * aligned with the data in `config/site.ts`.
 */
export const projects: Project[] = [
  {
    id: "af-hub-negocios",
    client: "AF | HUB de Negocios",
    category: "landing",
    image: "/projects/af-hub-negocios.webp",
    url: "https://afhubpy.com/",
    technologies: [],
    featured: true,
    order: 1,
    isPlaceholder: false,
  },
  {
    id: "platinum-joyas",
    client: "Platinum Joyas",
    category: "ecommerce",
    image: "/projects/platinum-joyas.webp",
    url: "https://platinumjoyas.com/",
    technologies: [],
    featured: false,
    order: 3,
    isPlaceholder: false,
  },
  {
    id: "af-functional-training",
    client: "AF | Functional Training",
    category: "management",
    image: "/projects/af-functional-training.webp",
    technologies: [],
    featured: false,
    order: 2,
    isPlaceholder: false,
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
