"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import ProjectModal from "./ProjectModal";

// Cast the imported JSON to the Project type array
const projects = projectsData as Project[];

interface ProjectsProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onCursorEnter, onCursorLeave }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imgElement = imageRef.current;
    if (!container || !imgElement) return;

    //  gsap
    const xMove = gsap.quickTo(imgElement, "x", { duration: 0.6, ease: "power3" });
    const yMove = gsap.quickTo(imgElement, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const imgWidth = imgElement.offsetWidth || 300;
      const imgHeight = imgElement.offsetHeight || 300;
      const x = e.clientX - imgWidth / 2;
      const y = e.clientY - imgHeight / 2;
      
      xMove(x);
      yMove(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="py-24 relative" id="portfolio" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Featured Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl"
          >
            A selection of our most recent and successful projects. We craft digital experiences that drive growth and innovation.
          </motion.p>
        </div>

        <div className="flex flex-col border-t border-white/10 mt-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative border-b border-white/10 py-12 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between z-20"
              onMouseEnter={() => {
                setHoveredProject(index);
                if (onCursorEnter) onCursorEnter();
              }}
              onMouseLeave={() => {
                setHoveredProject(null);
                if (onCursorLeave) onCursorLeave();
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Left text column relative to list item */}
              <div className="flex flex-col pointer-events-none">
                <span className="text-indigo-400 text-sm font-semibold tracking-widest mb-3 block md:hidden">
                  {project.category.toUpperCase()}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-orange-500 transition-all duration-300 transform group-hover:translate-x-6 drop-shadow-xl">
                  {project.title}
                </h3>
              </div>
              
              {/* Right content - reveals more clearly on hover */}
              <div className="hidden md:flex items-center gap-12 pointer-events-none transition-all duration-300 group-hover:-translate-x-6">
                <span className="text-gray-400 text-lg">{project.category}</span>
                <span className="text-white/40 text-lg font-light">{project.year}</span>
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-colors duration-300">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GSAP Floating Image Setup - Strictly follows pointer and transitions opacity */}
      <div
        ref={imageRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] w-[240px] h-[180px] md:w-[350px] md:h-[260px] overflow-hidden rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.6)] flex items-center justify-center will-change-transform"
        style={{
          opacity: hoveredProject !== null ? 1 : 0,
          visibility: hoveredProject !== null ? 'visible' : 'hidden',
          transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s ease",
        }}
      >
        {/* Ensures the scale wrapper allows a slight inner zoom effect if desired */}
        <div className="relative w-full h-full bg-zinc-900 border border-white/10 scale-105">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: hoveredProject === i ? 1 : 0 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 240px, 350px"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
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
