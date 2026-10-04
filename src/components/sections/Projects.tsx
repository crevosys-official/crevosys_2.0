"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ExternalLink, Star, ArrowUpRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import ProjectModal from "./ProjectModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onCursorEnter, onCursorLeave }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>(projectsData as Project[]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/projects?active=true")
      .then((res) => res.json())
      .then((resData) => {
        const items = Array.isArray(resData) ? resData : resData?.data;
        if (Array.isArray(items) && items.length > 0) {
          setProjects(items);
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch projects from MongoDB, using defaults:", err);
      });
  }, []);

  // GSAP reveal for section header
  useGSAP(
    () => {
      if (!containerRef.current) return;

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
    },
    { scope: containerRef }
  );

  return (
    <section
      className="pt-6 sm:pt-12 md:pt-16 lg:pt-28 pb-6 sm:pb-8 md:pb-0 relative overflow-visible"
      id="portfolio"
      ref={containerRef}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 md:mb-24 text-center">
          <div className="projects-header-badge border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 text-sm">
            <Star className="w-3" />
            Projects
          </div>
          <h2 className="projects-header-title text-4xl sm:text-5xl font-heading tracking-wide text-center text-zinc-200 px-4">
            Selected Works &amp; Case Studies
          </h2>
          <p className="projects-header-desc xl:w-1/2 md:w-2/3 w-full text-md tracking-wide text-gray-400 text-center flex mx-auto px-4">
            Explore our curated portfolio of recent digital experiences, management systems, and high-impact platforms.
          </p>
        </div>

        {/* Scroll Card Stack Container */}
        <div className="relative pb-24 sm:pb-32 flex flex-col">
          {projects.map((project, index) => {
            // Calculated sticky top offset so each stacked card layers cleanly
            const stickyTop = 85 + index * 26;

            return (
              <div
                key={project._id || project.id || index}
                style={{
                  top: `${stickyTop}px`,
                  zIndex: index + 1,
                }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => {
                  if (onCursorEnter) onCursorEnter();
                }}
                onMouseLeave={() => {
                  if (onCursorLeave) onCursorLeave();
                }}
                className="sticky mb-16 sm:mb-20 md:mb-24 last:mb-0 group relative h-[380px] sm:h-[480px] md:h-[560px] lg:h-[620px] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0e1017] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] hover:border-white/25 hover:shadow-[0_30px_70px_-15px_rgba(168,85,247,0.2)] transition-all duration-500 cursor-pointer will-change-transform"
              >
                {/* Default State: Clean Image edge-to-edge */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1150px"
                  priority={index < 2}
                />

                {/* Subtle vignette gradient to integrate with dark background */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-60 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />

                {/* Hover Overlay: Dark blurred glass revealing information */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out p-6 sm:p-10 md:p-12 flex flex-col justify-between z-10">
                  
                  {/* Top: Category pill & Year/Index */}
                  <div className="flex items-center justify-between gap-3 transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs sm:text-sm font-medium text-zinc-200">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      <span>{project.category}</span>
                    </div>

                    <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wider bg-black/60 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                      {project.year} • 0{index + 1}
                    </span>
                  </div>

                  {/* Bottom: Information & Action Links */}
                  <div className="flex flex-col gap-3.5 sm:gap-4.5 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out max-w-3xl">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading tracking-wide text-white">
                      {project.title}
                    </h3>

                    <p className="text-zinc-300 text-xs sm:text-base line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(project.tech || []).map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 border border-white/10 text-zinc-300 backdrop-blur-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-3">
                      {project.live && project.live !== "#" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Live preview of ${project.title}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white text-zinc-950 font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:bg-zinc-100 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <span>Live Preview</span>
                          <ExternalLink className="w-4 h-4 text-zinc-900" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        aria-label={`View case study for ${project.title}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white/10 text-white font-medium text-xs sm:text-sm tracking-wide border border-white/15 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/30 cursor-pointer"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-300" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
