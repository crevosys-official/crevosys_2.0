"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center px-6 overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-9xl font-bold font-heading bg-gradient-to-b from-white to-zinc-800 text-transparent bg-clip-text">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-200 mt-4 mb-6">
            Lost in the Digital Void?
          </h2>
          <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
            The page you&apos;re looking for has vanished into thin air. Don&apos;t worry, 
            even the best explorers get lost sometimes. Let&apos;s get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 flex items-center gap-2 group">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.history.back()}
              className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full px-8 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-20 -right-20 w-96 h-96 border border-white/5 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none"
      />
    </div>
  );
};

export default NotFound;
