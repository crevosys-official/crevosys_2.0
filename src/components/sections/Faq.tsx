"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageCircleQuestionMark } from "lucide-react";
import { prefersReducedMotion } from "@/lib/animation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface FAQItemData {
  question: string;
  answers: string[];
}

const DEFAULT_FAQS: FAQItemData[] = [
  {
    question: "What core services does CrevoSys specialize in?",
    answers: [
      "We deliver full-cycle digital solutions across four key pillars.",
      "Custom Web & App Development, UI/UX Design, AI Automation, and Growth Marketing.",
      "We turn complex business challenges into seamless, high-converting digital products.",
    ],
  },
  {
    question: "How does your agency manage project delivery?",
    answers: [
      "We run a proven 3-phase methodology: Plan, Design, and Build.",
      "You receive transparent async updates via dedicated boards, regular live syncs, and milestone demos.",
      "We collaborate seamlessly across global timezones with clear timelines and reliable deliverables.",
    ],
  },
  {
    question: "Can you build custom AI automations for our business?",
    answers: [
      "Yes. We engineer bespoke AI agents, intelligent workflows, and custom API integrations.",
      "From streamlining repetitive operations to modernizing legacy systems, we save hundreds of hours.",
      "Every solution is securely developed to integrate smoothly with your existing tools.",
    ],
  },
  {
    question: "Who owns the code and assets once the project ships?",
    answers: [
      "You do, 100%. All source code, Figma files, databases, and accounts transfer to you upon handover.",
      "Every project includes 30 days of complimentary post-launch support and performance optimization.",
      "We remain your long-term technology partner whenever you need scaling or new features.",
    ],
  },
];

export default function ScrollFaq({ items = DEFAULT_FAQS }: { items?: FAQItemData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (prefersReducedMotion()) return;

      // 1. Header Reveal
      gsap.fromTo(
        ".faq-header",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 2. Chat Bubble Conversational Reveals
      const faqItems = gsap.utils.toArray<HTMLElement>(".faq-item");
      faqItems.forEach((item) => {
        const qBubble = item.querySelector<HTMLElement>(".faq-question");
        const aBubble = item.querySelector<HTMLElement>(".faq-answer");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });

        if (qBubble) {
          tl.fromTo(
            qBubble,
            { opacity: 0, y: 30, x: -24, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.65,
              ease: "back.out(1.15)",
            }
          );
        }

        if (aBubble) {
          tl.fromTo(
            aBubble,
            { opacity: 0, y: 30, x: 24, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.65,
              ease: "back.out(1.15)",
            },
            "-=0.32"
          );
        }
      });
    },
    { scope: containerRef, dependencies: [items.length] }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-10 md:py-16 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient background glow to match app theme and card colors */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#071FA9]/15 blur-2xl md:blur-[120px] transform-gpu rounded-full pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#D79DBA]/10 blur-2xl md:blur-[120px] transform-gpu rounded-full pointer-events-none -z-10" />

      {/* Small Header matched with other sections */}
      <div className="faq-header flex flex-col gap-4 mb-16 md:mb-24 text-center">
        <div className="projects-header-badge border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 text-sm">
          <MessageCircleQuestionMark className="w-3" />
          Frequently Asked Questions
        </div>
        <h2 className="projects-header-title text-4xl sm:text-5xl font-heading tracking-wide text-center text-zinc-200 px-4">
          Frequently Asked Questions
        </h2>
        <p className="projects-header-desc text-md tracking-wide text-gray-400 text-center mx-auto px-4">
          Got questions? We’ve got answers.
        </p>
      </div>

      <div className="faq-list w-full max-w-5xl flex flex-col gap-10 md:gap-12 mx-auto">
        {items.map((item, idx) => (
          <div key={idx} className="faq-item flex flex-col gap-5 w-full">
            {/* Question Bubble (#071FA9, Left-aligned) */}
            <div className="flex justify-start">
              <div className="faq-question relative overflow-hidden bg-[#071FA9] border border-blue-400/30 text-white shadow-[0_8px_32px_rgba(7,31,169,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] px-6 py-5 md:px-7 md:py-5 rounded-2xl md:rounded-3xl rounded-bl-sm max-w-[88%] sm:max-w-[75%] backdrop-blur-md will-change-transform transform-gpu">
                <div className="faq-content w-full max-w-full flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-200">
                    Question
                  </span>
                  <p className="font-semibold text-sm md:text-base leading-snug text-white">
                    {item.question}
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Bubble (#D79DBA, Right-aligned) */}
            <div className="flex justify-end w-full">
              <div className="faq-answer relative overflow-hidden bg-[#D79DBA] border border-white/30 text-zinc-950 shadow-[0_8px_32px_rgba(215,157,186,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] px-6 py-5 md:px-7 md:py-5 rounded-2xl md:rounded-3xl rounded-br-sm w-full sm:w-[80%] md:w-[75%] backdrop-blur-md will-change-transform transform-gpu">
                <div className="faq-content w-full max-w-full flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-950/80">
                    CrevoSys
                  </span>
                  {item.answers.map((ans, aIdx) => (
                    <p
                      key={aIdx}
                      className="font-medium text-sm md:text-base leading-snug text-zinc-900"
                    >
                      {ans}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
