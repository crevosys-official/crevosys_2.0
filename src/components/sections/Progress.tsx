"use client";

import { StarsIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProgressItem = {
  title: string;
  title_bg: string;
  about: string;
  step_details: string[];
};

const DEFAULT_PROGRESS: ProgressItem[] = [
  {
    title: "Plan",
    title_bg: "#F1AED4",
    about:
      "Planning is crucial at Crevosys. We plan the entire process based on your needs and discuss face-to-face to ensure we fully understand your goals.",
    step_details: [
      "Understand client goals",
      "Gather requirements",
      "Create roadmap",
      "Set timelines and resources",
    ],
  },
  {
    title: "Design",
    title_bg: "#CCEF8E",
    about:
      "Design at Crevosys blends creativity and functionality. We create multiple Figma layouts and prototypes. Once approved, we proceed further.",
    step_details: [
      "Create Figma layouts",
      "Design wireframes & prototypes",
      "Collaborate for feedback",
      "Finalize design after approval",
    ],
  },
  {
    title: "Build",
    title_bg: "#86DFE8",
    about:
      "We turn the approved design into a functional product using top-tier coding practices, ensuring scalability and performance.",
    step_details: [
      "Convert design to code",
      "Develop responsive apps",
      "Test for quality",
      "Deploy and support",
    ],
  },
];

interface ProgressProps {
  onCardHover?: (variant: "plan" | "design" | "build") => void;
  onCursorLeave?: () => void;
}

// css class constants
const headingClass =
  "text-white text-center md:text-7xl xl:text-8xl text-5xl font-heading uppercase font-bold tracking-wide flex flex-col justify-center items-center cursor-pointer";
const flexCenterClass = "flex gap-4 mx-auto justify-center items-center";
const transformContainerClass = "relative";
const curveImageClass = "progress-curve absolute bottom-1 w-full -rotate-1 origin-left";

const Progress: React.FC<ProgressProps> = ({ onCardHover, onCursorLeave }) => {
  const [progressData, setProgressData] = useState<ProgressItem[]>(DEFAULT_PROGRESS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/progress.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch progress data");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProgressData(data);
          ScrollTrigger.refresh();
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // 1. Heading rows reveal - snappy & responsive
      tl.fromTo(
        ".progress-heading-line",
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
        }
      )
        // 2. Underline curve quick overshoot
        .fromTo(
          ".progress-curve",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" },
          "-=0.25"
        )
        // 3. Fast staggered progress cards entrance
        .fromTo(
          ".progress-card-item",
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.35"
        )
        // 4. Sticker title tags pop in snappily
        .fromTo(
          ".progress-tag",
          { scale: 0.6, opacity: 0, rotate: -15 },
          {
            scale: 1,
            opacity: 1,
            rotate: -5,
            duration: 0.35,
            stagger: 0.08,
            ease: "back.out(1.8)",
          },
          "-=0.45"
        );
    },
    { scope: sectionRef, dependencies: [progressData.length] }
  );

  return (
    <section ref={sectionRef} className="py-16 md:container md:mx-auto xl:container xl:mx-auto">
      {/* Heading */}
      <h2 className={headingClass}>
        <span className="progress-heading-line block">How We</span>
        <span className={`${flexCenterClass} progress-heading-line`}>
          <span className={transformContainerClass}>
            <span>Transform</span>
            <Image
              className={curveImageClass}
              src="/curve.webp"
              alt=""
              height={56}
              width={1248}
            />
          </span>

          <span>
            <span>Your</span>
          </span>
        </span>
        <span className="progress-heading-line block">Business</span>
      </h2>

      {loading && (
        <div className="text-center text-white my-10">Loading...</div>
      )}
      {error && <div className="text-center text-red-500 my-10">{error}</div>}

      {!loading && !error && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  justify-between md:p-5 gap-7 mt-20"
          onMouseLeave={onCursorLeave}>
          {progressData.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">
              No progress data available.
            </div>
          ) : (
            progressData.map((progress, index) => {
              const variant = progress.title.toLowerCase() as
                | "plan"
                | "design"
                | "build";
              return (
                <div
                  key={index}
                  className="progress-card-item relative bg-[#191919]/30 border-zinc-300/10 border text-white p-10 mb-10 md:mb-0 xl:mb-0 rounded-xl"
                  onMouseEnter={() => onCardHover?.(variant)}
                  onMouseLeave={onCursorLeave}>
                  <div
                    className="progress-tag w-fit -rotate-5 pt-2 px-4 rounded-md absolute -top-10 flex items-center justify-center"
                    style={{
                      backgroundColor: progress.title_bg || "#fff",
                    }}>
                    <h3 className="font-heading text-[40px] text-black uppercase font-bold">
                      {progress.title || "Untitled"}
                    </h3>
                  </div>
                  <p className="text-md text-gray-400 md:my-8 my-5">
                    {progress.about || "No description provided."}
                  </p>
                  <div>
                    <ul className="flex flex-col gap-3 my-4">
                      {progress.step_details?.length ? (
                        progress.step_details.map((step, idx, arr) => (
                          <li
                            key={idx}
                            className="flex flex-col gap-2 relative pl-6">
                            <div className="flex items-start gap-2">
                              <span className="absolute left-0 top-1">
                                <StarsIcon className="w-4" />
                              </span>
                              <span className="font-heading uppercase text-lg">
                                {step}
                              </span>
                            </div>
                            {idx < arr.length - 1 && (
                              <hr className="border-gray-50/5 my-0.5" />
                            )}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No steps available.</li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </section>
  );
};

export default Progress;
