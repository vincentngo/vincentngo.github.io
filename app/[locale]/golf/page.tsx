import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales, type Locale } from "@/lib/i18n/config";
import {
  golferProfile,
  latestRound,
  statistics,
  roundHistory,
  coursesPlayed,
  rounds,
} from "@/lib/golf/data";
import { Header } from "@/components/layout/header";
import { GolfPageClient } from "@/components/golf/golf-page-client";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Golf | My Journey",
  description: "Personal golf score tracker, statistics, and round history.",
};

export default async function GolfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a1a1a]">My Golf Journey</h1>
          <p className="mt-1 text-sm text-[#888888]">
            Tracking every round, every shot, every improvement.
          </p>
        </div>
        <GolfPageClient
          locale={locale}
          profile={golferProfile}
          latestRound={latestRound}
          statistics={statistics}
          roundHistory={roundHistory}
          courses={coursesPlayed}
          allRounds={rounds}
        />
      </main>
    </>
  );
}
