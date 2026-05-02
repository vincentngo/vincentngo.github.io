"use client";

import type { PlayerStatistics } from "@/lib/golf/types";

interface StatisticsProps {
  statistics: PlayerStatistics;
}

export function Statistics({ statistics }: StatisticsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {statistics.stats.map((stat) => (
        <div
          key={stat.category}
          className="rounded-lg border border-[#d9d9d6] bg-white p-4 transition-shadow hover:shadow-sm"
        >
          <div className="text-xs font-medium uppercase tracking-wider text-[#6b6f73]">
            {stat.category}
          </div>
          <div className="mt-1 flex items-end justify-between">
            <span className="font-mono text-xl font-semibold text-[#25282a]">{stat.value}</span>
            <span className="rounded-full bg-[#f2f2f2] px-2 py-0.5 text-xs font-medium text-[#107d57]">
              {stat.rank}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
