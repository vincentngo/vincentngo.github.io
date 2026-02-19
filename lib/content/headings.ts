export type PostHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

type HeadingLevel = PostHeading["level"];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z0-9#]+;/gi, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createHeadingSlugger() {
  const counts = new Map<string, number>();

  return (value: string): string => {
    const normalized = slugify(value);
    const base = normalized || "section";
    const currentCount = counts.get(base) ?? 0;
    counts.set(base, currentCount + 1);

    if (currentCount === 0) {
      return base;
    }

    return `${base}-${currentCount}`;
  };
}

function stripInlineMarkdown(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]+/g, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function parseHeadingLine(line: string): { level: HeadingLevel; text: string } | null {
  const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line.trim());
  if (!match) {
    return null;
  }

  const level = match[1].length as HeadingLevel;
  if (level !== 2 && level !== 3) {
    return null;
  }

  const text = stripInlineMarkdown(match[2]);
  if (!text) {
    return null;
  }

  return { level, text };
}

export function extractPostHeadings(content: string): PostHeading[] {
  const lines = content.split("\n");
  const getSlug = createHeadingSlugger();
  const headings: PostHeading[] = [];
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trimStart();

    if (line.startsWith("```") || line.startsWith("~~~")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    const parsed = parseHeadingLine(rawLine);
    if (!parsed) {
      continue;
    }

    headings.push({
      level: parsed.level,
      text: parsed.text,
      id: getSlug(parsed.text),
    });
  }

  return headings;
}
