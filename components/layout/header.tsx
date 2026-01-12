import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import type { Locale } from "@/lib/i18n/config";

interface HeaderProps {
  locale: Locale;
  dict: {
    nav: {
      home: string;
      blog: string;
      about: string;
    };
  };
}

export function Header({ locale, dict }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <nav className="flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className="text-sm font-medium transition-colors hover:text-foreground/80"
          >
            {dict.nav.home}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-medium transition-colors hover:text-foreground/80"
          >
            {dict.nav.blog}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
