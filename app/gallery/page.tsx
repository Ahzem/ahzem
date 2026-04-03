import Link from "next/link";
import { GALLERY_IMAGES } from "../portfolio-data";

function getGalleryCaption(src: string) {
  const file = decodeURIComponent(src.split("/").pop() ?? src);
  return file.replace(/\.[^.]+$/, "");
}

function getGallerySrc(src: string) {
  return encodeURI(src);
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen cursor-auto bg-[var(--background)] px-[clamp(20px,5vw,72px)] pt-28 pb-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[4px] text-[var(--accent)]">
              Gallery
            </p>
            <h1 className="text-[clamp(34px,5vw,64px)] font-bold tracking-[-2px] text-[var(--foreground)]">
              All Moments
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
              A complete collection of events, meetups, conferences, and milestones.
              {` ${GALLERY_IMAGES.length}`} photos in one place.
            </p>
          </div>
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 border border-[var(--border-subtle)] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Back to home
            <span aria-hidden>↩</span>
          </Link>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {GALLERY_IMAGES.map((image) => {
            const caption = getGalleryCaption(image.src);
            return (
              <figure
                key={image.src}
                className="mb-5 break-inside-avoid overflow-hidden border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--background)_96%,var(--foreground))]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getGallerySrc(image.src)}
                  alt={caption}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-cover"
                />
                <figcaption className="px-3 py-2 text-xs tracking-wide text-[var(--muted)] md:text-[13px]">
                  {caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </main>
  );
}
