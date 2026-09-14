"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCursorEnter, onCursorLeave }) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#000000] pt-24 sm:pt-28">
      {/* Background ambient radial gradients matching hero_shape colors (blue, indigo, purple) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_-10%,rgba(59,130,246,0.10),rgba(147,51,234,0.08),rgba(0,0,0,0)_80%)] pointer-events-none" />
      
      {/* Left side subtle blue glow */}
      <div className="absolute top-[20%] left-[-10%] w-[550px] h-[450px] bg-blue-600/[0.08] blur-[140px] rounded-full pointer-events-none" />
      
      {/* Center heading indigo/purple aura */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[420px] bg-gradient-to-r from-blue-600/[0.07] via-indigo-600/[0.09] to-purple-600/[0.08] blur-[130px] rounded-full pointer-events-none" />
      
      {/* Right side subtle purple/pink glow */}
      <div className="absolute top-[25%] right-[-10%] w-[550px] h-[450px] bg-purple-600/[0.08] blur-[140px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <div
        className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-4 sm:px-6 relative z-20"
        onMouseEnter={onCursorEnter}
        onMouseLeave={onCursorLeave}
      >
        {/* Strategy Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 p-1 pr-4 rounded-full bg-[#18181b]/90 border border-white/10 backdrop-blur-md mb-5 sm:mb-7"
        >
          <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#ff6a00] to-[#e85500] shadow-[0_0_12px_rgba(255,106,0,0.5)]">
            Strategy
          </span>
          <span className="text-zinc-300 text-xs sm:text-sm font-medium tracking-wide">
            Business Growth
          </span>
        </motion.div>

        {/* 2-line Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-semibold text-white tracking-[-0.03em] leading-[1.08] max-w-5xl"
        >
          <span className="block">Transform your Data into</span>
          <span className="block">Powerful and Smart Solutions</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          className="mt-4 sm:mt-5 text-zinc-400 text-sm sm:text-base md:text-[1.05rem] font-normal max-w-xl leading-relaxed"
        >
          Discover insights, enhance choices, and grow your business{" "}
          <br className="hidden sm:inline" />
          using advanced data-driven innovations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
          className="flex items-center justify-center gap-3.5 sm:gap-4 mt-6 sm:mt-7"
        >
          <Link href="/contact">
            <button className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-[#ff7520] via-[#f75200] to-[#cb3c00] shadow-[0_0_24px_rgba(247,82,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:shadow-[0_0_35px_rgba(247,82,0,0.8)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 border border-orange-400/40 cursor-pointer">
              Get Started
            </button>
          </Link>
          <Link href="/services">
            <button className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-100 shadow-[0_2px_12px_rgba(255,255,255,0.12)] active:scale-[0.98] transition-all duration-300 cursor-pointer">
              See Features
            </button>
          </Link>
        </motion.div>
      </div>

      {/* === 3D Hero Shape — Scaled to cut off edges and pulled up to eliminate gap === */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        className="relative w-full flex items-end justify-center pointer-events-none mt-auto overflow-hidden"
      >
        {/* Ambient glow matching the 3D shape gradient */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[300px] bg-gradient-to-r from-blue-600/25 via-purple-600/30 to-pink-500/25 blur-[120px] rounded-full pointer-events-none" />

        <Image
          src="/elements/hero_shape.png"
          alt="Hero 3D Shape"
          width={2905}
          height={1119}
          priority
          className="w-[130vw] min-w-[1300px] max-w-none h-auto object-contain object-bottom select-none pointer-events-none scale-125 sm:scale-135 md:scale-140 lg:scale-145 translate-y-[12%] sm:translate-y-[15%] md:translate-y-[32%] drop-shadow-[0_-15px_40px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
