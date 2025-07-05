"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

// Define types for the skill items
interface SkillItem {
  name: string;
  src: string;
  alt: string;
  tooltipId: string;
  className?: string;
}

// Define the component props interface
interface SkillsMarqueeProps {
  className?: string;
}

const SkillsMarquee: React.FC<SkillsMarqueeProps> = ({ className = "" }) => {
  // Right direction skills icon
  const rightSkills: SkillItem[] = [
    { name: "HTML", src: "/icons/HTML.svg", alt: "HTML", tooltipId: "tooltip" },
    {
      name: "TailwindCSS",
      src: "/icons/TailwindCSS-Dark.svg",
      alt: "TailwindCSS",
      tooltipId: "tooltip",
    },
    {
      name: "Bootstrap",
      src: "/icons/Bootstrap.svg",
      alt: "Bootstrap",
      tooltipId: "tooltip",
    },
    {
      name: "Supabase",
      src: "/icons/Supabase-Dark.svg",
      alt: "Supabase",
      tooltipId: "tooltip",
    },
    {
      name: "Firebase",
      src: "/icons/Firebase-Dark.svg",
      alt: "Firebase",
      tooltipId: "tooltip",
    },
    { name: "CSS", src: "/icons/CSS.svg", alt: "CSS", tooltipId: "tooltip" },
    {
      name: "Clerk",
      src: "/icons/clerk.png",
      alt: "Clerk",
      tooltipId: "tooltip",
      className: "rounded-[25px]",
    },
    {
      name: "MongoDB",
      src: "/icons/MongoDB.svg",
      alt: "MongoDB",
      tooltipId: "tooltip",
    },
    {
      name: "Node.js",
      src: "/icons/NodeJS-Dark.svg",
      alt: "Node.js",
      tooltipId: "tooltip",
    },
    {
      name: "Express.js",
      src: "/icons/ExpressJS-Dark.svg",
      alt: "Express.js",
      tooltipId: "tooltip",
    },
  ];

  // Left direction skills icon
  const leftSkills: SkillItem[] = [
    {
      name: "GitHub",
      src: "/icons/Github-Dark.svg",
      alt: "GitHub",
      tooltipId: "tooltip2",
    },
    {
      name: "Figma",
      src: "/icons/Figma-Dark.svg",
      alt: "Figma",
      tooltipId: "tooltip2",
    },
    {
      name: "Flutter",
      src: "/icons/Flutter-Dark.svg",
      alt: "Flutter",
      tooltipId: "tooltip2",
    },
    { name: "XD", src: "/icons/XD.svg", alt: "XD", tooltipId: "tooltip2" },
    {
      name: "Photoshop",
      src: "/icons/Photoshop.svg",
      alt: "Photoshop",
      tooltipId: "tooltip2",
    },
    {
      name: "Illustrator",
      src: "/icons/Illustrator.svg",
      alt: "Illustrator",
      tooltipId: "tooltip2",
    },
    {
      name: "Next.js",
      src: "/icons/NextJS-Dark.svg",
      alt: "Next",
      tooltipId: "tooltip2",
      className: "rounded-[25px]",
    },
    {
      name: "Blender",
      src: "/icons/Blender-Dark.svg",
      alt: "Blender",
      tooltipId: "tooltip2",
    },
    {
      name: "Moz",
      src: "/icons/moz.png",
      alt: "Moz",
      tooltipId: "tooltip2",
      className: "rounded-[20px]",
    },
    {
      name: "SMErush",
      src: "/icons/smerush.jpeg",
      alt: "SMErush",
      tooltipId: "tooltip2",
      className: "rounded-[20px]",
    },
    {
      name: "Android Studio",
      src: "/icons/AndroidStudio-Dark.svg",
      alt: "Android Studio",
      tooltipId: "tooltip2",
    },
    {
      name: "Ahrefs",
      src: "/icons/ahrefs.webp",
      alt: "Ahrefs",
      tooltipId: "tooltip2",
    },
    {
      name: "VsCode",
      src: "/icons/VSCode-Dark.svg",
      alt: "VS Code",
      tooltipId: "tooltip2",
    },
    {
      name: "React.js",
      src: "/icons/React-Dark.svg",
      alt: "React",
      tooltipId: "tooltip2",
    },
    {
      name: "TypeScript",
      src: "/icons/TypeScript.svg",
      alt: "TypeScript",
      tooltipId: "tooltip2",
    },
    {
      name: "Redux",
      src: "/icons/Redux.svg",
      alt: "Redux",
      tooltipId: "tooltip2",
    },
  ];

  // Common image styles
  const imageStyles =
    "w-20 mr-2 grayscale hover:grayscale-0 transition duration-300 hover:scale-105";

  // Render skill image component
  const renderSkillImage = (skill: SkillItem) => (
    <div key={skill.name} className="relative">
      <Image
        data-tooltip-id={skill.tooltipId}
        data-tooltip-content={skill.name}
        className={`${imageStyles} ${skill.className || ""}`}
        src={skill.src}
        alt={skill.alt}
        width={80}
        height={80}
        priority={false}
      />
    </div>
  );

  return (
    <div className={`container mx-auto ${className}`}>
      {/* Marquee for right slider */}
      <Marquee
        gradient={true}
        gradientColor="#181829"
        gradientWidth={120}
        speed={10}
        pauseOnHover={true}
        direction="right"
        autoFill={true}
        className="py-3 overflow-hidden">
        {rightSkills.map(renderSkillImage)}
      </Marquee>

      {/* Marquee for left slider */}
      <Marquee
        gradient={true}
        gradientColor="#181829"
        gradientWidth={120}
        speed={10}
        pauseOnHover={true}
        direction="left"
        autoFill={true}
        className="mb-20 py-3 overflow-hidden z-50">
        {leftSkills.map(renderSkillImage)}
      </Marquee>

      {/* Tooltip Components */}
      <Tooltip id="tooltip" />
      <Tooltip id="tooltip2" place="bottom" />
    </div>
  );
};

export default SkillsMarquee;
