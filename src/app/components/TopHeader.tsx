'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const TopHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Show only at the top; once scrolled down, keep it hidden.
        setIsVisible(currentScrollY <= 8);
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Calculate uptime
    const startTime = new Date('2026-03-08'); // Set your page start date
    
    const updateUptime = () => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setUptime({ days, hours, minutes, seconds });
    };

    updateUptime();
    const uptimeInterval = setInterval(updateUptime, 1000); // Update every second

    return () => clearInterval(uptimeInterval);
  }, []);

  useEffect(() => {
    // Toggle between location and uptime every 3 seconds
    const toggleInterval = setInterval(() => {
      setShowLocation((prev) => !prev);
    }, 3000);

    return () => clearInterval(toggleInterval);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 pb-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden">
            <Image
              src="/WwhiteLogo.svg"
              alt="Wincel Logo"
              width={56}
              height={56}
              priority
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Location / Uptime Toggle */}
        <div className="text-right min-w-[120px] md:min-w-[180px] h-12 flex items-center justify-end">
          <AnimatePresence mode="wait">
            {showLocation ? (
              <motion.div
                key="location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-right"
              >
                <p className="text-xs md:text-base text-gray-300">Quezon, Philippines</p>
                <p className="text-[10px] md:text-sm text-gray-500">PH</p>
              </motion.div>
            ) : (
              <motion.div
                key="uptime"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-right"
              >
                <p className="text-xs md:text-base text-gray-300">Page Uptime</p>
                <p className="text-[10px] md:text-sm text-gray-500 whitespace-nowrap">
                  {uptime.days}d {uptime.hours}h {uptime.minutes}m {uptime.seconds}s
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
