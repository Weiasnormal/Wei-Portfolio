"use client";

import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function FooterSplineBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
            Loading Footer Scene...
          </div>
        }
      >
        <div 
          className="absolute pointer-events-auto" 
          style={{ 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%) scale(1.2)',
            width: '100%', 
            height: '100%' 
          }}
        >
          <Spline
            scene="https://prod.spline.design/p2gc-BMvAjis04jZ/scene.splinecode"
            style={{ background: "transparent", width: '100%', height: '100%' }}
          />
        </div>
      </Suspense>
    </div>
  );
}
