import type { ReactNode } from "react";

interface XPostProps {
  authorName: string;
  username: string;
  href: string;
  text: string;
  date?: string;
  children?: ReactNode;
}

function XLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export function XPost({ authorName, username, href, text, date, children }: XPostProps) {
  return (
    <article className="not-prose my-8 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm">
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-semibold">{authorName}</p>
            <p className="truncate text-sm text-muted-foreground">@{username}</p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${authorName}'s post on X`}
            className="shrink-0 text-foreground transition-opacity hover:opacity-65"
          >
            <XLogo />
          </a>
        </div>

        <p className="whitespace-pre-line text-[15px] leading-6 sm:text-base">{text}</p>
        {children}

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4 text-sm">
          {date ? <time className="text-muted-foreground">{date}</time> : <span />}
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground no-underline hover:underline"
          >
            View on X
          </a>
        </div>
      </div>
    </article>
  );
}
