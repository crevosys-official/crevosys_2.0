import React from "react";

const About = () => {
  return (
    <div className="container mx-auto">
      {/* content */}

      {/* <hr className=" py-10 opacity-20" /> */}

      <div className=" text-zinc-200 flex flex-col gap-3">
        <h1 className=" font-heading uppercase text-7xl">
          We&apos;re a full service <br />
          digital agency
        </h1>
        <p className=" text-lg tracking-wide text-gray-300">
          At Crevosys, your success is our focus. We understand what it takes to
          launch a digital project and the challenges that come with it. Tight
          deadlines, shifting priorities, complex requirements? We&apos;ve seen
          it all. That&apos;s why we bring more than creative ideas. We bring
          clarity, structure and no-nonsense project management that keeps
          things moving. We partner with ambitious clients who want to do things
          right. Whether you&apos;re building from the ground up or scaling to
          the next level, we meet you where you are, align on what matters and
          move fast to make it happen.
        </p>
      </div>

      {/* images */}
    </div>
  );
};

export default About;
