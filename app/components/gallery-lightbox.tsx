"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { buildMediaUrl } from "@/lib/media";

export type GalleryLightboxItem = { src: string; caption: string };

export function useGalleryLightbox() {
  const [lightbox, setLightbox] = useState<GalleryLightboxItem | null>(null);
  const [lbVisible, setLbVisible] = useState(false);
  const openRafRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const openLb = useCallback((img: GalleryLightboxItem) => {
    if (openRafRef.current !== null) {
      cancelAnimationFrame(openRafRef.current);
    }
    setLightbox(img);
    openRafRef.current = requestAnimationFrame(() => setLbVisible(true));
  }, []);

  const closeLb = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    setLbVisible(false);
    closeTimerRef.current = window.setTimeout(() => setLightbox(null), 500);
  }, []);

  useEffect(() => {
    return () => {
      if (openRafRef.current !== null) {
        cancelAnimationFrame(openRafRef.current);
      }
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLb();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, closeLb]);

  return { lightbox, lbVisible, openLb, closeLb };
}

type GalleryLightboxProps = {
  lightbox: GalleryLightboxItem;
  lbVisible: boolean;
  onClose: () => void;
};

export function GalleryLightbox({
  lightbox,
  lbVisible,
  onClose,
}: GalleryLightboxProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={lightbox.caption}
      className="fixed inset-0 z-[9980] flex flex-col items-center justify-center bg-[color-mix(in_oklab,var(--foreground)_72%,var(--background))] p-6 backdrop-blur-xl dark:bg-[color-mix(in_oklab,black_88%,var(--background))] md:p-10"
      onClick={onClose}
      style={{
        clipPath: lbVisible
          ? "circle(150% at 50% 50%)"
          : "circle(0% at 50% 50%)",
        transition: "clip-path 0.6s cubic-bezier(.19,1,.22,1)",
      }}
    >
      <button
        type="button"
        className="absolute top-6 right-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--background)_35%,transparent)] bg-[color-mix(in_oklab,var(--background)_12%,transparent)] text-xl text-[var(--background)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] md:top-8 md:right-10 dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:text-[var(--accent)]"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close image"
      >
        ✕
      </button>
      <div
        className="flex max-h-[85vh] max-w-[min(90vw,1200px)] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={buildMediaUrl(lightbox.src)}
          alt={lightbox.caption}
          className="max-h-[70vh] max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-[color-mix(in_oklab,var(--background)_25%,transparent)] dark:ring-white/10"
          style={{
            transform: lbVisible ? "scale(1)" : "scale(0.9)",
            opacity: lbVisible ? 1 : 0,
            transition: "all 0.5s cubic-bezier(.19,1,.22,1) 0.15s",
          }}
        />
        <p
          className="mt-5 max-w-[80vw] text-center text-[15px] tracking-wide text-[var(--background)] opacity-90 dark:text-white/80 dark:opacity-100"
          style={{
            opacity: lbVisible ? 1 : 0,
            transform: lbVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s 0.3s",
          }}
        >
          {lightbox.caption}
        </p>
      </div>
    </div>
  );
}
