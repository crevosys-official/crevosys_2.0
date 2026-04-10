"use client";
import { ArrowUp, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialsProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

interface Feedback {
  feedback: string;
  sender_profile: string;
  sender_name: string;
  sender_country: string;
}

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

// rating component
const StarRating: React.FC = () => (
  <span className="flex gap-1 items-center my-3 bg-zinc-700/50 w-fit p-2 rounded-full text-md">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 text-[#FF8905] fill-[#FF8905]" />
    ))}
  </span>
);

// Feedback card component with gsap
const FeedbackCard: React.FC<{
  review: Feedback;
  index: number;
  showAll: boolean;
}> = ({ review, index, showAll }) => (
  <motion.div
    className="bg-zinc-800/30 border border-white/40 p-12 rounded-xl md:w-full mx-5 md:mx-0 xl:mx-0  backdrop-blur-md"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{
      duration: 0.4,
      delay: showAll ? index * 0.08 : 0,
    }}>
    <StarRating />
    <p className="text-zinc-400 pb-5">{review.feedback}</p>
    <hr className="border-zinc-200/10 border my-2" />
    <div className="text-sm text-zinc-400">
      <div className="flex gap-4 items-center">
        <Image
          className="w-10 h-10 object-cover rounded-full"
          src={review.sender_profile}
          alt="profile"
          height={80}
          width={80}
          loading="lazy"
        />
        <div>
          <h1 className="text-lg font-bold text-white">{review.sender_name}</h1>
          <p>{review.sender_country}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials: React.FC<TestimonialsProps> = ({
  onCursorEnter,
  onCursorLeave,
}) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/feedback.json")
      .then((res) => res.json())
      .then((data) => setFeedback(data))
      .catch((err) => console.error("Failed to load feedback:", err));
  }, []);

  const displayedFeedback = showAll ? feedback : feedback.slice(0, 4);

  return (
    <div className="testimonial-bg bg-zinc-900/25 relative">
      <div className="w-full h-full bg-zinc-900/20 backdrop-blur-3xl py-4">
        {/* Decorative 3D elements */}
        <Image
          className="absolute -top-30 hidden md:inline-flex xl:inline-flex -left-30 z-0"
          src="/reviews.png"
          width={400}
          height={100}
          alt="reviews"
          loading="lazy"
        />
        <Image
          className="absolute -bottom-50 -right-60 z-0"
          src="/reviews.png"
          width={700}
          height={100}
          alt="reviews"
          loading="lazy"
        />

        <div className="md:container md:mx-auto xl:container xl:mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 mt-4 pb-2 md:mb-4 xl:mb-4">
            <div className="border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300">
              <Star className="w-3" />
              Testimonials
            </div>
            <h1 className="text-4xl font-heading tracking-wide text-center text-zinc-200">
              Our Happy Clients
            </h1>
            <p className="w-fit text-md md:text-lg tracking-wide text-gray-400 text-center flex mx-auto">
              Hear from clients who&apos;ve experienced remarkable
              transformations with crevosys.
            </p>
          </div>

          {/* Animated avatars */}
          <div className="flex flex-row items-center justify-center pb-10 w-full">
            <AnimatedTooltip items={people} />
          </div>
        </div>

        {/* Feedback cards */}
        <div
          className="z-20 relative"
          onMouseEnter={onCursorEnter}
          onMouseLeave={onCursorLeave}>
          {feedback.length > 0 ? (
            <div className="justify-center gap-4 pb-8 md:px-10  mx-auto my-auto grid md:grid-cols-2 xl:grid-cols-4 grid-cols-1">
              <AnimatePresence>
                {displayedFeedback.map((review, index) => (
                  <FeedbackCard
                    key={index}
                    review={review}
                    index={index}
                    showAll={showAll}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center text-zinc-400">No feedback yet.</div>
          )}
        </div>

        {/* Show more/less buttons */}
        {feedback.length > 4 && (
          <div className="flex justify-center pb-8">
            {!showAll ? (
              <button
                className="mt-4 px-6 py-2 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition"
                onClick={() => setShowAll(true)}>
                More
              </button>
            ) : (
              <button
                className="mt-4 px-6 py-2 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition flex items-center gap-2"
                onClick={() => setShowAll(false)}>
                <ArrowUp />
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
