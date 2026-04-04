"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY_IMAGES } from "../portfolio-data";
import { useReveal } from "../hooks/use-reveal";
import { GalleryLightbox, useGalleryLightbox } from "./gallery-lightbox";
import { GalleryTile } from "./gallery-tile";

const HOME_GALLERY_PREVIEW_COUNT = 12;

export default function GallerySection() {
  const { lightbox, lbVisible, openLb, closeLb } = useGalleryLightbox();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [secRef, secVis] = useReveal<HTMLElement>(0.05);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const h = () => {
      const rect = el.getBoundingClientRect();
      const progress = -rect.top / (el.offsetHeight - window.innerHeight);
      setScrollOffset(progress);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const previewImages = GALLERY_IMAGES.slice(0, HOME_GALLERY_PREVIEW_COUNT);
  const cols: (typeof previewImages)[] = [[], [], []];
  for (const [idx, img] of previewImages.entries()) {
    cols[idx % 3].push(img);
  }

  const [parallaxFactor, setParallaxFactor] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setParallaxFactor(mq.matches ? 0.32 : 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const baseSpeeds = [-40, 20, -30];
  const speeds = baseSpeeds.map((s) => s * parallaxFactor);

  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      sectionRef.current = el;
      (secRef as React.MutableRefObject<HTMLElement | null>).current = el;
    },
    [secRef],
  );

  return (
    <>
      <section
        className="relative overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px]"
        id="gallery"
        ref={setRefs}
      >
        <div className="mb-[60px]">
          <div
            className="mb-4 text-[11px] font-medium uppercase tracking-[4px] text-[var(--accent)]"
            style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.1s" }}
          >
            Gallery
          </div>
          <div
            className="mb-6 text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] tracking-[-2px] text-[var(--foreground)]"
            style={{
              opacity: secVis ? 1 : 0,
              transform: secVis ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s 0.2s",
            }}
          >
            Moments &<br />
            <span className="text-[var(--accent)]">milestones</span>
          </div>
          <p
            className="max-w-[480px] text-base font-light leading-[1.7] text-[var(--muted)]"
            style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.4s" }}
          >
            Events, conferences, awards, and the community that keeps me going.
          </p>
        </div>

        <div className="grid grid-cols-2 items-start gap-5 md:grid-cols-3">
          {cols.map((col, ci) => (
            <div
              key={ci}
              className={`flex flex-col gap-5 ${ci === 2 ? "hidden md:flex" : ""}`}
              style={{
                transform: `translateY(${scrollOffset * speeds[ci]}px)`,
                transition:
                  parallaxFactor < 1
                    ? "transform 0.12s linear"
                    : "transform 0.05s linear",
              }}
            >
              {col.map((img, i) => (
                <GalleryTile
                  key={`${img.src}-${i}`}
                  src={img.src}
                  index={ci * 3 + i}
                  onClick={openLb}
                />
              ))}
            </div>
          ))}
        </div>

        <div
          className="mt-10 flex justify-center"
          style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.55s" }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 border border-[var(--border-subtle)] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            View all gallery images
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>

      {lightbox && (
        <GalleryLightbox
          lightbox={lightbox}
          lbVisible={lbVisible}
          onClose={closeLb}
        />
      )}
    </>
  );
}
