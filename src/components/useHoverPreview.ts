"use client";

import { useEffect, useRef, type PointerEvent, type RefObject } from "react";

/**
 * Plays a video muted while a mouse rests on its card, and pauses it when the mouse leaves.
 * Once the viewer takes over (starts it themselves or unmutes), the hover stops controlling it.
 * Skipped for touch and for reduced motion. The short delay keeps a passing cursor from
 * starting downloads.
 */
export function useHoverPreview(ref: RefObject<HTMLVideoElement | null>) {
  const ours = useRef(false); // the next play event comes from the hover
  const owned = useRef(false); // the viewer is in control
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function onPointerEnter(e: PointerEvent) {
    const v = ref.current;
    if (!v || e.pointerType !== "mouse" || owned.current || !v.paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setTimeout(() => {
      v.muted = true;
      ours.current = true;
      v.play().catch(() => {
        ours.current = false;
      });
    }, 150);
  }

  function onPointerLeave() {
    window.clearTimeout(timer.current);
    if (!owned.current) ref.current?.pause();
  }

  const videoProps = {
    onPlay() {
      if (ours.current) {
        ours.current = false;
        return;
      }
      // Started with the video's own controls: play it properly, with sound.
      owned.current = true;
      if (ref.current) ref.current.muted = false;
    },
    onVolumeChange() {
      if (ref.current && !ref.current.muted && !ours.current) owned.current = true;
    },
    onEnded() {
      owned.current = false;
    },
  };

  return { cardProps: { onPointerEnter, onPointerLeave }, videoProps };
}
