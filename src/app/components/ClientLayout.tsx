"use client";

import { useState, useEffect } from "react";
import LoadingSplash from "./LoadingSplash";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if this is a fresh page load (not client-side navigation)
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const isPageLoad = performance.navigation?.type === 1 || 
                       navEntry?.type === "reload" ||
                       !sessionStorage.getItem("hasNavigated");
    
    if (isPageLoad) {
      setShowSplash(true);
      // Mark that we've navigated, so subsequent client-side navigations don't show splash
      sessionStorage.setItem("hasNavigated", "true");
      
      // Hide splash after animation completes
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 4500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Don't render anything until client-side
  if (!isClient) {
    return null;
  }

  return (
    <>
      {showSplash && <LoadingSplash />}
      {children}
    </>
  );
}
