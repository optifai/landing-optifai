import { useTranslations } from "next-intl";
import { Cpu, Plug, Zap } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/brand-icons";

/** Relative bar heights for the decorative chart. Visual rhythm only. */
const CHART_BARS = [38, 52, 44, 66, 58, 78, 70, 92];

/**
 * Hero visual: a management dashboard built entirely from HTML and CSS.
 *
 * No external image is needed, so the hero renders instantly and never shifts.
 * The whole composition is decorative — it carries no information that isn't
 * also stated in the surrounding copy — so it is exposed to assistive tech as a
 * single labelled image rather than as a tree of meaningless nodes.
 *
 * Note there are deliberately no figures anywhere in this mockup: the value
 * slots are abstract bars. It illustrates the *shape* of a product without
 * implying invented metrics or results.
 */
export function HeroMockup() {
  const t = useTranslations("hero.mockup");

  return (
    <div
      role="img"
      aria-label={t("label")}
      className="relative isolate mx-auto w-full max-w-[34rem] lg:max-w-none"
    >
      {/* Ambient glow behind the composition. */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent_78%)] blur-2xl"
      />

      <div className="rounded-panel border border-line bg-surface shadow-lifted">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </span>
          <span className="ml-2 truncate text-xs font-medium text-fg-muted">
            {t("panelTitle")}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2 py-1">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-success" />
            <span className="h-1.5 w-8 rounded-full bg-success/35" />
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {/* Metric tiles — label plus an abstract value bar, never a number. */}
          <div className="grid grid-cols-3 gap-3">
            {[t("metricOrders"), t("metricRevenue"), t("metricTasks")].map(
              (label, index) => (
                <div
                  key={label}
                  className="rounded-lg border border-line bg-surface-2 p-3"
                >
                  <p className="truncate text-[0.65rem] font-medium text-fg-subtle">
                    {label}
                  </p>
                  <span
                    className="mt-2 block h-2.5 rounded-full bg-gradient-to-r from-primary to-accent-strong"
                    style={{ width: `${[72, 54, 86][index]}%` }}
                  />
                  <span className="mt-1.5 block h-1.5 w-2/5 rounded-full bg-line-strong/70" />
                </div>
              ),
            )}
          </div>

          {/* Chart */}
          <div className="rounded-lg border border-line bg-surface-2 p-4">
            <p className="text-[0.65rem] font-medium text-fg-subtle">
              {t("chartLabel")}
            </p>
            <div className="mt-3 flex h-24 items-end gap-1.5 sm:gap-2">
              {CHART_BARS.map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%` }}
                  className={
                    index === CHART_BARS.length - 1
                      ? "flex-1 rounded-t-[0.2rem] bg-gradient-to-t from-primary to-accent-strong"
                      : "flex-1 rounded-t-[0.2rem] bg-primary/25"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating card — automation flow */}
      {/* Both floating cards hang off the panel's corners rather than sitting
          on top of it, so nothing inside the dashboard is obscured. */}
      <div className="animate-float absolute -bottom-6 -left-3 w-[13.5rem] rounded-card border border-line bg-surface p-3 shadow-lifted sm:-left-8 sm:w-60">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-accent-soft text-accent">
            <Zap className="size-3.5" />
          </span>
          <p className="text-xs font-semibold text-fg">
            {t("automationTitle")}
          </p>
        </div>
        <p className="mt-2 text-[0.7rem] leading-relaxed text-fg-muted">
          {t("automationBody")}
        </p>
      </div>

      {/* Floating card — integrations */}
      <div
        className="animate-float absolute -right-2 -top-7 rounded-card border border-line bg-surface p-3 shadow-lifted sm:-right-6"
        style={{ animationDelay: "-3.5s" }}
      >
        <p className="text-[0.65rem] font-semibold text-fg-subtle">
          {t("integrationTitle")}
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="grid size-7 place-items-center rounded-lg bg-[#1ebe5d]/15 text-[#0f8a42] dark:text-[#3ddb80]">
            <WhatsAppIcon className="size-4" />
          </span>
          <span className="grid size-7 place-items-center rounded-lg bg-primary-soft text-primary">
            <Plug className="size-3.5" />
          </span>
          <span className="grid size-7 place-items-center rounded-lg bg-accent-soft text-accent">
            <Cpu className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
