import {
  Cpu,
  LayoutTemplate,
  ShoppingCart,
  LifeBuoy,
  Plug,
  Server,
  Search,
} from "lucide-react";
import type { Service } from "@/types";

/**
 * Copy lives in `messages/*.json` under `services.items.<id>`. Only the id,
 * icon, visual tier and the number of example bullets are declared here.
 */
export const services: Service[] = [
  { id: "custom-software", icon: Cpu, tier: "primary", exampleCount: 6 },
  { id: "landing", icon: LayoutTemplate, tier: "primary", exampleCount: 4 },
  { id: "ecommerce", icon: ShoppingCart, tier: "primary", exampleCount: 4 },
  { id: "maintenance", icon: LifeBuoy, tier: "secondary", exampleCount: 0 },
  { id: "integrations", icon: Plug, tier: "secondary", exampleCount: 0 },
  { id: "hosting", icon: Server, tier: "secondary", exampleCount: 0 },
  { id: "seo", icon: Search, tier: "secondary", exampleCount: 0 },
];

export const primaryServices = services.filter((s) => s.tier === "primary");
export const secondaryServices = services.filter((s) => s.tier === "secondary");

/** Service ids that carry an extra clarifying note under the card. */
export const servicesWithNotes = ["integrations", "seo"] as const;
