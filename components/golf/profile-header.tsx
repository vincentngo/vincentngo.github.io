"use client";

import type { GolferProfile } from "@/lib/golf/types";

interface ProfileHeaderProps {
  profile: GolferProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="rounded-xl border border-[#e0e0d8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1a3c27] text-xl font-bold text-white ring-2 ring-[#2d7a3e] ring-offset-2">
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="sm:hidden">
            <h1 className="text-xl font-bold text-[#1a1a1a]">{profile.name}</h1>
            <span className="inline-flex items-center rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-xs font-semibold text-[#1a3c27]">
              HCP {profile.handicap}
            </span>
          </div>
        </div>

        {/* Name + Handicap (desktop) */}
        <div className="hidden sm:block">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">{profile.name}</h1>
          <span className="mt-1 inline-flex items-center rounded-full bg-[#e8f5e9] px-3 py-1 text-sm font-semibold text-[#1a3c27]">
            Handicap {profile.handicap}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex flex-1 flex-wrap gap-4 sm:justify-end">
          <StatBlock icon={<FlagIcon />} label="Rounds" value={String(profile.roundsPlayed)} />
          <StatBlock icon={<TrophyIcon />} label="Best" value={`+${profile.bestScoreToPar}`} />
          <StatBlock icon={<TrendingUpIcon />} label="Avg" value={`+${profile.avgScoreToPar}`} />
          <StatBlock icon={<MapPinIcon />} label="Courses" value={String(profile.coursesPlayed)} />
        </div>
      </div>
    </div>
  );
}

function StatBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-[#f5f5f0] px-3 py-2">
      <span className="text-[#2d7a3e]">{icon}</span>
      <div>
        <p className="text-xs font-medium text-[#888888]">{label}</p>
        <p className="text-sm font-bold text-[#1a1a1a]">{value}</p>
      </div>
    </div>
  );
}

function FlagIcon() {
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
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function TrophyIcon() {
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
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function TrendingUpIcon() {
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
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function MapPinIcon() {
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
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
