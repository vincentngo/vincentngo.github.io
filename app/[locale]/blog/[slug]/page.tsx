import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/content/posts";
import { locales, type Locale } from "@/lib/i18n/config";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { extractPostHeadings, createHeadingSlugger } from "@/lib/content/headings";
import { TableOfContents } from "@/components/blog/table-of-contents";
import type { ReactNode, ComponentPropsWithoutRef } from "react";

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

  const headings = extractPostHeadings(post.content);
  const getHeadingId = createHeadingSlugger();

  const getNodeText = (node: ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node);
    }

    if (Array.isArray(node)) {
      return node.map(getNodeText).join("");
    }

    if (node && typeof node === "object" && "props" in node) {
      return getNodeText((node as { props?: { children?: ReactNode } }).props?.children ?? "");
    }

    return "";
  };

  const HeadingWithId = (
    Tag: "h2" | "h3",
    props: ComponentPropsWithoutRef<"h2"> | ComponentPropsWithoutRef<"h3">
  ) => {
    const text = getNodeText(props.children).trim();
    const id = text ? getHeadingId(text) : undefined;
    return <Tag {...props} id={id} />;
  };

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <article className="container mx-auto max-w-6xl px-4 py-12">
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

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <TableOfContents
              headings={headings}
              title={dict.blog.onThisPage}
              showMobile
              showDesktop={false}
            />
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote
                source={post.content}
                components={{
                  h2: (props) => HeadingWithId("h2", props),
                  h3: (props) => HeadingWithId("h3", props),
                }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
          </div>
          <TableOfContents
            headings={headings}
            title={dict.blog.onThisPage}
            showMobile={false}
            showDesktop
          />
        </div>
      </article>
    </>
  );
}
