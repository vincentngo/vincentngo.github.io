import { getAllPosts } from "./posts";
import type { Locale } from "@/lib/i18n/config";
import type { PostWithSlug } from "./types";

export interface SearchResult {
  post: PostWithSlug;
  score: number;
}

export function searchPosts(locale: Locale, query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const posts = getAllPosts(locale);
  const normalizedQuery = query.toLowerCase().trim();
  const searchTerms = normalizedQuery.split(/\s+/);

  const results: SearchResult[] = posts
    .map((post) => {
      let score = 0;

      // Search in title (highest weight)
      const titleLower = post.frontmatter.title.toLowerCase();
      searchTerms.forEach((term) => {
        if (titleLower.includes(term)) {
          score += 10;
        }
      });

      // Search in description
      const descLower = post.frontmatter.description.toLowerCase();
      searchTerms.forEach((term) => {
        if (descLower.includes(term)) {
          score += 5;
        }
      });

      // Search in tags
      post.frontmatter.tags.forEach((tag) => {
        const tagLower = tag.toLowerCase();
        searchTerms.forEach((term) => {
          if (tagLower.includes(term)) {
            score += 7;
          }
        });
      });

      // Search in content (lower weight)
      const contentLower = post.content.toLowerCase();
      searchTerms.forEach((term) => {
        if (contentLower.includes(term)) {
          score += 1;
        }
      });

      return { post, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return results;
}

export function generateSearchIndex(locale: Locale) {
  const posts = getAllPosts(locale);

  return posts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    tags: post.frontmatter.tags,
    date: post.frontmatter.date,
  }));
}
