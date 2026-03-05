"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Mail, Calendar } from "lucide-react";

type SocialLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: "Email",
    href: "mailto:hello@example.com",
    icon: <Mail className="h-5 w-5" />,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Top section */}
        <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-2 text-2xl font-bold text-white">Let's Work Together</h3>
            <p className="text-white/70">Ready to start your next project?</p>
          </motion.div>

          <motion.a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 rounded-full bg-[#C1FF72] px-8 py-4 font-semibold text-black transition hover:opacity-90"
          >
            <Calendar className="h-5 w-5" />
            Book A Call
          </motion.a>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-center gap-6"
        >
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C1FF72] hover:bg-white/10 hover:text-[#C1FF72]"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 text-center"
        >
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Jayden Jones. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
