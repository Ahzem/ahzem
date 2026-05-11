"use client";

import type { RefObject } from "react";
import { ExternalLink } from "lucide-react";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";

const viewMoreBtnClass =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] px-8 py-3 text-sm font-medium uppercase tracking-[2px] text-[var(--foreground)] shadow-sm transition-all duration-300 hover:border-[#c9f31d] hover:bg-[#c9f31d] hover:text-[#0c0c0c] active:scale-[0.98]";

type HolopinSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

export default function HolopinSection({
  sectionRef,
  visible,
}: HolopinSectionProps) {
  const { setCursor, resetCursor } = usePortfolioCursor();

  return (
    <section
      className="border-t border-[var(--border-subtle)] px-[clamp(24px,5vw,80px)] pt-[140px] pb-[20px]"
      id="holopin"
      ref={sectionRef}
    >
      <div
        className={aboutLabelClass}
        style={{ opacity: visible ? 1 : 0, transition: "all 0.6s 0.1s" }}
      >
        Badges
      </div>
      <div
        className={aboutHeadingClass}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s 0.2s",
        }}
      >
        Holopin <span className="text-[var(--accent)]">Dashboard.</span>
      </div>

      <div
        className="mt-[60px] flex justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s 0.3s",
        }}
      >
        <a
          href="https://holopin.io/@ahzem"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full max-w-6xl overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-4 sm:p-8 transition-colors duration-300 hover:border-[var(--accent)] cursor-none max-md:cursor-pointer"
          onMouseEnter={() => setCursor("visit")}
          onMouseLeave={resetCursor}
          aria-label="View @ahzem's full Holopin profile"
        >
          <img
            src="https://holopin.me/ahzem"
            alt="@ahzem's Holopin badges"
            className="h-auto w-full"
            loading="lazy"
          />
        </a>
      </div>

      <div
        className="mt-14 flex justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.55s ease-out 0.4s, transform 0.55s ease-out 0.4s",
        }}
      >
        <a
          href="https://holopin.io/@ahzem"
          target="_blank"
          rel="noopener noreferrer"
          className={viewMoreBtnClass}
          aria-label="View full profile on Holopin (opens in new tab)"
          onMouseEnter={() => setCursor("visit")}
          onMouseLeave={resetCursor}
        >
          <ExternalLink className="size-[18px] shrink-0" aria-hidden />
          View full profile
        </a>
      </div>
    </section>
  );
}
