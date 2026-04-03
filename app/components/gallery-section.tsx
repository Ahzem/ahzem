"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY_IMAGES } from "../portfolio-data";
import { useReveal } from "../hooks/use-reveal";

const HOME_GALLERY_PREVIEW_COUNT = 12;

function getGalleryCaption(src: string) {
  const file = decodeURIComponent(src.split("/").pop() ?? src);
  return file.replace(/\.[^.]+$/, "");
}

function getGallerySrc(src: string) {
  return encodeURI(src);
}

function GalleryImage({
  src,
  index,
  onClick,
}: {
  src: string;
  index: number;
  onClick: (img: { src: string; caption: string }) => void;
}) {
  const caption = getGalleryCaption(src);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [rRef, vis] = useReveal<HTMLDivElement>(0.15);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <div
      ref={rRef}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(60px) scale(0.92)",
        transition: `opacity 0.8s cubic-bezier(.19,1,.22,1) ${index * 0.08}s, transform 0.8s cubic-bezier(.19,1,.22,1) ${index * 0.08}s`,
      }}
    >
      <div
        ref={imgRef}
        className="group relative cursor-pointer overflow-hidden bg-[color-mix(in_oklab,var(--border-subtle)_70%,var(--background))] will-change-transform"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        onClick={() => onClick({ src, caption })}
        style={{
          transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${hovered ? 0.97 : 1})`,
          transition: hovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(.19,1,.22,1)",
        }}
      >
        {!imgLoaded && (
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(110deg, color-mix(in oklab, var(--border-subtle) 85%, var(--background)) 8%, color-mix(in oklab, var(--background) 35%, white) 18%, color-mix(in oklab, var(--border-subtle) 85%, var(--background)) 33%)",
              backgroundSize: "200% 100%",
              animation: "galleryShimmer 1.2s linear infinite",
            }}
          />
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getGallerySrc(src)}
          alt={caption}
          draggable={false}
          loading="lazy"
          decoding="async"
          className={`block w-full transition-[opacity,transform,filter] duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06] group-hover:brightness-[0.7] ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 flex items-end justify-between p-5 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100">
          <span className="bg-black/55 px-3.5 py-1.5 text-[13px] font-medium tracking-wide text-white backdrop-blur-[8px]">
            {caption}
          </span>
          <span className="flex h-9 w-9 scale-0 items-center justify-center rounded-full bg-[var(--accent)] text-base font-bold text-[var(--selection-fg)] transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] -rotate-90 group-hover:scale-100 group-hover:rotate-0">
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<{
    src: string;
    caption: string;
  } | null>(null);
  const [lbVisible, setLbVisible] = useState(false);
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

  const openLb = useCallback(
    (img: { src: string; caption: string }) => {
      setLightbox(img);
      requestAnimationFrame(() => setLbVisible(true));
    },
    [],
  );

  const closeLb = useCallback(() => {
    setLbVisible(false);
    setTimeout(() => setLightbox(null), 500);
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
                <GalleryImage
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
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
          className="fixed inset-0 z-[9980] flex flex-col items-center justify-center bg-[color-mix(in_oklab,var(--foreground)_72%,var(--background))] p-6 backdrop-blur-xl dark:bg-[color-mix(in_oklab,black_88%,var(--background))] md:p-10"
          onClick={closeLb}
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
              closeLb();
            }}
            aria-label="Close image"
          >
            ✕
          </button>
          <div
            className="flex max-h-[85vh] max-w-[min(90vw,1200px)] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getGallerySrc(lightbox.src)}
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
      )}

      <style>{`
        @keyframes galleryShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}
