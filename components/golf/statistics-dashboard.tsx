"use client";

import { useState } from "react";
import type { Statistics } from "@/lib/golf/types";
import type { Round } from "@/lib/golf/types";

interface StatisticsDashboardProps {
  statistics: Statistics;
  rounds: Round[];
}

const tabs = [
  "Scoring Summary",
  "Greens in Reg",
  "Fairways Hit",
  "Putting",
  "Scoring by Par",
  "Driving",
  "Sand Saves",
];

export function StatisticsDashboard({ statistics, rounds }: StatisticsDashboardProps) {
  const [activeTab, setActiveTab] = useState("Scoring Summary");

  return (
    <div className="bg-card">
      <div className="py-4 sm:py-5">
        <h2 className="text-lg font-bold text-foreground">Statistics</h2>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto py-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-[#1a3c27] text-white"
                : "border border-[#2d7a3e] bg-card text-[#2d7a3e] hover:bg-[#e8f5e9] dark:text-[#7ccf8a] dark:hover:bg-[#153421]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-4 sm:py-5">
        {activeTab === "Scoring Summary" && <ScoringSummary stats={statistics} />}
        {activeTab === "Greens in Reg" && <GreensInReg stats={statistics} rounds={rounds} />}
        {activeTab === "Fairways Hit" && <FairwaysHit stats={statistics} rounds={rounds} />}
        {activeTab === "Putting" && <Putting stats={statistics} rounds={rounds} />}
        {activeTab === "Scoring by Par" && <ScoringByPar stats={statistics} />}
        {activeTab === "Driving" && <Driving stats={statistics} rounds={rounds} />}
        {activeTab === "Sand Saves" && <SandSaves stats={statistics} rounds={rounds} />}
      </div>
    </div>
  );
}

function ScoringSummary({ stats }: { stats: Statistics }) {
  const { scoringDistribution } = stats;
  const { eagles, birdies, pars, bogeys, doubleBogeys, total } = scoringDistribution;

  const items = [
    { label: "Eagles", count: eagles, color: "#1a3c27" },
    { label: "Birdies", count: birdies, color: "#2d7a3e" },
    { label: "Par", count: pars, color: "#d4d4d4" },
    { label: "Bogey", count: bogeys, color: "#b0b0b0" },
    { label: "Double+", count: doubleBogeys, color: "#888888" },
  ];

  return (
    <div className="space-y-6">
      {/* Large donut */}
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        <div className="flex flex-col items-center">
          <DonutChart items={items} size={200} strokeWidth={22} />
          <p className="mt-2 text-sm text-muted-foreground">Overall scoring distribution</p>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">
                {item.label} ({item.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Small stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => {
          const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
          return (
            <div key={item.label} className="flex flex-col items-center rounded-lg bg-muted/30 p-3">
              <MiniDonut color={item.color} percentage={pct} size={60} strokeWidth={6} />
              <p className="mt-2 text-lg font-bold text-foreground">{item.count}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-xs font-semibold" style={{ color: item.color }}>
                {pct}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GreensInReg({ stats, rounds }: { stats: Statistics; rounds: Round[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-[#1a3c27] dark:text-[#7ccf8a]">
            {stats.girPercentage}%
          </p>
          <p className="text-sm text-muted-foreground">Greens in Regulation</p>
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">GIR by Round</p>
        <div className="space-y-2">
          {rounds.map((r) => {
            const pct = Math.round((r.greensInRegulation / 18) * 100);
            return (
              <div key={r.id} className="flex items-center gap-3">
                <span className="w-32 shrink-0 truncate text-xs text-muted-foreground">
                  {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[#2d7a3e] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-xs font-semibold text-foreground">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FairwaysHit({ stats, rounds }: { stats: Statistics; rounds: Round[] }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-4xl font-bold text-[#1a3c27] dark:text-[#7ccf8a]">
          {stats.fairwayPercentage}%
        </p>
        <p className="text-sm text-muted-foreground">Fairways in Regulation</p>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">Fairways by Round</p>
        <div className="space-y-2">
          {rounds.map((r) => {
            const pct = Math.round((r.fairwaysHit / r.fairwaysTotal) * 100);
            return (
              <div key={r.id} className="flex items-center gap-3">
                <span className="w-32 shrink-0 truncate text-xs text-muted-foreground">
                  {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[#2d7a3e] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-xs font-semibold text-foreground">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Putting({ stats, rounds }: { stats: Statistics; rounds: Round[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Putts per GIR" value={String(stats.puttsPerGir)} />
      <StatCard label="Putts per Round" value={String(stats.puttsPerRound)} />
      <StatCard label="Total Putts (latest)" value={String(rounds[0]?.putts ?? "-")} />
    </div>
  );
}

function ScoringByPar({ stats }: { stats: Statistics }) {
  const items = [
    { label: "Par 3", avg: stats.avgScoreByPar3, par: 3 },
    { label: "Par 4", avg: stats.avgScoreByPar4, par: 4 },
    { label: "Par 5", avg: stats.avgScoreByPar5, par: 5 },
  ];

  const maxDiff = Math.max(...items.map((i) => i.avg - i.par), 1);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Average score relative to par</p>
      {items.map((item) => {
        const diff = item.avg - item.par;
        const width = Math.min((diff / maxDiff) * 100, 100);
        return (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
              <span className="text-sm font-bold text-[#1a3c27] dark:text-[#7ccf8a]">
                {item.avg}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (+{diff.toFixed(1)})
                </span>
              </span>
            </div>
            <div className="h-6 overflow-hidden rounded-full bg-muted">
              <div
                className="flex h-full items-center justify-end rounded-full bg-[#2d7a3e] pr-2 transition-all"
                style={{ width: `${Math.max(width, 8)}%` }}
              >
                <span className="text-xs font-bold text-white">+{diff.toFixed(1)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Driving({ stats, rounds }: { stats: Statistics; rounds: Round[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Avg Driving Distance" value={`${stats.avgDrivingDistance} yds`} />
        <StatCard label="Longest Drive" value={`${stats.longestDrive} yds`} />
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">Avg Distance by Round</p>
        <div className="space-y-2">
          {rounds.map((r) => {
            const avg = Math.round(
              r.drivingDistances.reduce((s, d) => s + d, 0) / r.drivingDistances.length
            );
            const max = 300;
            return (
              <div key={r.id} className="flex items-center gap-3">
                <span className="w-32 shrink-0 truncate text-xs text-muted-foreground">
                  {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[#2d7a3e] transition-all"
                    style={{ width: `${(avg / max) * 100}%` }}
                  />
                </div>
                <span className="w-14 text-right text-xs font-semibold text-foreground">
                  {avg} yds
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SandSaves({ stats, rounds }: { stats: Statistics; rounds: Round[] }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-4xl font-bold text-[#1a3c27] dark:text-[#7ccf8a]">
          {stats.sandSavePercentage}%
        </p>
        <p className="text-sm text-muted-foreground">Sand Save Percentage</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {rounds.map((r) => {
          const pct = r.sandAttempts > 0 ? Math.round((r.sandSaves / r.sandAttempts) * 100) : 0;
          return (
            <div key={r.id} className="rounded-lg bg-muted/30 p-3 text-center">
              <p className="text-xs text-muted-foreground">
                {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
              <p className="text-xl font-bold text-foreground">
                {r.sandSaves}/{r.sandAttempts}
              </p>
              <p className="text-xs font-semibold text-[#2d7a3e] dark:text-[#7ccf8a]">{pct}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/30 p-4 text-center">
      <p className="text-2xl font-bold text-[#1a3c27] dark:text-[#7ccf8a]">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* ─── SVG Donut Charts ─── */

function DonutChart({
  items,
  size = 120,
  strokeWidth = 16,
}: {
  items: { label: string; count: number; color: string }[];
  size?: number;
  strokeWidth?: number;
}) {
  const total = items.reduce((s, i) => s + i.count, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {items.map((item) => {
        const fraction = total > 0 ? item.count / total : 0;
        const dash = fraction * circumference;
        const dashOffset = -offset;
        offset += dash;
        return (
          <circle
            key={item.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
    </svg>
  );
}

function MiniDonut({
  color,
  percentage,
  size = 48,
  strokeWidth = 5,
}: {
  color: string;
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        className="text-muted"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
