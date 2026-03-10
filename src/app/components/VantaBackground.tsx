"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<{ destroy(): void } | null>(null);

  useEffect(() => {
    if (!containerRef.current || vantaRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    // Dynamic import keeps vanta out of the critical JS bundle
    // Passing THREE directly avoids setting window.THREE (no duplicate-instance warning)
    import("vanta/dist/vanta.halo.min").then((mod) => {
      if (cancelled || !containerRef.current) return;
      const HALO = mod.default ?? mod;
      vantaRef.current = HALO({
        THREE,
        el: containerRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        backgroundColor: 0x0a0a0a,
        baseColor: 0x1a59,
        size: 1,
        amplitudeFactor: 1,
        xOffset: 0,
        yOffset: 0,
      });
    });

    return () => {
      cancelled = true;
      vantaRef.current?.destroy();
      vantaRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 h-full w-full pointer-events-none blur-xl" />
  );
}
