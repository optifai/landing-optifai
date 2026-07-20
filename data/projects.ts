import type { Project } from "@/types";

/**
 * Verifiable projects and explicitly labelled pending entries.
 *
 * The two entries with screenshots are public projects. The custom system has
 * no URL or capture yet, so it remains an illustrative placeholder.
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
 * Once every entry has `isPlaceholder: false`, also set
 * `siteConfig.pending.projectsArePlaceholder` to `false` in `config/site.ts`.
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
    order: 2,
    isPlaceholder: false,
  },
  {
    id: "sample-management",
    client: "",
    category: "management",
    image: null,
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    featured: false,
    order: 3,
    isPlaceholder: true,
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
