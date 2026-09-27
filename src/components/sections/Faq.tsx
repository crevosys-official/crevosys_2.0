"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { CircleHelp, MailQuestion, MessageCircleQuestionMark, Star } from "lucide-react";

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

const TYPING_WIDTH = 84;
const TYPING_HEIGHT = 52;

function TypingDots({ dotColor = "bg-zinc-400" }: { dotColor?: string }) {
  return (
    <div className="typing-indicator absolute inset-0 flex items-center justify-center gap-1.5 pointer-events-none">
      <span className={`w-2 h-2 rounded-full ${dotColor} animate-typing-pulse`} />
      <span
        className={`w-2 h-2 rounded-full ${dotColor} animate-typing-pulse`}
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className={`w-2 h-2 rounded-full ${dotColor} animate-typing-pulse`}
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
}

export default function ScrollFaq({ items = DEFAULT_FAQS }: { items?: FAQItemData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Lenis Smooth Scrolling integration
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);
      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // Helper to measure native rendered bubble dimensions
      const measureBubble = (msg: HTMLElement) => {
        const content = msg.querySelector<HTMLElement>(".faq-content");
        const typing = msg.querySelector<HTMLElement>(".typing-indicator");
        const paragraphs = content ? content.querySelectorAll("p") : [];

        gsap.set(msg, { clearProps: "all" });
        if (content) {
          gsap.set(content, { clearProps: "all" });
          content.style.width = "";
          content.style.flexShrink = "";
        }
        if (paragraphs.length) gsap.set(paragraphs, { clearProps: "all" });
        if (typing) gsap.set(typing, { clearProps: "all" });

        const rect = msg.getBoundingClientRect();
        const contentRect = content ? content.getBoundingClientRect() : null;

        return {
          width: Math.ceil(rect.width),
          height: Math.ceil(rect.height),
          contentWidth: contentRect ? Math.ceil(contentRect.width) : Math.ceil(rect.width),
        };
      };

      const initAnimations = () => {
        // Animate Section Header
        gsap.fromTo(
          ".faq-header",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "sine.out",
            scrollTrigger: {
              trigger: ".faq-header",
              start: "top 85%",
              end: "top 60%",
              scrub: 1.2,
            },
          }
        );

        const faqItems = gsap.utils.toArray<HTMLElement>(".faq-item");
        const itemSizes: Array<{
          qSize: { width: number; height: number; contentWidth: number };
          aSize: { width: number; height: number; contentWidth: number };
        }> = [];

        // Pre-measure and lock content widths to avoid wrapping jitter
        faqItems.forEach((item) => {
          const qMsg = item.querySelector<HTMLElement>(".faq-question");
          const aMsg = item.querySelector<HTMLElement>(".faq-answer");
          if (!qMsg || !aMsg) return;

          const qSize = measureBubble(qMsg);
          const aSize = measureBubble(aMsg);

          const qContent = qMsg.querySelector<HTMLElement>(".faq-content");
          const aContent = aMsg.querySelector<HTMLElement>(".faq-content");
          if (qContent) {
            qContent.style.width = `${qSize.contentWidth}px`;
            qContent.style.flexShrink = "0";
          }
          if (aContent) {
            aContent.style.width = `${aSize.contentWidth}px`;
            aContent.style.flexShrink = "0";
          }

          itemSizes.push({ qSize, aSize });
        });

        // Set Initial Collapsed States
        faqItems.forEach((item) => {
          const qMsg = item.querySelector<HTMLElement>(".faq-question");
          const aMsg = item.querySelector<HTMLElement>(".faq-answer");
          if (!qMsg || !aMsg) return;

          const qTyping = qMsg.querySelector<HTMLElement>(".typing-indicator");
          const qContent = qMsg.querySelector<HTMLElement>(".faq-content");
          const aTyping = aMsg.querySelector<HTMLElement>(".typing-indicator");
          const aContent = aMsg.querySelector<HTMLElement>(".faq-content");
          const aParagraphs = aContent ? aContent.querySelectorAll("p") : [];

          gsap.set(qMsg, {
            width: TYPING_WIDTH,
            height: TYPING_HEIGHT,
            opacity: 0,
            scale: 0.3,
            transformOrigin: "bottom left",
          });

          gsap.set(aMsg, {
            width: TYPING_WIDTH,
            height: TYPING_HEIGHT,
            opacity: 0,
            scale: 0.3,
            transformOrigin: "bottom right",
          });

          gsap.set([qTyping, aTyping], { opacity: 1, scale: 1 });
          gsap.set([qContent, aContent], { opacity: 0 });
        });

        // Master Timeline linked to Scroll
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 75%",
            end: "bottom 15%",
            scrub: 1.2,
          },
        });

        faqItems.forEach((item, index) => {
          const sizes = itemSizes[index];
          if (!sizes) return;

          const qMsg = item.querySelector<HTMLElement>(".faq-question");
          const aMsg = item.querySelector<HTMLElement>(".faq-answer");
          if (!qMsg || !aMsg) return;

          const qTyping = qMsg.querySelector<HTMLElement>(".typing-indicator");
          const qContent = qMsg.querySelector<HTMLElement>(".faq-content");
          const aTyping = aMsg.querySelector<HTMLElement>(".typing-indicator");
          const aContent = aMsg.querySelector<HTMLElement>(".faq-content");

          const { qSize, aSize } = sizes;

          // Question Animation
          masterTl.to(qMsg, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
          masterTl.to({}, { duration: 0.6 }); // Dwell on typing indicator
          masterTl.addLabel(`qExpand_${index}`);
          masterTl.to(
            qMsg,
            { width: qSize.width, height: qSize.height, duration: 3.2, ease: "sine.inOut" },
            `qExpand_${index}`
          );
          masterTl.to(
            qTyping,
            { opacity: 0, scale: 0.6, duration: 1.0, ease: "sine.inOut" },
            `qExpand_${index}+=0.5`
          );
          masterTl.fromTo(
            qContent,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 1.5, ease: "sine.out" },
            `qExpand_${index}+=0.8`
          );

          masterTl.to({}, { duration: 0.3 }); // Conversational breath

          // Answer Animation (identical expand & word reveal to question)
          masterTl.to(aMsg, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
          masterTl.to({}, { duration: 0.6 }); // Dwell on typing indicator
          masterTl.addLabel(`aExpand_${index}`);
          masterTl.to(
            aMsg,
            { width: aSize.width, height: aSize.height, duration: 3.2, ease: "sine.inOut" },
            `aExpand_${index}`
          );
          masterTl.to(
            aTyping,
            { opacity: 0, scale: 0.6, duration: 1.0, ease: "sine.inOut" },
            `aExpand_${index}+=0.5`
          );
          masterTl.fromTo(
            aContent,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 1.5, ease: "sine.out" },
            `aExpand_${index}+=0.8`
          );

          if (index < faqItems.length - 1) {
            masterTl.to({}, { duration: 0.4 });
          }
        });

        ScrollTrigger.refresh();
      };

      if (document.fonts?.ready) {
        document.fonts.ready.then(initAnimations);
      } else {
        initAnimations();
      }

      // Cleanup ticker & Lenis instance on unmount
      return () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-10 md:py-16 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient background glow to match app theme and card colors */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#071FA9]/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#D79DBA]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Small Header matched with other sections */}
      <div className="faq-header flex flex-col gap-4 mb-16 md:mb-24 text-center">
        <div className="projects-header-badge border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 text-sm">
          <MessageCircleQuestionMark className="w-3" />
          Frequently Asked Questions
        </div>
        <h1 className="projects-header-title text-4xl sm:text-5xl font-heading tracking-wide text-center text-zinc-200 px-4">
          Frequently Asked Questions
        </h1>
        <p className="projects-header-desc text-md tracking-wide text-gray-400 text-center mx-auto px-4">
          Got questions? We’ve got answers.
        </p>
      </div>

      <div className="faq-list w-full max-w-5xl flex flex-col gap-10 md:gap-12 mx-auto">
        {items.map((item, idx) => (
          <div key={idx} className="faq-item flex flex-col gap-5 w-full">
            {/* Question Bubble (#071FA9, Left-aligned) */}
            <div className="flex justify-start">
              <div className="faq-question relative overflow-hidden bg-[#071FA9] border border-blue-400/30 text-white shadow-[0_8px_32px_rgba(7,31,169,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] px-6 py-5 md:px-7 md:py-5 rounded-2xl md:rounded-3xl rounded-bl-sm max-w-[88%] sm:max-w-[75%] backdrop-blur-md will-change-[width,height,transform]">
                <TypingDots dotColor="bg-white" />
                <div className="faq-content w-max max-w-full flex flex-col gap-2">
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
              <div className="faq-answer relative overflow-hidden bg-[#D79DBA] border border-white/30 text-zinc-950 shadow-[0_8px_32px_rgba(215,157,186,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] px-6 py-5 md:px-7 md:py-5 rounded-2xl md:rounded-3xl rounded-br-sm w-full sm:w-[80%] md:w-[75%] backdrop-blur-md will-change-[width,height,transform]">
                <TypingDots dotColor="bg-zinc-900" />
                <div className="faq-content w-max max-w-full flex flex-col gap-2">
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
