"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, Star, Bot, Cpu, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PixelCard from "@/components/animation/PlexCard";

const AutomationPage = () => {
  const services = [
    {
      title: "AI Chatbots",
      description: "Intelligent conversational agents that provide 24/7 customer support and personalized user engagements.",
      icon: "https://i.postimg.cc/J0ys5pSR/aichatbot.webp",
    },
    {
      title: "Workflow Automation",
      description: "Seamlessly integrate AI into your daily operations to automate repetitive tasks and boost productivity.",
      icon: "https://i.postimg.cc/x8WcxKS2/workflow.webp",
    },
    {
      title: "Smart Analytics",
      description: "Leverage machine learning to extract deep insights and predictive patterns from your complex datasets.",
      icon: "https://i.postimg.cc/mk0tXQGG/analytics.webp",
    },
    {
      title: "Custom AI Agents",
      description: "Bespoke AI solutions designed to tackle your industry-specific challenges with autonomous capabilities.",
      icon: "https://i.postimg.cc/Y2ygLWTH/agent.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#070707] to-[#0f172a] text-white selection:bg-orange-500/30 relative overflow-hidden">
      {/* Background overlay */}
      <div className="fixed inset-0 z-2 pointer-events-none flex items-center justify-center w-full h-full">
        <Image
          src="/gradient.png"
          alt="gradient background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-10"
          priority
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        {/* Header Section */}
        <section className="container mx-auto px-6 mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300">
              <Star className="w-3" />
              AI Automation Excellence
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading tracking-wide text-zinc-200">
              Intelligent Automation for Modern Enterprise
            </h1>
            <p className="xl:w-1/2 md:w-2/3 w-full text-md tracking-wide text-gray-400 text-center flex mx-auto leading-relaxed">
              Supercharge your business efficiency with cutting-edge AI solutions. We design and deploy intelligent systems that learn, adapt, and scale with your organization.
            </p>
            
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#D9D9D9] to-[#737373] hover:from-[#e5e5e5] hover:to-[#8a8a8a] text-black font-semibold rounded-full px-8">
                  Get Started with AI
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Services Grid with PixelCard effect */}
        <section className="py-14 container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What we automate</h2>
              <p className="text-zinc-500 text-lg">
                Driving operational excellence through tailored AI-driven automation.
              </p>
            </div>
            <Link href="/#services" className="flex items-center gap-2 text-orange-400 font-medium cursor-pointer hover:text-orange-300 transition-colors">
              Explore all services <Rocket className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const variants: ("blue" | "default" | "yellow" | "pink")[] = ["blue", "pink", "yellow", "default"];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <PixelCard
                    variant={variants[index % variants.length]}
                    className="w-full cursor-pointer hover:border-zinc-200/20 bg-zinc-900/30 font-primary">
                    <div className="absolute inset-0 justify-between p-10 bg-zinc-800/20 flex flex-col gap-5">
                      <div>
                        <Image
                          className="md:w-24 md:h-24 w-16 h-16 mb-4 filter brightness-110"
                          height={100}
                          width={100}
                          src={service.icon}
                          alt={service.title}
                          loading="lazy"
                        />
                        <h3 className="text-2xl text-white font-semibold">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </PixelCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-zinc-900/10 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our AI Implementation Process</h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Strategy & Assessment",
                    desc: "Identifying high-impact automation opportunities within your existing workflows.",
                    icon: <CheckCircle2 className="w-6 h-6 text-orange-500" />
                  },
                  {
                    title: "Model Development",
                    desc: "Building and fine-tuning AI models specialized for your business data and goals.",
                    icon: <Bot className="w-6 h-6 text-orange-500" />
                  },
                  {
                    title: "Seamless Integration",
                    desc: "Connecting AI components with your current systems for a frictionless transition.",
                    icon: <Zap className="w-6 h-6 text-orange-500" />
                  },
                  {
                    title: "Ongoing Optimization",
                    desc: "Continuous monitoring and retraining to ensure peak performance and accuracy.",
                    icon: <Cpu className="w-6 h-6 text-orange-500" />
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-zinc-100">{item.title}</h4>
                      <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/services/automation.png"
                alt="AI Automation Process"
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AutomationPage;
