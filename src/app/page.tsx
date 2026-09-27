"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import Hero from "@/components/sections/Hero";
import Integrations from "@/components/sections/technology";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Progress from "@/components/sections/Progress";
import ScrollFaq from "@/components/sections/Faq";
import GetTouch from "@/components/sections/GetTouch";
import Image from "next/image";
import React, { useState } from "react";
import ScrollProvider from "@/components/providers/ScrollProvider";

const Page = () => {
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "hero" | "about" | "testimonials" | "plan" | "design" | "build"
  >("default");

  return (
    <ScrollProvider>
      <div
        className="min-h-screen bg-[#000000]">
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

      <CustomCursor variant={cursorVariant} />

      {/* Hero Section — full width edge-to-edge */}
      <Hero
        onCursorEnter={() => setCursorVariant("hero")}
        onCursorLeave={() => setCursorVariant("default")}
      />

     

      <Services />

       {/* Integrations Section */}
      <Integrations />
      
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
      </div>

      <ScrollFaq />

      <div className=" md:px-16 xl:px-20 px-5">
        <GetTouch />
      </div>
      <Footer />
    </div>
    </ScrollProvider>
  );
};

export default Page;
