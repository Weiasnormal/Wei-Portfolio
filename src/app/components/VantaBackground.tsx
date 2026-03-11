"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<{ destroy(): void; pause?(): void; play?(): void } | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current || vantaRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    // Dynamic import keeps vanta out of the critical JS bundle
    // Passing THREE directly avoids setting window.THREE (no duplicate-instance warning)
    import("vanta/dist/vanta.halo.min").then((mod) => {
      if (cancelled || !containerRef.current) return;
      const HALO = mod.default ?? mod;
      
      // Mobile-optimized configuration
      vantaRef.current = HALO({
        THREE,
        el: containerRef.current,
        mouseControls: !isMobile,
        touchControls: isMobile,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 2.0, // Optimize for mobile - lower resolution, better performance
        backgroundColor: 0x0a0a0a,
        baseColor: 0xff5b1a, // Brand orange color
        size: isMobile ? 0.7 : 1.0, // Reduce size on mobile
        amplitudeFactor: isMobile ? 0.7 : 1.0, // Reduce intensity on mobile
        xOffset: 0,
        yOffset: 0,
      });
    });

    return () => {
      cancelled = true;
      vantaRef.current?.destroy();
      vantaRef.current = null;
    };
  }, [isMobile]);

  // Intersection Observer to pause animation when not visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        // Pause/play animation based on visibility
        if (vantaRef.current) {
          if (entry.isIntersecting) {
            vantaRef.current.play?.();
          } else {
            vantaRef.current.pause?.();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 h-full w-full pointer-events-none blur-xl" />
  );
}
