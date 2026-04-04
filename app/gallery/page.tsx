import Link from "next/link";
import { GALLERY_IMAGES } from "../portfolio-data";
import { GalleryPageClient } from "./gallery-page-client";

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen cursor-auto bg-[var(--background)] px-[clamp(20px,5vw,72px)] pt-28 pb-20">
      <Link
        href="/#gallery"
        className="fixed top-6 right-[max(1rem,env(safe-area-inset-right,0px))] z-50 inline-flex items-center gap-2 border border-[var(--border-subtle)] bg-[var(--background)] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[var(--foreground)] shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:top-8 sm:right-[clamp(20px,5vw,72px)]"
      >
        Back to home
        <span aria-hidden>↩</span>
      </Link>

      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10">
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

        <GalleryPageClient />
      </div>
    </main>
  );
}
