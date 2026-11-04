"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useLenis } from "@/lib/lenis";
import DropoutNavbar from "./DropoutNavbar";
import DropoutMenu, { DEFAULT_DROPOUT_LINKS } from "./DropoutMenu";
import { DropoutLink } from "./DropoutNavLink";
import "./dropout.css";

// Safely register GSAP CustomEase plugin once on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  try {
    CustomEase.create("cominviEase", "M0,0 C0.6,0 0,1 1,1");
  } catch {
    // Already created or handled
  }
}

export type { DropoutLink };

export type DropoutLayoutProps = {
  children: React.ReactNode;
  logo?: React.ReactNode;
  menuText?: string;
  links?: DropoutLink[];
};

export const DropoutLayout: React.FC<DropoutLayoutProps> = ({
  children,
  logo,
  menuText = "Menu",
  links = DEFAULT_DROPOUT_LINKS,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Core DOM Refs
  const navbarRef = useRef<HTMLDivElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const pageWrapRef = useRef<HTMLDivElement>(null);

  // Toggle & Icon Refs
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  // Animation timeline & state refs
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isNavbarHidden = useRef(false);

  const lenis = useLenis();

  // Calculate dynamic dropdown position based on container and responsive breakpoints
  const calculateDropdownTop = useCallback((): number => {
    if (typeof window === "undefined" || !navInnerRef.current) return 300;

    const navInner = navInnerRef.current;
    const navBottom = navInner.getBoundingClientRect().bottom;
    const computedFontSize = parseFloat(getComputedStyle(navInner).fontSize) || 16;
    const width = window.innerWidth;

    if (width < 768) {
      // Mobile: approximately 34em or dynamic boundary
      return Math.max(navBottom + 2 * computedFontSize, 34 * computedFontSize);
    } else if (width < 1024) {
      // Tablet: approximately 18em or dynamic boundary
      return Math.max(navBottom + 2.5 * computedFontSize, 18 * computedFontSize);
    } else {
      // Desktop: navBottom + 7 * fontSize
      return navBottom + 7 * computedFontSize;
    }
  }, []);

  // Open the Menu
  const openMenu = useCallback(() => {
    if (!pageWrapRef.current || !navInnerRef.current) return;

    setIsOpen(true);

    // Stop Lenis and lock scroll
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = "hidden";

    // Restore navbar visibility if it was hidden by scroll
    if (navbarRef.current) {
      gsap.to(navbarRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        overwrite: "auto",
      });
      isNavbarHidden.current = false;
    }

    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dropdownTop = calculateDropdownTop();
    const isMobile = window.innerWidth < 768;
    const targetScale = (window.innerWidth - (isMobile ? 32 : 64)) / window.innerWidth;

    if (isReducedMotion) {
      gsap.set(pageWrapRef.current, {
        top: dropdownTop,
        borderRadius: "1rem",
        transformOrigin: "50% 0%",
      });
      return;
    }

    // Master GSAP Timeline (Cominvi-Ease, ~1.1s duration)
    const tl = gsap.timeline({
      defaults: { ease: "cominviEase" },
      onReverseComplete: () => {
        setIsOpen(false);
        if (lenis) {
          lenis.start();
        }
        document.body.style.overflow = "";
        // Clean up inline styles on page wrapper to return to exact original state
        if (pageWrapRef.current) {
          gsap.set(pageWrapRef.current, {
            clearProps: "top,scale,borderRadius,transformOrigin",
          });
        }
      },
    });

    // 1. Drop page wrapper downward, scale slightly, round top corners
    tl.to(
      pageWrapRef.current,
      {
        top: dropdownTop,
        scale: targetScale,
        borderRadius: "1rem",
        transformOrigin: "50% 0%",
        duration: 1.1,
      },
      0
    );

    // 2. Icon lines morph to center (+)
    if (line1Ref.current && line2Ref.current) {
      tl.to(
        line1Ref.current,
        {
          top: "49%",
          duration: 0.35,
          ease: "power3.out",
        },
        0
      );
      tl.to(
        line2Ref.current,
        {
          bottom: "49%",
          rotate: 90,
          duration: 0.35,
          ease: "power3.out",
        },
        0
      );
    }

    // 3. Icon container rotates 45deg to form cross (x) and applies accent background #f47920
    if (iconContainerRef.current) {
      tl.to(
        iconContainerRef.current,
        {
          rotate: 45,
          backgroundColor: "#f47920",
          borderColor: "#f47920",
          duration: 0.6,
          ease: "cominviEase",
        },
        0.18
      );
    }

    // 4. Stagger navigation links into view
    const navLinks = navInnerRef.current.querySelectorAll(".nav-link-item");
    if (navLinks && navLinks.length > 0) {
      tl.fromTo(
        navLinks,
        {
          y: -25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.6,
          ease: "cominviEase",
        },
        0.28
      );
    }

    timelineRef.current = tl;
    tl.play();
  }, [calculateDropdownTop, lenis]);

  // Close the Menu
  const closeMenu = useCallback(() => {
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReducedMotion) {
      setIsOpen(false);
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
      if (pageWrapRef.current) {
        gsap.set(pageWrapRef.current, { clearProps: "all" });
      }
      return;
    }

    if (timelineRef.current) {
      timelineRef.current.reverse();
    } else {
      setIsOpen(false);
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
    }
  }, [lenis]);

  // Toggle handler
  const handleToggle = useCallback(() => {
    if (!isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }, [isOpen, openMenu, closeMenu]);

  // Escape key listener to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Top-only navbar visibility: only display when at the top of the page (scrollY <= 20)
  useEffect(() => {
    // If mounted while already scrolled down, hide immediately without transition flash
    if (typeof window !== "undefined" && window.scrollY > 20 && navbarRef.current) {
      isNavbarHidden.current = true;
      gsap.set(navbarRef.current, { y: -100, opacity: 0 });
    }

    const handleScroll = () => {
      // Suspend scroll hiding while menu is open
      if (isOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        // At the top: show navbar
        if (isNavbarHidden.current) {
          isNavbarHidden.current = false;
          if (navbarRef.current) {
            gsap.to(navbarRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        }
      } else {
        // Scrolled down away from top: hide navbar (never show on scroll-up unless back at top)
        if (!isNavbarHidden.current) {
          isNavbarHidden.current = true;
          if (navbarRef.current) {
            gsap.to(navbarRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        }
      }
    };

    handleScroll();

    if (lenis) {
      lenis.on("scroll", handleScroll);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, lenis]);

  // Viewport resize handling: recalculate dropdown position if open
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isOpen && pageWrapRef.current) {
          const newDropdownTop = calculateDropdownTop();
          const isMobile = window.innerWidth < 768;
          const targetScale = (window.innerWidth - (isMobile ? 32 : 64)) / window.innerWidth;

          gsap.to(pageWrapRef.current, {
            top: newDropdownTop,
            scale: targetScale,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, calculateDropdownTop]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0d0e11]">
      {/* 1. Fixed Navbar (Z-Index: 998) */}
      <DropoutNavbar
        logo={logo}
        menuText={menuText}
        isOpen={isOpen}
        onToggle={handleToggle}
        navbarRef={navbarRef}
        iconContainerRef={iconContainerRef}
        line1Ref={line1Ref}
        line2Ref={line2Ref}
        tickerTrackRef={tickerTrackRef}
      />

      {/* 2. Navigation Layer Behind Page (Z-Index: 10) */}
      <DropoutMenu
        ref={navInnerRef}
        links={links}
        isOpen={isOpen}
        onLinkClick={closeMenu}
      />

      {/* 3. Main Page Wrapper (Class: .page-wrap, Z-Index: 20) */}
      <div
        ref={pageWrapRef}
        className={`page-wrap relative z-20 min-h-screen w-full transition-shadow duration-500 ${
          isOpen
            ? "shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
            : ""
        }`}
        style={{
          transformOrigin: "50% 0%",
        }}
      >
        {/* Clickable Backdrop Overlay when Lowered (Clicking lowered card closes menu) */}
        {isOpen && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Close navigation menu by clicking page card"
            onClick={closeMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                closeMenu();
              }
            }}
            className="absolute inset-0 z-50 cursor-pointer bg-black/25 backdrop-blur-[1px] transition-opacity duration-300"
          />
        )}

        {/* Existing Page Content preserved exactly as-is */}
        {children}
      </div>
    </div>
  );
};

export default DropoutLayout;

