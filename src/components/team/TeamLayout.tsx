"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DEFAULT_TEAM_MEMBERS } from "@/data/defaultTeam";
import { TeamMemberItem } from "@/types/team";

const TeamLayout = () => {
  const [teams, setTeams] = useState<TeamMemberItem[]>(DEFAULT_TEAM_MEMBERS);

  useEffect(() => {
    fetch("/api/teams?active=true")
      .then((res) => res.json())
      .then((resData) => {
        const data = Array.isArray(resData) ? resData : resData?.data;
        if (Array.isArray(data) && data.length > 0) {
          setTeams(data);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch team members from MongoDB, using defaults:", err)
      );
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5 py-30 px-10">
        {teams.map((team, index) => {
          const glowPic = team.picture?.includes("_withoutGlow")
            ? team.picture.replace("_withoutGlow", "_withGlow")
            : team.picture;

          const designation = team.designation || (team as any).Designation || "";
          const position = team.position || (team as any).Position || "";

          return (
            <div
              key={team._id || team.id || index}
              className="relative group transition-all rounded-2xl overflow-hidden bg-zinc-800/30 border border-zinc-300/20 backdrop-blur-md"
            >
              {/* Background image for hover */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${glowPic})`,
                }}
              >
                <div className="absolute bottom-0 text-center flex flex-col mx-auto w-full bg-gradient-to-t from-[#070707] to-transparent p-4">
                  <h1 className="font-semibold text-2xl text-white">{team.name}</h1>
                  <p className="text-gray-400 font-semibold">{designation}</p>
                  <div className="flex flex-col text-start items-center text-white">
                    <span className="mt-2 mb-4 bg-orange-400 rounded-xl px-3 py-1.5 text-black text-xl font-bold">
                      {position}
                    </span>
                  </div>
                </div>
              </div>

              <Image
                className="relative rounded-2xl group-hover:opacity-0 transition-opacity duration-300 object-cover w-full h-auto"
                src={team.picture || "/Team/sahid_withoutGlow.png"}
                height={1000}
                width={1000}
                alt={team.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamLayout;
