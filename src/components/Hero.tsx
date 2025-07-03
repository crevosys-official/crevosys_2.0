import React from 'react'

const Hero = () => {
  return (
    <div className="flex flex-col gap-3 justify-center mt-12 container mx-auto">
      <div className="flex mb-5 items-center justify-center">
        <div className=" rounded-full bg-gradient-to-r from-[#D9D9D9] to-[#737373] items-center">
          <div className="flex items-center gap-3 md:py-2 md:px-3 p-2">
            <img
              className="w-[30px] h-[30px] rounded-2xl"
              src="/elements/star.png"
              alt=""
            />
            <h1 className="text-black font-semibold text-sm md:text-base">
              Your #1 Platform for IT solution
            </h1>
            
          </div>
        </div>
      </div>
      <div className="flex mt-3 items-center justify-center">
        <h1 className="text-white font-secondary md:text-8xl text-4xl font-semibold tracking-wide">
          Creativity Sparks <br />{" "}
          <span className="mt-3 items-center justify-center flex">
            Revolution
          </span>{" "}
        </h1>
      </div>
      <div className="flex mt-3 items-center justify-center">
        <p className="text-gray-400 md:text-lg text-center">
          Revolutionising businesses with modern IT solutions and world-class
          design.
        </p>
      </div>
      <div className="flex md:mt-10 mt-5 items-center justify-center">
        <div className="rounded-full bg-gradient-to-r from-[#FFB16B] to-[#996A40] md:p-3 p-2 text-white">
          <p className="font-semibold text-black">Meet Our Founders</p>
        </div>
      </div>
    </div>
  )
}

export default Hero