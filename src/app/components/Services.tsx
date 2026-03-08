"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Service = {
  number: string;
  title: string;
  deliverables: string[];
};

const services: Service[] = [
  {
    number: "01",
    title: "Brand Design",
    deliverables: [
      "Logo & Visual Identity",
      "Brand Guidelines",
      "Marketing Collateral",
      "Typography & Color Systems",
    ],
  },
  {
    number: "02",
    title: "UI/UX Design",
    deliverables: [
      "User Research & Analysis",
      "Wireframes & Prototypes",
      "Interface Design",
      "Usability Testing",
    ],
  },
  {
    number: "03",
    title: "Frontend Development",
    deliverables: [
      "Next.js & React Architecture",
      "Tailwind CSS Implementation",
      "High-Performance Optimization",
      "Scalable & Responsive Codebases",
    ],
  },
  {
    number: "04",
    title: "Mobile App Development",
    deliverables: [
      "React Native & Expo",
      "Cross-Platform Solutions",
      "Smooth Animations & Transitions",
      "Offline-First Design",
    ],
  },
  {
    number: "05",
    title: "Machine Learning",
    deliverables: [
      "Predictive Modeling & Forecasting",
      "Scalable ML Pipelines",
      "AI-Powered Decision Support",
    ],
  },
  {
    number: "06",
    title: "Desktop Development",
    deliverables: [
      "C# & WinForms Applications",
      "Java Desktop Solutions",
      "Offline-First Architecture",
      "Legacy System Integration",
    ],
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="services" className="pb-16">
      <h2 className="mb-12 text-center md:text-left text-2xl font-bold text-white md:text-4xl">Services</h2>
      
      <div className="space-y-4 px-4 md:px-0">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 md:bg-white/5"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="flex w-full items-center justify-between p-6 text-left transition hover:bg-white/5"
              suppressHydrationWarning
            >
              <motion.div 
                className="flex items-center gap-4"
                animate={{ 
                  x: openIndex === index ? 20 : 0 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <span className="text-2xl font-bold text-[#ff5b1a] md:text-3xl">
                  {service.number}
                </span>
                <h3 className="text-lg font-semibold text-white md:text-2xl">
                  {service.title}
                </h3>
              </motion.div>
              
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-6 w-6 text-white/70" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 px-6 pb-6 pt-4">
                    <motion.ul 
                      className="space-y-2"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.1
                          }
                        }
                      }}
                    >
                      {service.deliverables.map((deliverable, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-3 text-xs md:text-base text-white/80"
                          variants={{
                            hidden: { opacity: 0, y: -10 },
                            visible: { 
                              opacity: 1, 
                              y: 0,
                              transition: {
                                duration: 0.3,
                                ease: "easeOut"
                              }
                            }
                          }}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff5b1a]" />
                          {deliverable}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
