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
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo and Name */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <Image
              src="/WwhiteLogo.svg"
              alt="Wincel Logo"
              width={56}
              height={56}
              className="w-full h-full"
            />
          </div>
          <div className="ml-2 flex items-center gap-2 px-5 py-2 rounded-full border border-[#C1FF72]/30 bg-black/50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C1FF72] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C1FF72]" />
            </span>
            <span className="text-base text-gray-300">Available for 3 projects</span>
          </div>
        </div>

        {/* Location */}
        <div className="text-right">
          <p className="text-base text-gray-300">Quezon, Philippines</p>
          <p className="text-sm text-gray-500">PH</p>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
