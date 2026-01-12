import Link from "next/link";
import type { PostWithSlug } from "@/lib/content/types";

interface RecentPostsProps {
  posts: PostWithSlug[];
  locale: string;
  title: string;
  allPostsText: string;
  readMoreText?: string;
}

export function RecentPosts({ posts, locale, title, allPostsText }: RecentPostsProps) {
  return (
    <section className="mb-24">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          href={`/${locale}/blog`}
          className="group text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="border-b border-transparent transition-colors group-hover:border-foreground">
            {allPostsText} →
          </span>
        </Link>
      </div>

      <div className="space-y-10">
        {posts.slice(0, 5).map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/${locale}/blog/${post.slug}`}>
              <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-foreground/80">
                <span className="border-b-2 border-transparent transition-colors group-hover:border-foreground">
                  {post.frontmatter.title}
                </span>
              </h3>
            </Link>

            <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.frontmatter.readingTime && (
                <>
                  <span>·</span>
                  <span>{post.frontmatter.readingTime}</span>
                </>
              )}
            </div>

            <p className="mb-3 text-foreground/80">{post.frontmatter.description}</p>

            {post.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium transition-colors hover:bg-secondary/80"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
