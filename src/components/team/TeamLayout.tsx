import React from "react";
import Image from "next/image";

const TeamLayout = () => {

  const teams = [
    {
      id: 1,
      picture: "/Team/sahid_withoutGlow.png",
      name: "MD ABU SAHID",
      Designation: "Chief Executive Officer (CEO)",
      Position: "MERN-DEVELOPER & UI/UX",
    },
    {
      id: 2,
      picture: "/Team/joyant_withoutGlow.png",
      name: "JOYANT SHEIKHAR GUPTA JOY",
      Designation: "Chief Technology Officer (CTO)",
      Position: "SOFTWARE DEVELOPER",
    },
    {
      id: 3,
      picture: "/Team/mumu_withoutGlow.png",
      name: "MAHBUBA KHANOM MUMU",
      Designation: "Chief Brand Officer (CBO)",
      Position: "GRAPHIC DESIGNER",
    },
    {
      id: 4,
      picture: "/Team/abid_withoutGlow.png",
      name: "ABID SHAHRIAR",
      Designation: "Chief Operating Officer (COO)",
      Position: "WEB DEVELOPER",
    },
    {
      id: 5,
      picture: "/Team/sumon_withoutGlow.png",
      name: "SHAMSUL ISLAM",
      Designation: "Chief Marketing Officer",
      Position: "DIGITAL MARKETER",
    },
    {
      id: 6,
      picture: "/Team/jenifa_withoutGlow.png",
      name: "Nahid Akter Jenifa",
      Designation: "Junior Front-end developer",
      Position: "FRONT-END DEVELOPER",
    },
  ];

  return (
    <div>

      <div className="grid md:grid-cols-3 gap-5 py-30 px-10">
        {teams.map((team) => (
          <div
            key={team.id}
            className="relative group transition-all rounded-2xl overflow-hidden bg-zinc-800/30 border border-zinc-300/20 backdrop-blur-md"
          >
            {/* Background image for hover */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: `url(${team.picture.replace(
                  "_withoutGlow",
                  "_withGlow"
                )})`,
              }}>
              <div className="absolute bottom-0 text-center flex flex-col mx-auto w-full bg-gradient-to-t from-[#070707] to-transparent">
                <h1 className=" font-semibold text-2xl text-white">
                  {team.name}
                </h1>
                <p className=" text-gray-400 font-semibold">
                  {team.Designation}
                </p>
                <h1 className=" flex flex-col text-start items-center text-white">
                  <span className=" mt-2 mb-4 bg-orange-400 rounded-xl p-2 text-black text-2xl font-bold">
                    {team.Position}
                  </span>
                </h1>
              </div>
            </div>

            <Image
              className="relative rounded-2xl group-hover:opacity-0 transition-opacity duration-300"
              src={team.picture}
              height={1000}
              width={1000}
              alt={team.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamLayout;
