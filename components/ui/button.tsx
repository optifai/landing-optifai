import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "inverse"
  | "whatsapp";

export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-fg shadow-card hover:bg-primary-hover active:translate-y-px",
  secondary:
    "bg-surface text-fg border border-line-strong shadow-card hover:bg-surface-2 active:translate-y-px",
  outline:
    "border border-primary/40 text-primary hover:bg-primary-soft hover:border-primary/70",
  ghost: "text-fg-muted hover:text-fg hover:bg-surface-2",
  inverse:
    "bg-white text-[#0d2a63] shadow-card hover:bg-[#eef3fb] active:translate-y-px active:bg-[#dce5f2] focus-visible:outline-white disabled:bg-white/70 disabled:text-[#0d2a63]/70",
  whatsapp:
    "bg-[#1ebe5d] text-[#04160a] shadow-card hover:bg-[#19a851] active:translate-y-px",
};

const SIZES: Record<ButtonSize, string> = {
  // Min heights keep every control comfortably above the 44px touch target.
  sm: "min-h-10 px-3.5 text-sm gap-1.5",
  md: "min-h-11 px-5 text-[0.9375rem] gap-2",
  lg: "min-h-12 px-6 text-base gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-lg font-semibold " +
  "transition-colors duration-150 select-none " +
  "disabled:pointer-events-none disabled:opacity-55";

/**
 * Shared class builder so links and buttons look identical without forcing an
 * `<a>` to be rendered as a `<button>` (or the other way round).
 */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", className, type = "button", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses(variant, size, className)}
        {...props}
      />
    );
  },
);
