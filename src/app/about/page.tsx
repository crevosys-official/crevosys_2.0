"use client";

import React, { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import TeamSquadSection, { CREVOSYS_MEMBERS } from "@/components/sections/TeamSquadSection";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Star,
  Target,
  Eye,
  Users,
  Lightbulb,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Sparkles,
  Rocket,
  Award,
  Layers,
  Code2,
  Compass,
  Cpu,
  MoveUpRight,
  Clock,
  Shield,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true },
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      number: "50+",
      label: "Projects Delivered",
      subtext: "Shipped across 12+ countries with zero downtime",
      icon: <Rocket className="w-5 h-5 text-orange-400" />,
      accentColor: "from-orange-500/20 to-amber-500/5",
      borderColor: "group-hover:border-orange-500/40",
      glowColor: "rgba(249,115,22,0.15)",
    },
    {
      number: "99%",
      label: "Client Satisfaction",
      subtext: "Long-term relationships with founders and enterprise leaders",
      icon: <HeartHandshake className="w-5 h-5 text-rose-400" />,
      accentColor: "from-rose-500/20 to-pink-500/5",
      borderColor: "group-hover:border-rose-500/40",
      glowColor: "rgba(244,63,94,0.15)",
    },
    {
      number: "15+",
      label: "Specialists & Engineers",
      subtext: "Elite cross-functional talent in design, code & AI",
      icon: <Users className="w-5 h-5 text-blue-400" />,
      accentColor: "from-blue-500/20 to-indigo-500/5",
      borderColor: "group-hover:border-blue-500/40",
      glowColor: "rgba(59,130,246,0.15)",
    },
    {
      number: "2+",
      label: "Years of Excellence",
      subtext: "Continuously pushing boundaries of digital craftsmanship",
      icon: <Award className="w-5 h-5 text-purple-400" />,
      accentColor: "from-purple-500/20 to-violet-500/5",
      borderColor: "group-hover:border-purple-500/40",
      glowColor: "rgba(168,85,247,0.15)",
    },
  ];

  const values = [
    {
      step: "01",
      icon: <Lightbulb className="w-6 h-6 text-amber-400" />,
      title: "Innovation First",
      subtitle: "Pushing Technical Frontiers",
      description:
        "We reject stagnant methods. We constantly explore emerging technologies, modern architectural patterns, and AI workflows to give your brand an insurmountable competitive edge.",
      tag: "Bleeding Edge",
      accent: "from-amber-500/10 via-orange-500/5 to-transparent",
      borderGlow: "group-hover:border-amber-500/40",
      iconBg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      step: "02",
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: "Radical Transparency",
      subtitle: "Honest, Predictable Execution",
      description:
        "No hidden agendas, no surprise delays. You receive transparent asynchronous updates, shared sprint boards, and direct communication with the actual builders shipping your product.",
      tag: "Zero Fluff",
      accent: "from-cyan-500/10 via-blue-500/5 to-transparent",
      borderGlow: "group-hover:border-cyan-500/40",
      iconBg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      step: "03",
      icon: <Sparkles className="w-6 h-6 text-rose-400" />,
      title: "Client Obsession",
      subtitle: "Your Metrics Define Our Win",
      description:
        "We do not merely write code or draft UI; we immerse ourselves in your market dynamics and user retention metrics to engineer products that convert and generate measurable revenue.",
      tag: "Value Driven",
      accent: "from-rose-500/10 via-pink-500/5 to-transparent",
      borderGlow: "group-hover:border-rose-500/40",
      iconBg: "bg-rose-500/10 border-rose-500/20",
    },
    {
      step: "04",
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: "Relentless Velocity",
      subtitle: "Silicon Valley Grade Speed",
      description:
        "From prototype to production-grade deployment, we obsess over velocity without sacrificing architectural integrity. Clean code, automated pipelines, and pixel perfection from day one.",
      tag: "High Velocity",
      accent: "from-emerald-500/10 via-teal-500/5 to-transparent",
      borderGlow: "group-hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  const milestones = [
    {
      year: "2024",
      quarter: "Q1",
      badge: "The Genesis",
      title: "Founding CrevoSys",
      desc: "Founded by visionary engineers and designers with a single mission: bridge the chasm between ambitious ideas and world-class digital craftsmanship without agency bloat.",
      highlight: "Inception & Core Framework",
    },
    {
      year: "2024",
      quarter: "Q3",
      badge: "Expansion",
      title: "Scaling Engineering & Product",
      desc: "Expanded into a dedicated collective of multidisciplinary developers, product designers, and growth strategists, successfully delivering 25+ production apps.",
      highlight: "25+ Products Shipped",
    },
    {
      year: "2025",
      quarter: "Q2",
      badge: "Full-Stack Agency",
      title: "AI Integration & Global Reach",
      desc: "Evolved into a premier full-service technology agency integrating bespoke AI automation, next-generation web architectures, and high-impact digital experiences.",
      highlight: "Enterprise AI Automation",
    },
    {
      year: "2026",
      quarter: "Now",
      badge: "Frontier Vision",
      title: "Global Scale & Next-Gen Systems",
      desc: "Serving partners globally across North America, Europe, and Asia, setting new standards in AI-assisted development, cloud performance, and interactive interfaces.",
      highlight: "Global Enterprise Footprint",
    },
  ];

  const methodologies = [
    {
      phase: "Phase 01",
      title: "Strategic Discovery & Architecture",
      desc: "We deconstruct your business model, map edge cases, and define robust tech stacks to ensure zero technical debt down the line.",
      icon: <Compass className="w-5 h-5 text-orange-400" />,
    },
    {
      phase: "Phase 02",
      title: "Precision UI/UX Design System",
      desc: "Pixel-perfect component systems built in Figma with high-fidelity interactive prototypes, verified with real user journeys.",
      icon: <Layers className="w-5 h-5 text-blue-400" />,
    },
    {
      phase: "Phase 03",
      title: "Agile Full-Stack Engineering",
      desc: "Modern frameworks, clean modular architectures, automated testing, and CI/CD pipelines engineered for speed and enterprise scale.",
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
    },
    {
      phase: "Phase 04",
      title: "Launch & Post-Ship Hypercare",
      desc: "Performance benchmarking, SEO indexing, production monitoring, and 30-day comprehensive post-launch support guarantee.",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#000000] text-white selection:bg-orange-500/30 relative overflow-hidden font-primary"
    >
      {/* ─────────────────── Background System Matched with Hero ─────────────────── */}
      {/* Fixed gradient overlay identical to Hero and Homepage */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center w-full h-full">
        <Image
          src="/gradient.png"
          alt="gradient background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-10"
          priority
        />
      </div>

      {/* Hero Ambient Radial Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[900px] bg-[radial-gradient(ellipse_85%_65%_at_50%_-10%,rgba(59,130,246,0.14),rgba(147,51,234,0.11),rgba(0,0,0,0)_80%)] pointer-events-none z-0" />

      {/* Atmospheric Blur Lights Matching Hero */}
      <div className="absolute top-[8%] left-[-10%] w-[580px] h-[480px] bg-blue-600/[0.08] blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-600/[0.07] via-indigo-600/[0.09] to-purple-600/[0.08] blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[12%] right-[-10%] w-[580px] h-[480px] bg-purple-600/[0.08] blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Mid-Page & Bottom Ambient Atmospheric Blooms */}
      <div className="absolute top-[38%] right-[-5%] w-[500px] h-[450px] bg-orange-500/[0.05] blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[55%] left-[-5%] w-[550px] h-[500px] bg-blue-600/[0.05] blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[75%] right-1/4 w-[650px] h-[450px] bg-purple-600/[0.06] blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-orange-500/[0.06] via-indigo-500/[0.06] to-blue-500/[0.06] blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Subtle Precision Geometric Grid Mesh */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"
      />

      {/* Navigation */}
      <Navbar />

      <main className="relative z-10 pt-2 sm:pt-1 pb-24 overflow-hidden">
        {/* ─────────────────── FOUNDERS SHOWCASE ─────────────────── */}
        <section className="pt-24 sm:pt-32 pb-14 sm:pb-18 relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(249,115,22,0.04),transparent_100%)] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Text Left Column (7 cols) */}
              <motion.div
                {...fadeInUp}
                className="lg:col-span-7 flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 w-fit text-xs font-medium text-orange-400 mb-6 backdrop-blur-md shadow-sm">
                  <Users className="w-3.5 h-3.5" />
                  <span>Leadership & Origin</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-[1.15]">
                  MEET OUR FOUNDERS
                </h2>

                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                  CrevoSys was founded on a simple conviction: modern businesses don&apos;t need another bureaucratic agency with endless slide decks. They need skilled builders who listen deeply, move fast, and engineer digital experiences of uncompromising quality.
                </p>

                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
                  Whether you are a startup crafting an MVP from scratch or an established brand modernizing your infrastructure, we bring founder-to-founder accountability. We remove friction, align on what drives revenue, and deploy battle-tested solutions.
                </p>

                {/* Key Pillars */}
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {[
                    {
                      title: "Direct Founder Access",
                      desc: "Senior tech leadership involved in every architectural phase.",
                    },
                    {
                      title: "Pure Velocity Sprints",
                      desc: "Transparent bi-weekly cycles with demonstrable progress.",
                    },
                    {
                      title: "Zero-Compromise Craft",
                      desc: "Pixel-perfect motion, accessible design, and clean code.",
                    },
                    {
                      title: "Complete IP Transfer",
                      desc: "Full code, repo, and design ownership transferred to you.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 text-white font-medium text-sm mb-1">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-zinc-400 pl-6.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Founder Image Showcase (5 cols) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="lg:col-span-5 relative"
              >
                {/* Glow backlight matching Hero color palette */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 via-indigo-600/15 to-purple-600/20 rounded-3xl blur-2xl -z-10 opacity-70" />

                <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-900/60 group">
                  <div className="relative aspect-[4/4.5] w-full overflow-hidden">
                    <Image
                      src="/founder_poster.png"
                      alt="CrevoSys Founders"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Floating Badges */}
                  <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-medium text-white flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Executive Leadership
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/15 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold text-base">
                          CrevoSys Core
                        </h4>
                        <p className="text-zinc-400 text-xs">
                          Engineering • Product • Growth
                        </p>
                      </div>
                      <Link href="/team">
                        <div className="w-9 h-9 rounded-full bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/30 flex items-center justify-center transition-colors">
                          <MoveUpRight className="w-4 h-4 text-orange-400" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ─────────────────── STATS SHOWCASE ─────────────────── */}
        <section className="container mx-auto px-4 sm:px-6 mt-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
              >
                <div
                  className={`relative h-full rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-zinc-900/40 backdrop-blur-xl border border-white/10 ${stat.borderColor} transition-all duration-500 hover:bg-zinc-900/70 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col justify-between overflow-hidden`}
                >
                  {/* Subtle top gradient glow on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  {/* Top Row: Icon Badge & Stat Indicator */}
                  <div className="relative flex items-center justify-between mb-6 z-10">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      Live Metric
                    </span>
                  </div>

                  {/* Main Value */}
                  <div className="relative z-10">
                    <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all">
                      {stat.number}
                    </h3>
                    <h4 className="text-base font-medium text-zinc-200 mb-1">
                      {stat.label}
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─────────────────── THE SQUAD / TEAM SECTION ─────────────────── */}
        <section className=" relative w-full overflow-hidden">
          <TeamSquadSection />
        </section>

        {/* ─────────────────── MISSION & VISION ─────────────────── */}
        <section className="py-14 sm:py-20 container mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-medium text-zinc-300 mb-5 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-orange-400" />
              <span>Pillars of Impact</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              The fundamental driving forces that orient every project we build and every line of code we ship.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="h-full rounded-3xl p-8 sm:p-10 bg-zinc-900/30 backdrop-blur-xl border border-white/10 group-hover:border-orange-500/40 transition-all duration-500 flex flex-col justify-between overflow-hidden relative">
                {/* Ambient glow in corner */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-orange-500/15 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.15)] group-hover:scale-105 transition-transform duration-300">
                      <Target className="w-7 h-7 text-orange-400" />
                    </div>
                    <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 border border-white/5 px-3 py-1 rounded-full bg-zinc-900/50">
                      Primary Objective
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                    Our Mission
                  </h3>
                  <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-8">
                    To empower high-growth startups and global brands with scalable, visually extraordinary digital products. We bridge complex technology and intuitive human interfaces to transform business potential into measurable market leadership.
                  </p>

                  <div className="space-y-3.5 mb-6">
                    {[
                      "Architect cloud-native, high-performance web & mobile systems",
                      "Deliver conversion-driven UI/UX grounded in real human behavior",
                      "Foster long-term engineering partnerships with total transparency",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-orange-400" />
                        </div>
                        <span className="text-zinc-400 text-sm leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
                  <span>Driven by Engineering Rigor</span>
                  <span className="text-orange-400 font-medium">Standard of Excellence</span>
                </div>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group relative"
            >
              <div className="h-full rounded-3xl p-8 sm:p-10 bg-zinc-900/30 backdrop-blur-xl border border-white/10 group-hover:border-blue-500/40 transition-all duration-500 flex flex-col justify-between overflow-hidden relative">
                {/* Ambient glow in corner */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-blue-500/15 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:scale-105 transition-transform duration-300">
                      <Eye className="w-7 h-7 text-blue-400" />
                    </div>
                    <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 border border-white/5 px-3 py-1 rounded-full bg-zinc-900/50">
                      Long-Term Horizon
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-8">
                    To be the globally recognized benchmark for modern digital craftsmanship—where intelligence, fluid interactivity, and AI-accelerated workflows converge to build the next generation of software products.
                  </p>

                  <div className="space-y-3.5 mb-6">
                    {[
                      "Pioneer AI-augmented software development workflows globally",
                      "Set international design benchmarks for motion & digital aesthetics",
                      "Build an elite global collective of developers, designers & innovators",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-blue-400" />
                        </div>
                        <span className="text-zinc-400 text-sm leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
                  <span>Pioneering the AI Frontier</span>
                  <span className="text-blue-400 font-medium">Global Impact</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>



        {/* ─────────────────── THE STORY / TIMELINE ─────────────────── */}
        <section className="py-24 sm:py-32 container mx-auto px-4 sm:px-6 relative">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-medium text-orange-400 mb-5 backdrop-blur-md">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Our Trajectory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
              The CrevoSys Story
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              From our humble beginnings to scaling a globally distributed agency driving tangible client outcomes.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Timeline Spine with Brand Glow Gradient */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative flex items-center ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-8`}
                  >
                    {/* Glowing Timeline Indicator Node */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border-2 border-orange-400 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(249,115,22,0.8)]">
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping opacity-75" />
                    </div>

                    {/* Card Container */}
                    <div
                      className={`ml-14 md:ml-0 w-full md:w-[calc(50%-2rem)] ${
                        isEven ? "md:pr-4" : "md:pl-4"
                      }`}
                    >
                      <div className="p-7 rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 group shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold font-heading text-orange-400">
                              {milestone.year}
                            </span>
                            <span className="text-xs font-mono text-zinc-500 px-2 py-0.5 bg-white/5 rounded-md">
                              {milestone.quarter}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-zinc-300 bg-zinc-800/80 px-2.5 py-1 rounded-full border border-white/10">
                            {milestone.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors">
                          {milestone.title}
                        </h3>

                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                          {milestone.desc}
                        </p>

                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-400/90 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{milestone.highlight}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
