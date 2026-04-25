import { generateSearchIndex } from "@/lib/content/search";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "@/components/layout/header";
import { SearchClient } from "@/components/blog/search-client";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface SearchPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const index = generateSearchIndex(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <SearchClient initialPosts={index} locale={locale} />
    </>
  );
}
