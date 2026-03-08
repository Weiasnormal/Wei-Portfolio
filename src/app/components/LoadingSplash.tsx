"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingSplash() {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const checkPageLoad = () => {
      const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload = navigationEntries.length > 0 && 
        (navigationEntries[0].type === "reload" || navigationEntries[0].type === "navigate");
      
      const hasNavigated = sessionStorage.getItem("hasNavigated");
      
      if (isReload || !hasNavigated) {
        setShouldShow(true);
        setIsLoading(true);
        sessionStorage.setItem("hasNavigated", "true");
        
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 4500);

        return () => clearTimeout(timer);
      }
    };

    checkPageLoad();
  }, []);

  const lines = [
    { 
      id: 1, 
      startX: -150, startY: 100, 
      endX: 100, endY: 80, 
      endX2: 130, endY2: 280 
    },
    { 
      id: 2, 
      startX: 500, startY: -100, 
      endX: 130, endY: 280, 
      endX2: 220, endY2: 120 
    },
    { 
      id: 3, 
      startX: 250, startY: 500, 
      endX: 220, endY: 120, 
      endX2: 250, endY2: 280 
    },
    { 
      id: 4, 
      startX: -100, startY: 350, 
      endX: 250, endY: 280, 
      endX2: 340, endY2: 120 
    },
    { 
      id: 5, 
      startX: 600, startY: 400, 
      endX: 340, endY: 120, 
      endX2: 370, endY2: 280 
    },
  ];

  if (!isLoading || !shouldShow) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0, scale: isLoading ? 1 : 1.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
    >
      <div className="relative">
        <svg
          width="500"
          height="400"
          viewBox="0 0 500 400"
          className="absolute inset-0"
          style={{ 
            filter: "drop-shadow(0 0 30px rgba(255, 91, 26, 0.6))",
          }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff5b1a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff8a5b" stopOpacity="1" />
            </linearGradient>
          </defs>

          {lines.map((line, index) => (
            <motion.line
              key={line.id}
              stroke="url(#lineGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              initial={{
                x1: line.startX,
                y1: line.startY,
                x2: line.startX,
                y2: line.startY,
                opacity: 0,
                pathLength: 0,
              }}
              animate={{
                x1: [line.startX, line.endX, line.endX2],
                y1: [line.startY, line.endY, line.endY2],
                x2: [line.startX, line.endX2, line.endX2],
                y2: [line.startY, line.endY2, line.endY2],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 2,
                delay: index * 0.12,
                times: [0, 0.5, 1],
                ease: "easeOut",
              }}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ 
            opacity: [0, 1, 1], 
            scale: [0.5, 1.1, 1],
            rotate: [180, 0, 0],
          }}
          transition={{ 
            duration: 1.2, 
            delay: 2.2,
            times: [0, 0.7, 1],
            ease: "easeOut",
          }}
          className="relative z-10 flex items-center justify-center"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 91, 26, 0.3)",
                "0 0 60px rgba(255, 91, 26, 0.6)",
                "0 0 20px rgba(255, 91, 26, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-full p-8"
          >
            <Image
              src="/WwhiteLogo.svg"
              alt="Logo"
              width={180}
              height={180}
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-16 w-64 h-1 bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#ff5b1a] to-[#ff8a5b] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1,
            delay: 3.2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
