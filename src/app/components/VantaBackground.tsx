"use client";

import { useEffect, useRef } from "react";

interface VantaConfig {
  el: HTMLElement | null;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  backgroundColor: number;
  baseColor: number;
  size: number;
  amplitudeFactor: number;
  xOffset: number;
  yOffset: number;
}

interface VantaEffect {
  HALO: (config: VantaConfig) => void;
}

declare global {
  interface Window {
    VANTA: VantaEffect | undefined;
    THREE: unknown;
  }
}

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Three.js
    const threeScript = document.createElement("script");
    threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    threeScript.onload = () => {
      // Load Vanta.js after Three.js
      const vantaScript = document.createElement("script");
      vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js";
      vantaScript.onload = () => {
        if (window.VANTA) {
          window.VANTA.HALO({
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
      };
      document.body.appendChild(vantaScript);
    };
    document.body.appendChild(threeScript);    
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 h-full w-full pointer-events-none blur-xl" />
  );
}
