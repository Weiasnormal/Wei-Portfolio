'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  CircleHelp,
  Handshake,
  House,
  Mail,
  Menu,
  UserRound,
  UserRoundCog,
  X,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const iconClass = "h-4 w-4";

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/app#home",
    icon: House,
  },
  {
    label: "Works",
    href: "/app#works",
    icon: Briefcase,
  },
  {
    label: "Services",
    href: "/app#services",
    icon: Handshake,
  },
  {
    label: "About",
    href: "/app#about",
    icon: UserRound,
  },
  {
    label: "Experience",
    href: "/app#experience",
    icon: UserRoundCog,
  },
  {
    label: "FAQ",
    href: "/app#faq",
    icon: CircleHelp,
  },
  {
    label: "Contact",
    href: "/app#contact",
    icon: Mail,
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
                  <item.icon className={iconClass} aria-hidden="true" />
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
                  <item.icon className={iconClass} aria-hidden="true" />
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
          {isOpen ? <X className={iconClass} aria-hidden="true" /> : <Menu className={iconClass} aria-hidden="true" />}
        </motion.button>
      </div>
    </>
  );
}
