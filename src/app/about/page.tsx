"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Target,
  Eye,
  Users,
  Lightbulb,
  Shield,
  Heart,
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PixelCard from "@/components/animation/PlexCard";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};



const AboutPage = () => {
  const values = [
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Innovation First",
      description:
        "We push boundaries and embrace emerging technologies to deliver cutting-edge solutions that keep you ahead of the competition.",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Trust & Transparency",
      description:
        "Open communication, honest timelines, and clear deliverables. We believe trust is the foundation of every great partnership.",
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Client-Centric",
      description:
        "Your success defines ours. We deeply invest in understanding your goals and tailor every solution to maximize your impact.",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Excellence in Execution",
      description:
        "From pixel-perfect design to robust code, we obsess over quality at every stage to deliver world-class digital experiences.",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "30+", label: "Happy Clients" },
    { number: "6+", label: "Team Members" },
    { number: "2+", label: "Years of Excellence" },
  ];

  const milestones = [
    {
      year: "2024",
      title: "The Beginning",
      desc: "CrevoSys was founded with a mission to bridge the gap between ambitious ideas and exceptional digital execution.",
    },
    {
      year: "2024",
      title: "Growing the Team",
      desc: "Expanded from a founding duo to a passionate team of developers, designers, and marketers united by a shared vision.",
    },
    {
      year: "2025",
      title: "Full-Service Agency",
      desc: "Evolved into a complete digital agency offering development, design, marketing, and AI automation under one roof.",
    },
    {
      year: "2026",
      title: "Scaling New Heights",
      desc: "Serving clients globally and pushing the boundaries of what a digital agency can achieve with AI-powered solutions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#070707] to-[#221f35] text-white selection:bg-orange-500/30 relative overflow-hidden">
      {/* Background overlay */}
      <div className="fixed inset-0 z-2 pointer-events-none flex items-center justify-center w-full h-full">
        <Image
          src="/gradient.png"
          alt="gradient background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-10"
          priority
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        {/* ─────────────────── Hero Section ─────────────────── */}
        <section className="container mx-auto px-6 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300">
              <Star className="w-3" />
              About CrevoSys
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-wide text-zinc-200 leading-tight">
              We Build Digital
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Experiences
              </span>{" "}
              That Matter
            </h1>
            <p className="xl:w-1/2 md:w-2/3 w-full text-md tracking-wide text-gray-400 text-center mx-auto leading-relaxed">
              CrevoSys is a full-service digital agency partnering with ambitious
              brands to design, develop, and grow their digital presence. We
              combine creative vision with technical precision to deliver
              solutions that drive real results.
            </p>
          </motion.div>
        </section>

        {/* ─────────────────── Stats Bar ─────────────────── */}
        <section className="container mx-auto px-6 mb-24">
          <motion.div
            {...fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-zinc-800/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:border-orange-500/30 transition-all duration-500 hover:bg-zinc-800/60">
                  <h3 className="text-3xl md:text-5xl font-heading text-orange-400 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─────────────────── Who We Are ─────────────────── */}
        <section className="py-20 bg-zinc-900/20 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="border-gray-600 border w-fit px-4 py-1.5 rounded-full gap-2 flex items-center text-zinc-300 mb-6">
                <Users className="w-3" />
                Who We Are
              </div>
              <h2 className="text-3xl md:text-5xl font-heading tracking-wide text-zinc-200 mb-6">
                A Team That Cares About Your Digital Future
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                At CrevoSys, your success is our focus. We understand what it
                takes to launch a digital project and the challenges that come
                with it. Tight deadlines, shifting priorities, complex
                requirements — we&apos;ve seen it all.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                That&apos;s why we bring more than creative ideas. We bring
                clarity, structure, and no-nonsense project management that keeps
                things moving. We partner with ambitious clients who want to do
                things right. Whether you&apos;re building from the ground up or
                scaling to the next level, we meet you where you are, align on
                what matters, and move fast to make it happen.
              </p>
              <Link href="/team">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-semibold rounded-full px-8 gap-2"
                >
                  Meet Our Team <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Image
                      src="/crevoicon.png"
                      alt="CrevoSys Logo"
                      width={120}
                      height={120}
                      className="mx-auto mb-6 opacity-80"
                    />
                    <h3 className="text-2xl md:text-3xl font-heading text-white mb-3">
                      CREVOSYS
                    </h3>
                    <p className="text-zinc-400 text-lg">
                      A Digital IT Solution
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3 text-sm text-zinc-500">
                      <Globe className="w-4 h-4" />
                      <span>Bangladesh • Worldwide</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl blur-3xl -z-10" />
            </motion.div>
          </div>
        </section>

        {/* ─────────────────── Mission & Vision ─────────────────── */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <PixelCard variant="blue" className="w-full cursor-pointer hover:border-zinc-200/20 bg-zinc-900/30">
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col gap-6 bg-zinc-800/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Target className="w-7 h-7 text-orange-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading tracking-wide text-zinc-200">
                      Our Mission
                    </h2>
                  </div>

                  <p className="text-zinc-400 leading-relaxed text-lg">
                    To empower businesses of all sizes with innovative digital
                    solutions that transform ideas into reality. We are committed
                    to delivering exceptional quality in every project.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Deliver scalable, high-performance digital products",
                      "Bridge the gap between business goals and technology",
                      "Foster long-term partnerships built on measurable results",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-400 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </PixelCard>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <PixelCard variant="yellow" className="w-full cursor-pointer hover:border-zinc-200/20 bg-zinc-900/30">
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col gap-6 bg-zinc-800/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Eye className="w-7 h-7 text-blue-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading tracking-wide text-zinc-200">
                      Our Vision
                    </h2>
                  </div>

                  <p className="text-zinc-400 leading-relaxed text-lg">
                    To become a globally recognized digital agency that sets new
                    standards in creativity, technology, and client success.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Lead the digital transformation for emerging markets",
                      "Pioneer AI-driven workflows for smarter solutions",
                      "Build a global community of digital innovators",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-400 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </PixelCard>
            </motion.div>
          </div>
        </section>

        {/* ─────────────────── Core Values ─────────────────── */}
        <section className="py-20 bg-zinc-900/20 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto px-6">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <div className="border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 mb-6">
                <Star className="w-3" />
                What Drives Us
              </div>
              <h2 className="text-3xl md:text-5xl font-heading tracking-wide text-zinc-200 mb-4">
                Our Core Values
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                The principles that guide every decision, every design, and
                every line of code we write.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const variants: ("blue" | "default" | "yellow" | "pink")[] = ["blue", "default", "yellow", "pink"];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="w-full"
                  >
                    <PixelCard variant={variants[index % variants.length]} className="w-full cursor-pointer hover:border-zinc-200/20 bg-zinc-900/30">
                      <div className="absolute inset-0 p-8 flex flex-col gap-4 bg-zinc-800/20">
                        <div className="text-orange-500 mb-2">
                          {value.icon}
                        </div>
                        <h3 className="text-2xl font-semibold text-white">
                          {value.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </PixelCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────── Journey / Timeline ─────────────────── */}
        <section className="py-24 container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 mb-6">
              <TrendingUp className="w-3" />
              Our Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-heading tracking-wide text-zinc-200">
              The CrevoSys Story
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-blue-500/50 to-transparent" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex items-start gap-6 mb-12 ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse md:text-right"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-orange-500 border-2 border-orange-300 shadow-lg shadow-orange-500/30 z-10" />

                {/* Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div className="bg-zinc-800/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-orange-500/20 transition-all duration-300">
                    <span className="text-orange-400 font-heading text-2xl">
                      {milestone.year}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-2 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
