import type { Testimonial } from "@/types";

/**
 * Verified testimonials only. While this array is empty the testimonials
 * section renders an honest "not published yet" state instead of fake quotes.
 *
 * To add a real testimonial, append an entry with `isPlaceholder: false`:
 *
 *   {
 *     id: "acme-2026",
 *     name: "Real Name",
 *     role: "Operations Manager",             // optional
 *     company: "Company S.A.",                // optional
 *     quote: {
 *       es: "Sus palabras exactas, con autorización.",
 *       en: "Their exact words, translated with permission.",
 *     },
 *     photo: "/images/testimonials/real-name.jpg", // optional
 *     relatedProject: "acme-dashboard",            // optional, id in projects.ts
 *     order: 1,
 *     isPlaceholder: false,
 *   }
 *
 * Entries left with `isPlaceholder: true` render with a visible
 * "placeholder testimonial" badge so drafts can never ship silently as real.
 * Remember to also flip `siteConfig.pending.testimonialsArePlaceholder`.
 */
export const testimonials: Testimonial[] = [
  {
    id: "alejandro-franco-2026",
    name: "Alejandro Franco",
    quote: {
      es: "En OptifAi encontramos un servicio de excelencia. Su tiempo de respuesta superó ampliamente nuestras expectativas, demostrando un gran compromiso en cada etapa. Lo que más destacamos es su flexibilidad: adaptan el sistema, la landing page y cada servicio contratado exactamente a lo que el negocio necesita, ofreciendo soluciones a medida y herramientas clave para potenciar nuestra presencia digital. Totalmente recomendables.",
      en: "At OptifAi, we found excellent service. Their response time far exceeded our expectations, demonstrating great commitment at every stage. What we value most is their flexibility: they adapt the system, the landing page, and every contracted service to exactly what the business needs, offering tailored solutions and key tools to strengthen our digital presence. Highly recommended.",
    },
    order: 1,
    isPlaceholder: false,
  },
];

export const publishedTestimonials = testimonials
  .filter((t) => !t.isPlaceholder)
  .sort((a, b) => a.order - b.order);
