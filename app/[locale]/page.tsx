import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales, type Locale } from "@/lib/i18n/config";
import { getAllPosts, getAllTags } from "@/lib/content/posts";
import { HeroSection } from "@/components/home/hero-section";
import { RecentPosts } from "@/components/home/recent-posts";
import { TagsSection } from "@/components/home/tags-section";
import { Header } from "@/components/layout/header";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const posts = getAllPosts(locale as Locale);
  const tags = getAllTags(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <HeroSection
          greeting={dict.home.greeting}
          bio={dict.home.bio}
          location={dict.home.location}
        />

        <RecentPosts
          posts={posts}
          locale={locale}
          title={dict.home.recentWriting}
          allPostsText={dict.home.allPosts}
          readMoreText={dict.home.readMore}
        />

        <TagsSection tags={tags} locale={locale} title={dict.home.tags} />
      </main>
    </>
  );
}
