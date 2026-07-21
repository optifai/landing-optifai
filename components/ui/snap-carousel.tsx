"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

export function useSnapCarousel(recalculationKey?: string) {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const snapOffsetsRef = React.useRef([0]);
  const [controls, setControls] = React.useState({
    canMovePrevious: false,
    canMoveNext: false,
    hasOverflow: false,
  });

  const updateControls = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const tolerance = 2;

    const nextControls = {
      canMovePrevious: track.scrollLeft > tolerance,
      canMoveNext: track.scrollLeft < maxScroll - tolerance,
      hasOverflow: maxScroll > tolerance,
    };

    setControls((current) =>
      current.canMovePrevious === nextControls.canMovePrevious &&
      current.canMoveNext === nextControls.canMoveNext &&
      current.hasOverflow === nextControls.hasOverflow
        ? current
        : nextControls,
    );
  }, []);

  const recalculate = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const offsets = Array.from(track.children)
      .map((slide) => {
        const slideRect = slide.getBoundingClientRect();
        const rawOffset = slideRect.left - trackRect.left + track.scrollLeft;
        return Math.round(Math.min(rawOffset, maxScroll));
      })
      .filter((offset, index, all) => index === 0 || offset !== all[index - 1]);
    const nextOffsets = offsets.length > 0 ? offsets : [0];
    const nearestIndex = nextOffsets.reduce(
      (bestIndex, offset, index) =>
        Math.abs(offset - track.scrollLeft) <
        Math.abs(nextOffsets[bestIndex] - track.scrollLeft)
          ? index
          : bestIndex,
      0,
    );
    const nearestOffset = nextOffsets[nearestIndex];

    snapOffsetsRef.current = nextOffsets;
    track.scrollTo({ left: nearestOffset, behavior: "auto" });
    updateControls();
  }, [updateControls]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const frame = window.requestAnimationFrame(recalculate);
    const resizeObserver = new ResizeObserver(recalculate);
    resizeObserver.observe(track);
    Array.from(track.children).forEach((slide) => resizeObserver.observe(slide));
    window.addEventListener("resize", recalculate);
    window.addEventListener("orientationchange", recalculate);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", recalculate);
      window.removeEventListener("orientationchange", recalculate);
    };
  }, [recalculate, recalculationKey]);

  const move = React.useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;

      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const tolerance = 2;
      if (
        (direction === -1 && track.scrollLeft <= tolerance) ||
        (direction === 1 && track.scrollLeft >= maxScroll - tolerance)
      ) {
        return;
      }

      const offsets = snapOffsetsRef.current;
      const currentOffset = track.scrollLeft;
      const nextOffset =
        direction === 1
          ? (offsets.find((offset) => offset > currentOffset + tolerance) ??
            offsets[offsets.length - 1])
          : ([...offsets]
              .reverse()
              .find((offset) => offset < currentOffset - tolerance) ?? 0);
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      track.scrollTo({
        left: nextOffset,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      if (event.target !== event.currentTarget) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    },
    [move],
  );

  return {
    trackRef,
    syncPosition: updateControls,
    handleKeyDown,
    move,
    ...controls,
  };
}

interface SnapCarouselControlsProps {
  previousLabel: string;
  nextLabel: string;
  canMovePrevious: boolean;
  canMoveNext: boolean;
  hasOverflow: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function SnapCarouselControls({
  previousLabel,
  nextLabel,
  canMovePrevious,
  canMoveNext,
  hasOverflow,
  onPrevious,
  onNext,
}: SnapCarouselControlsProps) {
  if (!hasOverflow) return null;

  const controlClasses =
    "pointer-events-auto size-11 rounded-full border-line-strong bg-surface/95 p-0 shadow-card backdrop-blur-sm";

  return (
    <div className="mt-4 flex justify-between gap-4 lg:pointer-events-none lg:absolute lg:-inset-x-5 lg:top-1/2 lg:z-10 lg:mt-0 lg:-translate-y-1/2">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className={controlClasses}
        onClick={onPrevious}
        disabled={!canMovePrevious}
        aria-label={previousLabel}
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className={controlClasses}
        onClick={onNext}
        disabled={!canMoveNext}
        aria-label={nextLabel}
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </Button>
    </div>
  );
}
