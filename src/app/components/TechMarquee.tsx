"use client";

import { motion } from "framer-motion";

type TechItem = {
  name: string;
  icon: React.ReactNode;
};

const techStack: TechItem[] = [
  {
    name: "React",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(-60 12 12)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#fff" />
        <path d="M12 6v12m-6-6h12" stroke="#fff" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M13.5 16v2.5h2V16h-2zm-4.5 0v2.5h2V16h-2zm6-6v2h2v-2h-2zm-4.5 0v2h2v-2h-2z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 2C9.5 2 7.5 3.8 7.5 6v2.5h4.5v.5h-6C3.8 9 2 10.8 2 13.3v2.4C2 18.2 3.8 20 6 20h2v-2.5c0-2.5 2-4.5 4.5-4.5h4.5c1.8 0 3.5-1.7 3.5-3.5V6c0-2.2-2-4-4.5-4H12zm-1 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#3776AB" />
        <path d="M18 11.5c0-2.5-2-4.5-4.5-4.5H9C7.2 7 5.5 8.7 5.5 10.5V18c0 2.2 2 4 4.5 4h4c2.5 0 4.5-1.8 4.5-4v-2.5H14v-.5h6c2.2 0 4-1.8 4-4.3v-2.4c0-2.5-1.8-4.3-4-4.3h-2v2.5zM13 19c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.12 0-.22.1-.22.22v8.47c0 .66-.68 1.31-1.77.76L4.5 16.5a.26.26 0 0 1-.13-.21V7.71c0-.09.04-.17.13-.21l7.44-4.29c.08-.05.19-.05.27 0l7.44 4.29c.08.04.13.12.13.21v8.58c0 .08-.05.17-.13.21l-7.44 4.29c-.08.04-.19.04-.27 0L9.9 19.73c-.07-.04-.16-.03-.21.04-.38.31-.46.36-.87.52-.1.04-.24.1.01.25l2.01 1.19c.24.14.5.2.77.2.28 0 .54-.07.78-.2l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2z" fill="#539E43" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 2c-.5 0-.9.2-1.2.5L2.5 10.7c-.3.3-.5.7-.5 1.2v7.6c0 1 .8 1.8 1.8 1.8h16.4c1 0 1.8-.8 1.8-1.8v-7.6c0-.5-.2-.9-.5-1.2L13.2 2.5c-.3-.3-.7-.5-1.2-.5zm0 2.3l7.3 7.3v7.1H4.7v-7.1L12 4.3z" fill="#47A248" />
      </svg>
    ),
  },
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
    name: "TailwindCSS",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z" fill="#06B6D4" />
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
              className="flex flex-shrink-0 items-center gap-4 rounded-xl border border-white/10 bg-black/40 md:bg-white/5 px-8 py-4 backdrop-blur-sm"
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
