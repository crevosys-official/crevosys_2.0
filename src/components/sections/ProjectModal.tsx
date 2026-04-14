"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { Project } from "@/types/project";

interface ModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ModalProps> = ({ project, onClose }) => {
  const lenis = useLenis();

  useEffect(() => {
    // Lock scroll when modal is open
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = "hidden";
    
    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "unset";
    };
  }, [lenis]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6 md:p-10 pointer-events-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-full max-h-[90vh] md:h-auto"
      >
        {/* Left Side - Image */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-auto md:min-h-full overflow-hidden bg-zinc-900 self-stretch">
          <Image
            src={project.modalImage || project.image}
            alt={project.title}
            fill
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]/20" />
        </div>

        {/* Right Side - Information */}
        <div className="w-full md:w-1/2 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-gradient-to-br from-white/5 to-transparent shadow-inner" data-lenis-prevent>
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-orange-500 font-semibold tracking-wider text-sm uppercase mb-2 block">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
                {project.title}
              </h2>
              <span className="text-white/40 text-sm">{project.year}</span>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-white font-semibold mb-3">About Project</h3>
            <p className="text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-white font-semibold mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-auto">
            <a 
              href={project.live || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.4)] hover:-translate-y-1"
            >
              <span>View Live Project</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <button className="flex-1 bg-white hover:bg-zinc-200 text-black font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-black">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Video Demo</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
