"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import SkillsMarquee from "@/components/sections/SkillsMarquee";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Progress from "@/components/sections/Progress";
import GetTouch from "@/components/sections/GetTouch";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "hero" | "about" | "testimonials" | "plan" | "design" | "build"
  >("default");

  return (
    <div
      className={[
        "min-h-screen",
        "bg-gradient-to-t from-[#070707] to-[#221f35] ",
      ].join(" ")}>
      <div
        className={[
          "fixed inset-0 z-2 pointer-events-none",
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

      {/* Navbar fixed at the top, above all content */}
      <Navbar />

      <div className="md:px-16 xl:px-20 px-5 pt-20">
        {" "}
        {/* Add pt-20 to offset fixed navbar height */}
        <CustomCursor variant={cursorVariant} />
        <Hero
          onCursorEnter={() => setCursorVariant("hero")}
          onCursorLeave={() => setCursorVariant("default")}
        />
        <SkillsMarquee />
        <About
          onCursorEnter={() => setCursorVariant("about")}
          onCursorLeave={() => setCursorVariant("default")}
        />
      </div>
      <Services />
      <Projects
        onCursorEnter={() => setCursorVariant("design")}
        onCursorLeave={() => setCursorVariant("default")}
      />
      <Testimonials
        onCursorEnter={() => setCursorVariant("testimonials")}
        onCursorLeave={() => setCursorVariant("default")}
      />
      <div className=" md:px-16 xl:px-20 px-5">
        <Progress
          onCardHover={(variant) => setCursorVariant(variant)}
          onCursorLeave={() => setCursorVariant("default")}
        />

        <GetTouch />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
