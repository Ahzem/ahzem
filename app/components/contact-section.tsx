"use client";

import type { RefObject } from "react";
import { aboutLabelClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";

type ContactSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

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
        className="flex flex-wrap justify-center gap-10"
        style={{ opacity: visible ? 1 : 0, transition: "all 0.6s 0.5s" }}
      >
        <a
          href="mailto:muhammadhahzem1422@gmail.com"
          className="relative pb-1 text-sm uppercase tracking-[2px] text-[#666] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[#f0ece2] hover:after:w-full"
          onMouseEnter={() => setCursor("mail")}
          onMouseLeave={resetCursor}
        >
          Email
        </a>
        <a
          href="https://linkedin.com/in/ahzem"
          target="_blank"
          rel="noreferrer"
          className="relative pb-1 text-sm uppercase tracking-[2px] text-[#666] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[#f0ece2] hover:after:w-full"
          onMouseEnter={() => setCursor("open")}
          onMouseLeave={resetCursor}
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/ahzem"
          target="_blank"
          rel="noreferrer"
          className="relative pb-1 text-sm uppercase tracking-[2px] text-[#666] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[#f0ece2] hover:after:w-full"
          onMouseEnter={() => setCursor("open")}
          onMouseLeave={resetCursor}
        >
          GitHub
        </a>
        <a
          href="tel:+94781769199"
          className="relative pb-1 text-sm uppercase tracking-[2px] text-[#666] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[#f0ece2] hover:after:w-full"
          onMouseEnter={() => setCursor("call")}
          onMouseLeave={resetCursor}
        >
          +94 78 176 9199
        </a>
      </div>
    </section>
  );
}
