import {
  MessageCircle,
  Compass,
  ClipboardList,
  PenTool,
  Rocket,
} from "lucide-react";
import type { ProcessStep } from "@/types";

/** Copy lives under `process.steps.<id>` in the message files. */
export const processSteps: ProcessStep[] = [
  { id: "conversation", icon: MessageCircle },
  { id: "discovery", icon: Compass },
  { id: "proposal", icon: ClipboardList },
  { id: "build", icon: PenTool },
  { id: "launch", icon: Rocket },
];
