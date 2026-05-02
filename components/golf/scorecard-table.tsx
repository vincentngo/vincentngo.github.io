"use client";

import type { Round } from "@/lib/golf/types";
import { ScoreMarker } from "@/components/golf/score-marker";

interface ScorecardTableProps {
  round: Round;
  label?: string;
}

export function ScorecardTable({ round, label = "Latest Round" }: ScorecardTableProps) {
  const front9 = round.scores.slice(0, 9);
  const back9 = round.scores.slice(9, 18);

  const frontTotal = front9.reduce((s, h) => s + h.score, 0);
  const backTotal = back9.reduce((s, h) => s + h.score, 0);
  const frontPar = front9.reduce((s, h) => s + h.par, 0);
  const backPar = back9.reduce((s, h) => s + h.par, 0);

  return (
    <div className="bg-card">
      {/* Header */}
      <div className="py-4 sm:py-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {label} — {round.courseName}
            </h2>
            <p className="text-sm text-muted-foreground">
              {new Date(round.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#1a3c27] dark:text-[#7ccf8a]">
              {round.total}
            </span>
            <span className="text-lg font-semibold text-muted-foreground">(+{round.toPar})</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
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
                <th className="w-14 border-l border-white/20 px-2 py-2.5 text-xs font-bold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#e8f5e9] dark:bg-[#102719]">
                <td className="sticky left-0 z-10 bg-[#e8f5e9] px-2 py-2 text-left text-xs font-semibold text-[#1a3c27] dark:bg-[#102719] dark:text-[#7ccf8a]">
                  Par
                </td>
                {round.scores.map((h) => (
                  <td
                    key={`par-${h.hole}`}
                    className="px-1 py-2 text-xs font-medium text-[#1a3c27] dark:text-[#7ccf8a]"
                  >
                    {h.par}
                  </td>
                ))}
                <td className="border-l border-border px-2 py-2 text-xs font-bold text-[#1a3c27] dark:text-[#7ccf8a]">
                  {frontPar + backPar}
                </td>
              </tr>
              <tr>
                <td className="sticky left-0 z-10 bg-card px-2 py-2 text-left text-xs font-semibold text-foreground">
                  R1
                </td>
                {round.scores.map((h) => (
                  <td
                    key={`score-${h.hole}`}
                    className="bg-card px-1 py-2 text-sm font-bold text-foreground transition-transform hover:scale-110"
                  >
                    <ScoreMarker score={h.score} par={h.par} />
                  </td>
                ))}
                <td className="border-l border-border bg-muted px-2 py-2 text-sm font-bold text-foreground">
                  {round.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 9-hole summary */}
        <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
          <div className="bg-card p-3 text-center">
            <p className="text-xs text-muted-foreground">Front 9</p>
            <p className="text-lg font-bold text-foreground">
              {frontTotal}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                (+{frontTotal - frontPar})
              </span>
            </p>
          </div>
          <div className="bg-card p-3 text-center">
            <p className="text-xs text-muted-foreground">Back 9</p>
            <p className="text-lg font-bold text-foreground">
              {backTotal}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                (+{backTotal - backPar})
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
