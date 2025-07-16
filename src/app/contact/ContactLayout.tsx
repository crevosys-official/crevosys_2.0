import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Smile } from "lucide-react";
import React from "react";

const ContactLayout = () => {
  return (
    <div className=" grid grid-cols-2 gap-5 items-center justify-center px-14 h-screen">
      {/* left side */}
      <div className=" relative flex flex-col gap-7">
        <div className=" bg-zinc-300 w-fit p-2 rounded-md -rotate-6">
          <h1 className=" text-2xl font-heading tracking-wider ">Contact</h1>
        </div>
        <div className=" relative">
          <h1 className=" text-9xl font-semibold text-white uppercase font-heading tracking-wide">
            Let's work Together
          </h1>
          <div className="group hover:scale-110 md:w-14 md:h-14 xl:w-20 xl:h-20 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center transition duration-300 group-hover:scale-110 absolute bottom-10 right-40">
            <Smile className="xl:w-14 xl:h-14 md:w-12 md:h-12 w-8 h-8 text-[#e9e9e9] transition duration-300 rotate-30" />
          </div>
        </div>
        <p className=" text-xl text-zinc-400">
          Are you looking for a digital trust worthy partner to help with your
          <br />
          digital strategy, UX, Web presence or digital activity ?
        </p>
        {/* contact info */}
        <div className=" flex items-start gap-10 text-white">
          <div className="flex flex-col gap-1">
            <h1 className=" font-heading uppercase text-3xl">Give us a Call</h1>
            <p className=" text-2xl text-zinc-300 underline">01784321799</p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className=" font-heading uppercase text-3xl">
              Send us an email
            </h1>
            <p className=" text-2xl text-zinc-300 underline">
              crevosysofficial@gmail.com
            </p>
          </div>
        </div>
        {/* social media */}
        <div className=" text-white flex items-center gap-5">
          <div className=" w-12 h-12 border rounded-full flex justify-center items-center">
            <Facebook className="fill-gray-100" />
          </div>
          <div className=" w-12 h-12 border rounded-full flex justify-center items-center">
            <Instagram className="fill-gray-500" />
          </div>
          <div className=" w-12 h-12 border rounded-full flex justify-center items-center">
            <Linkedin className="fill-gray-100" />
          </div>
        </div>
      </div>
      {/* right side */}
      <div className=" text-white flex flex-col gap-5">
        <h1 className=" text-4xl font-heading uppercase tracking-wide">
          Get In Touch
        </h1>
        <div>
          <div className="grid grid-cols-2 gap-5 items-center">
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
          <div className="grid grid-cols-2 gap-5 items-center">
            <div>
              <h4 className=" text-xl my-4">Phone number (Optional)</h4>
              <input
                type="number"
                className=" border border-zinc-300/40 p-3 w-full rounded-md bg-zinc-800/30"
              />
            </div>
            <div>
              <h4 className=" text-xl my-4">How did you hear about us ?</h4>
              <input
                type="email"
                className=" border border-zinc-300/40 p-3 w-full rounded-md bg-zinc-800/30"
              />
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
        <button className=" bg-[#FF8805] hover:bg-[#ff9b05b6] uppercase font-semibold w-fit p-3 rounded-full">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactLayout;
