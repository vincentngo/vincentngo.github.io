"use client";

import { useState } from "react";
import type {
  LeaderboardEntry,
  PlayerProfile as PlayerProfileType,
  PlayerScorecard,
  PlayerStatistics,
} from "@/lib/golf/types";
import { Leaderboard } from "./leaderboard";
import { PlayerProfile } from "./player-profile";

interface GolfPageClientProps {
  leaderboard: LeaderboardEntry[];
  defaultProfile: PlayerProfileType;
  defaultScorecard?: PlayerScorecard;
  defaultStatistics?: PlayerStatistics;
  allProfiles: Record<string, PlayerProfileType>;
  allScorecards: Record<string, PlayerScorecard>;
  allStatistics: Record<string, PlayerStatistics>;
}

export function GolfPageClient({
  leaderboard,
  defaultProfile,
  defaultScorecard,
  defaultStatistics,
  allProfiles,
  allScorecards,
  allStatistics,
}: GolfPageClientProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(defaultProfile.player.id);

  const currentProfile = allProfiles[selectedPlayerId] ?? defaultProfile;
  const currentScorecard = allScorecards[selectedPlayerId];
  const currentStatistics = allStatistics[selectedPlayerId];

  return (
    <div className="space-y-8">
      {/* Leaderboard Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#25282a]">Tournament Leaderboard</h2>
          <span className="rounded-full bg-[#006747] px-3 py-1 text-xs font-medium text-white">
            Final
          </span>
        </div>
        <div className="rounded-lg border border-[#d9d9d6] bg-white shadow-sm">
          <Leaderboard
            entries={leaderboard}
            selectedPlayerId={selectedPlayerId}
            onSelectPlayer={setSelectedPlayerId}
          />
        </div>
        <p className="mt-2 text-xs text-[#6b6f73]">
          Click a player row to view their profile, scorecard, and statistics.
        </p>
      </section>

      {/* Player Profile Section */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-[#25282a]">
          Player Profile: {currentProfile.player.firstName} {currentProfile.player.lastName}
        </h2>
        <div className="rounded-lg border border-[#d9d9d6] bg-white p-4 shadow-sm sm:p-6">
          <PlayerProfile
            profile={currentProfile}
            scorecard={currentScorecard}
            statistics={currentStatistics}
          />
        </div>
      </section>
    </div>
  );
}
