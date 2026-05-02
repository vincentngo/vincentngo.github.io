"use client";

import type { Round, RoundHistoryEntry } from "@/lib/golf/types";
import type { Course } from "@/lib/golf/types";
import type { GolferProfile, Statistics } from "@/lib/golf/types";
import { ProfileHeader } from "./profile-header";
import { ScorecardTable } from "./scorecard-table";
import { StatisticsDashboard } from "./statistics-dashboard";
import { RoundHistory } from "./round-history";
import { CourseDirectory } from "./course-directory";

interface GolfPageClientProps {
  locale: string;
  profile: GolferProfile;
  latestRound: Round;
  statistics: Statistics;
  roundHistory: RoundHistoryEntry[];
  courses: (Course & { timesPlayed: number; bestScore: number; avgScore: number })[];
  allRounds: Round[];
}

export function GolfPageClient({
  locale,
  profile,
  latestRound,
  statistics,
  roundHistory,
  courses,
  allRounds,
}: GolfPageClientProps) {
  return (
    <div className="space-y-8">
      <ProfileHeader profile={profile} />
      <ScorecardTable round={latestRound} />
      <StatisticsDashboard statistics={statistics} rounds={allRounds} />
      <RoundHistory entries={roundHistory} locale={locale} />
      <CourseDirectory courses={courses} />
    </div>
  );
}
