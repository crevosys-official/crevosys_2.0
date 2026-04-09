"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses starting their digital journey.",
    price: "$999",
    features: [
      "Custom Website Design",
      "Mobile Responsive",
      "Basic SEO Setup",
      "1 Month Free Support",
      "3 Revisions",
    ],
    notIncluded: ["Advanced Animations", "E-commerce Integration", "Custom Backend"],
    popular: false,
    buttonText: "Get Started",
  },
  {
    name: "Professional",
    description: "Ideal for growing companies needing advanced features.",
    price: "$2,499",
    features: [
      "Everything in Starter",
      "Premium Animations (GSAP/Framer)",
      "CMS Integration",
      "Advanced SEO Optimization",
      "3 Months Free Support",
      "Unlimited Revisions",
    ],
    notIncluded: ["Complex Custom Backend"],
    popular: true,
    buttonText: "Choose Professional",
  },
  {
    name: "Enterprise",
    description: "Full-scale solution for large enterprises and platforms.",
    price: "Custom",
    features: [
      "Everything in Professional",
      "Custom Web Architecture",
      "Complex Backend & API",
      "E-commerce Orchestration",
      "24/7 Dedicated Support",
      "Performance Benchmarking",
    ],
    notIncluded: [],
    popular: false,
    buttonText: "Contact Us",
  },
];

interface PricingProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onCursorEnter, onCursorLeave }) => {
  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4"
          >
            Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Choose the perfect plan for your business needs. No hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onMouseEnter={onCursorEnter}
              onMouseLeave={onCursorLeave}
              className={`relative rounded-3xl p-8 backdrop-blur-sm border ${
                plan.popular
                  ? "bg-white/10 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                  : "bg-white/5 border-white/10"
              } hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-500/30">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-gray-400">/project</span>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <Check className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-500 line-through">
                    <X className="w-5 h-5 text-gray-600 mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
