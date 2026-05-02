import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales, type Locale } from "@/lib/i18n/config";
import { getRoundById, rounds } from "@/lib/golf/data";
import { Header } from "@/components/layout/header";
import { ScorecardTable } from "@/components/golf/scorecard-table";

export function generateStaticParams() {
  return locales.flatMap((locale) => rounds.map((round) => ({ locale, roundId: round.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ roundId: string }> }) {
  const { roundId } = await params;
  const round = getRoundById(roundId);

  return {
    title: round ? `${round.courseName} Round | Golf` : "Golf Round",
    description: round
      ? `Scorecard for ${round.courseName} on ${round.date}.`
      : "Golf round scorecard.",
  };
}

export default async function GolfRoundPage({
  params,
}: {
  params: Promise<{ locale: string; roundId: string }>;
}) {
  const { locale, roundId } = await params;
  const round = getRoundById(roundId);

  if (!round) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <Link
            href={`/${locale}/golf/`}
            className="text-sm font-medium text-[#2d7a3e] hover:text-[#1a3c27]"
          >
            Back to golf
          </Link>
        </div>
        <ScorecardTable round={round} label="Round" />
      </main>
    </>
  );
}
