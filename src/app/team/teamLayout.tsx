import React from "react";
import Link from "next/link";

const TeamLayout = () => {
  const teams = [
    {
      id: 1,
      picture: "/Team/sahid_withoutGlow.jpg",
      name: "MD ABU SAHID",
      Designation: "Chief Executive Officer (CEO)",
      Position: "MERN-DEVELOPER & UI/UX",
      pageGoto: "/team/sahid",
    },
    {
      id: 2,
      picture: "/Team/joyant_withoutGlow.jpg",
      name: "JOYANT SHEIKHAR GUPTA JOY",
      Designation: "Chief Technology Officer (CTO)",
      Position: "SOFTWARE DEVELOPER",
      pageGoto: "/team/joyant",
    },
    {
      id: 3,
      picture: "/Team/mumu_withoutGlow.jpg",
      name: "MAHBUBA KHANOM MUMU",
      Designation: "Chief Brand Officer (CBO)",
      Position: "GRAPHIC DESIGNER",
      pageGoto: "/team/mumu",
    },
    {
      id: 4,
      picture: "/Team/abid_withoutGlow.jpg",
      name: "ABID SHAHRIAR",
      Designation: "Chief Operating Officer (COO)",
      Position: "WEB DEVELOPER",
      pageGoto: "/team/abid",
    },
    {
      id: 5,
      picture: "/Team/sumon_withoutGlow.jpg",
      name: "SHAMSUL ISLAM",
      Designation: "Chief Marketing Officer",
      Position: "DIGITAL MARKETER",
      pageGoto: "/team/sumon",
    },
    {
      id: 6,
      picture: "/Team/sumon_withoutGlow.jpg",
      name: "Nahid Akter Jenifa",
      Designation: "Junior Front-end developer",
      Position: "FRONT-END DEVELOPER",
      pageGoto: "/team/jenifa",
    },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5 py-14 px-10">
        {teams.map((team) => (
          <Link key={team.id} href={team.pageGoto}>
            <div className="relative group transition-all rounded-2xl overflow-hidden">
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

              <img
                className="relative rounded-2xl group-hover:opacity-0 transition-opacity duration-300"
                src={team.picture}
                alt={team.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamLayout;
