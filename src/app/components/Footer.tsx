"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, Calendar, Youtube } from "lucide-react";

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
    href: "https://linkedin.com/in/wincel-crusit-284364305",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/WincelCrusit",
    icon: <Facebook className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/wnclasusual_",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@wnclasusual",
    icon: <Youtube className="h-5 w-5" />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@wiwotech",
    icon: <Image src="/tiktok.svg" alt="TikTok" width={20} height={20} className="h-5 w-5" />,
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
            className="text-center md:text-left"
          >
            <h3 className="mb-2 text-2xl font-bold text-white">Lets Work Together</h3>
            <p className="text-white/70">Ready to start your next project?</p>
          </motion.div>

          <motion.a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => console.log('hover started!')}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 rounded-full bg-[#ff5b1a] px-8 py-4 font-semibold text-black transition hover:opacity-90"
          >
            <Calendar className="h-5 w-5" />
            Book A Meeting
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
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log('hover started!')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 md:bg-white/5 text-white/70 transition hover:border-[#ff5b1a] hover:bg-white/10 hover:text-[#ff5b1a]"
            >
              {social.icon}
            </motion.a>
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
            © {new Date().getFullYear()} Wincel Crusit. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
