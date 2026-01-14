import type { Locale } from "./config";

type Dictionary = {
  home: {
    title: string;
    description: string;
    greeting: string;
    bio: string;
    location: string;
    recentWriting: string;
    allPosts: string;
    tags: string;
    readMore: string;
  };
  nav: {
    home: string;
    blog: string;
    about: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loader = dictionaries[locale];
  if (!loader) {
    return dictionaries.en();
  }
  return loader();
};
