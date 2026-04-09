"use client";

import type { RefObject } from "react";
import { Download, Mail } from "lucide-react";
import {
  CONTACT_DOWNLOADS,
  CONTACT_EMAIL,
  CONTACT_SOCIAL_LINKS,
} from "../portfolio-data";
import { aboutLabelClass, unselectableClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";
import FooterSvgPhysics from "./footer-svg-physics";

type ContactSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

const linkClass =
  "relative inline-flex min-h-[44px] items-center justify-center px-2 pb-1 text-xs uppercase tracking-[2px] text-[var(--muted)] transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[var(--accent)] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[var(--foreground)] hover:after:w-full sm:text-sm";

const btnClass =
  "inline-flex min-h-[48px] w-full min-w-0 items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] px-6 py-3.5 text-sm font-medium uppercase tracking-[2px] text-[var(--foreground)] shadow-sm transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--selection-fg)] active:scale-[0.98] sm:w-auto sm:min-w-[140px] sm:px-8 touch-manipulation";

export default function ContactSection({ sectionRef, visible }: ContactSectionProps) {
  const { setCursor, resetCursor } = usePortfolioCursor();

  return (
    <section
      className="relative flex min-h-screen min-h-[100dvh] flex-col overflow-hidden px-[clamp(16px,5vw,80px)] pt-[max(7rem,calc(env(safe-area-inset-top)+5.75rem))] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      id="contact"
      ref={sectionRef}
    >
      <FooterSvgPhysics />

      <div
        className={`relative z-10 mx-auto flex w-full min-h-0 max-w-[1100px] flex-1 flex-col justify-center text-center ${unselectableClass}`}
      >
        <div
          className={`${aboutLabelClass} flex justify-center max-md:mb-3`}
          style={{
            opacity: visible ? 1 : 0,
            transition: "all 0.6s 0.1s",
          }}
        >
          Muhammadh Ahzem
        </div>
        <div
          className="mb-4 text-[clamp(32px,12vw,120px)] font-bold leading-[0.95] tracking-[-2px] max-md:tracking-[-1px] md:mb-6 md:leading-none md:tracking-[-3px]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.8s cubic-bezier(.19,1,.22,1) 0.2s",
          }}
        >
          <span className="text-[var(--accent)]">AHZEM</span>
          <span className="text-[var(--foreground)]">.DEV</span>
        </div>
        <p
          className="mx-auto mb-8 max-w-[480px] text-sm leading-7 text-[var(--muted)] md:mb-10 md:text-base"
          style={{
            opacity: visible ? 1 : 0,
            transition: "all 0.7s 0.35s",
          }}
        >
          Full-stack engineer · open-source contributor · available for new
          opportunities.
        </p>

        <div
          className="mx-auto mb-10 flex w-full max-w-md flex-col gap-3 sm:mb-14 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
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
          className="mx-auto grid w-full max-w-lg grid-cols-2 gap-x-4 gap-y-2 sm:max-w-none sm:flex sm:max-w-[1100px] sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-4"
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
      </div>
    </section>
  );
}
