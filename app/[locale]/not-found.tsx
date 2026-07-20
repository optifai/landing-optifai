import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("common");
  const tLegal = useTranslations("legal");

  return (
    <div className="container-page flex min-h-[60dvh] flex-col items-center justify-center py-32 text-center">
      <p className="font-display text-6xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 text-2xl sm:text-3xl">{t("notFoundTitle")}</h1>
      <p className="mt-3 max-w-md text-fg-muted">{t("notFoundBody")}</p>
      <Link href="/" className={buttonClasses("primary", "lg", "mt-8")}>
        <ArrowLeft aria-hidden="true" className="size-4" />
        {tLegal("backHome")}
      </Link>
    </div>
  );
}
