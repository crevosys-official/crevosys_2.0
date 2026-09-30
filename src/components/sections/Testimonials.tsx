"use client";
import { ArrowUp, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialsProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

interface Feedback {
  feedback: string;
  sender_profile: string;
  sender_name: string;
  sender_country: string;
  date?: string;
  rating?: number;
}

const DEFAULT_FEEDBACK: Feedback[] = [
  {
    feedback:
      "Working with this team was a fantastic experience! They delivered our project ahead of schedule and exceeded our expectations.",
    sender_profile:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    sender_name: "John Doe",
    sender_country: "USA",
    date: "Oct 24, 2024",
    rating: 5,
  },
  {
    feedback:
      "Their attention to detail and creative approach truly set them apart. Highly recommended for any design needs.",
    sender_profile:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    sender_name: "Robert Johnson",
    sender_country: "Canada",
    date: "Oct 19, 2024",
    rating: 5,
  },
  {
    feedback:
      "Excellent communication and top-notch technical skills. I would definitely work with them again in the future.",
    sender_profile:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    sender_name: "Jane Smith",
    sender_country: "UK",
    date: "Oct 11, 2024",
    rating: 5,
  },
  {
    feedback:
      "They turned our vision into reality with professionalism and creativity. The results speak for themselves!",
    sender_profile:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    sender_name: "Emily Davis",
    sender_country: "Australia",
    date: "Oct 04, 2024",
    rating: 5,
  },
];

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
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

// Rating component - small, clean, and elegant
const StarRating: React.FC<{ rating?: number }> = ({ rating = 5 }) => (
  <div className="flex items-center gap-1">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
    ))}
  </div>
);

// Feedback card component
const FeedbackCard: React.FC<{
  review: Feedback;
  index: number;
  showAll: boolean;
}> = ({ review, index, showAll }) => (
  <motion.div
    className="testimonial-card-item group relative flex flex-col justify-between bg-zinc-900/50 hover:bg-zinc-800/60 border border-white/10 hover:border-white/25 p-6 md:p-7 rounded-2xl mx-4 md:mx-0 backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{
      duration: 0.4,
      delay: showAll ? index * 0.08 : 0,
    }}>
    <div className="flex flex-col">
      {/* Top: Date above the small stars */}
      <div className="flex flex-col gap-1.5 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-400 tracking-wide">
            {review.date || "Oct 2024"}
          </span>
          <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Verified
          </span>
        </div>
        <StarRating rating={review.rating || 5} />
      </div>

      {/* Review feedback text */}
      <p className="text-zinc-300 text-sm leading-relaxed font-normal">
        &ldquo;{review.feedback}&rdquo;
      </p>
    </div>

    <div>
      <hr className="border-white/10 my-4" />
      <div className="flex items-center gap-3">
        <Image
          className="w-10 h-10 object-cover rounded-full ring-2 ring-white/10"
          src={review.sender_profile}
          alt={review.sender_name}
          height={40}
          width={40}
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-white truncate">
            {review.sender_name}
          </h3>
          <p className="text-xs text-zinc-400 truncate">
            {review.sender_country}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials: React.FC<TestimonialsProps> = ({
  onCursorEnter,
  onCursorLeave,
}) => {
  const [feedback, setFeedback] = useState<Feedback[]>(DEFAULT_FEEDBACK);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImage1Ref = useRef<HTMLImageElement>(null);
  const bgImage2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    fetch("/api/feedbacks?active=true")
      .then((res) => res.json())
      .then((resData) => {
        const data = Array.isArray(resData) ? resData : resData?.data;
        if (Array.isArray(data) && data.length > 0) {
          setFeedback(data);
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        }
      })
      .catch((err) => console.error("Failed to load feedback from MongoDB, using defaults:", err));
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

      // 1. Header reveal - snappy & responsive
      tl.fromTo(
        ".testimonial-badge",
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
      )
        .fromTo(
          ".testimonial-title",
          { opacity: 0, y: 25, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.42, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".testimonial-desc",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "-=0.2"
        )
        // 2. Animated Avatars cluster
        .fromTo(
          ".testimonial-avatars",
          { opacity: 0, scale: 0.88, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" },
          "-=0.2"
        )
        // 3. Fast Feedback cards reveal
        .fromTo(
          ".testimonial-card-item",
          { opacity: 0, y: 25, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.35"
        );

      // Decorative parallax
      if (bgImage1Ref.current) {
        gsap.to(bgImage1Ref.current, {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
      if (bgImage2Ref.current) {
        gsap.to(bgImage2Ref.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [feedback.length, showAll] }
  );

  const displayedFeedback = showAll ? feedback : feedback.slice(0, 4);

  return (
    <div ref={sectionRef} className="testimonial-bg bg-zinc-900/25 relative">
      <div className="w-full h-full bg-zinc-900/20 backdrop-blur-3xl py-4">
        {/* Decorative 3D elements */}
        <Image
          ref={bgImage1Ref}
          className="absolute -top-30 hidden md:inline-flex xl:inline-flex -left-30 z-0 pointer-events-none"
          src="/reviews.png"
          width={400}
          height={100}
          alt="reviews"
          loading="lazy"
        />
        <Image
          ref={bgImage2Ref}
          className="absolute -bottom-50 -right-60 z-0 pointer-events-none"
          src="/reviews.png"
          width={700}
          height={100}
          alt="reviews"
          loading="lazy"
        />

        <div className="md:container md:mx-auto xl:container xl:mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 mt-4 pb-2 md:mb-4 xl:mb-4">
            <div className="testimonial-badge border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300">
              <Star className="w-3" />
              Testimonials
            </div>
            <h1 className="testimonial-title text-4xl font-heading tracking-wide text-center text-zinc-200">
              Our Happy Clients
            </h1>
            <p className="testimonial-desc w-fit text-md md:text-lg tracking-wide text-gray-400 text-center flex mx-auto">
              Hear from clients who&apos;ve experienced remarkable
              transformations with crevosys.
            </p>
          </div>

          {/* Animated avatars */}
          <div className="testimonial-avatars flex flex-row items-center justify-center pb-10 w-full">
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
                className="mt-4 px-6 py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-600 transition cursor-pointer"
                onClick={() => setShowAll(true)}>
                More
              </button>
            ) : (
              <button
                className="mt-4 px-6 py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-600 transition flex items-center gap-2 cursor-pointer"
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
