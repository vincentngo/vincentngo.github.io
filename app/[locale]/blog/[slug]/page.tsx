import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/content/posts";
import { locales, type Locale } from "@/lib/i18n/config";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getAllPostSlugs(locale);
    slugs.forEach((slug) => {
      paths.push({ locale, slug });
    });
  }

  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale as Locale, slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale as Locale, slug);
  const dict = await getDictionary(locale as Locale);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <article className="container mx-auto max-w-3xl px-4 py-12">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{post.frontmatter.title}</h1>
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.frontmatter.readingTime && <span>{post.frontmatter.readingTime}</span>}
          </div>
          {post.frontmatter.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </article>
    </>
  );
}
