"use client";

import { useEffect, useRef } from "react";

interface VantaInstance {
  destroy: () => void;
}

interface VantaEffect {
  HALO: (config: Record<string, unknown>) => VantaInstance;
}

declare global {
  interface Window {
    VANTA: VantaEffect | undefined;
    THREE: unknown;
  }
}

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<VantaInstance | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function initVanta() {
      if (window.VANTA && containerRef.current && !vantaRef.current) {
        vantaRef.current = window.VANTA.HALO({
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
      }
    }

    // Avoid adding duplicate scripts
    const loadScript = (src: string, id: string, onLoad: () => void) => {
      if (document.getElementById(id)) {
        onLoad();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.onload = onLoad;
      document.body.appendChild(script);
    };

    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
      "vanta-three-js",
      () => {
        loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.halo.min.js",
          "vanta-halo-js",
          initVanta
        );
      }
    );

    return () => {
      vantaRef.current?.destroy();
      vantaRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 h-full w-full pointer-events-none blur-xl" />
  );
}
