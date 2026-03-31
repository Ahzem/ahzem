"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { CERTIFICATIONS } from "../portfolio-data";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";

type CertificationsSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

export default function CertificationsSection({
  sectionRef,
  visible,
}: CertificationsSectionProps) {
  const { setCursor, resetCursor } = usePortfolioCursor();

  return (
    <section
      className="border-t border-[var(--border-subtle)] px-[clamp(24px,5vw,80px)] py-[120px]"
      id="certifications"
      ref={sectionRef}
    >
      <div
        className={aboutLabelClass}
        style={{ opacity: visible ? 1 : 0, transition: "all 0.6s 0.1s" }}
      >
        Credentials
      </div>
      <div
        className={aboutHeadingClass}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s 0.2s",
        }}
      >
        Certifications<span className="text-[var(--accent)]">.</span>
      </div>
      <div className="mt-[60px] grid gap-px bg-[var(--border-subtle)] [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]">
        {CERTIFICATIONS.map((cert, i) => {
          const hasLink = Boolean(cert.link);
          return (
            <div
              key={cert.name}
              className={`group relative flex flex-col gap-5 bg-[var(--surface-elevated)] p-8 transition-[background-color] duration-300 hover:bg-[color-mix(in_oklab,var(--accent)_6%,var(--surface-elevated))] ${
                hasLink ? "cursor-none max-md:cursor-pointer" : ""
              }`}
              role={hasLink ? "link" : undefined}
              tabIndex={hasLink ? 0 : undefined}
              aria-label={
                hasLink ? `View credential for ${cert.name}` : undefined
              }
              onMouseEnter={() => setCursor(hasLink ? "visit" : "")}
              onMouseLeave={resetCursor}
              onClick={() =>
                hasLink &&
                window.open(cert.link, "_blank", "noopener,noreferrer")
              }
              onKeyDown={(e) => {
                if (hasLink && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  window.open(cert.link, "_blank", "noopener,noreferrer");
                }
              }}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ${0.3 + i * 0.06}s`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="font-portfolio-mono text-xs text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-portfolio-mono text-[11px] uppercase tracking-wider text-[var(--accent)]">
                  {cert.date}
                </div>
              </div>
              <div>
                <div className="mb-1.5 text-[20px] font-bold tracking-[-0.5px] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                  {cert.name}
                </div>
                <div className="text-[13px] tracking-wide text-[var(--muted)]">
                  {cert.issuer}
                </div>
              </div>
              <div className="mt-2 flex aspect-[16/10] w-full overflow-hidden rounded bg-[var(--border-subtle)]">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    width={400}
                    height={250}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--foreground)]">
                    <span className="text-[11px] uppercase tracking-wide">
                      Certificate Image
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
