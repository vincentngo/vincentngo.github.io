"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  const getLocalizedPath = (locale: Locale) => {
    if (!pathname) return `/${locale}`;

    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

    // If we're on a blog post page, redirect to blog index for the new locale
    // since blog posts have different slugs per locale
    if (pathWithoutLocale.match(/^\/blog\/[^/]+$/)) {
      return `/${locale}/blog`;
    }

    // Return new path with selected locale
    return `/${locale}${pathWithoutLocale}`;
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(locale)}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            currentLocale === locale
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title={localeNames[locale]}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
