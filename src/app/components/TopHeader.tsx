'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const TopHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show only at the top; once scrolled down, keep it hidden.
      setIsVisible(currentScrollY <= 8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/WwhiteLogo.svg"
              alt="Wincel Logo"
              width={40}
              height={40}
              className="w-full h-full"
            />
          </div>
          <div className="ml-2 flex items-center gap-2 px-3 py-1 rounded-full border border-[#C1FF72]/30 bg-black/50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C1FF72] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C1FF72]" />
            </span>
            <span className="text-xs text-gray-300">Available for 3 projects</span>
          </div>
        </div>

        {/* Location */}
        <div className="text-right">
          <p className="text-sm text-gray-300">Quezon, Philippines</p>
          <p className="text-xs text-gray-500">PH</p>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
