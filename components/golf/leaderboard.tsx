"use client";

import type { LeaderboardEntry } from "@/lib/golf/types";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  selectedPlayerId: string;
  onSelectPlayer: (id: string) => void;
}

export function Leaderboard({ entries, selectedPlayerId, onSelectPlayer }: LeaderboardProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#006747] text-white">
            <th className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
              Pos
            </th>
            <th className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
              Player
            </th>
            <th className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
              Total
            </th>
            <th className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
              To Par
            </th>
            <th className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
              R1
            </th>
            <th className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
              R2
            </th>
            <th className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
              R3
            </th>
            <th className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
              R4
            </th>
            <th className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
              Thru
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => {
            const isSelected = entry.playerId === selectedPlayerId;
            const isEven = index % 2 === 0;
            return (
              <tr
                key={entry.playerId + index}
                onClick={() => onSelectPlayer(entry.playerId)}
                className={`cursor-pointer transition-colors ${
                  isSelected ? "bg-[#107d57]/20" : isEven ? "bg-white" : "bg-[#f2f2f2]"
                } border-b border-[#d9d9d6] hover:bg-[#107d57]/10`}
              >
                <td className="px-3 py-2.5 font-mono text-[#25282a]">{entry.position}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#6b6f73]">{entry.countryCode}</span>
                    <span className="font-medium text-[#25282a]">{entry.playerName}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-center font-mono font-semibold text-[#25282a]">
                  {entry.total}
                </td>
                <td
                  className={`px-3 py-2.5 text-center font-mono font-semibold ${
                    entry.toPar < 0
                      ? "text-[#df2f3b]"
                      : entry.toPar > 0
                        ? "text-[#25282a]"
                        : "text-[#6b6f73]"
                  }`}
                >
                  {entry.toPar > 0 ? `+${entry.toPar}` : entry.toPar === 0 ? "E" : entry.toPar}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-[#25282a]">
                  {entry.round1 ?? "-"}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-[#25282a]">
                  {entry.round2 ?? "-"}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-[#25282a]">
                  {entry.round3 ?? "-"}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-[#25282a]">
                  {entry.round4 ?? "-"}
                </td>
                <td className="px-3 py-2.5 text-center font-mono text-xs text-[#6b6f73]">
                  {entry.thru}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
