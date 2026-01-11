# 🧑‍🚀 Personal Portfolio & Knowledge Platform

> A modern, static, AI-ready personal website & blog built for long-term growth.

## 🌟 Vision

This project is not just a portfolio site. It is a personal knowledge platform designed to last 10+ years.

## 🧱 Core Goals

* Publish blog posts & technical writing
* Showcase projects & professional profile
* Serve content in multiple languages
* Support dark & light mode
* Provide voice versions of articles
* Become the training corpus for a future AI assistant
* Remain 100% static with zero hosting cost

## 🧠 Architecture Overview

### Engineering Standards

* Next.js 16 best practices (App Router, Server Components, static export)
* TypeScript strict mode with zero `any`
* Clean Architecture principles: separation of concerns, domain-driven folder structure, no circular dependencies
* React composition-first design
* Predictable data flow, no side effects in render

Runtime: Bun
Framework: Next.js App Router (Static Export)
Language: TypeScript (strict)
Styling: Tailwind CSS v4
UI: shadcn/ui
Theming: next-themes
Content: MDX
Audio: ElevenLabs
Deployment: GitHub Pages

## 🗂 Project Structure

```
app/
  [locale]/
    page.tsx
    blog/
      page.tsx
components/
  ui/
  layout/
  blog/
content/
  posts/
    en/
    fr/
    vi/
lib/
  api/
  content/
  hooks/
  utils/
types/
public/
  audio/
scripts/
styles/
```

## 🌍 Localization

URL-based locales: /en /fr /vi /ja /es
English is canonical. Others are generated.

## 🌗 Theming

Dark & Light via next-themes with CSS tokens.

## ✍️ Blog System

MDX powered, SEO optimized, RSS feed, tags, static search, reading time.

## 🎧 Voice Articles

Each post supports ElevenLabs narration and cached audio.

## 🤖 Future AI Integration

MDX → Parser → Embeddings → Vector DB → RAG → Chat API → Chat UI

## 🧪 Tooling & Project Hygiene

* ESLint (Next.js + custom rules)
* Prettier
* Husky + lint-staged (pre-commit hooks)
* TypeScript strict compiler checks
* Commitlint (conventional commits)
* Playwright (optional E2E)
* Bun test runner (optional unit tests)

## 🚀 Development

bun dev
bun run build
next export
