export const locales = ["en", "fr", "vi", "ja", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  vi: "Tiếng Việt",
  ja: "日本語",
  es: "Español",
};
