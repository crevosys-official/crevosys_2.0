"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLenis } from "@/lib/lenis";

const NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Contact", href: "/contact" },
  { title: "Works", href: "/works" },
  { title: "Team", href: "/team" },
];

const SVG_W = 1131;
const SVG_H = 861;
const SVG_CX = SVG_W / 2;

// SVG Bezier Morph Paths
const OPEN_HIDDEN = `M${SVG_W},0 Q${SVG_CX},0 0,0 L0,0 L${SVG_W},0 Z`;
const OPEN_BULGE = `M${SVG_W},345 Q${SVG_CX},620 0,345 L0,0 L${SVG_W},0 Z`;
const OPEN_FULL = `M${SVG_W},${SVG_H} Q${SVG_CX},${SVG_H} 0,${SVG_H} L0,0 L${SVG_W},0 Z`;
const CLOSE_START = `M${SVG_W},0 Q${SVG_CX},0 0,0 L0,${SVG_H} L${SVG_W},${SVG_H} Z`;
const CLOSE_BULGE = `M${SVG_W},350 Q${SVG_CX},130 0,350 L0,${SVG_H} L${SVG_W},${SVG_H} Z`;
const CLOSE_HIDDEN = `M${SVG_W},${SVG_H} Q${SVG_CX},${SVG_H} 0,${SVG_H} L0,${SVG_H} L${SVG_W},${SVG_H} Z`;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuPathRef = useRef<SVGPathElement>(null);
  const isAnimating = useRef(false);

  const lenis = useLenis();
  const { contextSafe } = useGSAP({ scope: containerRef });

  // Initial GSAP Setup
  useEffect(() => {
    if (!menuPathRef.current) return;
    gsap.set(menuPathRef.current, { attr: { d: OPEN_HIDDEN } });
    gsap.set(".menu-char", { opacity: 0, x: "750%" });
    gsap.set(".menu-info-item", { opacity: 0, y: 100 });
  }, []);

  // Lock body & Lenis scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      if (lenis) {
        lenis.stop();
      }
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, lenis]);

  // Only show navbar when completely at the top position (scrollY <= 20)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isOpen) return;

      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const openMenu = contextSafe(() => {
    isAnimating.current = true;

    // Toggle button transition
    gsap.to(".nav-toggle-menu", { duration: 0.25, opacity: 0, ease: "none" });
    gsap.to(".nav-toggle-close", {
      duration: 0.25,
      opacity: 1,
      ease: "none",
      delay: 0.25,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // SVG wave / bulge animation
    tl.to(menuPathRef.current, {
      duration: 0.5,
      attr: { d: OPEN_BULGE },
      ease: "power4.in",
    }).to(menuPathRef.current, {
      duration: 0.5,
      attr: { d: OPEN_FULL },
      ease: "power4.out",
    });

    // Menu logo fade in
    tl.to(".menu-logo", { duration: 0.1, opacity: 1, ease: "none" }, "-=0.75");

    // Contact info items stagger slide up
    tl.to(
      ".menu-info-item",
      {
        duration: 0.75,
        opacity: 1,
        y: 0,
        ease: "power3.out",
        stagger: 0.075,
      },
      "-=0.35"
    );

    // Menu links elastic character stagger
    tl.to(
      ".menu-char",
      {
        duration: 1.5,
        x: "0%",
        ease: "elastic.out(1, 0.25)",
        stagger: 0.01,
      },
      0.45
    );

    tl.to(
      ".menu-char",
      {
        duration: 0.75,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.01,
      },
      0.45
    );
  });

  const closeMenu = contextSafe(() => {
    isAnimating.current = true;

    if (menuPathRef.current) {
      gsap.set(menuPathRef.current, { attr: { d: CLOSE_START } });
    }

    // Toggle button transition
    gsap.to(".nav-toggle-close", { duration: 0.3, opacity: 0, ease: "none" });
    gsap.to(".nav-toggle-menu", {
      duration: 0.3,
      opacity: 1,
      ease: "none",
      delay: 0.25,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        if (menuPathRef.current) {
          gsap.set(menuPathRef.current, { attr: { d: OPEN_HIDDEN } });
        }
        gsap.set(".menu-char", { opacity: 0, x: "750%" });
        gsap.set(".menu-link-wrapper", { opacity: 1 });
        gsap.set(".menu-info-item", { opacity: 0, y: 100 });
        isAnimating.current = false;
        setIsOpen(false);
      },
    });

    tl.to(".menu-logo", { duration: 0.3, opacity: 0 })
      .to(".menu-link-wrapper", { duration: 0.3, opacity: 0 }, "<")
      .to(".menu-info-item", { duration: 0.3, opacity: 0 }, "<");

    tl.to(
      menuPathRef.current,
      { duration: 0.5, attr: { d: CLOSE_BULGE }, ease: "power3.in" },
      "<"
    ).to(menuPathRef.current, {
      duration: 0.5,
      attr: { d: CLOSE_HIDDEN },
      ease: "power3.out",
    });
  });

  const handleToggle = () => {
    if (isAnimating.current) return;
    if (!isOpen) {
      setIsOpen(true);
      openMenu();
    } else {
      closeMenu();
    }
  };

  return (
    <nav ref={containerRef} className="fixed inset-0 z-50 pointer-events-none w-full h-full font-sans">
      {/* Top Header Bar (Hides on scroll down, reveals on scroll up) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 ease-in-out ${
          isVisible || isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 py-6 sm:py-8 flex items-center justify-between">
          {/* Top Main Nav Logo */}
          <div className="pointer-events-auto">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group">
              <Image
                src="/crevoicon.png"
                alt="Crevosys"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain transition-transform duration-200 group-hover:scale-105"
                height={40}
                width={40}
                priority
              />
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-tight font-sans select-none">
                Crevosys
              </span>
            </Link>
          </div>

          {/* Right Header Controls: GET IN TOUCH + Menu Toggle Button */}
          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
            {/* GET IN TOUCH Button */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.3)] active:scale-95"
            >
              <span>GET IN TOUCH</span>
            </Link>

            {/* Nav Toggle Button with Animated Hamburger / Close Icon */}
            <button
              onClick={handleToggle}
              aria-label="Toggle menu"
              className="group relative flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#f0eeee] hover:text-white bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.3)] active:scale-95 cursor-pointer"
            >
              <span className="relative">
                <span className="nav-toggle-menu block">Menu</span>
                <span className="nav-toggle-close absolute inset-0 flex items-center opacity-0">Close</span>
              </span>

              {/* Animated Hamburger / Close Icon */}
              <div className="relative w-4 h-3.5 sm:w-5 sm:h-4 flex flex-col justify-between items-center py-0.5">
                <span
                  className={`w-4 sm:w-5 h-[2px] bg-white rounded-full transition-all duration-300 transform origin-center ${
                    isOpen ? "rotate-45 translate-y-[5px] sm:translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`w-4 sm:w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                  }`}
                />
                <span
                  className={`w-4 sm:w-5 h-[2px] bg-white rounded-full transition-all duration-300 transform origin-center ${
                    isOpen ? "-rotate-45 -translate-y-[5px] sm:-translate-y-[6px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Fullscreen Overlay */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 w-full h-[100svh] transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100 visible"
            : "pointer-events-none opacity-0 invisible"
        }`}
      >
        {/* Morphing SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none -z-10"
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="menu-clip">
              <path ref={menuPathRef} d={OPEN_HIDDEN} />
            </clipPath>
          </defs>
          <foreignObject
            x="0"
            y="0"
            width={SVG_W}
            height={SVG_H}
            clipPath="url(#menu-clip)"
            className="w-full h-full"
          >
            <div className="relative w-full h-full bg-black overflow-hidden">
              <div className="relative w-full h-full opacity-30 scale-105">
                <Image
                  src="/elements/menuBG.jpg"
                  alt="Menu Background"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </foreignObject>
        </svg>

        {/* Content Container (Aligned with max-w-7xl grid) */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 pt-28 pb-10 sm:pb-16 flex flex-col-reverse lg:flex-row gap-8 justify-between h-full text-[#f0eeee]">
          {/* Left Column (Info / Contact) */}
          <div className="flex-1 flex flex-col justify-end">
            <p className="menu-info-item text-[#a374ff] text-xs uppercase tracking-[0.25rem] font-semibold mb-4">
              Get in Touch
            </p>
            <h3 className="menu-info-item text-2xl md:text-4xl font-normal leading-tight tracking-tight">
              crevosysofficial@gmail.com
            </h3>
            <h3 className="menu-info-item text-2xl md:text-4xl font-normal leading-tight tracking-tight">
              +8801601321799
            </h3>
            <div className="my-3"></div>
            <h6 className="menu-info-item text-base md:text-xl text-neutral-300">
              Online Based IT Agency
            </h6>
            <h6 className="menu-info-item text-base md:text-xl text-neutral-300">
              Bangladesh - 2025
            </h6>
            <div className="menu-info-item mt-10 sm:mt-14">
              <h6 className="text-[#a374ff] font-semibold text-xs uppercase tracking-[0.2rem] mb-3">
                Follow Us
              </h6>
              <div className="flex flex-wrap gap-6 text-sm text-neutral-300">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/CrevoSys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com/company/crevosys-official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Linkedin
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (Positioned on the Right, Text Left-Aligned) */}
          <div className="flex-1 lg:flex-[1.5] flex flex-col justify-end items-start lg:items-end">
            <div className="w-auto flex flex-col items-start text-left">
              <ul className="list-none space-y-2 flex flex-col items-start text-left">
                {NAV_LINKS.map((link) => (
                  <li key={link.title} className="w-full text-left">
                    <Link
                      href={link.href}
                      onClick={() => isOpen && handleToggle()}
                      className="menu-link-wrapper block w-max overflow-hidden text-4xl sm:text-6xl md:text-7xl font-bold leading-tight uppercase hover:text-[#a374ff] transition-colors text-left"
                    >
                      {link.title.split("").map((char, index) => (
                        <span
                          key={index}
                          className="menu-char inline-block will-change-transform"
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
