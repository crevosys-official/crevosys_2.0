"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Megaphone, Search, Share2, BarChart, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PixelCard from "@/components/animation/PlexCard";

const MarketingPage = () => {
  const services = [
    {
      title: "Social Media Marketing",
      description: "Building strong brand presence and engaging communities across all major social platforms.",
      icon: "/card_icons/Marketing.png",
    },
    {
      title: "SEO Optimization",
      description: "Driving organic traffic and improving search engine rankings through data-driven strategies.",
      icon: "/card_icons/Technology.png",
    },
    {
      title: "Content Strategy",
      description: "Creating compelling narratives and valuable content that resonates with your target audience.",
      icon: "/card_icons/Design.png",
    },
    {
      title: "Paid Advertising",
      description: "Maximizing ROI with precision-targeted PPC campaigns across Google, Meta, and more.",
      icon: "/card_icons/automation.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#070707] to-[#1a1a2e] text-white selection:bg-orange-500/30 relative overflow-hidden">
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
              Marketing Excellence
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading tracking-wide text-zinc-200">
              Elevate Your Brand with Digital Alchemy
            </h1>
            <p className="xl:w-1/2 md:w-2/3 w-full text-md tracking-wide text-gray-400 text-center flex mx-auto leading-relaxed">
              We combine data-driven insights with creative storytelling to build legendary brands. Our marketing strategies are designed to capture attention and convert it into lasting loyalty.
            </p>
            
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#D9D9D9] to-[#737373] hover:from-[#e5e5e5] hover:to-[#8a8a8a] text-black font-semibold rounded-full px-8">
                  Start Your Growth Journey
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Services Grid with PixelCard effect */}
        <section className="py-14 container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Expertises</h2>
              <p className="text-zinc-500 text-lg">
                Strategic marketing solutions to amplify your digital presence.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Marketing Workflow</h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Market Analysis",
                    desc: "In-depth research into your industry, competitors, and target audience behavior.",
                    icon: <Search className="w-6 h-6 text-orange-500" />
                  },
                  {
                    title: "Strategic Campaigning",
                    desc: "Crafting multi-channel strategies that align with your business objectives.",
                    icon: <Megaphone className="w-6 h-6 text-orange-500" />
                  },
                  {
                    title: "Creative Content",
                    desc: "Producing high-impact visuals and copy that drive engagement.",
                    icon: <Share2 className="w-6 h-6 text-orange-500" />
                  },
                  {
                    title: "Performance Tracking",
                    desc: "Iterative optimization based on real-time data and conversion metrics.",
                    icon: <BarChart className="w-6 h-6 text-orange-500" />
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
                src="/services/crevosysmarketing.png"
                alt="Marketing Process"
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-purple-600/5 mix-blend-overlay"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MarketingPage;
