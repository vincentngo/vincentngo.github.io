import { getAllPosts } from "./posts";
import { locales } from "@/lib/i18n/config";

const SITE_URL = "https://itsvngo.github.io/itsvngo";

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export function generateSitemap(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Add homepage for each locale
  locales.forEach((locale) => {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    // Add blog index for each locale
    entries.push({
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });

    // Add all blog posts for each locale
    const posts = getAllPosts(locale);
    posts.forEach((post) => {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.frontmatter.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  return entries;
}
