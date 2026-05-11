"use client";

import { useEffect, useRef, useState } from "react";
import { buildMediaUrl } from "@/lib/media";
import { getGalleryCaption } from "@/lib/gallery";
import { useReveal } from "../hooks/use-reveal";

export type GalleryTileClickPayload = { src: string; caption: string };

type GalleryTileProps = {
  src: string;
  index: number;
  onClick: (img: GalleryTileClickPayload) => void;
};

export function GalleryTile({ src, index, onClick }: GalleryTileProps) {
  const caption = getGalleryCaption(src);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [enableTilt, setEnableTilt] = useState(true);
  const [rRef, vis] = useReveal<HTMLDivElement>(0.15);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setEnableTilt(!reducedMotion.matches);
    syncReducedMotion();
    reducedMotion.addEventListener("change", syncReducedMotion);
    return () => reducedMotion.removeEventListener("change", syncReducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableTilt) return;
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
          transform: enableTilt
            ? `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${hovered ? 0.97 : 1})`
            : `scale(${hovered ? 0.985 : 1})`,
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

        <img
          src={buildMediaUrl(src, { width: 900, quality: 76 })}
          alt={caption}
          draggable={false}
          loading="lazy"
          decoding="async"
          className={`block h-auto w-full transition-[opacity,transform,filter] duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06] group-hover:brightness-[0.7] ${
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
