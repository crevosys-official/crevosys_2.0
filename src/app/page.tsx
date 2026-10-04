"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Image from "next/image";
import React, { useState } from "react";
import ScrollProvider from "@/components/providers/ScrollProvider";

const CustomCursor = dynamic(() => import("@/components/layout/CustomCursor"), {
  ssr: false,
});
const Services = dynamic(() => import("@/components/sections/Services"), {
  ssr: true,
});
const Integrations = dynamic(() => import("@/components/sections/technology"), {
  ssr: true,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: true,
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  ssr: true,
});
const Progress = dynamic(() => import("@/components/sections/Progress"), {
  ssr: true,
});
const ScrollFaq = dynamic(() => import("@/components/sections/Faq"), {
  ssr: true,
});
const GetTouch = dynamic(() => import("@/components/sections/GetTouch"), {
  ssr: true,
});

const Page = () => {
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "hero" | "about" | "testimonials" | "plan" | "design" | "build"
  >("default");

  return (
    <ScrollProvider>
      <div className="min-h-screen bg-[#000000]">
        <div
          className={[
            "fixed inset-0 z-2 pointer-events-none",
            "flex items-center justify-center w-full h-full",
          ].join(" ")}
        >
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

        {/* Navbar fixed at the top, above all content */}
        <Navbar />

        <CustomCursor variant={cursorVariant} />

        {/* Main Landmark wrapping the primary content */}
        <main id="main-content">
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
        </main>

        <Footer />
      </div>
    </ScrollProvider>
  );
};

export default Page;
