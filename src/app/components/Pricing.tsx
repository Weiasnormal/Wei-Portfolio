"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const pricingTiers: PricingTier[] = [
  {
    name: "Standard",
    price: "$2,500",
    period: "per project",
    description: "Perfect for small to medium projects",
    features: [
      "Custom Design Concepts",
      "3 Revision Rounds",
      "Responsive Design",
      "Basic SEO Optimization",
      "2-3 Week Delivery",
      "Email Support",
    ],
  },
  {
    name: "Premium",
    price: "$5,000",
    period: "per project",
    description: "Ideal for complex and high-impact projects",
    features: [
      "Everything in Standard",
      "Advanced Interactions",
      "Design System Creation",
      "Unlimited Revisions",
      "Priority Support",
      "1-2 Week Delivery",
      "Post-Launch Support",
      "Custom Animations",
    ],
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pb-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Pricing</h2>
        <p className="text-white/70">Choose the plan that fits your needs</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-3xl border ${
              tier.highlighted
                ? "border-[#ff5b1a]/50 bg-gradient-to-br from-white/10 to-white/5"
                : "border-white/10 bg-white/5"
            } p-8 backdrop-blur-md`}
          >
            {tier.highlighted && (
              <div className="absolute right-6 top-6 rounded-full bg-[#ff5b1a] px-3 py-1 text-xs font-semibold text-black">
                Popular
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold text-white">{tier.name}</h3>
              <p className="text-sm text-white/70">{tier.description}</p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-white/60">{tier.period}</span>
              </div>
            </div>
            
            <ul className="mb-8 space-y-3">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <Check className="h-5 w-5 flex-shrink-0 text-[#ff5b1a]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              className={`w-full rounded-full py-3 font-semibold transition ${
                tier.highlighted
                  ? "bg-[#ff5b1a] text-black hover:opacity-90"
                  : "border border-[#ff5b1a] text-[#ff5b1a] hover:bg-[#ff5b1a] hover:text-black"
              }`}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
