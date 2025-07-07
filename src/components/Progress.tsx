import { data } from "framer-motion/client";
import { Star, StarsIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const headingClass =
  "text-white text-center text-7xl font-heading uppercase font-bold tracking-wide flex flex-col justify-center items-center cursor-pointer";
const flexCenterClass = "flex gap-4 mx-auto justify-center items-center";
const transformContainerClass = "relative";
const curveImageClass = "absolute bottom-1 w-full -rotate-1";

const Progress = () => {
  const [progressData, setProgressData] = useState<never[]>([]);

  useEffect(() => {
    fetch("/progress.json")
      .then((res) => res.json())
      .then((data) => setProgressData(data));
  }, []);

  return (
    <section className="py-16 md:container md:mx-auto xl:container xl:mx-auto">
      {/* Heading */}
      <div className={headingClass}>
        <h1>How We</h1>
        <div className={flexCenterClass}>
          {/* "Transform" with curve underline */}
          <div className={transformContainerClass}>
            <h1>Transform</h1>
            <Image
              className={curveImageClass}
              src="/curve.png"
              alt="curve"
              height={100}
              width={100}
            />
          </div>
          {/* "Your" */}
          <div>
            <h1>Your</h1>
          </div>
        </div>
        <h1>Business</h1>
      </div>

      {/* cards content */}
      <div className="grid grid-cols-3 justify-between p-5 gap-7 mt-20">
        {progressData.map((progress, index) => (
          <div
            key={index}
            className=" relative bg-[#191919]/30 border-zinc-300/10 border text-white p-10 rounded-xl">
            <div
              className=" w-fit -rotate-5 pt-2 px-4 rounded-md absolute -top-10 flex items-center justify-center"
              style={{
                backgroundColor: (progress as { title_bg?: string }).title_bg,
              }}>
              <h1 className="font-heading text-[40px] text-black uppercase font-bold">
                {(progress as { title?: string }).title}
              </h1>
            </div>
            <p className=" text-md text-gray-400 my-5">
              {(progress as { about?: string }).about}
            </p>
            <div>
              <ul className=" flex flex-col gap-3 my-4">
                {(progress as { step_details?: string[] }).step_details?.map(
                  (step, idx, arr) => (
                    <li key={idx} className="flex flex-col gap-2 relative pl-6">
                      <div className="flex items-start gap-2">
                        <span className="absolute left-0 top-1">
                          <StarsIcon className=" w-4" />
                        </span>
                        <span className=" font-heading uppercase text-lg">
                          {step}
                        </span>
                      </div>

                      {idx < arr.length - 1 && (
                        <hr className="border-gray-50/5 my-0.5" />
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Progress;
