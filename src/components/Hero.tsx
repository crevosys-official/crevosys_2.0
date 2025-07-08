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

const Hero: React.FC<HeroProps> = ({ onCursorEnter, onCursorLeave }) => {
  const parallaxRef = useRef(null);

  return (
    <section className="relative w-full min-h-[500px] md:min-h-screen xl:min-h-screen  md:pt-20 flex items-center justify-center overflow-hidden md:container md:mx-auto xl:container xl:mx-auto">
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className="w-full h-full opacity-15"
          style={{ top: "200px", position: "relative" }}>
          <BackgroundCircles parallaxRef={parallaxRef} />
        </div>
      </div>

      <div
        className="relative z-10 flex flex-col md:gap-6 justify-center container mx-auto md:-mt-20"
        ref={parallaxRef}>
        <div className="flex mb-5 items-center justify-center">
          <div className=" rounded-full bg-gradient-to-r from-[#D9D9D9] to-[#737373] items-center">
            <div className="flex items-center gap-3 md:py-2 md:px-3 p-2">
              <Image
                className="w-[30px] h-[30px] rounded-2xl"
                src="/elements/star.png"
                width={30}
                height={30}
                alt=""
              />

              <h1 className="text-black font-primary font-semibold text-sm md:text-base">
                Your #1 Platform for IT solution
              </h1>
            </div>
          </div>
        </div>
        <div onMouseEnter={onCursorEnter} onMouseLeave={onCursorLeave}>
          <div className="flex mt-3 items-center justify-center w-fit mx-auto relative">
            <div className="md:w-20 md:h-24 w-12 h-12 absolute md:-top-12 md:-left-16 -top-8 -left-7">
              <Magnet
                padding={100}
                disabled={false}
                magnetStrength={15}
                className="z-10">
                <div className="group hover:scale-110 rounded-full flex items-center justify-center transition duration-300 group-hover:scale-110 ">
                  <Image
                    src="/lightining3D.png"
                    className="transition duration-300 group-hover:rotate-10"
                    alt="light"
                    height={200}
                    width={200}
                  />
                </div>
              </Magnet>
            </div>
            <h1 className="bg-gradient-to-r from-[#e4e4e4] to-[#ababab] text-transparent bg-clip-text font-heading md:text-7xl xl:text-9xl text-5xl uppercase font-bold md:py-1 tracking-wide">
              Creativity Sparks
            </h1>
          </div>
          <div className="flex items-center justify-center relative mb-5">
            <span className="inline-block text-[#ababab] relative text-5çxl tracking-wide font-heading uppercase font-bold md:text-7xl xl:text-9xl text-5xl">
              Revolution
              <Magnet
                padding={100}
                disabled={false}
                magnetStrength={15}
                className="absolute md:-top-7 xl:-top-14 md:right-0 -top-1 -right-1 z-10">
                <div className="group hover:scale-110 md:w-16 md:h-16 xl:w-20 xl:h-20 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center transition duration-300 group-hover:scale-110 ">
                  <Smile className="xl:w-16 xl:h-16 md:w-12 md:h-12 w-8 h-8 text-[#e9e9e9] transition duration-300 group-hover:rotate-30" />
                </div>
              </Magnet>
              <Image
                className="absolute top-full left-0 w-full"
                src="/curve.png"
                alt="curve"
                height={28}
                width={624}
              />
            </span>
          </div>
        </div>
        <div className="flex mt-3 items-center justify-center">
          <DecryptedText
            className="text-gray-400 hidden md:inline-flex md:text-2xl text-center mx-10 md:mx-0"
            encryptedClassName="text-gray-400 opacity-60 md:text-2xl text-center mx-10 md:mx-0"
            text="Revolutionizing businesses with modern IT solutions and world-class
            design."
            animateOn="hover"
          />
          <p className="text-gray-400 opacity-60 md:text-2xl text-center md:mx-0 md:hidden">
            Revolutionizing businesses with modern IT solutions and world-class
            design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
