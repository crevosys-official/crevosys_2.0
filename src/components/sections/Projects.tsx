"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ExternalLink, FolderGit2, Star } from "lucide-react";
import { useLenis } from "lenis/react";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import LineSidebar from "./LineSidebar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = projectsData as Project[];

// Unique accent colors and gradients for each folder card
const FOLDER_THEMES = [
  {
    accent: "#8B5CF6", // Violet / Purple
    tabBorder: "border-purple-500/30",
    tabBg: "bg-purple-950/40",
    badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  {
    accent: "#F97316", // Amber / Orange
    tabBorder: "border-orange-500/30",
    tabBg: "bg-orange-950/40",
    badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    glow: "rgba(249, 115, 22, 0.15)",
  },
  {
    accent: "#10B981", // Emerald / Mint
    tabBorder: "border-emerald-500/30",
    tabBg: "bg-emerald-950/40",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  {
    accent: "#06B6D4", // Cyan / Blue
    tabBorder: "border-cyan-500/30",
    tabBg: "bg-cyan-950/40",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    glow: "rgba(6, 182, 212, 0.15)",
  },
  {
    accent: "#EC4899", // Pink / Rose
    tabBorder: "border-pink-500/30",
    tabBg: "bg-pink-950/40",
    badgeBg: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    glow: "rgba(236, 72, 153, 0.15)",
  },
];

interface ProjectsProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onCursorEnter, onCursorLeave }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  const lenis = useLenis();

  // GSAP ScrollTrigger to track active card and update LineSidebar
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Header reveal animation - snappy & responsive
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        ".projects-header-badge",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      )
        .fromTo(
          ".projects-header-title",
          { opacity: 0, y: 24, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.42, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".projects-header-desc",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "-=0.2"
        );

      // ScrollTrigger for each stacked card to detect which one is active
      cardRefs.current.forEach((el, index) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveProjectIndex(index),
          onEnterBack: () => setActiveProjectIndex(index),
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger && cardRefs.current.includes(st.vars.trigger as HTMLDivElement)) {
            st.kill();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [projects.length] }
  );

  // Smooth scroll to selected project card when clicked from LineSidebar
  const handleProjectSelect = (index: number) => {
    setActiveProjectIndex(index);
    const targetElement = cardRefs.current[index];
    if (!targetElement) return;

    // Calculate the top offset matching the sticky stacking position
    const stickyTopOffset = 90 + index * 36;
    const elementRect = targetElement.getBoundingClientRect();
    const targetY = window.scrollY + elementRect.top - stickyTopOffset - 10;

    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="py-24 md:py-32 relative overflow-visible"
      id="portfolio"
      ref={containerRef}
    >
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-14 md:mb-18 text-center">
          <div className="projects-header-badge border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 text-sm">
            <Star className="w-3" />
            Projects
          </div>
          <h1 className="projects-header-title text-4xl font-heading tracking-wide text-center text-zinc-200 px-4">
            Selected Works &amp; Case Studies
          </h1>
          <p className="projects-header-desc xl:w-1/2 md:w-2/3 w-full text-md tracking-wide text-gray-400 text-center flex mx-auto px-4">
            Explore our curated portfolio of recent digital experiences, management systems, and high-impact platforms.
          </p>
        </div>

        {/* Mobile Horizontal Quick Navigation (Visible only on < lg) */}
        <div className="lg:hidden mb-8 overflow-x-auto pb-3 flex items-center gap-2 no-scrollbar">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleProjectSelect(idx)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 border flex items-center gap-2 ${
                activeProjectIndex === idx
                  ? "bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              <span className="opacity-60">{String(idx + 1).padStart(2, "0")}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Two-column Container: Left Stacked Cards + Right LineSidebar */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-14 items-start relative">
          
          {/* Main Column: Stacked Folder Cards */}
          <div className="flex-1 w-full min-w-0 flex flex-col relative pb-20">
            {projects.map((project, index) => {
              const theme = FOLDER_THEMES[index % FOLDER_THEMES.length];
              const isActive = activeProjectIndex === index;
              
              // Folder tab top offset: Each card sticks a little bit lower so previous tabs stay visible!
              const stickyTopOffset = 85 + index * 34;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  style={{
                    top: `${stickyTopOffset}px`,
                    zIndex: index + 1,
                  }}
                  className="sticky mb-16 md:mb-20 transition-all duration-300 will-change-transform"
                  onMouseEnter={() => {
                    if (onCursorEnter) onCursorEnter();
                  }}
                  onMouseLeave={() => {
                    if (onCursorLeave) onCursorLeave();
                  }}
                >
                  {/* Folder Tab Header */}
                  <div className="flex items-end justify-between">
                    {/* The Folder Tab Notch */}
                    <div
                      className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-t-2xl border-t border-x ${theme.tabBorder} ${theme.tabBg} backdrop-blur-xl text-xs font-medium text-white transition-colors duration-300 shadow-lg`}
                      style={{
                        boxShadow: isActive ? `0 -4px 20px ${theme.glow}` : "none",
                      }}
                    >
                      <FolderGit2
                        className="w-3.5 h-3.5 transition-colors duration-300"
                        style={{ color: theme.accent }}
                      />
                      <span className="text-zinc-400 font-semibold tracking-wider uppercase text-[11px]">PROJECT</span>
                      <span
                        className="font-bold px-2 py-0.5 rounded text-xs tracking-wider"
                        style={{
                          backgroundColor: `${theme.accent}25`,
                          color: theme.accent,
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-zinc-600 hidden sm:inline">•</span>
                      <span className="text-zinc-300 tracking-wide hidden sm:inline text-xs font-medium">
                        {project.category}
                      </span>
                    </div>

                    {/* Tab Top-Right Status Badge */}
                    <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 tracking-wider uppercase pb-1.5 px-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: theme.accent }}
                      />
                      <span>Archive // {project.year}</span>
                    </div>
                  </div>

                  {/* Folder Card Body - Full Card Image Showcase */}
                  <div
                    className="relative rounded-2xl rounded-tl-none bg-[#0e1017] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] hover:border-white/20 transition-all duration-300 group overflow-hidden h-[360px] sm:h-[440px] lg:h-[480px] xl:h-[500px]"
                    style={{
                      borderTopColor: isActive ? `${theme.accent}60` : undefined,
                      boxShadow: isActive
                        ? `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px ${theme.glow}`
                        : "0 20px 50px -15px rgba(0,0,0,0.85)",
                    }}
                  >
                    {/* Subtle internal gradient accent line at top of card */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-70 z-20 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, ${theme.accent} 0%, transparent 80%)`,
                      }}
                    />

                    {/* Full Card Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
                      priority={index === 0}
                    />

                    {/* Subtle aesthetic gradient overlay to blend nicely with dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none transition-opacity duration-300 group-hover:opacity-50" />

                    {/* Top: Website Name / Category Badge */}
                    <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-20 flex items-center gap-2 max-w-[calc(100%-40px)]">
                      <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 shadow-xl text-xs sm:text-sm">
                        <span
                          className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                          style={{ backgroundColor: theme.accent }}
                        />
                        <span className="font-semibold text-white tracking-wide truncate">
                          {project.title}
                        </span>
                        <span className="text-zinc-500 font-medium">/</span>
                        <span className="text-zinc-300 tracking-wide truncate text-[11px] sm:text-xs">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Live Preview Button */}
                    <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20">
                      {project.live && project.live !== "#" ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-zinc-100 hover:shadow-[0_12px_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md group/btn"
                        >
                          <span>Live Preview</span>
                          <ExternalLink className="w-4 h-4 text-zinc-800 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      ) : (
                        <button
                          disabled
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 text-zinc-400 font-medium text-xs sm:text-sm tracking-wide backdrop-blur-md border border-white/10 cursor-not-allowed"
                        >
                          <span>Live Preview</span>
                          <ExternalLink className="w-4 h-4 text-zinc-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky LineSidebar with Gap for Menu (Matched Height) */}
          <div className="hidden lg:block w-72 xl:w-80 sticky top-[85px] shrink-0 self-start">
            <div className="h-[518px] xl:h-[538px] p-6 rounded-3xl bg-[#0d0f17]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between">
              
              {/* Sidebar Header */}
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]" />
                    <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">
                      Project Archive
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 tracking-wider font-medium">
                    {String(activeProjectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Instruction subtitle */}
                <p className="text-xs text-gray-400 tracking-wide px-1">
                  Hover or click below to browse:
                </p>
              </div>

              {/* ReactBits LineSidebar Component (Vertically Centered) */}
              <div className="my-auto py-2 flex items-center">
                <LineSidebar
                  items={projects.map((p) => p.title)}
                  accentColor="#A855F7"
                  textColor="#c4c4c4"
                  markerColor="#6c6c6c"
                  showIndex
                  showMarker
                  proximityRadius={100}
                  maxShift={28}
                  falloff="smooth"
                  markerLength={55}
                  markerGap={0}
                  tickScale={0.5}
                  scaleTick
                  itemGap={22}
                  fontSize={0.95}
                  smoothing={100}
                  activeIndex={activeProjectIndex}
                  onItemClick={(index) => handleProjectSelect(index)}
                />
              </div>

              {/* Active Project Footer Card in Sidebar */}
              <div className="pt-3.5 border-t border-white/10 bg-white/[0.02] -mx-2 px-3 py-2.5 rounded-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-zinc-400 uppercase tracking-wider">CURRENT VIEW</span>
                  <span className="text-purple-400 font-medium text-xs tracking-wider">
                    {projects[activeProjectIndex]?.year || "2026"}
                  </span>
                </div>
                <p className="text-sm font-heading tracking-wide text-white mt-1 truncate">
                  {projects[activeProjectIndex]?.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 tracking-wide truncate">
                  {projects[activeProjectIndex]?.category}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
