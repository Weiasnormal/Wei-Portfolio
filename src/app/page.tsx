"use client";

import { useState, useEffect } from "react";
import HomePage from "./app/page";
import LoadingSplash from "./components/LoadingSplash";

export default function RootPage() {
  const [showSplash, setShowSplash] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if this is a fresh page load
    const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const isReload = navigationEntries.length > 0 && 
      (navigationEntries[0].type === "reload" || navigationEntries[0].type === "navigate");
    
    const hasNavigated = sessionStorage.getItem("hasNavigated");
    
    if (isReload || !hasNavigated) {
      setShowSplash(true);
      sessionStorage.setItem("hasNavigated", "true");
      
      // Hide splash and show content after animation completes
      const timer = setTimeout(() => {
        setShowSplash(false);
        setShowContent(true);
      }, 4500);

      return () => clearTimeout(timer);
    } else {
      // If already navigated, show content immediately
      setShowContent(true);
    }
  }, []);

  return (
    <>
      {showSplash && <LoadingSplash />}
      {showContent && <HomePage />}
    </>
  );
}
