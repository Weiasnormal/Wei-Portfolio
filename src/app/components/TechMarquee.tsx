"use client";

import { motion } from "framer-motion";

type TechItem = {
  name: string;
  icon: React.ReactNode;
};

const techStack: TechItem[] = [
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 38 57" fill="currentColor" className="h-8 w-8">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#F24E1E" />
        <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: "Slack",
    icon: (
      <svg viewBox="0 0 127 127" fill="currentColor" className="h-8 w-8">
        <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A" />
        <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0" />
        <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D" />
        <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E" />
      </svg>
    ),
  },
  {
    name: "Framer",
    icon: (
      <svg viewBox="0 0 20 30" fill="currentColor" className="h-8 w-8">
        <path d="M0 0h20v10H10L0 0zm0 10h10l10 10H10v10L0 20V10z" fill="#0099FF" />
      </svg>
    ),
  },
  {
    name: "Loom",
    icon: (
      <svg viewBox="0 0 80 80" fill="currentColor" className="h-8 w-8">
        <circle cx="40" cy="40" r="40" fill="#625DF5" />
        <path d="M56.667 40c0 9.205-7.462 16.667-16.667 16.667S23.333 49.205 23.333 40 30.795 23.333 40 23.333 56.667 30.795 56.667 40z" fill="#fff" />
        <circle cx="40" cy="40" r="8.333" fill="#625DF5" />
      </svg>
    ),
  },
  {
    name: "Notion",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="h-8 w-8">
        <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="#fff" />
        <path d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.33 -0.97 -2.913 -3.883 -5.053L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 0.483 -1.837l55.333 -4.087c5.247 -0.353 6.433 -0.433 9.417 1.99l8.04 6.057c0.77 0.78 0.383 1.753 -0.483 1.837L25.92 19.523z" fill="#000" />
      </svg>
    ),
  },
];

export default function TechMarquee() {
  // Duplicate the array to create seamless loop
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <div className="overflow-hidden py-12">
      <h3 className="mb-8 text-center text-2xl font-bold text-white/80">Tech Stack</h3>
      
      <div className="relative">
        <motion.div
          className="flex gap-16"
          animate={{
            x: [0, -50 * techStack.length * 16], // -50% of total width
          }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedTech.map((tech, index) => (
            <div
              key={index}
              className="flex flex-shrink-0 items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-sm"
            >
              <div className="text-white/80">{tech.icon}</div>
              <span className="text-lg font-medium text-white">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
