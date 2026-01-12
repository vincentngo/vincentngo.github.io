import type { Locale } from "@/lib/i18n/config";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  readingTime?: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  locale: Locale;
}

export interface PostWithSlug extends Post {
  slug: string;
}
