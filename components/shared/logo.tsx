import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type LogoVariant = "horizontal" | "symbol" | "responsive";

function HorizontalLogo() {
  return (
    <span className="relative block h-8 w-[6.875rem] overflow-hidden">
      <Image
        src="/images/logo-sin-fondo.png"
        alt=""
        width={208}
        height={208}
        className="absolute left-1/2 top-1/2 size-[13rem] max-w-none -translate-x-1/2 -translate-y-1/2 dark:brightness-0 dark:invert"
      />
    </span>
  );
}

function SymbolLogo() {
  return (
    <span className="relative block h-8 w-7 overflow-hidden">
      <Image
        src="/logo-sin-fondo-original.svg"
        alt=""
        width={160}
        height={160}
        className="absolute left-1/2 top-1/2 size-40 max-w-none -translate-x-1/2 -translate-y-1/2 dark:invert"
      />
    </span>
  );
}

export function Logo({
  className,
  variant = "horizontal",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  return (
    <span
      role="img"
      aria-label={siteConfig.name}
      data-logo-variant={variant}
      className={cn("inline-flex items-center", className)}
    >
      {variant === "horizontal" ? <HorizontalLogo /> : null}
      {variant === "symbol" ? <SymbolLogo /> : null}
      {variant === "responsive" ? (
        <>
          <span className="sm:hidden">
            <SymbolLogo />
          </span>
          <span className="hidden sm:block">
            <HorizontalLogo />
          </span>
        </>
      ) : null}
    </span>
  );
}
