import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Locally generated preview for portfolio entries that have no screenshot yet.
 *
 * Each category gets a visually distinct abstract layout. Everything is CSS:
 * no placeholder stock imagery, no network request and no layout shift.
 *
 * To replace one with a real screenshot, set `image` on the entry in
 * `data/projects.ts`; the card then renders a `next/image` instead of this.
 */
export function ProjectMockup({ category }: { category: ProjectCategory }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden bg-gradient-to-br from-surface-2 to-surface p-4"
    >
      <div
        className="bg-grid absolute inset-0 opacity-60"
        style={{ backgroundSize: "24px 24px" }}
      />
      <div className="relative h-full rounded-md bg-surface/85 p-3 backdrop-blur-sm">
        {category === "management" ? <ManagementBody /> : null}
        {category === "landing" ? <LandingBody /> : null}
        {category === "ecommerce" ? <EcommerceBody /> : null}
      </div>
    </div>
  );
}

/** Sidebar plus data table. */
function ManagementBody() {
  return (
    <div className="flex gap-2.5">
      <div className="hidden w-12 shrink-0 flex-col gap-1.5 sm:flex">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-2 rounded-full",
              i === 0 ? "bg-primary/70" : "bg-line",
            )}
          />
        ))}
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="flex gap-1.5">
          <span className="h-6 flex-1 rounded bg-primary/15" />
          <span className="h-6 flex-1 rounded bg-accent/15" />
          <span className="h-6 flex-1 rounded bg-primary/10" />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="h-1.5 flex-[2] rounded-full bg-line" />
            <span className="h-1.5 flex-1 rounded-full bg-line" />
            <span
              className={cn(
                "h-1.5 w-6 rounded-full",
                i % 2 === 0 ? "bg-success/50" : "bg-line-strong",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Hero headline, copy and a call to action. */
function LandingBody() {
  return (
    <div className="flex flex-col items-center gap-2 px-2 pt-1 text-center">
      <span className="h-2.5 w-3/4 rounded-full bg-gradient-to-r from-primary to-accent-strong" />
      <span className="h-1.5 w-full rounded-full bg-line" />
      <span className="h-1.5 w-5/6 rounded-full bg-line" />
      <span className="mt-1.5 h-5 w-24 rounded-md bg-primary/80" />
      <div className="mt-2 flex w-full gap-1.5">
        <span className="h-8 flex-1 rounded bg-surface-2" />
        <span className="h-8 flex-1 rounded bg-surface-2" />
        <span className="h-8 flex-1 rounded bg-surface-2" />
      </div>
    </div>
  );
}

/** Product grid with a cart summary. */
function EcommerceBody() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded bg-surface-2 p-1">
            <span
              className={cn(
                "block h-6 rounded",
                i % 3 === 0 ? "bg-accent/20" : "bg-primary/12",
              )}
            />
            <span className="mt-1 block h-1 w-2/3 rounded-full bg-line" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded bg-primary/10 px-2 py-1.5">
        <span className="h-1.5 w-12 rounded-full bg-primary/50" />
        <span className="h-3 w-10 rounded bg-primary/70" />
      </div>
    </div>
  );
}
