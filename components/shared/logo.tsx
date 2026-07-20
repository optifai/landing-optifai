import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type LogoVariant = "horizontal" | "symbol" | "responsive";

/**
 * TEMPORARY LOGO — the mark and wordmark remain CSS/text based until the real
 * light and dark assets are ready. The variant API keeps that future swap
 * local to this component: horizontal for wide layouts, symbol for compact
 * layouts, or responsive for both.
 */
export function Logo({
  className,
  variant = "horizontal",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  const showWordmark = variant !== "symbol";

  return (
    <span
      data-logo-variant={variant}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative grid size-8 place-items-center overflow-hidden rounded-[0.6rem]",
          "bg-gradient-to-br from-primary via-primary to-accent-strong",
          "font-display text-[0.95rem] font-extrabold text-white",
          "shadow-[0_2px_10px_-2px_var(--glow-a)]",
        )}
      >
        {/* Diagonal sheen keeps the flat mark from looking like a plain chip. */}
        <span className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0" />
        <span className="relative">O</span>
      </span>

      {showWordmark ? (
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight text-fg",
            variant === "responsive" && "hidden sm:inline",
          )}
        >
          Optif<span className="text-accent">AI</span>
        </span>
      ) : null}

      {variant !== "horizontal" ? (
        <span className={showWordmark ? "sr-only sm:hidden" : "sr-only"}>
          {siteConfig.name}
        </span>
      ) : null}
    </span>
  );
}
