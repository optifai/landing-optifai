import {
  Blocks,
  MessagesSquare,
  Smartphone,
  Code2,
  Layers,
  LifeBuoy,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import type { Benefit } from "@/types";

/** Copy lives under `benefits.items.<id>` in the message files. */
export const benefits: Benefit[] = [
  { id: "tailored", icon: Blocks },
  { id: "communication", icon: MessagesSquare },
  { id: "responsive", icon: Smartphone },
  { id: "maintainable", icon: Code2 },
  { id: "stages", icon: Layers },
  { id: "support", icon: LifeBuoy },
  { id: "scalable", icon: TrendingUp },
  { id: "transparency", icon: ShieldCheck },
];
