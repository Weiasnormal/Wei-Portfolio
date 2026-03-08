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
    answer: "Timelines depend on the scope of the solution. Standard web or desktop projects typically take 2-3 weeks, while complex Machine Learning integrations or cross-platform mobile apps may require a more detailed phased approach.",
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes! I provide structured revision rounds to ensure the final technical architecture and UI/UX design align perfectly with your requirements, maintaining a focus on high-performance and scalable code.",
  },
  {
    question: "What tools and technologies do you use?",
    answer: "I architect scalable solutions across web, mobile, and desktop platforms using Next.js, React Native, and WinForms, powered by a robust stack including TypeScript, Python, and C#. To deliver advanced functionality, I design and deploy intelligent Machine Learning models using TensorFlow and PyTorch to transform complex data into actionable insights." ,
  },
  {
    question: "Can you work with existing technical documentation?",
    answer: "Absolutely. I can integrate with existing brand guidelines, API documentations (like PayMongo), or hardware setups like Raspberry Pi to ensure your project fits seamlessly into your current ecosystem.",
  },
  {
    question: "What is your payment structure?",
    answer: "I typically follow a 50% upfront deposit and 50% upon completion model. For larger-scale research or development projects, we can establish milestone-based payments tied to specific deliverables like model training or beta releases.",
  },
  {
    question: "Do you provide post-launch technical support?",
    answer: "Yes, I offer support to ensure long-term stability. This includes performance optimization for web apps and fine-tuning for Machine Learning models as new data becomes available to maintain high predictive accuracy.",
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
              <motion.h3 
                className={`pr-3 md:pr-4 text-base md:text-xl font-semibold transition-colors duration-300 ${
                  openIndex === index ? 'text-[#ff5b1a]' : 'text-white'
                }`}
                animate={{ 
                  x: openIndex === index ? 20 : 0 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {faq.question}
              </motion.h3>
              
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
