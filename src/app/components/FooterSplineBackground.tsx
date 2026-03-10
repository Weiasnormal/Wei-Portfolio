"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function FooterSplineBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {shouldLoad && (
        <Suspense fallback={null}>
          <div
            className="absolute pointer-events-auto"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) scale(1.2)",
              width: "100%",
              height: "100%",
            }}
          >
            <Spline
              scene="https://prod.spline.design/p2gc-BMvAjis04jZ/scene.splinecode"
              style={{ background: "transparent", width: "100%", height: "100%" }}
            />
          </div>
        </Suspense>
      )}
    </div>
  );
}
