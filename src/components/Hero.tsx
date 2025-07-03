import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col md:gap-6 justify-center mt-12 container mx-auto">
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
      <div className="flex mt-3 items-center justify-center">
        <h1 className="bg-gradient-to-r from-[#e4e4e4] to-[#ababab] text-transparent bg-clip-text font-secondary md:text-9xl text-5xl font-semibold tracking-wider">
          Creativity Sparks <br />{" "}
          <span className="mt-3 items-center justify-center flex">
            Revolution
          </span>{" "}
        </h1>
      </div>
      <div className="flex mt-3 items-center justify-center">
        <p className="text-gray-400 md:text-2xl text-center mx-10 md:mx-0">
          Revolutionizing businesses with modern IT solutions and world-class
          design.
        </p>
      </div>
      <div className="flex md:mt-10 mt-5 items-center justify-center"></div>
    </div>
  );
};

export default Hero;
