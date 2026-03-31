"use client";

import type { RefObject } from "react";
import {
  SKILLS_CENTER,
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from "../portfolio-data";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";
import ToolkitIcon from "./toolkit-icon";

type SkillsSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

const TOOLKIT_SKILLS = [...SKILLS_LEFT, ...SKILLS_CENTER, ...SKILLS_RIGHT];

export default function SkillsSection({ sectionRef, visible }: SkillsSectionProps) {
  const { setCursor, resetCursor } = usePortfolioCursor();

  return (
    <section
      className="overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px]"
      id="skills"
      ref={sectionRef}
    >
      <div className="text-center">
        <div
          className={`${aboutLabelClass} flex justify-center`}
          style={{
            opacity: visible ? 1 : 0,
            transition: "all 0.6s 0.1s",
          }}
        >
          Toolkit
        </div>
        <div
          className={aboutHeadingClass}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s 0.2s",
          }}
        >
          Technologies I <span className="text-[#c9f31d]">work with</span>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1000px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {TOOLKIT_SKILLS.map((skill, i) => (
          <div
            key={skill}
            className="group relative flex flex-col items-center gap-3 overflow-hidden border border-[var(--border-subtle)] bg-[var(--background)] px-4 py-6 text-center transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-0.5 hover:border-[#c9f31d]/50 hover:shadow-[0_20px_50px_-24px_rgb(0_0_0/0.35)] dark:hover:shadow-[0_24px_60px_-28px_rgb(0_0_0/0.55)]"
            onMouseEnter={() => setCursor("")}
            onMouseLeave={resetCursor}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(22px)",
              transition: `opacity 0.55s cubic-bezier(.19,1,.22,1) ${0.28 + i * 0.035}s, transform 0.55s cubic-bezier(.19,1,.22,1) ${0.28 + i * 0.035}s`,
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -inset-px bg-gradient-to-br from-[#c9f31d]/12 via-transparent to-transparent" />
            </div>
            <ToolkitIcon skill={skill} />
            <span className="relative z-10 text-[13px] font-medium leading-tight text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--foreground)]">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
