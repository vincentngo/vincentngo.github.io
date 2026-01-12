import RSS from "rss";
import { getAllPosts } from "./posts";
import type { Locale } from "@/lib/i18n/config";

const SITE_URL = "https://itsvngo.github.io/itsvngo";
const SITE_TITLE = "itsvngo";
const SITE_DESCRIPTION = "Personal Portfolio & Knowledge Platform";

export function generateRSSFeed(locale: Locale): string {
  const feed = new RSS({
    title: `${SITE_TITLE} - ${locale.toUpperCase()}`,
    description: SITE_DESCRIPTION,
    feed_url: `${SITE_URL}/${locale}/rss.xml`,
    site_url: `${SITE_URL}/${locale}`,
    language: locale,
    pubDate: new Date(),
  });

  const posts = getAllPosts(locale);

  posts.forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      date: new Date(post.frontmatter.date),
      categories: post.frontmatter.tags,
    });
  });

  return feed.xml({ indent: true });
}
