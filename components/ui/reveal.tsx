"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger helper for grids: multiplied by 60ms, capped at 240ms. */
  index?: number;
  className?: string;
}

/**
 * Fades content up as it scrolls into view. Deliberately small and quick.
 *
 * When the visitor prefers reduced motion nothing animates at all: the wrapper
 * renders a plain element, so there is no transform and no opacity transition.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      // Marks the element for the <noscript> fallback in the root layout:
      // the initial `opacity: 0` is server-rendered, so without JavaScript the
      // content would otherwise never become visible.
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      // `once` avoids re-animating on every scroll pass; the margin starts the
      // animation slightly before the element is fully visible.
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.45,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: Math.min(index * 0.06, 0.24),
      }}
    >
      {children}
    </motion.div>
  );
}
