"use client";

import { useSyncExternalStore } from "react";

/** No external store to watch — the snapshot value never changes after mount. */
const subscribe = () => () => {};

/**
 * Returns `false` during server rendering and the first client render, then
 * `true` once hydrated.
 *
 * Used by controls whose state only exists in the browser (the resolved theme,
 * for example). `useSyncExternalStore` is the right tool here rather than
 * `useState` + `useEffect`: React knows the server and client snapshots differ
 * on purpose, so there is no cascading render and no hydration warning.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
