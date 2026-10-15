"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GetTouch from "@/components/sections/GetTouch";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Box, Layout, Palette, PenTool, MoveRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import PixelCard from "@/components/animation/PlexCard";

const DesignPage = () => {
  const services = [
    {
      title: "UI/UX Design",
      description:
        "Creating intuitive, user-centric interfaces that provide seamless digital experiences across all devices.",
      icon: "https://i.postimg.cc/PJybpVGT/ui-design.webp",
    },
    {
      title: "Brand Identity",
      description:
        "Developing comprehensive visual identities, including logos and brand guidelines, that tell your unique story.",
      icon: "https://i.postimg.cc/nc1SBTKd/brand-identity.png",
    },
    {
      title: "Graphic Design",
      description:
        "High-impact visual content for digital and print media that captures attention and communicates effectively.",
      icon: "https://i.postimg.cc/q7W14F0t/graphics-design.png",
    },
    {
      title: "Motion Design",
      description:
        "Bringing your brand to life with dynamic animations and transitions that enhance user interaction.",
      icon: "https://i.postimg.cc/cL49mYXJ/motion-design.webp",
    },
  ];

  const processSteps = [
    {
      title: "Research & Strategy",
      desc: "Understanding your brand, audience, and market goals to establish an empathetic, solid design foundation.",
      icon: <Box className="w-5 h-5 text-orange-500" />,
    },
    {
      title: "Wireframing & Prototyping",
      desc: "Mapping out streamlined user flows and building interactive clickable prototypes to validate concepts early.",
      icon: <Layout className="w-5 h-5 text-orange-500" />,
    },
    {
      title: "Visual Design",
      desc: "Applying purposeful aesthetics, typography, micro-interactions, and color systems to bring interfaces to life.",
      icon: <Palette className="w-5 h-5 text-orange-500" />,
    },
    {
      title: "Collaborative Handoff",
      desc: "Seamlessly delivering pixel-perfect design systems, high-fidelity assets, and documentation to engineers.",
      icon: <PenTool className="w-5 h-5 text-orange-500" />,
    },
  ];

  const cardVariants: ("blue" | "pink" | "yellow" | "default")[] = [
    "blue",
    "yellow",
    "pink",
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
            <span className="text-zinc-200 font-medium">Design</span>
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
              <span>Design Excellence</span>
            </div>

            {/* Title with decorative landing page curve line */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading tracking-wide text-center text-zinc-200 px-4 leading-[1.18]">
              Creative Design for{" "}
              <span className="relative inline-block">
                <span>Exceptional Brands</span>
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
              Transforming ideas into visually stunning and highly functional digital experiences. Our design philosophy centers on user-centricity, aesthetic brilliance, and strategic impact.
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

        {/* ─── Services Grid ("What We Create") ─── */}
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
                <span>What We Create</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading tracking-wide text-center text-zinc-200 px-4 leading-[1.18]">
                Crafting Memorable Experiences
              </h2>
              <p className="xl:w-1/2 md:w-2/3 w-full text-base sm:text-lg tracking-wide text-gray-400 text-center mx-auto px-4 leading-relaxed">
                Elevate your brand with refined design solutions tailored to captivate and convert your target audience.
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
                              className="object-contain filter brightness-110"
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
                Our Creative Design Process
              </h2>
              <p className="xl:w-1/2 md:w-2/3 w-full text-base sm:text-lg tracking-wide text-gray-400 text-center mx-auto px-4 leading-relaxed">
                A human-centered design approach translating abstract concepts into intuitive, award-worthy digital products.
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
                  src="/services/crevosysdesign.webp"
                  alt="Creative Design Process"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-orange-600/5 mix-blend-overlay" />
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

export default DesignPage;
