"use client";

import type { RefObject } from "react";
import { Download, Mail } from "lucide-react";
import {
  CONTACT_DOWNLOADS,
  CONTACT_EMAIL,
  CONTACT_SOCIAL_LINKS,
} from "../portfolio-data";
import { aboutLabelClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";

type ContactSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

const linkClass =
  "relative pb-1 text-sm uppercase tracking-[2px] text-[var(--muted)] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[var(--foreground)] hover:after:w-full";

const btnClass =
  "inline-flex min-h-[48px] min-w-[140px] items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] px-8 py-3 text-sm font-medium uppercase tracking-[2px] text-[var(--foreground)] shadow-sm transition-all duration-300 hover:border-[#c9f31d] hover:bg-[#c9f31d] hover:text-[#0c0c0c] active:scale-[0.98]";

export default function ContactSection({ sectionRef, visible }: ContactSectionProps) {
  const { setCursor, resetCursor } = usePortfolioCursor();

  return (
    <section
      className="px-[clamp(24px,5vw,80px)] py-40 text-center"
      id="contact"
      ref={sectionRef}
    >
      <div
        className={`${aboutLabelClass} flex justify-center`}
        style={{
          opacity: visible ? 1 : 0,
          transition: "all 0.6s 0.1s",
        }}
      >
        Contact
      </div>
      <div
        className="mb-10 text-[clamp(40px,8vw,120px)] font-bold leading-none tracking-[-3px] max-md:tracking-[-1px]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(50px)",
          transition: "all 0.8s cubic-bezier(.19,1,.22,1) 0.2s",
        }}
      >
        LET&apos;S <span className="text-[#c9f31d]">TALK</span>
      </div>

      <div
        className="mx-auto mb-14 flex max-w-[1100px] flex-wrap items-center justify-center gap-4"
        style={{ opacity: visible ? 1 : 0, transition: "all 0.6s 0.45s" }}
      >
        <a
          href={CONTACT_EMAIL.href}
          className={btnClass}
          onMouseEnter={() => setCursor("mail")}
          onMouseLeave={resetCursor}
        >
          <Mail className="size-[18px] shrink-0" aria-hidden />
          {CONTACT_EMAIL.label}
        </a>
        {CONTACT_DOWNLOADS.map((doc) => (
          <a
            key={doc.label}
            href={doc.href}
            className={btnClass}
            download={doc.downloadAs}
            onMouseEnter={() => setCursor("open")}
            onMouseLeave={resetCursor}
          >
            <Download className="size-[18px] shrink-0" aria-hidden />
            {doc.label}
          </a>
        ))}
      </div>

      <div
        className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-x-10 gap-y-6"
        style={{ opacity: visible ? 1 : 0, transition: "all 0.6s 0.55s" }}
      >
        {CONTACT_SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={linkClass}
            rel={link.external ? "noreferrer noopener" : undefined}
            target={link.external ? "_blank" : undefined}
            onMouseEnter={() => setCursor("open")}
            onMouseLeave={resetCursor}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
