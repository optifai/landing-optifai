import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * TEMPORARY LOGO — text based, no image asset required.
 *
 * To swap in the final logo, replace the `<span aria-hidden>` mark below with
 * an `<Image>` (or an inline SVG) and keep the wordmark or drop it, depending
 * on whether the final artwork already contains the name. Nothing else in the
 * app references the logo directly — header and footer both render this
 * component, so a single edit here updates every usage.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
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
        <span className="font-display text-lg font-bold tracking-tight text-fg">
          Optif<span className="text-accent">AI</span>
        </span>
      ) : (
        <span className="sr-only">{siteConfig.name}</span>
      )}
    </span>
  );
}
