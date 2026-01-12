"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

interface SearchIndexEntry {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

export default function SearchPage() {
  const params = useParams();
  const locale = params?.["locale"] as Locale;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [allPosts, setAllPosts] = useState<SearchIndexEntry[]>([]);

  useEffect(() => {
    // In a real implementation, this would fetch from a generated JSON file
    // For now, we'll use an empty array
    setAllPosts([]);
  }, [locale]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const searchTerms = normalizedQuery.split(/\s+/);

    const searchResults = allPosts
      .map((post) => {
        let score = 0;

        searchTerms.forEach((term) => {
          if (post.title.toLowerCase().includes(term)) score += 10;
          if (post.description.toLowerCase().includes(term)) score += 5;
          post.tags.forEach((tag) => {
            if (tag.toLowerCase().includes(term)) score += 7;
          });
        });

        return { post, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.post);

    setResults(searchResults);
  }, [query, allPosts]);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Search Blog</h1>

      <div className="mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {query && (
        <div className="space-y-6">
          {results.length === 0 ? (
            <p className="text-muted-foreground">No results found for &quot;{query}&quot;</p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Found {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              {results.map((post) => (
                <article key={post.slug} className="border-b border-border pb-6">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <h2 className="mb-2 text-2xl font-semibold hover:text-primary">{post.title}</h2>
                  </Link>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString(locale)}
                  </p>
                  <p className="mb-4 text-muted-foreground">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
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
            </>
          )}
        </div>
      )}
    </main>
  );
}
