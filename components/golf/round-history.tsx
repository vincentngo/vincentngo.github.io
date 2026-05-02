"use client";

import { useState } from "react";
import type { RoundHistoryEntry } from "@/lib/golf/types";
import { getScoreColorClass } from "@/lib/golf/data";

interface RoundHistoryProps {
  entries: RoundHistoryEntry[];
}

type SortKey = "newest" | "best" | "course";

export function RoundHistory({ entries }: RoundHistoryProps) {
  const [sort, setSort] = useState<SortKey>("newest");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sorted = [...entries].sort((a, b) => {
    if (sort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === "best") return a.toPar - b.toPar;
    return a.courseName.localeCompare(b.courseName);
  });

  return (
    <div className="rounded-xl border border-[#e0e0d8] bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-[#e0e0d8] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Round History</h2>
        <div className="flex gap-2">
          {(
            [
              { key: "newest", label: "Newest" },
              { key: "best", label: "Best Score" },
              { key: "course", label: "Course" },
            ] as { key: SortKey; label: string }[]
          ).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSort(opt.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                sort === opt.key
                  ? "bg-[#1a3c27] text-white"
                  : "border border-[#e0e0d8] bg-white text-[#5c5c5c] hover:border-[#2d7a3e] hover:text-[#2d7a3e]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-[#e0e0d8]">
        {sorted.map((entry) => {
          const isExpanded = expandedId === entry.id;
          return (
            <div key={entry.id} className="p-4">
              <button
                onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                className="flex w-full items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5e9] text-sm font-bold text-[#1a3c27]">
                    {entry.toPar > 0 ? `+${entry.toPar}` : entry.toPar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{entry.courseName}</p>
                    <div className="flex items-center gap-2 text-xs text-[#888888]">
                      <span className="flex items-center gap-0.5">
                        <MapPinIcon /> {entry.location}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <CalendarIcon />
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[#1a1a1a]">{entry.total}</span>
                  {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-center text-xs">
                    <thead>
                      <tr className="bg-[#f5f5f0]">
                        <th className="px-1 py-1.5 font-semibold text-[#5c5c5c]">Hole</th>
                        {Array.from({ length: 18 }, (_, i) => (
                          <th key={i} className="w-8 px-0.5 py-1.5 font-semibold text-[#5c5c5c]">
                            {i + 1}
                          </th>
                        ))}
                        <th className="px-1 py-1.5 font-bold text-[#1a1a1a]">TOT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-1 py-1.5 font-semibold text-[#5c5c5c]">Score</td>
                        {entry.scores.map((s, i) => {
                          const par =
                            i === 2 || i === 5 || i === 11 || i === 15
                              ? 3
                              : i === 1 || i === 7 || i === 12 || i === 17
                                ? 5
                                : 4;
                          return (
                            <td
                              key={i}
                              className={`px-0.5 py-1.5 text-xs font-bold ${getScoreColorClass(s, par)}`}
                            >
                              {s}
                            </td>
                          );
                        })}
                        <td className="bg-[#f5f5f0] px-1 py-1.5 font-bold text-[#1a1a1a]">
                          {entry.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#888888]"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#888888]"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
