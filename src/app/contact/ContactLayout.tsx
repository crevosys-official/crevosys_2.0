"use client";
import { Button } from "@/components/ui/stateful-button";
import { Facebook, Instagram, Linkedin, Smile } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ContactLayout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! Thank you for contacting us.");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
    setLoading(false);
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 px-6 md:px-14 pt-32 pb-10 lg:py-0 items-center justify-center min-h-screen">
      <div className="relative flex flex-col gap-6 md:gap-7">
        <div className="bg-zinc-300 w-fit p-2 rounded-md -rotate-6">
          <h1 className="text-xl md:text-2xl font-heading tracking-wider text-black">Contact</h1>
        </div>
        <div className="relative">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-semibold text-white uppercase font-heading tracking-wide leading-tight">
            Let&apos;s work Together
          </h1>
          <div className="group hover:scale-110 md:w-14 md:h-14 xl:w-20 xl:h-20 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center transition duration-300 absolute -bottom-4 right-10 md:bottom-10 md:right-40">
            <Smile className="xl:w-14 xl:h-14 md:w-12 md:h-12 w-8 h-8 text-[#e9e9e9] transition duration-300 rotate-30" />
          </div>
        </div>
        <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
          Are you looking for a digital trustworthy partner to help with your digital strategy, UX, Web presence or digital activity?
        </p>
        {/* contact info */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 text-white">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading uppercase text-xl md:text-2xl text-orange-400">Give us a Call</h1>
            <p className="text-xl md:text-2xl text-zinc-300 underline">01784321799</p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-heading uppercase text-xl md:text-2xl text-orange-400">
              Send us an email
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 underline break-all">
              crevosysofficial@gmail.com
            </p>
          </div>
        </div>
        {/* social media */}
        <div className="text-white flex items-center gap-5">
          <div className="w-12 h-12 border border-white/20 rounded-full flex justify-center items-center transition duration-200 hover:bg-orange-400 hover:border-orange-400 hover:scale-110 cursor-pointer">
            <Facebook className="w-5 h-5 fill-gray-100" />
          </div>
          <div className="w-12 h-12 border border-white/20 rounded-full flex justify-center items-center transition duration-200 hover:bg-pink-500 hover:border-pink-500 hover:scale-110 cursor-pointer">
            <Instagram className="w-5 h-5 fill-white" />
          </div>
          <div className="w-12 h-12 border border-white/20 rounded-full flex justify-center items-center transition duration-200 hover:bg-blue-600 hover:border-blue-600 hover:scale-110 cursor-pointer">
            <Linkedin className="w-5 h-5 fill-gray-100" />
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="text-white flex flex-col gap-5 bg-zinc-800/20 p-6 md:p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
        <h1 className="text-2xl md:text-4xl font-heading uppercase tracking-wide text-orange-400">
          Get In Touch
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg">Full Name</h4>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="border border-zinc-700 p-3 w-full rounded-xl bg-zinc-900/50 focus:border-orange-400 outline-none transition-colors"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg">Email Address</h4>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="border border-zinc-700 p-3 w-full rounded-xl bg-zinc-900/50 focus:border-orange-400 outline-none transition-colors"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg">Phone number (Optional)</h4>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
                className="border border-zinc-700 p-3 w-full rounded-xl bg-zinc-900/50 focus:border-orange-400 outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg">How did you hear about us?</h4>
              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                className="border border-zinc-700 p-3 w-full rounded-xl bg-zinc-900/50 focus:border-orange-400 outline-none transition-colors appearance-none"
                required>
                <option value="" disabled className="bg-zinc-900">
                  Select an option
                </option>
                <option value="social_media" className="bg-zinc-900">Social Media</option>
                <option value="newspaper" className="bg-zinc-900">Newspaper</option>
                <option value="advertisement" className="bg-zinc-900">Advertisement</option>
                <option value="friends_or_relative" className="bg-zinc-900"> Friends or Relative </option>
                <option value="youtube" className="bg-zinc-900">YouTube</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg">How can we help?</h1>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="border border-zinc-700 w-full p-3 bg-zinc-900/50 rounded-xl resize-none focus:border-orange-400 outline-none transition-colors"
              rows={4}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-[#FF8805] hover:bg-[#ff9b05b6] text-white uppercase font-bold w-full md:w-fit px-8 py-4 rounded-full cursor-pointer mt-2 transition-transform active:scale-95"
            disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactLayout;