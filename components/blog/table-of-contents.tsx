"use client";

import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import type { PostHeading } from "@/lib/content/headings";

interface TableOfContentsProps {
  headings: PostHeading[];
  title: string;
  showMobile?: boolean;
  showDesktop?: boolean;
}

export function TableOfContents({
  headings,
  title,
  showMobile = true,
  showDesktop = true,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings]);

  useEffect(() => {
    if (headingIds.length === 0) {
      return;
    }

    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (headingElements.length === 0) {
      return;
    }

    const onScroll = () => {
      const offset = 120;
      let currentId = headingElements[0].id;

      for (const element of headingElements) {
        if (element.getBoundingClientRect().top <= offset) {
          currentId = element.id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
    };

    onScroll();

    const observer = new IntersectionObserver(
      () => {
        onScroll();
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: [0, 1],
      }
    );

    headingElements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [headingIds]);

  useEffect(() => {
    if (!activeId && headings.length > 0) {
      setActiveId(headings[0].id);
    }
  }, [activeId, headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const renderLinks = () => (
    <nav aria-label={title}>
      <ul className="space-y-2">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={handleClick(heading.id)}
                className={[
                  "block border-l pl-3 text-sm transition-colors",
                  heading.level === 3 ? "ml-4" : "",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                ].join(" ")}
                aria-current={isActive ? "location" : undefined}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {showMobile && (
        <details className="mb-8 rounded-lg border border-border bg-card p-4 lg:hidden">
          <summary className="cursor-pointer list-none text-sm font-semibold">{title}</summary>
          <div className="mt-4">{renderLinks()}</div>
        </details>
      )}

      {showDesktop && (
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {title}
            </h2>
            {renderLinks()}
          </div>
        </aside>
      )}
    </>
  );
}
