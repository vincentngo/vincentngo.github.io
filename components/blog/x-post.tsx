"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface XPostProps {
  postId: string;
  href: string;
}

interface XWidgets {
  createTweet: (
    postId: string,
    element: HTMLElement,
    options: {
      align: "center";
      cards: "visible";
      conversation: "none";
      dnt: true;
      theme: "dark" | "light";
      width: number;
    }
  ) => Promise<HTMLElement | undefined>;
}

interface XApi {
  widgets: XWidgets;
}

declare global {
  interface Window {
    twttr?: XApi;
  }
}

let widgetsPromise: Promise<XApi> | null = null;

function loadXWidgets() {
  if (window.twttr?.widgets) {
    return Promise.resolve(window.twttr);
  }

  if (widgetsPromise) {
    return widgetsPromise;
  }

  widgetsPromise = new Promise<XApi>((resolve, reject) => {
    const existingScript = document.getElementById("x-widgets-script") as HTMLScriptElement | null;
    const script = existingScript ?? document.createElement("script");

    const handleLoad = () => {
      if (window.twttr?.widgets) {
        resolve(window.twttr);
      } else {
        reject(new Error("X widgets loaded without exposing the widgets API."));
      }
    };

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", () => reject(new Error("Unable to load X widgets.")), {
      once: true,
    });

    if (!existingScript) {
      script.id = "x-widgets-script";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.head.appendChild(script);
    }
  });

  return widgetsPromise;
}

export function XPost({ postId, href }: XPostProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const embedTheme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let cancelled = false;

    loadXWidgets()
      .then((x) => {
        if (cancelled) {
          return;
        }

        container.replaceChildren();
        return x.widgets.createTweet(postId, container, {
          align: "center",
          cards: "visible",
          conversation: "none",
          dnt: true,
          theme: embedTheme,
          width: 550,
        });
      })
      .catch(() => {
        // Keep the accessible link fallback when X is blocked or unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, [embedTheme, postId]);

  return (
    <div
      className="x-post-embed not-prose my-8 flex min-h-40 w-full items-center justify-center"
      ref={containerRef}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-muted"
      >
        View this post on X
      </a>
    </div>
  );
}
