"use client";

import { useState } from "react";
import type { PlayerScorecard } from "@/lib/golf/types";

interface ScorecardProps {
  scorecard: PlayerScorecard;
}

export function Scorecard({ scorecard }: ScorecardProps) {
  const [activeRound, setActiveRound] = useState(1);
  const round = scorecard.rounds.find((r) => r.roundNumber === activeRound);

  if (!round) return null;

  const frontNine = round.scores.slice(0, 9);
  const backNine = round.scores.slice(9, 18);

  const frontPar = frontNine.reduce((sum, h) => sum + h.par, 0);
  const backPar = backNine.reduce((sum, h) => sum + h.par, 0);
  const totalPar = frontPar + backPar;

  const frontScore = frontNine.reduce((sum, h) => sum + h.score, 0);
  const backScore = backNine.reduce((sum, h) => sum + h.score, 0);

  function getScoreClass(score: number, par: number): string {
    const diff = score - par;
    if (diff <= -2) return "text-[#ba0c2f] font-bold"; // eagle or better
    if (diff === -1) return "text-[#df2f3b] font-semibold"; // birdie
    if (diff === 0) return "text-[#25282a]"; // par
    if (diff === 1) return "text-[#25282a]"; // bogey
    return "text-[#6b6f73] font-semibold"; // double bogey+
  }

  function renderHoleRow(label: string, values: number[], pars: number[]) {
    const total = values.reduce((a, b) => a + b, 0);
    return (
      <tr className="border-b border-[#d9d9d6]">
        <td className="bg-[#f2f2f2] px-2 py-2 text-xs font-medium uppercase tracking-wider text-[#6b6f73]">
          {label}
        </td>
        {values.map((v, i) => (
          <td
            key={i}
            className={`px-1 py-2 text-center font-mono text-sm ${getScoreClass(v, pars[i] ?? 4)}`}
          >
            {v}
          </td>
        ))}
        <td className="bg-[#f2f2f2] px-2 py-2 text-center font-mono text-sm font-semibold text-[#25282a]">
          {total}
        </td>
      </tr>
    );
  }

  function renderParRow(pars: number[]) {
    const total = pars.reduce((a, b) => a + b, 0);
    return (
      <tr className="border-b border-[#d9d9d6] bg-[#f2f2f2]">
        <td className="px-2 py-2 text-xs font-medium uppercase tracking-wider text-[#6b6f73]">
          Par
        </td>
        {pars.map((p, i) => (
          <td key={i} className="px-1 py-2 text-center font-mono text-sm text-[#6b6f73]">
            {p}
          </td>
        ))}
        <td className="px-2 py-2 text-center font-mono text-sm font-semibold text-[#25282a]">
          {total}
        </td>
      </tr>
    );
  }

  function renderToParRow(scores: { hole: number; par: number; score: number; yards: number }[]) {
    const diffs = scores.map((s) => s.score - s.par);
    const totalDiff = diffs.reduce((a, b) => a + b, 0);
    return (
      <tr className="border-b border-[#d9d9d6]">
        <td className="bg-[#f2f2f2] px-2 py-2 text-xs font-medium uppercase tracking-wider text-[#6b6f73]">
          vs Par
        </td>
        {diffs.map((d, i) => (
          <td
            key={i}
            className={`px-1 py-2 text-center font-mono text-xs ${
              d < 0 ? "text-[#df2f3b]" : d > 0 ? "text-[#6b6f73]" : "text-[#b1b3b3]"
            }`}
          >
            {d > 0 ? `+${d}` : d === 0 ? "E" : d}
          </td>
        ))}
        <td
          className={`bg-[#f2f2f2] px-2 py-2 text-center font-mono text-sm font-semibold ${
            totalDiff < 0 ? "text-[#df2f3b]" : totalDiff > 0 ? "text-[#25282a]" : "text-[#6b6f73]"
          }`}
        >
          {totalDiff > 0 ? `+${totalDiff}` : totalDiff === 0 ? "E" : totalDiff}
        </td>
      </tr>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {scorecard.rounds.map((r) => (
          <button
            key={r.roundNumber}
            onClick={() => setActiveRound(r.roundNumber)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeRound === r.roundNumber
                ? "bg-[#006747] text-white"
                : "border border-[#d9d9d6] bg-white text-[#25282a] hover:border-[#107d57] hover:text-[#107d57]"
            }`}
          >
            Round {r.roundNumber} ({r.toPar > 0 ? `+${r.toPar}` : r.toPar === 0 ? "E" : r.toPar})
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Front Nine */}
        <div className="overflow-x-auto">
          <h4 className="mb-2 text-sm font-semibold text-[#25282a]">Front Nine</h4>
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="border-b border-[#d9d9d6] bg-[#006747] text-white">
                <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Hole
                </th>
                {frontNine.map((h) => (
                  <th key={h.hole} className="px-1 py-2 text-center text-xs font-medium">
                    {h.hole}
                  </th>
                ))}
                <th className="px-2 py-2 text-center text-xs font-medium uppercase tracking-wider">
                  Out
                </th>
              </tr>
            </thead>
            <tbody>
              {renderParRow(frontNine.map((h) => h.par))}
              {renderHoleRow(
                "Score",
                frontNine.map((h) => h.score),
                frontNine.map((h) => h.par)
              )}
              {renderToParRow(frontNine)}
            </tbody>
          </table>
        </div>

        {/* Back Nine */}
        <div className="overflow-x-auto">
          <h4 className="mb-2 text-sm font-semibold text-[#25282a]">Back Nine</h4>
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="border-b border-[#d9d9d6] bg-[#006747] text-white">
                <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Hole
                </th>
                {backNine.map((h) => (
                  <th key={h.hole} className="px-1 py-2 text-center text-xs font-medium">
                    {h.hole}
                  </th>
                ))}
                <th className="px-2 py-2 text-center text-xs font-medium uppercase tracking-wider">
                  In
                </th>
              </tr>
            </thead>
            <tbody>
              {renderParRow(backNine.map((h) => h.par))}
              {renderHoleRow(
                "Score",
                backNine.map((h) => h.score),
                backNine.map((h) => h.par)
              )}
              {renderToParRow(backNine)}
            </tbody>
          </table>
        </div>

        {/* Round Summary */}
        <div className="flex items-center justify-between rounded-lg border border-[#d9d9d6] bg-[#f2f2f2] px-4 py-3">
          <div className="text-sm text-[#6b6f73]">
            Round {activeRound} Total:{" "}
            <span className="font-mono font-semibold text-[#25282a]">{round.total}</span>
          </div>
          <div className="text-sm text-[#6b6f73]">
            To Par:{" "}
            <span
              className={`font-mono font-semibold ${
                round.toPar < 0
                  ? "text-[#df2f3b]"
                  : round.toPar > 0
                    ? "text-[#25282a]"
                    : "text-[#6b6f73]"
              }`}
            >
              {round.toPar > 0 ? `+${round.toPar}` : round.toPar === 0 ? "E" : round.toPar}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
