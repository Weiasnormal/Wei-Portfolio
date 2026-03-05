"use client";

import { motion } from "framer-motion";
import { Users, HelpCircle, Sparkles, MessageCircle, Zap } from "lucide-react";

type AboutItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const aboutItems: AboutItem[] = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Looking to Collaborate",
    description: "Building a tech agency that serves overseas clients by creating systems and automations for their businesses.",
  },
  {
    icon: <HelpCircle className="h-6 w-6" />,
    title: "Looking for Help With",
    description: "System architecture, scalable backend design, and best practices for production-ready apps.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Currently Learning",
    description: "Software development methodologies, artificial intelligence, Scrum, public speaking mastery, and robotics.",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Ask Me About",
    description: "Technology, fitness routines, content creation, entrepreneurship, and productivity systems.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fun Fact",
    description: "I practice meta-cognition — I think about how I think to improve how I learn and build.",
  },
];

export default function About() {
  return (
    <section id="about" className="pb-16">
      <div className="mb-12">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">About Me</h2>
        <p className="text-lg text-white/70">
          A passionate developer focused on creating innovative solutions and continuous learning.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {aboutItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            <div className="mb-4 inline-flex rounded-full bg-[#C1FF72]/10 p-3 text-[#C1FF72]">
              {item.icon}
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">{item.title}</h3>
            <p className="text-white/70">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
