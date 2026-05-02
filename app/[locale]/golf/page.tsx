import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales, type Locale } from "@/lib/i18n/config";
import { getLeaderboard, getPlayerProfile, getScorecard, getStatistics } from "@/lib/golf/data";
import { Header } from "@/components/layout/header";
import { GolfPageClient } from "@/components/golf/golf-page-client";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Golf | Tournament Leaderboard",
  description: "Live golf tournament leaderboard, player profiles, scorecards, and statistics.",
};

export default async function GolfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const leaderboard = getLeaderboard();
  const defaultPlayerId = "28237"; // Rory McIlroy

  const allProfiles: Record<string, ReturnType<typeof getPlayerProfile>> = {};
  const allScorecards: Record<string, ReturnType<typeof getScorecard>> = {};
  const allStatistics: Record<string, ReturnType<typeof getStatistics>> = {};

  // Preload data for all players on the leaderboard
  for (const entry of leaderboard) {
    allProfiles[entry.playerId] = getPlayerProfile(entry.playerId);
    allScorecards[entry.playerId] = getScorecard(entry.playerId);
    allStatistics[entry.playerId] = getStatistics(entry.playerId);
  }

  const defaultProfile = allProfiles[defaultPlayerId]!;
  const defaultScorecard = allScorecards[defaultPlayerId];
  const defaultStatistics = allStatistics[defaultPlayerId];

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#25282a]">The Masters Tournament</h1>
          <p className="mt-1 text-sm text-[#6b6f73]">
            Augusta National Golf Club &middot; Augusta, Georgia
          </p>
        </div>
        <GolfPageClient
          leaderboard={leaderboard}
          defaultProfile={defaultProfile}
          defaultScorecard={defaultScorecard ?? undefined}
          defaultStatistics={defaultStatistics ?? undefined}
          allProfiles={
            Object.fromEntries(
              Object.entries(allProfiles).filter(([, v]) => v !== undefined)
            ) as Record<string, NonNullable<ReturnType<typeof getPlayerProfile>>>
          }
          allScorecards={
            Object.fromEntries(
              Object.entries(allScorecards).filter(([, v]) => v !== undefined)
            ) as Record<string, NonNullable<ReturnType<typeof getScorecard>>>
          }
          allStatistics={
            Object.fromEntries(
              Object.entries(allStatistics).filter(([, v]) => v !== undefined)
            ) as Record<string, NonNullable<ReturnType<typeof getStatistics>>>
          }
        />
      </main>
    </>
  );
}
