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
    title: "Development",
    deliverables: [
      "Front-end Development",
      "Responsive Web Design",
      "Interactive Animations",
      "Performance Optimization",
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
      <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">Services</h2>
      
      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="flex w-full items-center justify-between p-6 text-left transition hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-[#C1FF72] md:text-3xl">
                  {service.number}
                </span>
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {service.title}
                </h3>
              </div>
              
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
                    <ul className="space-y-2">
                      {service.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C1FF72]" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
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
