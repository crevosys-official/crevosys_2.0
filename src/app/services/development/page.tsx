"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Code2, Globe, Rocket, Terminal, Zap, MoveRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PixelCard from "@/components/animation/PlexCard";

const DevelopmentPage = () => {
  const services = [
    {
      title: "Web App Development",
      description: "Building scalable, high-performance web applications using modern frameworks like Next.js and React.",
      icon: "/card_icons/Icon.png",
    },
    {
      title: "Custom Software",
      description: "Tailored software designed to solve your specific business challenges and streamline operations.",
      icon: "/card_icons/automation.png",
    },
    {
      title: "E-commerce Solutions",
      description: "Feature-rich online stores with secure payment gateways and seamless user experiences.",
      icon: "/card_icons/Marketing.png",
    },
    {
      title: "API & Cloud",
      description: "Connecting your systems and building robust APIs for seamless data flow and functionality.",
      icon: "/card_icons/Design.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#070707] to-[#221f35] text-white selection:bg-blue-500/30 relative overflow-hidden">
      {/* Background overlay from main page */}
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
              Development Excellence
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading tracking-wide text-zinc-200">
              Innovative Solutions for Digital Growth
            </h1>
            <p className="xl:w-1/2 md:w-2/3 w-full text-md tracking-wide text-gray-400 text-center flex mx-auto leading-relaxed">
              We leverage the latest technologies to build software that is not just functional, but also a joy to use. From concept to deployment, we craft robust, scalable solutions tailored to your needs.
            </p>
            
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                  Book your appointment
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Services Grid with PixelCard effect */}
        <section className="py-14 container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What we provide</h2>
              <p className="text-zinc-500 text-lg">
                Comprehensive development services to power your business forward.
              </p>
            </div>
            <Link href="/#services" className="flex items-center gap-2 text-blue-400 font-medium cursor-pointer hover:text-blue-300 transition-colors">
              Explore all services <Rocket className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <PixelCard
                  variant="blue"
                  className="w-full cursor-pointer hover:border-zinc-200/20 bg-zinc-900/30">
                  <div className="absolute inset-0 justify-between p-10 bg-zinc-800/20 flex flex-col gap-5">
                    <div>
                      <Image
                        className="md:w-24 md:h-24 w-16 h-16 mb-4 filter brightness-110"
                        height={100}
                        width={100}
                        src={service.icon}
                        alt={service.title}
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
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-zinc-900/10 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Development Process</h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Discovery & Planning",
                    desc: "We dive deep into your requirements and business goals to create a comprehensive roadmap."
                  },
                  {
                    title: "Agile Execution",
                    desc: "Sprints-based development with regular updates, ensuring transparency and flexibility."
                  },
                  {
                    title: "Rigorous Testing",
                    desc: "Complete QA and performance optimization to ensure a bug-free, high-speed experience."
                  },
                  {
                    title: "Scalable Deployment",
                    desc: "Cloud-native deployment strategies that grow with your user base."
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
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-blue-500" />
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
                src="/services/development.png"
                alt="Development Process"
                fill
                className="object-cover"
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

export default DevelopmentPage;
