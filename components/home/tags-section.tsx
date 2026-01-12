import Link from "next/link";

interface TagsSectionProps {
  tags: string[];
  locale: string;
  title: string;
}

export function TagsSection({ tags, locale, title }: TagsSectionProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <section className="mb-24">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
            className="group rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-all hover:border-foreground/30 hover:bg-secondary"
          >
            <span className="transition-colors">{tag}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
