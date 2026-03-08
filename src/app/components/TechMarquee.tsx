"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type TechItem = {
  name: string;
  icon: string;
};

const techStack: TechItem[] = [
  { name: "Next.js", icon: "/Teckstack/nextjs.svg" },
  { name: "React", icon: "/Teckstack/react.svg" },
  { name: "React Native", icon: "/Teckstack/react.svg" },
  { name: "HTML", icon: "/Teckstack/html.svg" },
  { name: "Tailwind CSS", icon: "/Teckstack/css.svg" },
  { name: "Radix UI", icon: "/Teckstack/radixui.svg" },
  { name: "Lucide React", icon: "/Teckstack/lucide.svg" },
  { name: "TypeScript", icon: "/Teckstack/typscript.svg" },
  { name: "Python", icon: "/Teckstack/python.svg" },
  { name: "Java", icon: "/Teckstack/java.svg" },
  { name: "C#", icon: "/Teckstack/csharp.svg" },
  { name: "JavaScript", icon: "/Teckstack/javascript.svg" },
  { name: "PHP", icon: "/Teckstack/php.svg" },
  { name: "Dart", icon: "/Teckstack/dart.svg" },
  { name: "Framer Motion", icon: "/Teckstack/framermotion.svg" },
  { name: "Spline", icon: "/Teckstack/spline.svg" },
  { name: "TensorFlow", icon: "/Teckstack/tensorflow.svg" },
  { name: "PyTorch", icon: "/Teckstack/pytorch.svg" },
  { name: "scikit-learn", icon: "/Teckstack/scikit.svg" },
  { name: "NumPy", icon: "/Teckstack/numpy.svg" },
  { name: "Pandas", icon: "/Teckstack/pandas.svg" },
  { name: "Matplotlib", icon: "/Teckstack/matplotlib.svg" },
  { name: "Expo", icon: "/Teckstack/expo.svg" },
  { name: "Node.js", icon: "/Teckstack/nodejs.svg" },
  { name: "MySQL", icon: "/Teckstack/mysql.svg" },
  { name: "MongoDB", icon: "/Teckstack/mongodb.svg" },
  { name: "JWT", icon: "/Teckstack/jwt.svg" },
  { name: "EmailJS", icon: "/Teckstack/emailjs.svg" },
  { name: "Postman", icon: "/Teckstack/postman.svg" },
  { name: "Twilio", icon: "/Teckstack/twilio.svg" },
  { name: "Vercel", icon: "/Teckstack/vercel.svg" },
  { name: "Netlify", icon: "/Teckstack/netlify.svg" },
  { name: "Render", icon: "/Teckstack/render.svg" },
  { name: "GitHub", icon: "/Teckstack/github.svg" },
  { name: "Git", icon: "/Teckstack/git.svg" },
  { name: "ESLint", icon: "/Teckstack/eslint.svg" },
  { name: "Figma", icon: "/Teckstack/figma.svg" },
  { name: "Photoshop", icon: "/Teckstack/photoshop.svg" },
  { name: "Lightroom", icon: "/Teckstack/lightroom.svg" },
  { name: "Raspberry Pi", icon: "/Teckstack/Raspberrypi.svg" },
];

export default function TechMarquee() {
  const duplicatedTech = [...techStack, ...techStack];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const duration = isMobile ? 150 : 60; //adjust both duration and distance
  const distance = isMobile ? 50 * techStack.length * 6 : 50 * techStack.length * 10; 

  return (
    <div className="overflow-hidden pt-2 pb-60 md:pt-4 md:pb-70">
      <h2 className="mb-6 md:mb-12 text-center text-2xl font-bold text-white md:text-4xl">Tech Stack</h2>
      
      <div className="space-y-4 md:space-y-8">
        {/* First Row - Moving Left */}
        <div className="relative">
          <motion.div
            className="flex gap-8 md:gap-16"
            animate={{
              x: [0, -distance], 
            }}
            transition={{
              x: {
                duration: duration,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedTech.map((tech, index) => (
              <div
                key={index}
                className="flex flex-shrink-0 items-center gap-3 md:gap-6 rounded-xl md:rounded-2xl border border-white/10 bg-black/40 md:bg-white/5 px-6 py-3 md:px-12 md:py-6 backdrop-blur-sm"
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-8 h-8 md:w-12 md:h-12 object-contain text-white/80"
                />
                <span className="text-lg md:text-2xl font-medium text-white whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Right (Reverse) */}
        <div className="relative">
          <motion.div
            className="flex gap-8 md:gap-16"
            animate={{
              x: [-distance, 0], 
            }}
            transition={{
              x: {
                duration: duration,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedTech.map((tech, index) => (
              <div
                key={`reverse-${index}`}
                className="flex flex-shrink-0 items-center gap-3 md:gap-6 rounded-xl md:rounded-2xl border border-white/10 bg-black/40 md:bg-white/5 px-6 py-3 md:px-12 md:py-6 backdrop-blur-sm"
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-8 h-8 md:w-12 md:h-12 object-contain text-white/80"
                />
                <span className="text-lg md:text-2xl font-medium text-white whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
