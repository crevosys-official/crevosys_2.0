"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

const CustomCursor: React.FC<CustomCursorProps> = ({ variant }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setCursorPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const variants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      height: 10,
      width: 10,
      opacity: 0.4,
      backgroundColor: "#ff8804",
    },
    hero: {
      x: cursorPosition.x - 90,
      y: cursorPosition.y - 90,
      height: 180,
      width: 180,
      opacity: 0.4,
      backgroundColor: "#ff8804",
    },
    about: {
      x: cursorPosition.x - 80,
      y: cursorPosition.y - 60,
      height: 120,
      width: 120,
      opacity: 0.4,
      backgroundColor: "#ff8804",
    },
    testimonials: {
      x: cursorPosition.x - 80,
      y: cursorPosition.y - 60,
      height: 100,
      width: 100,
      opacity: 0.2,
      backgroundColor: "#ff8804",
    },
    // for progress component
    plan: {
      x: cursorPosition.x - 80,
      y: cursorPosition.y - 60,
      height: 100,
      width: 100,
      opacity: 0.2,
      backgroundColor: "#F1AED4",
    },
    design: {
      x: cursorPosition.x - 80,
      y: cursorPosition.y - 60,
      height: 100,
      width: 100,
      opacity: 0.2,
      backgroundColor: "#CCEF8E",
    },
    build: {
      x: cursorPosition.x - 80,
      y: cursorPosition.y - 60,
      height: 100,
      width: 100,
      opacity: 0.2,
      backgroundColor: "#86DFE8",
    },
  };

  return (
    <motion.div
      className="cursor"
      variants={variants}
      animate={variant}
      style={{
        borderRadius: "50%",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 2,
        filter: variant === "testimonials" ? "blur(12px)" : "none",
      }}
    />
  );
};

export default CustomCursor;
