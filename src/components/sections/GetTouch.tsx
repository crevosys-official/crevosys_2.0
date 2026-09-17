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
          start: "top 78%",
          once: true,
        },
      });

      // 1. Badge & Arrow reveal
      tl.fromTo(
        ".get-touch-badge",
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      )
        // 2. Horizontal divider expansively lines out
        .fromTo(
          ".get-touch-divider",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        )
        // 3. Huge headline lifts and reveals
        .fromTo(
          ".get-touch-title",
          { opacity: 0, y: 45, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, ease: "power3.out" },
          "-=0.4"
        )
        // 4. Subtitle
        .fromTo(
          ".get-touch-desc",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        // 5. Button scale bounce
        .fromTo(
          ".get-touch-btn",
          { opacity: 0, scale: 0.85, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.8)" },
          "-=0.3"
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
      <h4 className="get-touch-badge flex gap-2 items-center text-2xl mx-auto justify-center text-white">
        <ArrowRight /> <span>Get in touch</span>
      </h4>
      <hr className="get-touch-divider my-8 border-gray-200/10 origin-center" />
      <h1 className="get-touch-title md:text-8xl font-heading uppercase text-4xl tracking-wide text-center my-3 text-white">
        Let&apos;s get started <br />
        with our team
      </h1>
      <p className="get-touch-desc text-center my-5 text-gray-500 text-sm md:text-base">
        Use customer data to build great and solid product <br /> experiences
        that convert.
      </p>
      <div className="get-touch-btn flex justify-center">
        <Link href="/contact">
          <Button className="flex mx-auto p-5 text-md bg-gradient-to-b from-[#FFB16B] to-[#996A40] hover:brightness-110 transition cursor-pointer">
            Let&apos;s get in touch
          </Button>
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
