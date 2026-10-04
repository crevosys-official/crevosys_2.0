"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GetTouch = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // 1. Badge & Arrow reveal - snappy & responsive
      tl.fromTo(
        ".get-touch-badge",
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
      )
        // 2. Horizontal divider expansively lines out
        .fromTo(
          ".get-touch-divider",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.45, ease: "power2.out" },
          "-=0.2"
        )
        // 3. Huge headline lifts and reveals
        .fromTo(
          ".get-touch-title",
          { opacity: 0, y: 25, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power2.out" },
          "-=0.25"
        )
        // 4. Subtitle
        .fromTo(
          ".get-touch-desc",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "-=0.2"
        )
        // 5. Button scale bounce
        .fromTo(
          ".get-touch-btn",
          { opacity: 0, scale: 0.9, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.8)" },
          "-=0.2"
        );

      // 6. Floating color line shape parallax drift
      if (shapeRef.current) {
        gsap.to(shapeRef.current, {
          y: -50,
          rotate: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="py-14 relative min-h-full m-2 md:container md:mx-auto xl:container xl:mx-auto">
      <div className="get-touch-badge flex gap-2 items-center text-2xl mx-auto justify-center text-white">
        <ArrowRight /> <span>Get in touch</span>
      </div>
      <hr className="get-touch-divider my-8 border-gray-200/10 origin-center" />
      <h2 className="get-touch-title md:text-8xl font-heading uppercase text-4xl tracking-wide text-center my-3 text-white">
        Let&apos;s get started <br />
        with our team
      </h2>
      <p className="get-touch-desc text-center tracking-wide my-5 text-gray-500 text-sm md:text-base">
        Use customer data to build great and solid product experiences
        that convert.
      </p>
      <div className="get-touch-btn flex justify-center">
        <Link href="/contact" className="focus:outline-none">
            <button className="group relative px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-[#ff7520] via-[#f75200] to-[#cb3c00] shadow-[0_0_26px_rgba(247,82,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_36px_rgba(247,82,0,0.8)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 border border-orange-400/40 cursor-pointer overflow-hidden">
              <span className="relative z-10">Get Connect with us</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </button>
          </Link>
      </div>
      <Image
        ref={shapeRef}
        className="absolute -bottom-24 md:w-96 hidden md:inline -right-8 z-50 pointer-events-none"
        src="/elements/Color-line-shape.webp"
        alt="line shape"
        height={1000}
        width={1000}
        loading="lazy"
      />
    </div>
  );
};

export default GetTouch;
