"use client";

import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function HeroSpline() {
  return (
    <div className="spline-container w-full h-full bg-transparent">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
            Loading 3D Scene...
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/HbtDQRPMLpJeQR2d/scene.splinecode"
          style={{ background: "transparent" }}
        />
      </Suspense>
    </div>
  );
}
