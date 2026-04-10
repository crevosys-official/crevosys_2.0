"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// The project data includes a thumbnail that will trail the cursor
const projects = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    year: "2024"
  },
  {
    id: 2,
    title: "E-Commerce App",
    category: "Mobile Design",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    year: "2023"
  },
  {
    id: 3,
    title: "Real Estate Hub",
    category: "Platform",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    year: "2023"
  },
  {
    id: 4,
    title: "AI Saas Landing",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    year: "2024"
  },
];

interface ProjectsProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onCursorEnter, onCursorLeave }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imgElement = imageRef.current;
    if (!container || !imgElement) return;

    // Use gsap.quickTo for high-performance following of the mouse cursor
    const xMove = gsap.quickTo(imgElement, "x", { duration: 0.6, ease: "power3" });
    const yMove = gsap.quickTo(imgElement, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Find the center of the image element and apply offset so it perfectly tracks the cursor
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
            >
              {/* Left text column relative to list item */}
              <div className="flex flex-col pointer-events-none">
                <span className="text-indigo-400 text-sm font-semibold tracking-widest mb-3 block md:hidden">
                  {project.category.toUpperCase()}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-white transition-all duration-300 transform group-hover:translate-x-6 drop-shadow-xl">
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
        className="fixed top-0 left-0 pointer-events-none z-[100] w-[300px] h-[220px] md:w-[450px] md:h-[330px] overflow-hidden rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.6)] flex items-center justify-center will-change-transform"
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
                sizes="(max-width: 768px) 300px, 450px"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
