"use client";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import SkillsMarquee from "@/components/SkiilsMaarque";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import React, { useState } from "react";
import Testimonials from "@/components/Testimonials";

const Page = () => {
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "hero" | "about" | "testimonials"
  >("default");

  return (
    <div
      className={[
        "min-h-screen",
        "bg-gradient-to-t from-[#070707] to-[#221f35]",
      ].join(" ")}>
      <div
        className={[
          "fixed inset-0 z-0 pointer-events-none",
          "flex items-center justify-center w-full h-full",
        ].join(" ")}>
        <Image
          src="/gradient.png"
          alt="gradient background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-10"
          priority
        />
      </div>

      <div className="px-4">
        <CustomCursor variant={cursorVariant} />

        <Navbar />
        <Hero
          onCursorEnter={() => setCursorVariant("hero")}
          onCursorLeave={() => setCursorVariant("default")}
        />
        <SkillsMarquee />
        <About
          onCursorEnter={() => setCursorVariant("about")}
          onCursorLeave={() => setCursorVariant("default")}
        />
        <Services />
        <Testimonials
          onCursorEnter={() => setCursorVariant("testimonials")}
          onCursorLeave={() => setCursorVariant("default")}
        />
      </div>
    </div>
  );
};

export default Page;
