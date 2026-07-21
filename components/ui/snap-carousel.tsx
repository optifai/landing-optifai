"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

export function useSnapCarousel() {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [snapOffsets, setSnapOffsets] = React.useState([0]);
  const [position, setPosition] = React.useState(0);

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
    const nearest = nextOffsets.reduce(
      (bestIndex, offset, index) =>
        Math.abs(offset - track.scrollLeft) <
        Math.abs(nextOffsets[bestIndex] - track.scrollLeft)
          ? index
          : bestIndex,
      0,
    );

    setSnapOffsets(nextOffsets);
    setPosition(nearest);
    track.scrollTo({ left: nextOffsets[nearest], behavior: "auto" });
  }, []);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const frame = window.requestAnimationFrame(recalculate);
    const resizeObserver = new ResizeObserver(recalculate);
    resizeObserver.observe(track);
    Array.from(track.children).forEach((slide) => resizeObserver.observe(slide));
    window.addEventListener("orientationchange", recalculate);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("orientationchange", recalculate);
    };
  }, [recalculate]);

  const syncPosition = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const nearest = snapOffsets.reduce(
      (bestIndex, offset, index) =>
        Math.abs(offset - track.scrollLeft) <
        Math.abs(snapOffsets[bestIndex] - track.scrollLeft)
          ? index
          : bestIndex,
      0,
    );
    setPosition(nearest);
  }, [snapOffsets]);

  const move = React.useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;

      const nextPosition = Math.min(
        Math.max(position + direction, 0),
        snapOffsets.length - 1,
      );
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      setPosition(nextPosition);
      track.scrollTo({
        left: snapOffsets[nextPosition],
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [position, snapOffsets],
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
    syncPosition,
    handleKeyDown,
    move,
    canMovePrevious: position > 0,
    canMoveNext: position < snapOffsets.length - 1,
  };
}

interface SnapCarouselControlsProps {
  previousLabel: string;
  nextLabel: string;
  canMovePrevious: boolean;
  canMoveNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function SnapCarouselControls({
  previousLabel,
  nextLabel,
  canMovePrevious,
  canMoveNext,
  onPrevious,
  onNext,
}: SnapCarouselControlsProps) {
  const controlClasses =
    "pointer-events-auto size-11 rounded-full border-line-strong bg-surface/95 p-0 shadow-card backdrop-blur-sm";

  return (
    <div className="mt-4 flex justify-between gap-4 md:pointer-events-none md:absolute md:-inset-x-5 md:top-1/2 md:z-10 md:mt-0 md:-translate-y-1/2">
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
