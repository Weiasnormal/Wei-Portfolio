"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_name: "Wincel Crusit",
        },
        publicKey
      );

      setStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again or contact me directly.",
      });
    } finally {
      setIsLoading(false);
    }
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
      <div className="grid gap-12 px-4 md:px-0 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <h2 className="mb-4 text-2xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Contact
            <br />
            For Work
          </h2>
          <p className="text-sm md:text-base text-white/70">
            Let's create something amazing together. Fill out the form and I'll get back to you
            within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {status.type && (
            <div
              className={`flex items-center gap-2 rounded-lg p-4 ${
                status.type === "success"
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              )}
              <p className="text-sm">{status.message}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-white/70">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-0 border-b-2 border-white/20 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#ff5b1a]"
              placeholder="Your Name"
              suppressHydrationWarning
            />
          </div>

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
              className="w-full border-0 border-b-2 border-white/20 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#ff5b1a]"
              placeholder="your@email.com"
              suppressHydrationWarning
            />
          </div>

          <ddisabled={isLoading}
            className="flex items-center gap-2 rounded-full bg-[#ff5b1a] px-8 py-4 font-semibold text-black transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            suppressHydrationWarning
          >
            {isLoading ? "Sending..." : "Send Message"}
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-0 border-b-2 border-white/20 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#ff5b1a]"
              placeholder="+63 000-000-0000"
              suppressHydrationWarning
            />
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
              className="w-full resize-none border-0 border-b-2 border-white/20 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition focus:border-[#ff5b1a]"
              placeholder="Tell me about your project..."
              suppressHydrationWarning
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-[#ff5b1a] px-8 py-4 font-semibold text-black transition hover:opacity-90"
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
