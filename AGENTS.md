# AGENTS.md - Codebase Guide for AI Agents

## Build/Lint/Test Commands

```bash
bun dev                    # Development server (localhost:3000)
bun run build              # Production build (static export to ./out)
bun run lint               # Run ESLint via next lint
bun run format             # Format code with Prettier
bun run format:check       # Check formatting without writing
bun run start              # Start production server locally
```

Note: No test suite is configured yet. Bun test runner mentioned in README as optional.

## Project Architecture

- **Framework**: Next.js 16 App Router with static export
- **Runtime**: Bun
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3 + shadcn/ui design tokens
- **Content**: MDX blog posts in `content/posts/{locale}/`
- **i18n**: URL-based locales (`/en`, `/fr`, `/vi`, `/ja`, `/es`)

## Project Structure

```
app/
  [locale]/                 # Locale-based routing
    page.tsx                # Homepage
    blog/
      page.tsx              # Blog listing
      [slug]/page.tsx       # Individual blog post
    layout.tsx              # Locale layout wrapper
  layout.tsx                # Root layout
  globals.css               # Design tokens + Tailwind
components/
  home/                     # Homepage components
  layout/                   # Header, theme toggle, language switcher
  blog/                     # Blog-specific components
  ui/                       # (shadcn/ui components)
lib/
  content/                  # Post parsing, types, RSS, sitemap
  i18n/                     # Locale config, dictionaries
types/                      # Shared types
public/
  audio/                    # ElevenLabs cached audio
content/
  posts/
    en/                     # English MDX posts
    fr/                     # French MDX posts
    vi/                     # Vietnamese MDX posts
```

## Code Style Guidelines

### TypeScript

- **Strict mode**: Enabled. Zero `any` types allowed.
- **Type imports**: Use `import type { ... }` for type-only imports.
- **Interfaces**: Define props interfaces above components.
- **Naming**: PascalCase for components/types, camelCase for functions/variables.

```tsx
interface HeroSectionProps {
  greeting: string;
  bio: string;
  location: string;
}

export function HeroSection({ greeting, bio, location }: HeroSectionProps) {
  // ...
}
```

### React Components

- **Server Components**: Default (no `"use client"` unless needed).
- **Named exports**: Use named exports for components.
- **Props typing**: Use interface for props, not inline types.
- **Async components**: Use `async function` for server components.

```tsx
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // ...
}
```

### Imports

- **Path alias**: Use `@/` prefix for imports from root.
- **Order**: React/Next imports first, then external packages, then local imports.

```tsx
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "@/components/layout/header";
import type { Locale } from "@/lib/i18n/config";
```

### Tailwind & Styling

- **Design tokens**: Use CSS variables (`bg-background`, `text-foreground`, `text-muted-foreground`).
- **Component classes**: Use Tailwind utility classes directly.
- **Dark mode**: Via `next-themes`, use `dark:` prefix.

```tsx
<div className="container mx-auto max-w-4xl px-4 py-16">
  <h1 className="mb-3 text-4xl font-bold tracking-tight">
```

### Error Handling

- **Not found**: Use Next.js `notFound()` function for missingcontent.
- **Null checks**: Filter out nulls with type guards.

```tsx
const posts = slugs
  .map((slug) => getPostBySlug(locale, slug))
  .filter((post): post is PostWithSlug => post !== null);
```

### File Conventions

- **Pages**: `page.tsx` for routes, `layout.tsx` for layouts, `route.ts` for API.
- **Static generation**: Use `generateStaticParams()` for dynamic routes.

```tsx
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
```

### MDX Blog Posts

- **Location**: `content/posts/{locale}/{slug}.mdx`
- **Frontmatter**: title, description, date, tags (required).

```mdx
---
title: "Post Title"
description: "Post description"
date: "2024-01-15"
tags: ["tag1", "tag2"]
---

Content here...
```

## Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2
}
```

## Commit Message Guidelines

Uses conventional commits with commitlint:

```
type: subject (max 100 chars)

- Body line 1 (max100 chars)
- Body line 2
```

**Valid types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Example:

```
feat: add user authentication with JWT

- Implement login and registration endpoints
- Add JWT token generation and validation
```

## Key Patterns

### i18n Dictionary Pattern

```tsx
const dict = await getDictionary(locale as Locale);
// Access: dict.home.greeting, dict.nav.blog, etc.
```

### Locale Type

```tsx
import type { Locale } from "@/lib/i18n/config";
// Valid values: "en" | "fr" | "vi" | "ja" | "es"
```

### Static Export Compatibility

- Use `output: "export"` in next.config.ts
- Images must use `unoptimized: true`
- No server-only features (no middleware, no API routes with dynamic responses)

## Pre-commit Hooks

Husky runs lint-staged on commit:

```json
{
  "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"]
}
```

## Testing Strategy

- No tests currently configured
- Unit tests: Bun test runner (optional)
- E2E tests: Playwright (optional)

## Important Notes

1. **No `any` types** - Strict TypeScript enforced
2. **Server components by default** - Only add `"use client"` when necessary (hooks, event handlers)
3. **Statically exportable** - All features must work with `next build && next export`
4. **Locale-aware routing** - All pages under `[locale]` dynamic segment
5. **MDX content** - Blog posts parsed with gray-matter, rendered with next-mdx-remote
