/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const Testimonials = () => {
  const [feedback, setFeedback] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/feedback.json")
      .then((res) => res.json())
      .then((data) => setFeedback(data))
      .catch((err) => console.error("Failed to load feedback:", err));
  }, []);

  const displayedFeedback = showAll ? feedback : feedback.slice(0, 4);

  return (
    <div className="testimonial-bg rounded-md bg-zinc-900/25 relative">
      <div className=" w-full h-full bg-zinc-900/20 backdrop-blur-3xl rounded-md py-4">
        {/* 3d elements - place these first, with low z-index */}
        <Image
          className="absolute -top-30 -left-30 z-0"
          src="/reviews.png"
          width={400}
          height={100}
          alt="reviews"
        />
        <Image
          className="absolute -bottom-50 -right-60 z-0"
          src="/reviews.png"
          width={700}
          height={100}
          alt="reviews"
        />

        <div className="md:container md:mx-auto xl:container xl:mx-auto">
          <div className=" flex flex-col gap-4 mt-4 pb-4 md:mb-4 xl:mb-4 ">
            <div className=" border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5  rounded-full gap-2 items-center text-zinc-300">
              <Star className=" w-3" />
              Testimonials
            </div>

            <h1 className="text-4xl font-heading tracking-wide text-center text-zinc-200">
              Our Happy Clients
            </h1>
            <p className=" xl:w-1/2 md:w-1/2 w-full text-md tracking-wide text-gray-400 text-center flex mx-auto">
              Hear from clients who&apos;ve experienced remarkable
              transformations with crevosys.
            </p>
          </div>

          <div>
            <div className="flex flex-row items-center justify-center pb-10 w-full">
              <AnimatedTooltip items={people} />
            </div>
          </div>
        </div>

        {/* feedback cards */}
        <div className="z-20 relative">
          {feedback.length > 0 ? (
            <>
              <div className="flex flex-wrap justify-center gap-4 pb-10">
                <AnimatePresence>
                  {displayedFeedback.map((review: any, index: number) => (
                    <motion.div
                      key={index}
                      className="bg-zinc-800/30 border border-zinc-300/20 p-10 rounded-md w-72 flex flex-col justify-between backdrop-blur-md"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 40 }}
                      transition={{ duration: 0.4, delay: showAll ? index * 0.08 : 0 }}
                    >
                      <p className="text-zinc-400 pb-5">
                        &quot;{review.feedback}&quot;
                      </p>
                      <hr className=" border-zinc-200/10 border my-2" />
                      <div className="text-sm text-zinc-400">
                        <div className="flex gap-4 items-center">
                          <Image
                            className=" w-10 h-10 object-cover rounded-full"
                            src={review.sender_profile}
                            alt="profile"
                            height={80}
                            width={80}
                          />
                          <div>
                            <h1 className=" text-lg font-bold text-white">
                              {review.sender_name}
                            </h1>
                            <p>{review.sender_country}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {!showAll && feedback.length > 4 && (
                <div className="flex justify-center pb-8">
                  <button
                    className="mt-4 px-6 py-2 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition"
                    onClick={() => setShowAll(true)}
                  >
                    More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-zinc-400">No feedback yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
