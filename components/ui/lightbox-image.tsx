"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface LightboxImageProps {
  src: string;
  alt: string;
  caption?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  thumbnailSrc?: string;
}

export function LightboxImage({
  src,
  alt,
  caption,
  thumbnailWidth = 220,
  thumbnailHeight = 140,
  thumbnailSrc,
}: LightboxImageProps) {
  const thumbSrc = thumbnailSrc || src;
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      {/* Thumbnail */}
      <figure className="my-6 flex flex-col items-center">
        <button
          type="button"
          onClick={open}
          className="group relative inline-block overflow-hidden rounded-lg border border-border bg-muted transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label={`Preview full image: ${alt}`}
        >
          <Image
            src={thumbSrc}
            alt={alt}
            width={thumbnailWidth}
            height={thumbnailHeight}
            className="block object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
            <svg
              className="h-8 w-8 text-white opacity-0 drop-shadow-lg transition-opacity duration-300 group-hover:opacity-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </button>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Overlay */}
      {isOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm duration-200"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close preview"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="animate-in zoom-in-95 relative mx-4 flex max-h-[90vh] max-w-[90vw] flex-col items-center duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto rounded-lg object-contain shadow-2xl"
              unoptimized
              priority
            />
            {caption && <p className="mt-3 text-center text-sm text-white/80">{caption}</p>}
          </div>
        </div>
      )}
    </>
  );
}
