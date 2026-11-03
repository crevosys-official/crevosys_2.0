"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

interface DropoutNavbarProps {
  logo?: React.ReactNode;
  menuText?: string;
  isOpen: boolean;
  onToggle: () => void;
  navbarRef: React.RefObject<HTMLDivElement | null>;
  iconContainerRef: React.RefObject<HTMLDivElement | null>;
  line1Ref: React.RefObject<HTMLSpanElement | null>;
  line2Ref: React.RefObject<HTMLSpanElement | null>;
  tickerTrackRef: React.RefObject<HTMLDivElement | null>;
}

export const DropoutNavbar: React.FC<DropoutNavbarProps> = ({
  logo,
  menuText = "Menu",
  isOpen,
  onToggle,
  navbarRef,
  iconContainerRef,
  line1Ref,
  line2Ref,
  tickerTrackRef,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);

    // Ticker text roll on hover
    if (tickerTrackRef.current) {
      gsap.to(tickerTrackRef.current, {
        yPercent: -50,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // If closed, hover state transforms lines into plus sign (+)
    if (!isOpen && line1Ref.current && line2Ref.current) {
      gsap.to(line1Ref.current, {
        top: "49%",
        duration: 0.28,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(line2Ref.current, {
        bottom: "49%",
        rotate: 90,
        duration: 0.28,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    // Reset ticker text roll
    if (tickerTrackRef.current) {
      gsap.to(tickerTrackRef.current, {
        yPercent: 0,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // If closed, reset lines back to parallel
    if (!isOpen && line1Ref.current && line2Ref.current) {
      gsap.to(line1Ref.current, {
        top: "42%",
        duration: 0.28,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(line2Ref.current, {
        bottom: "42%",
        rotate: 0,
        duration: 0.28,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <header
      ref={navbarRef}
      className="navbar fixed top-0 left-0 w-full z-[998] pointer-events-none transition-none"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-4 sm:py-6 flex items-center justify-between">
        {/* Brand Logo on the left */}
        <div className="pointer-events-auto flex items-center">
          {logo ? (
            logo
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f47920] rounded-lg"
              aria-label="CrevoSys Home"
            >
              <Image
                src="/crevoicon.webp"
                alt="Crevosys"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain transition-transform duration-200 group-hover:scale-105"
                height={40}
                width={40}
                priority
              />
              <span className="text-white font-bold text-base sm:text-xl md:text-2xl tracking-tight font-sans select-none">
                Crevosys
              </span>
            </Link>
          )}
        </div>

        {/* Right Controls: GET IN TOUCH + Cominvi Animated Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          {/* GET IN TOUCH Button (matches existing site) */}
          <Link
            href="/contact"
            className="group relative hidden md:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 hover:border-white/30 backdrop-blur-md transform-gpu transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.3)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f47920]"
          >
            <span>GET IN TOUCH</span>
          </Link>

          {/* Interactive Menu Toggle Button */}
          <button
            type="button"
            onClick={onToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-expanded={isOpen}
            aria-controls="dropout-nav-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="group relative flex items-center gap-3 sm:gap-3.5 pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-white/25 backdrop-blur-md transform-gpu transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.3)] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f47920]"
          >
            {/* Text Roll Ticker (.is-menu_label-wrap) */}
            <div className="is-menu_label-wrap relative h-[1.3em] overflow-hidden leading-none select-none text-xs sm:text-sm font-semibold tracking-wider uppercase text-white pointer-events-none">
              <div
                ref={tickerTrackRef}
                className="flex flex-col will-change-transform"
              >
                <span className="h-[1.3em] flex items-center justify-end">
                  {isOpen ? "Close" : menuText}
                </span>
                <span className="h-[1.3em] flex items-center justify-end">
                  {isOpen ? "Cerrar" : menuText}
                </span>
              </div>
            </div>

            {/* 48px Morphing Icon Container */}
            <div
              ref={iconContainerRef}
              className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/[0.08] flex items-center justify-center overflow-hidden transition-colors duration-300 flex-shrink-0"
              aria-hidden="true"
            >
              {/* Line 1: Top horizontal line */}
              <span
                ref={line1Ref}
                className="absolute left-[11px] sm:left-[13px] right-[11px] sm:right-[13px] h-[2px] bg-white rounded-full will-change-transform"
                style={{ top: "42%" }}
              />

              {/* Line 2: Bottom horizontal line */}
              <span
                ref={line2Ref}
                className="absolute left-[11px] sm:left-[13px] right-[11px] sm:right-[13px] h-[2px] bg-white rounded-full will-change-transform origin-center"
                style={{ bottom: "42%" }}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DropoutNavbar;

