"use client";

import type { Round } from "@/lib/golf/types";
import { getScoreColorClass } from "@/lib/golf/data";

interface ScorecardTableProps {
  round: Round;
}

export function ScorecardTable({ round }: ScorecardTableProps) {
  const front9 = round.scores.slice(0, 9);
  const back9 = round.scores.slice(9, 18);

  const frontTotal = front9.reduce((s, h) => s + h.score, 0);
  const backTotal = back9.reduce((s, h) => s + h.score, 0);
  const frontPar = front9.reduce((s, h) => s + h.par, 0);
  const backPar = back9.reduce((s, h) => s + h.par, 0);

  return (
    <div className="rounded-xl border border-[#e0e0d8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e0e0d8] p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1a1a1a]">Latest Round — {round.courseName}</h2>
            <p className="text-sm text-[#888888]">
              {new Date(round.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#1a3c27]">{round.total}</span>
            <span className="text-lg font-semibold text-[#5c5c5c]">(+{round.toPar})</span>
          </div>
        </div>
      </div>

      {/* Scorecard */}
      <div className="overflow-x-auto">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="bg-[#1a3c27] text-white">
              <th className="sticky left-0 z-10 w-16 bg-[#1a3c27] px-2 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">
                Hole
              </th>
              {round.scores.map((h) => (
                <th key={h.hole} className="w-10 px-1 py-2.5 text-xs font-semibold">
                  {h.hole}
                </th>
              ))}
              <th className="w-14 border-l border-white/20 px-2 py-2.5 text-xs font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#e8f5e9]">
              <td className="sticky left-0 z-10 bg-[#e8f5e9] px-2 py-2 text-left text-xs font-semibold text-[#1a3c27]">
                Par
              </td>
              {round.scores.map((h) => (
                <td key={`par-${h.hole}`} className="px-1 py-2 text-xs font-medium text-[#1a3c27]">
                  {h.par}
                </td>
              ))}
              <td className="border-l border-[#e0e0d8] px-2 py-2 text-xs font-bold text-[#1a3c27]">
                {frontPar + backPar}
              </td>
            </tr>
            <tr>
              <td className="sticky left-0 z-10 bg-white px-2 py-2 text-left text-xs font-semibold text-[#1a1a1a]">
                R1
              </td>
              {round.scores.map((h) => (
                <td
                  key={`score-${h.hole}`}
                  className={`px-1 py-2 text-sm font-bold transition-transform hover:scale-110 ${getScoreColorClass(
                    h.score,
                    h.par
                  )}`}
                >
                  {h.score}
                </td>
              ))}
              <td className="border-l border-[#e0e0d8] bg-[#f5f5f0] px-2 py-2 text-sm font-bold text-[#1a1a1a]">
                {round.total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 9-hole summary */}
      <div className="grid grid-cols-2 gap-px border-t border-[#e0e0d8] bg-[#e0e0d8]">
        <div className="bg-white p-3 text-center">
          <p className="text-xs text-[#888888]">Front 9</p>
          <p className="text-lg font-bold text-[#1a1a1a]">
            {frontTotal}{" "}
            <span className="text-sm font-normal text-[#888888]">(+{frontTotal - frontPar})</span>
          </p>
        </div>
        <div className="bg-white p-3 text-center">
          <p className="text-xs text-[#888888]">Back 9</p>
          <p className="text-lg font-bold text-[#1a1a1a]">
            {backTotal}{" "}
            <span className="text-sm font-normal text-[#888888]">(+{backTotal - backPar})</span>
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 border-t border-[#e0e0d8] p-3">
        <LegendItem color="bg-[#1a3c27]" text="Eagle or better" />
        <LegendItem color="bg-[#2d7a3e]" text="Birdie" />
        <LegendItem color="bg-white border border-[#e0e0d8]" text="Par" />
        <LegendItem color="bg-[#e8e8e8]" text="Bogey" />
        <LegendItem color="bg-[#c8c8c8]" text="Double bogey+" />
      </div>
    </div>
  );
}

function LegendItem({ color, text }: { color: string; text: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-block h-3.5 w-3.5 rounded-sm ${color}`} />
      <span className="text-xs text-[#888888]">{text}</span>
    </div>
  );
}
