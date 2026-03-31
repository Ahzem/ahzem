"use client";

import type { RefObject } from "react";
import {
  SKILLS_CENTER,
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from "../portfolio-data";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";

type SkillsSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

export default function SkillsSection({ sectionRef, visible }: SkillsSectionProps) {
  const { setCursor, resetCursor } = usePortfolioCursor();

  return (
    <section
      className="overflow-hidden px-[clamp(24px,5vw,80px)] py-40"
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
      <div className="mx-auto mt-[60px] flex max-w-[900px] flex-wrap justify-center gap-3">
        {[...SKILLS_LEFT, ...SKILLS_CENTER, ...SKILLS_RIGHT].map((skill, i) => (
          <div
            key={skill}
            className="relative cursor-default overflow-hidden rounded-full border border-white/[0.08] px-7 py-3.5 text-[15px] font-normal text-[#888] transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-[#c9f31d] before:transition-transform before:duration-[400ms] before:ease-[cubic-bezier(0.19,1,0.22,1)] before:content-[''] hover:border-[#c9f31d] hover:text-[#0c0c0c] hover:before:scale-x-100"
            onMouseEnter={() => setCursor("")}
            onMouseLeave={resetCursor}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: `all 0.5s cubic-bezier(.19,1,.22,1) ${0.3 + i * 0.04}s`,
            }}
          >
            <span className="relative z-10">{skill}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
