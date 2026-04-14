import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const GetTouch = () => {
  return (
    <div className=" py-14 relative min-h-full m-2 md:container md:mx-auto xl:container xl:mx-auto ">
      <h4 className=" flex gap-2 items-center text-2xl mx-auto justify-center text-white">
        <ArrowRight /> <span>Get in touch</span>
      </h4>
      <hr className=" my-8 border-gray-200/10" />
      <h1 className="md:text-8xl font-heading uppercase text-4xl tracking-wide text-center my-3 text-white">
        Let&apos;s get started <br />
        with our team
      </h1>
      <p className=" text-center my-5 text-gray-500 text-sm md:text-base">
        Use customer data to build great and solid product <br /> experiences
        that convert.
      </p>
      <Link href="/contact">
        <Button className="flex mx-auto p-5 text-md bg-gradient-to-b from-[#FFB16B] to-[#996A40]">
          Let&apos;s get in touch
        </Button>
      </Link>
      <Image
        className="absolute -bottom-24 md:w-96 hidden md:inline -right-8 z-50"
        src="/elements/Color-line-shape.webp"
        alt="line shape"
        height={1000}
        width={1000}
        loading="lazy"
      />
    </div>
  );
};

export default GetTouch;
