"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { EDUCATION, type EducationEntry } from "../portfolio-data";
import { useReveal } from "../hooks/use-reveal";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";

function EduCard({ edu, index }: { edu: EducationEntry; index: number }) {
  const [ref, vis] = useReveal<HTMLDivElement>(0.15);
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  const cardStyle = {
    "--accent": edu.color,
  } as CSSProperties;

  const toggle = () => setExpanded((e) => !e);

  return (
    <div
      ref={ref}
      className="relative mb-20 flex flex-col pl-10 last:mb-0 md:grid md:grid-cols-2 md:gap-0 md:pl-0"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis
          ? "translateY(0) translateX(0)"
          : `translateY(40px) translateX(${isLeft ? -30 : 30}px)`,
        transition: `all 0.8s cubic-bezier(.19,1,.22,1) ${0.12 + index * 0.06}s`,
      }}
    >
      <div
        className="absolute top-5 left-3 z-[3] h-4 w-4 -translate-x-1/2 border-2 border-[var(--border-subtle)] bg-[var(--background)] transition-all duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] md:left-1/2"
        style={{
          borderColor: vis ? edu.color : undefined,
          boxShadow: vis ? `0 0 20px ${edu.color}33` : "none",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 transition-all delay-200 duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
          style={{ background: vis ? edu.color : "transparent" }}
        />
      </div>

      <div
        className={`flex items-start pt-2 font-portfolio-mono text-[32px] font-bold leading-none md:text-[clamp(40px,6vw,56px)] ${
          isLeft
            ? "pb-2 text-left md:col-start-2 md:row-start-1 md:pb-0 md:pl-[50px] md:text-left"
            : "pb-2 text-left md:col-start-1 md:row-start-1 md:pb-0 md:pr-[50px] md:text-right"
        }`}
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(.19,1,.22,1) 0.3s",
          color: edu.color,
        }}
      >
        {edu.year}
        <span className="ml-1 pt-1 text-[clamp(14px,2vw,18px)] font-normal text-[var(--muted)]">
          {" "}
          — {edu.endYear}
        </span>
      </div>

      <div
        className={`relative cursor-pointer overflow-hidden border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--foreground)_4%,var(--background))] p-7 transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--foreground)_15%,var(--border-subtle))] hover:bg-[color-mix(in_oklab,var(--foreground)_7%,var(--background))] ${
          isLeft
            ? "md:col-start-1 md:row-start-1 md:pr-[50px]"
            : "md:col-start-2 md:row-start-1 md:pl-[50px]"
        }`}
        style={cardStyle}
        onClick={toggle}
      >
        <div
          className="pointer-events-none absolute top-0 right-0 h-10 w-10 opacity-[0.15] [clip-path:polygon(100%_0,0_0,100%_100%)]"
          style={{ background: edu.color }}
        />

        <div className="mb-1 text-lg font-bold tracking-[-0.3px] text-[var(--foreground)]">
          {edu.institution}
        </div>
        <div className="mb-0.5 text-sm text-[var(--accent)]">
          {edu.degree}
          {edu.field && (
            <span className="font-light text-[var(--muted)]"> · {edu.field}</span>
          )}
        </div>
        <div className="mb-4 text-xs tracking-wide text-[var(--muted)]">
          {edu.location}
        </div>

        {edu.activities && edu.activities.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 text-[10px] font-semibold tracking-[2px] text-[var(--muted)] uppercase">
              Activities & Societies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {edu.activities.map((a, i) => (
                <span
                  key={a}
                  className="border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] px-3 py-1.5 text-xs text-[var(--muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                  style={{
                    opacity: vis ? 1 : 0,
                    transform: vis ? "translateY(0)" : "translateY(8px)",
                    transition: `all 0.4s cubic-bezier(.19,1,.22,1) ${0.4 + i * 0.06}s`,
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {edu.modules && (
          <div>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-portfolio text-xs font-medium tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
            >
              <span>
                {expanded ? "Hide" : "Show"}{" "}
                {edu.degree === "Ordinary Level" ? "Subjects" : "Modules"}
              </span>
              <span
                className="text-[11px] transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ↓
              </span>
            </button>

            <div
              className="mt-2 overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
              style={{
                maxHeight: expanded
                  ? `${edu.modules.length * 40 + 20}px`
                  : "0",
                opacity: expanded ? 1 : 0,
              }}
            >
              <div className="flex flex-wrap gap-0">
                {edu.modules.map((m, i) => (
                  <span
                    key={m}
                    className="relative w-full border-b border-[color-mix(in_oklab,var(--foreground)_6%,transparent)] py-1.5 pl-3 text-xs text-[var(--muted)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] before:absolute before:left-0 before:text-[var(--muted)] before:content-['›'] md:w-1/2"
                    style={{
                      transitionDelay: expanded ? `${i * 0.03}s` : "0s",
                      opacity: expanded ? 1 : 0,
                      transform: expanded
                        ? "translateX(0)"
                        : "translateX(-12px)",
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {edu.note && (
          <div className="mt-3.5 border-t border-[var(--border-subtle)] pt-3 text-xs leading-relaxed text-[var(--muted)] italic">
            {edu.note}
          </div>
        )}

        {edu.grade && (
          <div className="mt-2.5 text-xs text-[var(--muted)]">
            <span className="text-[10px] font-semibold tracking-wide text-[var(--foreground)] uppercase">
              Grade:
            </span>{" "}
            {edu.grade}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EducationSection() {
  const [secRef, secVis] = useReveal<HTMLElement>(0.03);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const h = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const visible = Math.min(window.innerHeight - rect.top, total);
      setLineProgress(Math.max(0, Math.min(visible / total, 1)));
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <section
      className="relative overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px] before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-[linear-gradient(90deg,transparent,var(--border-subtle)_20%,var(--border-subtle)_80%,transparent)] before:content-['']"
      id="education"
      ref={secRef}
    >
      <div className="relative z-[2] mb-20 text-center">
        <div
          className={aboutLabelClass}
          style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.1s" }}
        >
          Education
        </div>
        <div
          className={aboutHeadingClass}
          style={{
            opacity: secVis ? 1 : 0,
            transform: secVis ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s 0.2s",
          }}
        >
          Academic
          <br />
          <span className="text-[var(--accent)]">journey</span>
        </div>
        <p
          className="mx-auto max-w-[460px] text-[15px] font-light leading-[1.7] text-[var(--muted)]"
          style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.4s" }}
        >
          From physical science foundations to information technology at one
          of Sri Lanka&apos;s leading institutions.
        </p>
      </div>

      <div className="relative mx-auto max-w-[1200px]" ref={timelineRef}>
        <div className="absolute top-0 bottom-0 left-3 w-0.5 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2">
          <div className="absolute inset-0 bg-[var(--border-subtle)]" />
          <div
            className="absolute top-0 right-0 left-0 bg-gradient-to-b from-[#c9f31d] via-[#818cf8] to-[#06b6d4] transition-[height] duration-75 ease-linear"
            style={{ height: `${lineProgress * 100}%` }}
          />
        </div>

        {EDUCATION.map((edu, i) => (
          <EduCard key={edu.id} edu={edu} index={i} />
        ))}
      </div>
    </section>
  );
}
