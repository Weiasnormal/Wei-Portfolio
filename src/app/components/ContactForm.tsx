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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Hey, I'd love to know your name! ";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Don't forget your email so I can reach you!";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please include @ in your email address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Your phone number would be great!";
      isValid = false;
    } else if (formData.phone.trim().toUpperCase() !== "N/A") {
      const cleanPhone = formData.phone.replace(/[\s\-]/g, '');
      const phoneRegex = /^(\+639|09|9)\d{9}$/;
      
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phone = "Please enter a valid 11-digit PH number (09xxxxxxxxx) or type N/A ";
        isValid = false;
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Tell me about your project! I'm all ears";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

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
      setErrors({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({
        type: "error",
        message: "Oops! Something went wrong. Please try again or reach out to me directly.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    if (name === "phone" && value.trim().toUpperCase() !== "N/A") {
      // Remove all non-digit characters except for leading +
      const cleanValue = value.replace(/[^\d+]/g, '');
      
      if (/^0?9\d{0,9}$/.test(cleanValue)) {
        const digits = cleanValue.replace(/^0/, ''); 
        processedValue = `+63${digits}`;
      } else if (cleanValue.startsWith('+63')) {
        processedValue = cleanValue;
      } else if (value.trim() === '') {
        processedValue = '';
      } else {
        processedValue = value; 
      }
    }
    
    setFormData({
      ...formData,
      [name]: processedValue,
    });
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
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
          noValidate
          className="space-y-8"
        >
          {status.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-3 rounded-xl p-4 backdrop-blur-sm border ${
                status.type === "success"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{status.message}</p>
            </motion.div>
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
              className={`w-full border-0 border-b-2 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition ${
                errors.name ? "border-[#ff5b1a]" : "border-white/20 focus:border-[#ff5b1a]"
              }`}
              placeholder="Your Name"
              suppressHydrationWarning
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-[#ff5b1a] flex items-center gap-1"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-[#ff5b1a]"></span>
                {errors.name}
              </motion.p>
            )}
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
              className={`w-full border-0 border-b-2 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition ${
                errors.email ? "border-[#ff5b1a]" : "border-white/20 focus:border-[#ff5b1a]"
              }`}
              placeholder="your@email.com"
              suppressHydrationWarning
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-[#ff5b1a] flex items-center gap-1"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-[#ff5b1a]"></span>
                {errors.email}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm text-white/70">
              Phone (PH Number or N/A)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border-0 border-b-2 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition ${
                errors.phone ? "border-[#ff5b1a]" : "border-white/20 focus:border-[#ff5b1a]"
              }`}
              placeholder="09xxxxxxxxx or N/A"
              suppressHydrationWarning
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-[#ff5b1a] flex items-center gap-1"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-[#ff5b1a]"></span>
                {errors.phone}
              </motion.p>
            )}
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
              rows={4}
              className={`w-full resize-none border-0 border-b-2 bg-transparent px-0 py-3 text-white placeholder-white/40 outline-none transition ${
                errors.message ? "border-[#ff5b1a]" : "border-white/20 focus:border-[#ff5b1a]"
              }`}
              placeholder="Tell me about your project..."
              suppressHydrationWarning
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-[#ff5b1a] flex items-center gap-1"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-[#ff5b1a]"></span>
                {errors.message}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => console.log('hover started!')}
            className="flex items-center gap-2 rounded-full bg-[#ff5b1a] px-8 py-4 font-semibold text-black transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            suppressHydrationWarning
          >
            {isLoading ? "Sending..." : "Send Message"}
            <Send className="h-4 w-4" />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
