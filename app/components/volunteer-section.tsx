"use client";

import Image from "next/image";
import { useState } from "react";
import { VOLUNTEER, type VolunteerEntry } from "../portfolio-data";
import { useReveal } from "../hooks/use-reveal";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";

const CATEGORIES = [
  "All",
  "Science & Technology",
  "Environment",
  "Social Services",
] as const;

function StatPill({
  label,
  value,
  color,
  vis,
  delay,
}: {
  label: string;
  value: string;
  color: string;
  vis: boolean;
  delay: number;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1.5"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.6s cubic-bezier(.19,1,.22,1) ${delay}s`,
      }}
    >
      <span
        className="font-portfolio-mono text-[clamp(28px,3vw,42px)] font-bold leading-none tabular-nums"
        style={{ color }}
      >
        {value}
      </span>
      <span className="text-[9px] uppercase tracking-[2px] text-[var(--muted)]">
        {label}
      </span>
    </div>
  );
}

function VolCard({
  v,
  index,
  globalVis,
}: {
  v: VolunteerEntry;
  index: number;
  globalVis: boolean;
}) {
  const [revealRef, vis] = useReveal<HTMLDivElement>(0.1);
  const [hovered, setHovered] = useState(false);

  const isRevealed = vis || globalVis;
  const sizeCol = v.size === "large" ? "md:col-span-2" : "md:col-span-1";

  return (
    <div
      ref={revealRef}
      className={`group relative flex flex-col gap-4 overflow-hidden border bg-[color-mix(in_oklab,var(--foreground)_2%,var(--background))] p-5 transition-[border-color,box-shadow] duration-300 ${sizeCol}`}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s cubic-bezier(.19,1,.22,1) ${0.1 + index * 0.06}s, transform 0.7s cubic-bezier(.19,1,.22,1) ${0.1 + index * 0.06}s, border-color 0.3s, box-shadow 0.3s`,
        borderColor: hovered
          ? `color-mix(in oklab, ${v.color} 35%, var(--border-subtle))`
          : "var(--border-subtle)",
        boxShadow: hovered
          ? `0 0 0 1px color-mix(in oklab, ${v.color} 18%, transparent), 0 8px 32px color-mix(in oklab, ${v.color} 8%, transparent)`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent sweep */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          background: v.color,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      {/* Left accent bar (always visible, subtle) */}
      <div
        className="pointer-events-none absolute top-0 left-0 bottom-0 w-[3px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(to bottom, ${v.color}, transparent)`,
          opacity: hovered ? 0.6 : 0.2,
        }}
      />

      {/* Header: logo + category badge */}
      <div className="flex items-start justify-between gap-3 pl-3">
        <div className="relative h-10 w-10 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110">
          <Image
            src={v.logo}
            alt={v.org}
            fill
            sizes="40px"
            className="object-contain grayscale-[0.25] transition-[filter] duration-300 group-hover:grayscale-0"
          />
        </div>
        <div
          className="shrink-0 border px-2 py-0.5 text-[8px] font-medium uppercase tracking-[1.3px] transition-all duration-300"
          style={{
            borderColor: hovered
              ? `color-mix(in oklab, ${v.color} 35%, transparent)`
              : "var(--border-subtle)",
            color: hovered ? v.color : "var(--muted)",
            background: hovered
              ? `color-mix(in oklab, ${v.color} 8%, transparent)`
              : "transparent",
          }}
        >
          {v.category}
        </div>
      </div>

      {/* Role & Org */}
      <div className="flex flex-col gap-1 pl-3">
        <div className="text-[clamp(13px,1.5vw,15px)] font-bold leading-snug tracking-[-0.3px] text-[var(--foreground)]">
          {v.role}
        </div>
        <div
          className="text-[11px] font-semibold leading-tight"
          style={{ color: v.color }}
        >
          {v.org}
        </div>
      </div>

      {/* Description — slides in on hover */}
      <div
        className="overflow-hidden pl-3 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          maxHeight: hovered ? "140px" : "0px",
          opacity: hovered ? 1 : 0,
        }}
      >
        <p className="text-[11.5px] font-light leading-relaxed text-[var(--muted)]">
          {v.desc}
        </p>
      </div>

      {/* Footer: period */}
      <div className="mt-auto flex items-center gap-3 pl-3">
        <div
          className="h-px flex-1 origin-left transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
          style={{
            background: `color-mix(in oklab, ${v.color} 40%, var(--border-subtle))`,
            transform: hovered ? "scaleX(1)" : "scaleX(0.4)",
            opacity: hovered ? 0.7 : 0.4,
          }}
        />
        <span className="font-portfolio-mono text-[9px] tracking-wide text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--foreground)]">
          {v.period}
        </span>
      </div>
    </div>
  );
}

export default function VolunteerSection() {
  const [secRef, secVis] = useReveal<HTMLElement>(0.03);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const count = VOLUNTEER.length;

  const filtered =
    activeCategory === "All"
      ? VOLUNTEER
      : VOLUNTEER.filter((v) => v.category === activeCategory);

  return (
    <section
      className="relative overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px] before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--border-subtle)] before:to-transparent before:content-['']"
      id="volunteer"
      ref={secRef}
    >
      {/* Section header */}
      <div className="mb-[60px] flex flex-wrap items-end justify-between gap-8">
        <div>
          <div
            className={aboutLabelClass}
            style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.1s" }}
          >
            Beyond Code
          </div>
          <div
            className={aboutHeadingClass}
            style={{
              opacity: secVis ? 1 : 0,
              transform: secVis ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s 0.2s",
            }}
          >
            Volunteer
            <br />
            <span className="text-[var(--accent)]">experience</span>
          </div>
          <p
            className="max-w-[440px] text-[15px] font-light leading-[1.7] text-[var(--muted)]"
            style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.4s" }}
          >
            Leadership roles across tech communities, environmental initiatives,
            and educational projects.
          </p>
        </div>

        {/* Stat pills */}
        <div
          className="flex items-end gap-8"
          style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.45s" }}
        >
          <StatPill
            label="Roles"
            value={String(count)}
            color="#c9f31d"
            vis={secVis}
            delay={0.5}
          />
          <div className="h-8 w-px self-center bg-[var(--border-subtle)]" />
          <StatPill
            label="Years"
            value="3+"
            color="#818cf8"
            vis={secVis}
            delay={0.6}
          />
          <div className="h-8 w-px self-center bg-[var(--border-subtle)]" />
          <StatPill
            label="Orgs"
            value={String(count)}
            color="#06b6d4"
            vis={secVis}
            delay={0.7}
          />
        </div>
      </div>

      {/* Category filter */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        style={{
          opacity: secVis ? 1 : 0,
          transform: secVis ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.6s cubic-bezier(.19,1,.22,1) 0.5s",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`border px-4 py-1.5 text-[10px] font-medium uppercase tracking-[1.5px] transition-all duration-200 ${
              activeCategory === cat
                ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                : "border-[var(--border-subtle)] text-[var(--muted)] hover:border-[color-mix(in_oklab,var(--foreground)_40%,var(--border-subtle))] hover:text-[var(--foreground)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-3">
        {filtered.map((v, i) => (
          <VolCard key={v.id} v={v} index={i} globalVis={secVis} />
        ))}
      </div>
    </section>
  );
}
