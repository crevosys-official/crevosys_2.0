"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="h-screen h-[100dvh] max-h-screen bg-[#000000] text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Top Navbar */}
      <Navbar />

      {/* Website Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Image
          src="/gradient.webp"
          alt="gradient background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-15"
        />
      </div>

      {/* Ambient Radial Lighting matching the character's pastel fur palette */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-14 pt-16 sm:pt-20 lg:pt-24 pb-2 sm:pb-6 max-w-7xl mx-auto w-full overflow-hidden">
        <div className="w-full relative">
          {/* Giant "404" Backdrop on Desktop - positioned behind both columns */}
          <div
            aria-hidden="true"
            className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[56%] w-full justify-center items-center pointer-events-none select-none z-0"
          >
            <span className="lg:text-[19rem] xl:text-[23rem] font-black tracking-tighter text-white/[0.07] leading-none drop-shadow-[0_0_80px_rgba(255,255,255,0.02)]">
              404
            </span>
          </div>

          {/* Foreground Grid: Character on Left (Top on Mobile), Message on Right (Bottom on Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-10 items-center relative z-10">
            {/* Left/Top: Monster Character with Mobile 404 Backdrop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-6 flex flex-col items-center justify-center relative"
            >
              {/* Giant "404" Backdrop specifically framed behind character on Mobile / Tablet */}
              <div
                aria-hidden="true"
                className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 -translate-y-2 sm:-translate-y-3"
              >
                <span className="text-[7.5rem] sm:text-[10rem] md:text-[12rem] font-black tracking-tighter text-white/[0.12] leading-none">
                  404
                </span>
              </div>

              {/* Character wrapper */}
              <div className="relative z-10 w-[200px] h-[230px] sm:w-[270px] sm:h-[310px] md:w-[340px] md:h-[390px] lg:w-[420px] lg:h-[480px] xl:w-[470px] xl:h-[540px] flex items-center justify-center">
                <Image
                  src="/elements/pagenotfound.png"
                  alt="Curious monster reading a book"
                  fill
                  sizes="(max-width: 640px) 210px, (max-width: 1024px) 340px, 480px"
                  style={{ objectFit: "contain" }}
                  priority
                  className="select-none pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Ground Shadow */}
              <div className="relative z-10 w-44 sm:w-56 md:w-72 lg:w-[350px] h-4 sm:h-5 bg-black/60 blur-md rounded-[100%] -mt-2.5 sm:-mt-3 pointer-events-none" />
            </motion.div>

            {/* Right/Bottom: Return Button, Headline & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left pt-1 sm:pt-2 lg:pt-3"
            >
              {/* Pill Button: Return to Home */}
              <div className="mb-2 sm:mb-4 lg:mb-6">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2.5 sm:gap-3 pl-1.5 sm:pl-2 pr-4 sm:pr-5 py-1.5 sm:py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-white/40 text-white text-xs sm:text-sm md:text-base font-medium backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] active:scale-95"
                >
                  <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-[#2563eb] group-hover:border-[#2563eb] transition-all duration-300">
                    <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  </span>
                  <span className="tracking-wide">Return to Home</span>
                </Link>
              </div>

              {/* Main Headline */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.85rem] font-extrabold tracking-tight text-white leading-tight mb-2 sm:mb-3">
                Whoops! Looks Like This Page <br className="hidden sm:inline" />
                Went on Vacation!
              </h1>

              {/* Description Paragraph */}
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xs sm:max-w-md font-normal">
                Uh oh! Our little cartoon friends might have accidentally
                scribbled out this address. We can&apos;t seem to find the page
                you&apos;re looking for.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Subtle Bottom Credit */}
      <footer className="relative z-10 text-center py-2 sm:py-3 text-[10px] sm:text-xs text-zinc-600">
        CrevoSys • 404 Not Found
      </footer>
    </div>
  );
}
