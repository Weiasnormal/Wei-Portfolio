"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/lib/site";

/**
 * Plays the logo transition, then hard-navigates to /v1. It has to be a full page load
 * because /v1 is a rewrite to a separate deployment. Nothing is stored, so "/" always
 * opens the new site.
 */
export function V1Link() {
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // Coming back with the browser's back button restores this page from bfcache; drop the veil.
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setLeaving(false);
    };
    window.addEventListener("pageshow", onShow);
    return () => {
      window.removeEventListener("pageshow", onShow);
      clearTimeout(timer.current);
    };
  }, []);

  function go() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLeaving(true);
    timer.current = setTimeout(() => window.location.assign(site.v1Path), reduce ? 200 : 1100);
  }

  return (
    <>
      <button
        type="button"
        onClick={go}
        className="flex cursor-pointer items-center gap-2 border-0 bg-transparent py-1 text-left text-[13.5px] text-faint transition-colors hover:text-fg"
      >
        <span className="wlogo h-[13px] w-[14px]" aria-hidden="true" />
        Version 1.0, where it started
      </button>
      {leaving &&
        createPortal(
          <div
            role="status"
            aria-live="polite"
            className="page-in fixed inset-0 z-[100] grid place-items-center bg-bg px-4"
          >
            <div className="grid justify-items-center gap-5">
              <span className="wlogo breathe h-[66px] w-[72px] text-fg" aria-hidden="true" />
              <div className="h-0.5 w-[120px] overflow-hidden rounded-sm bg-fg/18">
                <i className="fill-bar block h-full bg-accent" />
              </div>
              <p className="text-[13.5px] text-muted">Opening version 1.0</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
