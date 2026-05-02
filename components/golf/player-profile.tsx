"use client";

import { useState } from "react";
import type {
  PlayerProfile as PlayerProfileType,
  PlayerScorecard,
  PlayerStatistics,
} from "@/lib/golf/types";
import { Scorecard } from "./scorecard";
import { Statistics } from "./statistics";

interface PlayerProfileProps {
  profile: PlayerProfileType;
  scorecard?: PlayerScorecard;
  statistics?: PlayerStatistics;
}

export function PlayerProfile({ profile, scorecard, statistics }: PlayerProfileProps) {
  const [activeTab, setActiveTab] = useState<"scorecard" | "statistics" | "results">("scorecard");
  const { player, pastResults } = profile;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col gap-4 rounded-lg border border-[#d9d9d6] bg-white p-6 sm:flex-row sm:items-start">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#006747] text-2xl font-bold text-white">
          {player.firstName[0]}
          {player.lastName[0]}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#25282a]">
            {player.firstName} {player.lastName}
          </h2>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#6b6f73]">
            <span>{player.country}</span>
            <span>Age: {player.age}</span>
            <span>Height: {player.height}</span>
            <span>Weight: {player.weight}</span>
            <span className="font-medium text-[#107d57]">
              World Ranking: #{player.worldRanking}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#25282a]">{player.bio}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#d9d9d6]">
        <div className="flex gap-1">
          {(
            [
              { key: "scorecard", label: "Scorecard", enabled: !!scorecard },
              { key: "statistics", label: "Statistics", enabled: !!statistics },
              { key: "results", label: "Past Results", enabled: pastResults.length > 0 },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => tab.enabled && setActiveTab(tab.key)}
              disabled={!tab.enabled}
              className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-[#006747] text-[#006747]"
                  : tab.enabled
                    ? "border-transparent text-[#6b6f73] hover:text-[#25282a]"
                    : "cursor-not-allowed border-transparent text-[#b1b3b3]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === "scorecard" && scorecard && <Scorecard scorecard={scorecard} />}
        {activeTab === "statistics" && statistics && <Statistics statistics={statistics} />}
        {activeTab === "results" && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#006747] text-white">
                  <th className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
                    To Par
                  </th>
                </tr>
              </thead>
              <tbody>
                {pastResults.map((result, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <tr
                      key={result.year}
                      className={`border-b border-[#d9d9d6] ${isEven ? "bg-white" : "bg-[#f2f2f2]"}`}
                    >
                      <td className="px-3 py-2.5 font-mono text-[#25282a]">{result.year}</td>
                      <td className="px-3 py-2.5 font-medium text-[#25282a]">{result.position}</td>
                      <td className="px-3 py-2.5 text-center font-mono text-[#25282a]">
                        {result.score}
                      </td>
                      <td
                        className={`px-3 py-2.5 text-center font-mono font-semibold ${
                          result.toPar.startsWith("-")
                            ? "text-[#df2f3b]"
                            : result.toPar === "E"
                              ? "text-[#6b6f73]"
                              : "text-[#25282a]"
                        }`}
                      >
                        {result.toPar}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
