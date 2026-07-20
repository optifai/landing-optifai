/** Joins class names, dropping falsy values. Keeps components readable. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
