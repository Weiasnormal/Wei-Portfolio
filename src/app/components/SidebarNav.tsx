'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const iconClass = "h-4 w-4";

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/app#home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.8V21h14V9.8" />
      </svg>
    ),
  },
  {
    label: "Works",
    href: "/app#works",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    label: "Services",
    href: "/app#services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
        <path d="M3 6h18" />
        <path d="M5 12h14" />
        <path d="M7 18h10" />
      </svg>
    ),
  },
  {
    label: "About",
    href: "/app#about",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
  {
    label: "Experience",
    href: "/app#experience",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
  {
    label: "FAQ",
    href: "/app#faq",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "/app#contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed right-15 top-1/2 z-50 -translate-y-1/2 rounded-3xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md hidden md:block">
        <nav aria-label="Sidebar navigation">
          <ul className="flex flex-col items-center gap-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <motion.a
                  href={item.href}
                  aria-label={item.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-[#ff5b1a]"
                >
                  <span className="pointer-events-none absolute right-full mr-2 rounded-md border border-white/10 bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                    {item.label}
                  </span>
                  {item.icon}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Nav — single oval pill containing nav items + toggle button */}
      <div className="md:hidden fixed right-6 bottom-6 z-50 flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-md gap-2">
        {/* Nav items — animate height/opacity in/out */}
        <motion.nav
          aria-label="Mobile navigation"
          initial={false}
          animate={isOpen ? { opacity: 1, height: "auto", marginBottom: 4 } : { opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <ul className="flex flex-col items-center gap-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <motion.a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-[#ff5b1a]"
                  aria-label={item.label}
                >
                  <span className="pointer-events-none absolute right-full mr-2 rounded-md border border-white/10 bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                    {item.label}
                  </span>
                  {item.icon}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Toggle button — always visible at the bottom of the pill */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center h-9 w-9 rounded-full text-white/75 transition hover:bg-white/10 hover:text-[#ff5b1a]"
          aria-label="Toggle navigation menu"
          suppressHydrationWarning
        >
          <span className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
        </motion.button>
      </div>
    </>
  );
}
