"use client";

import type { RefObject } from "react";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";

type AboutSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

export default function AboutSection({ sectionRef, visible }: AboutSectionProps) {
  return (
    <section
      className="grid grid-cols-1 items-start gap-10 px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px] md:grid-cols-2 md:gap-20"
      id="about"
      ref={sectionRef}
    >
      <div>
        <div
          className={aboutLabelClass}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s 0.1s",
          }}
        >
          About
        </div>
        <div
          className={aboutHeadingClass}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(.19,1,.22,1) 0.2s",
          }}
        >
          Building things
          <br />
          that <span className="text-[#c9f31d]">matter</span>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6">
          {[
            ["1+", "Years"],
            ["11+", "Projects"],
            ["4", "Live Apps"],
          ].map(([n, label], i) => (
            <div
              key={label}
              className="rounded border border-white/[0.06] p-6 transition-[border-color] duration-300 hover:border-[#c9f31d]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ${0.4 + i * 0.1}s`,
              }}
            >
              <div className="font-portfolio-mono text-[40px] font-bold text-[#c9f31d]">
                {n}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[2px] text-[#666]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div
          className="text-base font-light leading-[1.9] text-[#999] [&_strong]:font-medium [&_strong]:text-[#f0ece2]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s 0.3s",
          }}
        >
          I&apos;m a full-stack software engineer from <strong>Sri Lanka</strong>{" "}
          with professional experience at <strong>Efito Solutions</strong>, where I
          was promoted from Trainee to Associate Software Engineer within one year —
          recognized as{" "}
          <strong className="font-medium text-[#c9f31d]">
            &quot;Rising Star of 2025.&quot;
          </strong>
          <br />
          <br />
          I specialize in building <strong>production-grade applications</strong> —
          from Flutter mobile apps and Next.js platforms to AI-powered integrations
          using CrewAI, n8n, and VAPI voice agents.
          <br />
          <br />
          My work spans the full stack:{" "}
          <strong>React, Node.js, NestJS, Python, AWS, Docker</strong>, and beyond. I
          care about clean architecture, smooth user experiences, and shipping things
          that work at scale.
        </div>
      </div>
    </section>
  );
}
