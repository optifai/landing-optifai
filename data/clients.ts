import type { Client } from "@/types";

/**
 * No client logos are published yet.
 *
 * Add only authorised, real clients. Logos may be local SVG, PNG or WebP
 * files; the section keeps them at a uniform visual height without stretching.
 *
 * Example shape:
 * {
 *   name: "Client name",
 *   logo: "/clients/client-logo.svg",
 *   alt: "Client name",
 *   url: "https://client.example", // optional
 * }
 */
export const clients: Client[] = [];
