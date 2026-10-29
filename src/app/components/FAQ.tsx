"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Card from "./common/Card";
import SectionHeading from "./common/SectionHeading";
import FadeInView from "./common/FadeInView";

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
    <div className="pb-16">
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about working with me"
      />

      <div className="space-y-3 md:space-y-4 px-4 md:px-0">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-question-${index}`;
          const panelId = `faq-answer-${index}`;

          return (
            <FadeInView key={index} delay={index * 0.1}>
              <Card hover={false} className="overflow-hidden rounded-xl md:rounded-2xl">
                <h3>
                  <button
                    id={buttonId}
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between p-4 md:p-6 text-left transition hover:bg-white/5"
                    suppressHydrationWarning
                  >
                    {/* Indent with padding rather than translate so the text never runs under the icon */}
                    <span
                      className={`pr-3 md:pr-4 text-base md:text-xl font-semibold transition-[color,padding] duration-300 ease-out ${
                        isOpen ? "text-[#ff5b1a] pl-5" : "text-white pl-0"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span className="flex-shrink-0" aria-hidden="true">
                      {isOpen ? (
                        <Minus className="h-4 w-4 md:h-5 md:w-5 text-[#ff5b1a]" />
                      ) : (
                        <Plus className="h-4 w-4 md:h-5 md:w-5 text-white/70" />
                      )}
                    </span>
                  </button>
                </h3>

                {/* Animating grid rows from 0fr to 1fr fits any answer length, unlike a fixed max-height */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-white/10 px-4 pb-4 pt-3 md:px-6 md:pb-6 md:pt-4">
                      <p className="text-xs md:text-base text-white/70">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeInView>
          );
        })}
      </div>
    </div>
  );
}