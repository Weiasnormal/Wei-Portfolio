"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/app");
    }, 2600);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <section className="relative h-28 w-28 md:h-36 md:w-36" aria-label="Loading portfolio">
        <Image
          src="/WwhiteLogo.svg"
          alt="W logo"
          fill
          className="logo-outline object-contain"
          priority
        />

        <div className="logo-fill-wrap">
          <Image
            src="/WwhiteLogo.svg"
            alt="W logo fill"
            fill
            className="logo-fill object-contain"
            priority
          />
          <span className="fill-scan" aria-hidden="true" />
        </div>
      </section>

      <style jsx>{`
        .logo-outline {
          opacity: 0.18;
          filter: grayscale(1) brightness(1.2);
        }

        .logo-fill-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          animation: fill-up 1.8s ease-out forwards;
        }

        .logo-fill {
          filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.55));
        }

        .fill-scan {
          position: absolute;
          left: 0;
          right: 0;
          height: 12px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0)
          );
          filter: blur(3px);
          animation: scan-up 1.8s ease-out forwards;
        }

        @keyframes fill-up {
          0% {
            clip-path: inset(100% 0 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes scan-up {
          0% {
            top: 100%;
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          88% {
            opacity: 1;
          }
          100% {
            top: 0%;
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
