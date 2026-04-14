"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const TeamLayout = () => {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const teams = [
    {
      id: 1,
      picture: "/Team/sahid_withoutGlow.png",
      name: "MD ABU SAHID",
      Designation: "Chief Executive Officer (CEO)",
      Position: "MERN-DEVELOPER & UI/UX",
      pageGoto: "/team/sahid",
    },
    {
      id: 2,
      picture: "/Team/joyant_withoutGlow.png",
      name: "JOYANT SHEIKHAR GUPTA JOY",
      Designation: "Chief Technology Officer (CTO)",
      Position: "SOFTWARE DEVELOPER",
      pageGoto: "/team/joyant",
    },
    {
      id: 3,
      picture: "/Team/mumu_withoutGlow.png",
      name: "MAHBUBA KHANOM MUMU",
      Designation: "Chief Brand Officer (CBO)",
      Position: "GRAPHIC DESIGNER",
      pageGoto: "/team/mumu",
    },
    {
      id: 4,
      picture: "/Team/abid_withoutGlow.png",
      name: "ABID SHAHRIAR",
      Designation: "Chief Operating Officer (COO)",
      Position: "WEB DEVELOPER",
      pageGoto: "/team/abid",
    },
    {
      id: 5,
      picture: "/Team/sumon_withoutGlow.png",
      name: "SHAMSUL ISLAM",
      Designation: "Chief Marketing Officer",
      Position: "DIGITAL MARKETER",
      pageGoto: "/team/sumon",
    },
    {
      id: 6,
      picture: "/Team/jenifa_withoutGlow.png",
      name: "Nahid Akter Jenifa",
      Designation: "Junior Front-end developer",
      Position: "FRONT-END DEVELOPER",
      pageGoto: "/team/jenifa",
    },
  ];

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `
        .team-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
          width: 48px;
          height: 48px;
        }

        .team-loader-ring {
          border-radius: 50%;
          border: 3px solid transparent;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: team-spin 1.4s linear infinite;
        }

        .team-loader-ring:nth-child(1) {
          border-top-color: #fb923c;
          width: 48px;
          height: 48px;
          animation-duration: 1.0s;
        }

        .team-loader-ring:nth-child(2) {
          border-right-color: #f97316;
          width: 36px;
          height: 36px;
          animation-duration: 1.4s;
          animation-direction: reverse;
        }

        .team-loader-ring:nth-child(3) {
          border-bottom-color: #ea580c;
          width: 24px;
          height: 24px;
          animation-duration: 0.8s;
        }

        .team-loader-text {
          position: absolute;
          top: calc(50% + 36px);
          left: 50%;
          transform: translateX(-50%);
          color: #fb923c;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          white-space: nowrap;
          animation: team-pulse 1.5s ease-in-out infinite;
        }

        @keyframes team-spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes team-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}} />

      <div className="grid md:grid-cols-3 gap-5 py-30 px-10">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={team.pageGoto}
            onClick={() => setLoadingId(team.id)}
          >
            <div className="relative group transition-all rounded-2xl overflow-hidden bg-zinc-800/30 border border-zinc-300/20 backdrop-blur-md">

              {/* Loading Overlay */}
              {loadingId === team.id && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
                  <div className="team-loader">
                    <div className="team-loader-ring"></div>
                    <div className="team-loader-ring"></div>
                    <div className="team-loader-ring"></div>
                    <span className="team-loader-text">Loading...</span>
                  </div>
                </div>
              )}

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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamLayout;
