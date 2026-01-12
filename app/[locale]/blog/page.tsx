import Link from "next/link";
import { getAllPosts } from "@/lib/content/posts";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "@/components/layout/header";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const posts = getAllPosts(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold">{dict.nav.blog}</h1>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-border pb-8">
                <Link href={`/${locale}/blog/${post.slug}`}>
                  <h2 className="mb-2 text-2xl font-semibold hover:text-primary">
                    {post.frontmatter.title}
                  </h2>
                </Link>
                <div className="mb-4 flex gap-4 text-sm text-muted-foreground">
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.frontmatter.readingTime && <span>{post.frontmatter.readingTime}</span>}
                </div>
                <p className="mb-4 text-muted-foreground">{post.frontmatter.description}</p>
                {post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
