"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CustomCursorProps {
  variant:
    | "default"
    | "hero"
    | "about"
    | "testimonials"
    | "plan"
    | "design"
    | "build";
}

const VARIANTS_CONFIG = {
  default: {
    size: 12,
    opacity: 0.45,
    backgroundColor: "#ff8804",
    blur: "blur(0px)",
  },
  hero: {
    size: 180,
    opacity: 0.38,
    backgroundColor: "#ff8804",
    blur: "blur(0px)",
  },
  about: {
    size: 120,
    opacity: 0.38,
    backgroundColor: "#ff8804",
    blur: "blur(0px)",
  },
  testimonials: {
    size: 100,
    opacity: 0.2,
    backgroundColor: "#ff8804",
    blur: "blur(12px)",
  },
  plan: {
    size: 100,
    opacity: 0.25,
    backgroundColor: "#F1AED4",
    blur: "blur(0px)",
  },
  design: {
    size: 100,
    opacity: 0.25,
    backgroundColor: "#CCEF8E",
    blur: "blur(0px)",
  },
  build: {
    size: 100,
    opacity: 0.25,
    backgroundColor: "#86DFE8",
    blur: "blur(0px)",
  },
};

const CustomCursor: React.FC<CustomCursorProps> = ({ variant }) => {
  const [isVisible, setIsVisible] = useState(false);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Fast, lag-free springs for natural feel
  const x = useSpring(rawX, { damping: 28, stiffness: 450 });
  const y = useSpring(rawY, { damping: 28, stiffness: 450 });

  useEffect(() => {
    // Only enable cursor on devices that support hover/fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, rawX, rawY]);

  const cfg = VARIANTS_CONFIG[variant] || VARIANTS_CONFIG.default;

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        borderRadius: "50%",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform, width, height",
      }}
      animate={{
        width: cfg.size,
        height: cfg.size,
        opacity: isVisible ? cfg.opacity : 0,
        backgroundColor: cfg.backgroundColor,
        filter: cfg.blur,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.6,
      }}
    />
  );
};

export default CustomCursor;
