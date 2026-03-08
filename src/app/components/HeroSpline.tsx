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
        <style dangerouslySetInnerHTML={{__html: `
          .hero-spline-wrapper {
            left: -15%;
            top: -8%;
            width: 130%;
            height: 120%;
          }
          @media (min-width: 768px) {
            .hero-spline-wrapper {
              top: -12%;
              height: 130%;
            }
          }
        `}} />
        <div className="hero-spline-wrapper absolute scale-110 pointer-events-auto">
          <Spline
            scene="https://prod.spline.design/HbtDQRPMLpJeQR2d/scene.splinecode"
            style={{ background: "transparent", width: '100%', height: '100%' }}
          />
        </div>
      </Suspense>
    </div>
  );
}
