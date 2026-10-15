"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GetTouch from "@/components/sections/GetTouch";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Layers, Code2, ShieldCheck, Rocket, MoveRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import PixelCard from "@/components/animation/PlexCard";

const DevelopmentPage = () => {
  const services = [
    {
      title: "Web App Development",
      description:
        "Building scalable, high-performance web applications using modern frameworks like Next.js and React.",
      icon: "https://i.postimg.cc/43pQXvG5/appdevelop.png",
    },
    {
      title: "Custom Software",
      description:
        "Tailored software designed to solve your specific business challenges and streamline operations.",
      icon: "https://i.postimg.cc/jjy4R6T9/software.webp",
    },
    {
      title: "E-commerce Solutions",
      description:
        "Feature-rich online stores with secure payment gateways and seamless user experiences.",
      icon: "https://i.postimg.cc/Pq1QdbH7/ecom.webp",
    },
    {
      title: "API & Cloud",
      description:
        "Connecting your systems and building robust APIs for seamless data flow and functionality.",
      icon: "https://i.postimg.cc/Dw9cVj9P/api-2.png",
    },
  ];

  const processSteps = [
    {
      title: "Discovery & Planning",
      desc: "We dive deep into your requirements and business goals to create a comprehensive roadmap.",
      icon: <Layers className="w-5 h-5 text-orange-500" />,
    },
    {
      title: "Agile Execution",
      desc: "Sprints-based development with regular updates, ensuring transparency and flexibility.",
      icon: <Code2 className="w-5 h-5 text-orange-500" />,
    },
    {
      title: "Rigorous Testing",
      desc: "Complete QA and performance optimization to ensure a bug-free, high-speed experience.",
      icon: <ShieldCheck className="w-5 h-5 text-orange-500" />,
    },
    {
      title: "Scalable Deployment",
      desc: "Cloud-native deployment strategies that grow with your user base.",
      icon: <Rocket className="w-5 h-5 text-orange-500" />,
    },
  ];

  const cardVariants: ("blue" | "pink" | "yellow" | "default")[] = [
    "blue",
    "pink",
    "yellow",
    "default",
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-orange-500/30 relative overflow-hidden font-primary">
      {/* Background overlay matched with landing page */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center w-full h-full">
        <Image
          src="/gradient.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="opacity-10"
          priority
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-32 pb-12">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-zinc-600" />
            <Link
              href="/#services"
              className="hover:text-white transition-colors"
            >
              Services
            </Link>
            <ChevronRight size={13} className="text-zinc-600" />
            <span className="text-zinc-200 font-medium">Development</span>
          </nav>
        </div>

        {/* ─── Hero Section ─── */}
        <section className="container mx-auto px-4 sm:px-6 mb-16 sm:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* Section Badge */}
            <div className="border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 text-sm">
              <Star className="w-3 h-3 text-zinc-300" />
              <span>Development</span>
            </div>

            {/* Title with decorative landing page curve line */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading tracking-wide text-center text-zinc-200 px-4 leading-[1.18]">
              Innovative Solutions for{" "}
              <span className="relative inline-block">
                <span>Digital Growth</span>
                <Image
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full -rotate-1 pointer-events-none"
                  src="/curve.webp"
                  alt=""
                  height={56}
                  width={1248}
                  priority
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="xl:w-1/2 md:w-2/3 w-full text-base sm:text-lg tracking-wide text-gray-400 text-center mx-auto px-4 leading-relaxed md:leading-8 block">
              We leverage the latest technologies to build software that is not just functional, but also a joy to use. From concept to deployment, we craft robust, scalable solutions tailored to your needs.
            </p>

            {/* Landing page style CTA Button */}
            <div className="flex justify-center gap-4 mt-2 sm:mt-4">
              <Link href="/contact" className="focus:outline-none">
                <button className="group relative px-7 sm:px-8 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-[#ff7520] via-[#f75200] to-[#cb3c00] shadow-[0_0_26px_rgba(247,82,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_36px_rgba(247,82,0,0.8)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 border border-orange-400/40 cursor-pointer overflow-hidden">
                  <span className="relative z-10">Book your appointment</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ─── Services Grid ("What We Provide") ─── */}
        <section className="py-14 sm:py-20 relative overflow-hidden">
          {/* Subtle background from landing page Services */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-30 pointer-events-none"
            style={{ backgroundImage: "url('/elements/servicebg.png')" }}
          />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Centered section header matching landing page */}
            <div className="flex flex-col gap-4 mb-12 sm:mb-16 text-center">
              <div className="border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 text-sm">
                <Star className="w-3 h-3 text-zinc-300" />
                <span>What We Provide</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading tracking-wide text-center text-zinc-200 px-4 leading-[1.18]">
                Engineered for Scale &amp; Performance
              </h2>
              <p className="xl:w-1/2 md:w-2/3 w-full text-base sm:text-lg tracking-wide text-gray-400 text-center mx-auto px-4 leading-relaxed">
                Comprehensive development services tailored to boost your website&apos;s performance, user experience, and growth.
              </p>
            </div>

            {/* Grid with PixelCard effect */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const variant = cardVariants[index % cardVariants.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="w-full"
                  >
                    <PixelCard
                      variant={variant}
                      className="w-full cursor-pointer hover:border-zinc-200/20 bg-zinc-900/30 font-primary min-h-[360px]"
                    >
                      <div className="absolute inset-0 justify-between p-8 xl:p-10 bg-zinc-800/20 flex flex-col gap-5">
                        <div>
                          <div className="relative md:w-28 md:h-28 w-20 h-20 mb-3 flex items-center justify-start">
                            <Image
                              className="object-contain filter drop-shadow-md"
                              fill
                              sizes="(max-width: 768px) 80px, 112px"
                              src={service.icon}
                              alt={service.title}
                              loading="lazy"
                            />
                          </div>
                          <h3 className="text-2xl text-white font-semibold leading-snug">
                            {service.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        <p className="flex gap-3 text-white hover:text-orange-400 items-center text-sm font-medium mt-auto pt-2 transition-colors">
                          Service Plan
                          <span className="text-orange-500">
                            <MoveRight size={18} />
                          </span>
                        </p>
                      </div>
                    </PixelCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Decorative light image matched with landing page Services */}
          <Image
            className="absolute md:w-36 w-20 right-0 bottom-0 pointer-events-none"
            height={100}
            width={100}
            src="/card_icons/Light-image.png"
            alt=""
          />
        </section>

        {/* ─── Process Section ─── */}
        <section className="py-20 sm:py-24 relative border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Centered Section Header matched with landing page */}
            <div className="flex flex-col gap-4 mb-14 sm:mb-16 text-center">
              <div className="border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 text-sm">
                <Star className="w-3 h-3 text-zinc-300" />
                <span>Process</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading tracking-wide text-center text-zinc-200 px-4 leading-[1.18]">
                Our Development Process
              </h2>
              <p className="xl:w-1/2 md:w-2/3 w-full text-base sm:text-lg tracking-wide text-gray-400 text-center mx-auto px-4 leading-relaxed">
                A disciplined, transparent engineering methodology from initial concept to high-speed deployment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                {processSteps.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-5 items-start p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/15 transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-zinc-100 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative aspect-square md:aspect-auto md:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/services/crevosysdev.webp"
                  alt="Development Process"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Get in Touch Section Matched with Landing Page ─── */}
        <div className="md:px-16 xl:px-20 px-5 mt-6 sm:mt-10">
          <GetTouch />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DevelopmentPage;
