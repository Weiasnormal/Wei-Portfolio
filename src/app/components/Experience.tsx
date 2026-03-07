"use client";

import { motion } from "framer-motion";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
};

const experiences: ExperienceItem[] = [
  {
    role: "Product Designer",
    company: "Framer",
    period: "2024 - Present",
    description: "Leading design systems and product development for web-based design tools.",
  },
  {
    role: "UI/UX Designer",
    company: "Slack",
    period: "2022 - 2024",
    description: "Designed intuitive interfaces for team collaboration and communication features.",
  },
  {
    role: "Visual Designer",
    company: "Figma",
    period: "2020 - 2022",
    description: "Created design components and maintained consistency across the platform.",
  },
  {
    role: "Junior Designer",
    company: "Adobe",
    period: "2019 - 2020",
    description: "Assisted in designing user experiences for creative cloud applications.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="pb-16">
      <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">Experience</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#ff5b1a] via-white/20 to-transparent md:left-8" />
        
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-4px] top-2 h-3 w-3 rounded-full border-2 border-[#ff5b1a] bg-black md:left-[28px]" />
              
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{experience.role}</h3>
                  <p className="text-lg text-[#ff5b1a]">{experience.company}</p>
                  <p className="mt-2 text-white/70">{experience.description}</p>
                </div>
                
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/80 md:ml-4">
                  {experience.period}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
