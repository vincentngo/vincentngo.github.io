"use client";

import Link from "next/link";
import { useState } from "react";
import type { RoundHistoryEntry } from "@/lib/golf/types";

interface RoundHistoryProps {
  entries: RoundHistoryEntry[];
  locale: string;
}

type SortKey = "newest" | "best" | "course";

export function RoundHistory({ entries, locale }: RoundHistoryProps) {
  const [sort, setSort] = useState<SortKey>("newest");

  const sorted = [...entries].sort((a, b) => {
    if (sort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === "best") return a.toPar - b.toPar;
    return a.courseName.localeCompare(b.courseName);
  });

  return (
    <div className="rounded-xl bg-white">
      <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
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

      <div className="divide-y divide-[#f0f0ea]">
        {sorted.map((entry) => (
          <Link
            key={entry.id}
            href={`/${locale}/golf/${entry.id}/`}
            className="flex items-center justify-between py-4 text-left transition-colors hover:text-[#2d7a3e]"
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
              <ChevronRightIcon />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ChevronRightIcon() {
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
      <path d="m9 18 6-6-6-6" />
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
