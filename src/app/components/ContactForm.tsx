"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
    budget: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="pb-16">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Left side - Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <h2 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Contact
            <br />
            For Work
          </h2>
          <p className="text-lg text-white/70">
            Let's create something amazing together. Fill out the form and I'll get back to you
            within 24 hours.
          </p>
        </motion.div>

        {/* Right side - Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-white/70">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-0 border-b-2 border-white/20 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#C1FF72]"
              placeholder="your@email.com"
              suppressHydrationWarning
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm text-white/70">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-0 border-b-2 border-white/20 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#C1FF72]"
              placeholder="+1 (555) 000-0000"
              suppressHydrationWarning
            />
          </div>

          <div>
            <label htmlFor="budget" className="mb-2 block text-sm text-white/70">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full border-0 border-b-2 border-white/20 bg-transparent px-0 py-3 text-white outline-none transition focus:border-[#C1FF72]"
              suppressHydrationWarning
            >
              <option value="" disabled className="bg-black">
                Select your budget
              </option>
              <option value="1k-5k" className="bg-black">
                $1k - $5k
              </option>
              <option value="5k-10k" className="bg-black">
                $5k - $10k
              </option>
              <option value="10k-25k" className="bg-black">
                $10k - $25k
              </option>
              <option value="25k+" className="bg-black">
                $25k+
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-white/70">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full resize-none border-0 border-b-2 border-white/20 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#C1FF72]"
              placeholder="Tell me about your project..."
              suppressHydrationWarning
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-[#C1FF72] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            suppressHydrationWarning
          >
            Send Message
            <Send className="h-4 w-4" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
