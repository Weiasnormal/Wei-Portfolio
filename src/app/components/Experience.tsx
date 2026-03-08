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
    role: "Lead Researcher & ML Developer",
    company: "Academic Research Group",
    period: "2025 - Present",
    description: "Engineering intelligent predictive architectures that transform raw data into actionable solutions.",
  },
  {
    role: "Mobile App Developer",
    company: "Portfolio & Mobile App Projects",
    period: "2025 - Present",
    description: "Developing cross-platform mobile solutions using React Native and Expo with a focus on fluid animations.",
  },
  {
    role: "Frontend Developer",
    company: "Portfolio & Web Projects",
    period: "2025 - Present",
    description: "Engineering responsive web interfaces using Next.js and Tailwind CSS for high-performance user experiences.",
  },
  {
    role: "Desktop App Developer",
    company: "Software Development Projects",
    period: "2024 - 2026",
    description: "Designing robust Windows-based applications utilizing C#, Java, and WinForms for offline-first architecture.",
  },
  {
    role: "UI/UX Designer",
    company: "Freelance / Projects",
    period: "2023 - 2024",
    description: "Leveraging Figma and HCI principles to create intuitive digital environments grounded in user-centered mental models.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="pb-8 md:pb-16">
      <h2 className="mb-6 md:mb-12 text-center md:text-left text-2xl font-bold text-white md:text-4xl">Experience</h2>
      
      <div className="relative px-4 md:px-0">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-[#ff5b1a] via-white/20 to-transparent md:left-8" />
        
        <div className="space-y-4 md:space-y-8">
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
              <div className="absolute left-[12px] top-2 h-3 w-3 rounded-full border-2 border-[#ff5b1a] bg-black md:left-[28px]" />
              
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-base md:text-xl font-semibold text-white">{experience.role}</h3>
                  <p className="text-sm md:text-lg text-[#ff5b1a]">{experience.company}</p>
                  <p className="mt-2 text-xs md:text-base text-white/70">{experience.description}</p>
                </div>
                
                <div className="rounded-full border border-white/10 bg-black/40 md:bg-white/5 px-3 py-1 md:px-4 md:py-1 text-xs md:text-sm text-white/80 md:ml-4">
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
