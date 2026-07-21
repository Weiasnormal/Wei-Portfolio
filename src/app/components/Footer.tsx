"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { socialLinks } from "../data/socialLinks";

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
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 md:bg-white/5 text-white/70 transition hover:border-[#ff5b1a] hover:bg-white/10 hover:text-[#ff5b1a]"
            >
              <span className="h-5 w-5 flex items-center justify-center">
                {social.icon === "tiktok" ? (
                  <Image src="/tiktok.svg" alt="TikTok" width={20} height={20} loading="lazy" className="h-full w-full" />
                ) : (
                  social.icon
                )}
              </span>
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