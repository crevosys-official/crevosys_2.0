"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { BackgroundCircles } from "./design/Hero";
import DecryptedText from "./animation/Decrypted-Text";
import { Smile } from "lucide-react";
import Magnet from "./animation/Magnet";

interface HeroProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

// CSS class constants for better maintainability
const HERO_SECTION_CLASSES =
  "relative w-full min-h-[500px] md:min-h-screen xl:min-h-screen md:pt-20 flex items-center justify-center overflow-hidden md:container md:mx-auto xl:container xl:mx-auto";
const BACKGROUND_CONTAINER_CLASSES =
  "absolute inset-0 flex items-center justify-center pointer-events-none z-0";
const MAIN_CONTENT_CLASSES =
  "relative z-10 flex flex-col md:gap-6 justify-center container mx-auto md:-mt-20";

// Badge component for the "Your #1 Platform" section
const PlatformBadge: React.FC = () => (
  <div className="flex mb-5 items-center justify-center">
    <div className="rounded-full bg-gradient-to-r from-[#D9D9D9] to-[#737373] items-center">
      <div className="flex items-center gap-3 md:py-2 md:px-3 p-2">
        <Image
          className="w-[30px] h-[30px] rounded-2xl"
          src="/elements/star.png"
          width={30}
          height={30}
          alt="Star icon"
        />
        <h1 className="text-black font-primary font-semibold text-sm md:text-base">
          Your #1 Platform for IT solution
        </h1>
      </div>
    </div>
  </div>
);

// Lightning icon component with magnet effect
const LightningIcon: React.FC = () => (
  <div className="md:w-20 md:h-24 w-12 h-12 absolute md:-top-12 md:-left-16 -top-8 -left-7">
    <Magnet padding={100} disabled={false} magnetStrength={15} className="z-10">
      <div className="group hover:scale-110 rounded-full flex items-center justify-center transition duration-300 group-hover:scale-110">
        <Image
          src="/lightining3D.png"
          className="transition duration-300 group-hover:rotate-10"
          alt="Lightning effect"
          height={200}
          width={200}
        />
      </div>
    </Magnet>
  </div>
);

// Main heading component
const MainHeading: React.FC = () => (
  <div className="flex mt-3 items-center justify-center w-fit mx-auto relative">
    <LightningIcon />
    <h1 className="bg-gradient-to-r from-[#e4e4e4] to-[#ababab] text-transparent bg-clip-text font-heading md:text-7xl xl:text-9xl text-4xl uppercase font-bold md:py-1 tracking-wide">
      Creativity Sparks
    </h1>
  </div>
);

// Smile icon component with magnet effect
const SmileIcon: React.FC = () => (
  <Magnet
    padding={100}
    disabled={false}
    magnetStrength={15}
    className="absolute md:-top-7 xl:-top-14 md:right-0 -top-1 -right-1 z-10">
    <div className="group hover:scale-110 md:w-16 md:h-16 xl:w-20 xl:h-20 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center transition duration-300 group-hover:scale-110">
      <Smile className="xl:w-16 xl:h-16 md:w-12 md:h-12 w-8 h-8 text-[#e9e9e9] transition duration-300 group-hover:rotate-30" />
    </div>
  </Magnet>
);

// Subheading component with "Revolution" text
const SubHeading: React.FC = () => (
  <div className="flex items-center justify-center relative mb-5">
    <span className="inline-block text-[#ababab] relative text-4xl tracking-wide font-heading uppercase font-bold md:text-7xl xl:text-9xl">
      Revolution
      <SmileIcon />
      <Image
        className="absolute top-full left-0 w-full"
        src="/curve.png"
        alt="Decorative curve"
        height={28}
        width={624}
      />
    </span>
  </div>
);

// Description text component
const DescriptionText: React.FC = () => {
  const descriptionText =
    "Revolutionizing businesses with modern IT solutions and world-class design.";

  return (
    <div className="flex mt-3 items-center justify-center">
      {/* Desktop version with decryption animation */}
      <DecryptedText
        className="text-gray-400 hidden md:inline-flex md:text-2xl text-center mx-10 md:mx-0"
        encryptedClassName="text-gray-400 opacity-60 md:text-2xl text-center mx-10 md:mx-0"
        text={descriptionText}
        animateOn="hover"
      />
      {/* Mobile version - static text */}
      <p className="text-gray-400 opacity-60 md:text-2xl text-center md:mx-0 md:hidden">
        {descriptionText}
      </p>
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ onCursorEnter, onCursorLeave }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  return (
    <section className={HERO_SECTION_CLASSES}>
      {/* Background circles with parallax effect */}
      <div className={BACKGROUND_CONTAINER_CLASSES}>
        <div
          className="w-full h-full opacity-15"
          style={{ top: "200px", position: "relative" }}>
          <BackgroundCircles parallaxRef={parallaxRef} />
        </div>
      </div>

      {/* Main content container */}
      <div className={MAIN_CONTENT_CLASSES} ref={parallaxRef}>
        <PlatformBadge />

        {/* Interactive heading section */}
        <div onMouseEnter={onCursorEnter} onMouseLeave={onCursorLeave}>
          <MainHeading />
          <SubHeading />
        </div>

        <DescriptionText />
      </div>
    </section>
  );
};

export default Hero;
