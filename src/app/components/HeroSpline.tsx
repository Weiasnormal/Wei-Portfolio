"use client";

import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function HeroSpline() {
  return (
    <div className="spline-container w-full h-full bg-transparent relative overflow-hidden">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
            Loading 3D Scene...
          </div>
        }
      >
        <div className="absolute inset-0 scale-110 pointer-events-auto" style={{ left: '-15%', right: '-10%', top: '-10%', bottom: '-10%', width: '130%', height: '130%' }}>
          <Spline
            scene="https://prod.spline.design/HbtDQRPMLpJeQR2d/scene.splinecode"
            style={{ background: "transparent", width: '100%', height: '100%' }}
          />
        </div>
      </Suspense>
    </div>
  );
}
