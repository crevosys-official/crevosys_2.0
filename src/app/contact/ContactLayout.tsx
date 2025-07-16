import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Smile } from "lucide-react";
import React from "react";

const ContactLayout = () => {
  return (
    <div className="grid xl:grid-cols-2 gap-5 py-10 md:py-0 items-center justify-center px-14 min-h-screen">
      {/* left side */}
      <div className=" relative flex flex-col gap-7">
        <div className=" bg-zinc-300 w-fit p-2 rounded-md -rotate-6">
          <h1 className=" text-2xl font-heading tracking-wider ">Contact</h1>
        </div>
        <div className=" relative">
          <h1 className="md:text-9xl text-7xl font-semibold text-white uppercase font-heading tracking-wide">
            Let's work Together
          </h1>
          <div className="group hover:scale-110 md:w-14 md:h-14 xl:w-20 xl:h-20 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center transition duration-300 group-hover:scale-110 absolute md:bottom-10 md:right-40 bottom-6 right-35">
            <Smile className="xl:w-14 xl:h-14 md:w-12 md:h-12 w-8 h-8 text-[#e9e9e9] transition duration-300 rotate-30" />
          </div>
        </div>
        <p className="md:text-xl text-zinc-400">
          Are you looking for a digital trust worthy partner to help with your
          <br />
          digital strategy, UX, Web presence or digital activity ?
        </p>
        {/* contact info */}
        <div className=" flex items-start gap-10 text-white">
          <div className="flex flex-col gap-1">
            <h1 className=" font-heading uppercase text-2xl">Give us a Call</h1>
            <p className=" text-2xl text-zinc-300 underline">01784321799</p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className=" font-heading uppercase text-2xl">
              Send us an email
            </h1>
            <p className=" text-2xl text-zinc-300 underline">
              crevosysofficial@gmail.com
            </p>
          </div>
        </div>
        {/* social media */}
        <div className=" text-white flex items-center gap-5">
          <div className=" w-12 h-12 border rounded-full flex justify-center items-center transition duration-200 hover:bg-orange-400 hover:border-orange-400 hover:scale-110 cursor-pointer">
            <Facebook className="fill-gray-100" />
          </div>
          <div className=" w-12 h-12 border rounded-full flex justify-center items-center transition duration-200 hover:bg-pink-500 hover:border-pink-500 hover:scale-110 cursor-pointer">
            <Instagram className="fill-gray-500" />
          </div>
          <div className=" w-12 h-12 border rounded-full flex justify-center items-center transition duration-200 hover:bg-blue-600 hover:border-blue-600 hover:scale-110 cursor-pointer">
            <Linkedin className="fill-gray-100" />
          </div>
        </div>
      </div>
      {/* right side */}
      <div className=" text-white flex flex-col gap-5">
        <h1 className="md:text-4xl text-3xl mt-2 md:mt-0 font-heading uppercase tracking-wide">
          Get In Touch
        </h1>
        <div>
          <div className="grid md:grid-cols-2 gap-5 items-center">
            <div>
              <h4 className=" text-xl mb-4">Full Name</h4>
              <input
                type="text"
                className=" border border-zinc-300/40 p-3 w-full rounded-md bg-zinc-800/30"
              />
            </div>
            <div>
              <h4 className=" text-xl mb-4">Email Address</h4>
              <input
                type="email"
                className=" border border-zinc-300/40 p-3 w-full rounded-md bg-zinc-800/30"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5 items-center">
            <div>
              <h4 className=" text-xl my-4">Phone number (Optional)</h4>
              <input
                type="number"
                className=" border border-zinc-300/40 p-3 w-full rounded-md bg-zinc-800/30"
              />
            </div>
            <div>
              <h4 className=" text-xl my-4">How did you hear about us ?</h4>
              <select
                className=" border border-zinc-300/40 p-3 w-full rounded-md bg-zinc-800/30"
                defaultValue="">
                <option value="" disabled>
                  Select an option
                </option>
                <option value="social_media">Social Media</option>
                <option value="newspaper">Newspaper</option>
                <option value="advertisement">Advertisement</option>
                <option value="friends_or_relative">Friends or Relative</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <h1 className=" text-xl my-4">How can we help ?</h1>
          <textarea
            className=" border border-zinc-300/40 w-full p-3 bg-zinc-800/30 rounded-md resize-none"
            rows={5}
          />
        </div>
        <button className=" bg-[#FF8805] hover:bg-[#ff9b05b6] uppercase font-semibold w-fit p-3 rounded-full cursor-pointer">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactLayout;
