"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { EXPERIENCES } from "../portfolio-data";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";

type ExperienceSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

export default function ExperienceSection({
  sectionRef,
  visible,
}: ExperienceSectionProps) {
  const { setCursor, resetCursor } = usePortfolioCursor();

  return (
    <section
      className="px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px]"
      id="experience"
      ref={sectionRef}
    >
      <div className="mb-20 flex items-end justify-between border-b border-white/[0.06] pb-6">
        <div>
          <div
            className={aboutLabelClass}
            style={{ opacity: visible ? 1 : 0, transition: "all 0.6s 0.1s" }}
          >
            Experience
          </div>
          <div
            className={aboutHeadingClass}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s 0.2s",
            }}
          >
            Where I&apos;ve
            <br />
            <span className="text-[#c9f31d]">worked</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {EXPERIENCES.map((item, i) => (
          <div
            key={item.company}
            className="relative grid grid-cols-1 gap-3 overflow-hidden border-b border-white/[0.06] py-10 transition-[background-color] duration-[400ms] before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-[#c9f31d] before:transition-transform before:duration-[400ms] before:ease-[cubic-bezier(0.19,1,0.22,1)] before:content-[''] hover:bg-[rgba(201,243,29,0.02)] hover:before:scale-y-100 md:grid-cols-[200px_1fr] md:gap-10"
            onMouseEnter={() => setCursor("view")}
            onMouseLeave={resetCursor}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: `all 0.7s cubic-bezier(.19,1,.22,1) ${0.3 + i * 0.15}s`,
            }}
          >
            <div className="pt-1 font-portfolio-mono text-sm text-[#555]">
              {item.period}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                {item.logo && (
                  <Image
                    src={item.logo}
                    alt={item.company}
                    className="h-10 w-10 rounded-md object-contain"
                    width={40}
                    height={40}
                  />
                )}
                <div className="text-[28px] font-bold tracking-[-0.5px]">
                  {item.company}
                </div>
              </div>
              {item.roles && item.roles.length > 0 && (
                <div className="ml-[19px] mt-6 flex flex-col gap-8 border-l border-white/[0.08] pb-2 pl-8">
                  {item.roles.map((role) => (
                    <div key={role.role} className="relative">
                      <div className="absolute -left-[38px] top-2 h-3 w-3 rounded-full border-[2px] border-[#0c0c0c] bg-[#444]" />
                      <div className="mb-1 text-[22px] font-bold tracking-[-0.5px]">
                        {role.role}
                      </div>
                      <div className="mb-3 font-portfolio-mono text-[13px] tracking-wide text-[#c9f31d]">
                        {role.period}
                      </div>
                      <div className="max-w-[560px] text-sm leading-[1.8] text-[#777]">
                        {role.desc}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
