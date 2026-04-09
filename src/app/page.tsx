"use client";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import SkillsMarquee from "@/components/SkilsMaarque";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import React, { useState } from "react";
import Testimonials from "@/components/Testimonials";
import Progress from "@/components/Progress";
import GetTouch from "@/components/GetTouch";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";

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
        {/* <Pricing
          onCursorEnter={() => setCursorVariant("plan")}
          onCursorLeave={() => setCursorVariant("default")}
        /> */}
        <GetTouch />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
