"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Client = {
  name: string;
  logo: string; // We'll use text logos for simplicity
};

const clients: Client[] = [
  { name: "Google", logo: "G" },
  { name: "Microsoft", logo: "M" },
  { name: "Apple", logo: "A" },
  { name: "Amazon", logo: "Am" },
  { name: "Netflix", logo: "N" },
  { name: "Tesla", logo: "T" },
  { name: "Meta", logo: "Mt" },
  { name: "Spotify", logo: "S" },
];

export default function ClientsMarquee() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Duplicate the array to create seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="overflow-hidden py-12">
      <h3 className="mb-8 text-center text-2xl font-bold text-white/80">Trusted By</h3>
      
      <div className="relative">
        <motion.div
          className="flex gap-12"
          animate={{
            x: [0, -50 * clients.length * 12], // Adjusted for gap
          }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex h-24 w-32 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300"
              style={{
                filter: hoveredIndex === index ? "grayscale(0%)" : "grayscale(100%)",
                transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#ff5b1a] via-[#7FD1AE] to-[#4DA3FF] text-2xl font-bold text-black">
                {client.logo}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
