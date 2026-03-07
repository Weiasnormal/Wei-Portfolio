"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary depending on complexity. Standard projects typically take 2-3 weeks, while premium projects can be completed in 1-2 weeks with priority support. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes! Standard packages include 3 revision rounds, while Premium packages offer unlimited revisions. We work closely with you to ensure the final product exceeds your expectations.",
  },
  {
    question: "What tools and technologies do you use?",
    answer: "I primarily work with Figma for design, and develop using React, Next.js, and Framer Motion for animations. I also use Tailwind CSS for styling and ensure all projects are responsive and optimized for performance.",
  },
  {
    question: "Can you work with existing brand guidelines?",
    answer: "Absolutely! I can work within your existing brand guidelines to ensure consistency across all touchpoints. If you don't have guidelines yet, I can help create a comprehensive design system for your brand.",
  },
  {
    question: "What is your payment structure?",
    answer: "I typically require a 50% deposit upfront to begin work, with the remaining 50% due upon project completion. For larger projects, we can discuss milestone-based payments that work for both parties.",
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Premium packages include post-launch support. For Standard packages, ongoing support and maintenance can be arranged separately. I'm committed to ensuring your project's long-term success.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="pb-16">
      <div className="mb-12 text-center md:text-left">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-sm md:text-base text-white/70">Everything you need to know about working with me</p>
      </div>
      
      <div className="space-y-3 md:space-y-4 px-4 md:px-0">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-black/40 md:bg-white/5"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between p-4 md:p-6 text-left transition hover:bg-white/5"
              suppressHydrationWarning
            >
              <h3 className="pr-3 md:pr-4 text-base md:text-xl font-semibold text-white">{faq.question}</h3>
              
              <div className="flex-shrink-0">
                {openIndex === index ? (
                  <Minus className="h-4 w-4 md:h-5 md:w-5 text-[#ff5b1a]" />
                ) : (
                  <Plus className="h-4 w-4 md:h-5 md:w-5 text-white/70" />
                )}
              </div>
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
                  <div className="border-t border-white/10 px-4 pb-4 pt-3 md:px-6 md:pb-6 md:pt-4">
                    <p className="text-xs md:text-base text-white/70">{faq.answer}</p>
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
