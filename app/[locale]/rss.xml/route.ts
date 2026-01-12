import { generateRSSFeed } from "@/lib/content/rss";
import { locales, type Locale } from "@/lib/i18n/config";

export const dynamic = "force-static";

export async function GET(request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const rss = generateRSSFeed(locale as Locale);

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
