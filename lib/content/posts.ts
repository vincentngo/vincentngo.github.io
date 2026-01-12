import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "@/lib/i18n/config";
import type { PostFrontmatter, PostWithSlug } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostsDirectory(locale: Locale): string {
  return path.join(postsDirectory, locale);
}

export function getAllPostSlugs(locale: Locale): string[] {
  const localeDir = getPostsDirectory(locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(locale: Locale, slug: string): PostWithSlug | null {
  try {
    const localeDir = getPostsDirectory(locale);
    const fullPath = path.join(localeDir, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const readingTimeResult = readingTime(content);

    const frontmatter: PostFrontmatter = {
      title: data["title"] || "",
      description: data["description"] || "",
      date: data["date"] || "",
      tags: data["tags"] || [],
      slug: slug,
      readingTime: readingTimeResult.text,
    };

    return {
      frontmatter,
      content,
      locale,
      slug,
    };
  } catch (error) {
    console.error(`Error reading post ${slug} for locale ${locale}:`, error);
    return null;
  }
}

export function getAllPosts(locale: Locale): PostWithSlug[] {
  const slugs = getAllPostSlugs(locale);
  const posts = slugs
    .map((slug) => getPostBySlug(locale, slug))
    .filter((post): post is PostWithSlug => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });

  return posts;
}

export function getPostsByTag(locale: Locale, tag: string): PostWithSlug[] {
  const allPosts = getAllPosts(locale);
  return allPosts.filter((post) => post.frontmatter.tags.includes(tag));
}

export function getAllTags(locale: Locale): string[] {
  const allPosts = getAllPosts(locale);
  const tagsSet = new Set<string>();

  allPosts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}
