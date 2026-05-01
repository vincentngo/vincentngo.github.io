import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  greeting: string;
  bio: string;
  location: string;
}

export function HeroSection({ greeting, bio, location }: HeroSectionProps) {
  return (
    <section className="mb-24">
      <div className="mb-8 flex items-start gap-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src="/home/profile-pic.webp"
            alt="Vincent Ngo"
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="flex-1">
          <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">{greeting}</h1>
          <p className="text-lg text-muted-foreground">{location}</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <Link
          href="https://github.com/vincentngo"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="border-b border-transparent transition-colors group-hover:border-foreground">
            GitHub
          </span>
        </Link>

        <Link
          href="https://x.com/VincentNgo2"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="sr-only">X (formerly Twitter)</span>
        </Link>

        <Link
          href="https://linkedin.com/in/vincent-ngo-b6590778"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span className="border-b border-transparent transition-colors group-hover:border-foreground">
            LinkedIn
          </span>
        </Link>
      </div>

      <div className="mb-8 max-w-2xl space-y-4 text-base leading-relaxed text-foreground/90">
        {bio.split("\n\n").map((paragraph, index) => {
          // Parse simple markdown links [text](url) into React elements
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match;
          let linkCount = 0;

          while ((match = linkRegex.exec(paragraph)) !== null) {
            if (match.index > lastIndex) {
              parts.push(paragraph.slice(lastIndex, match.index));
            }
            parts.push(
              <a
                key={`${index}-${linkCount++}`}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-primary"
              >
                {match[1]}
              </a>
            );
            lastIndex = match.index + match[0].length;
          }

          if (lastIndex < paragraph.length) {
            parts.push(paragraph.slice(lastIndex));
          }

          return <p key={index}>{parts.length > 0 ? parts : paragraph}</p>;
        })}
      </div>
    </section>
  );
}
