"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { VOLUNTEER, type VolunteerEntry } from "../portfolio-data";
import { useReveal } from "../hooks/use-reveal";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";

function CounterPill({
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
      className="flex min-w-[80px] flex-col items-center rounded-lg border border-[var(--border-subtle)] px-5 py-3.5 transition-colors hover:border-[color-mix(in_oklab,var(--foreground)_15%,var(--border-subtle))]"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.6s cubic-bezier(.19,1,.22,1) ${delay}s`,
      }}
    >
      <span
        className="font-portfolio-mono text-[28px] font-bold leading-none"
        style={{ color }}
      >
        {value}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[1.5px] text-[var(--muted)]">
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
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const showDetails = hovered || focused;

  const setRefs = (el: HTMLDivElement | null) => {
    revealRef.current = el;
    cardRef.current = el;
  };

  const handleMove = (e: React.MouseEvent) => {
    if (showDetails) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  const handleLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const isRevealed = vis || globalVis;

  const cardStyle = {
    "--accent": v.color,
  } as CSSProperties;

  const sizeCol =
    v.size === "large" ? "md:col-span-2" : "md:col-span-1";

  return (
    <div
      ref={setRefs}
      className={`group relative h-fit min-h-[148px] overflow-hidden rounded-[14px] border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--foreground)_3%,var(--background))] outline-none will-change-transform [perspective:800px] transition-[border-color,transform,opacity] duration-300 focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:min-h-[160px] ${sizeCol} ${
        showDetails
          ? "z-[5] border-[color-mix(in_oklab,var(--foreground)_12%,var(--border-subtle))]"
          : ""
      }`}
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...cardStyle,
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed
          ? `perspective(800px) rotateY(${showDetails ? 0 : tilt.x}deg) rotateX(${showDetails ? 0 : tilt.y}deg)`
          : "perspective(800px) translateY(50px) rotateX(8deg) scale(0.94)",
        transition: showDetails
          ? "opacity 0.6s, transform 0.1s ease-out"
          : `opacity 0.7s cubic-bezier(.19,1,.22,1) ${0.1 + index * 0.06}s, transform 0.7s cubic-bezier(.19,1,.22,1) ${0.1 + index * 0.06}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[14px] transition-opacity duration-300"
        style={{
          opacity: showDetails ? 0 : 1,
          background: `radial-gradient(circle at ${(tilt.x / 8 + 0.5) * 100}% ${(-tilt.y / 8 + 0.5) * 100}%, ${v.color}20, transparent 70%)`,
        }}
      />

      <div className="relative z-[1] flex min-h-[120px] flex-col gap-1.5 p-3 sm:p-4">
        <div className="self-start rounded border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] px-1.5 py-px text-[8px] font-medium uppercase tracking-[1.2px] text-[var(--muted)]">
          {v.category}
        </div>

        <div
          className={`relative h-9 w-9 shrink-0 sm:h-10 sm:w-10 ${
            showDetails ? "scale-105 -translate-y-px" : "scale-100"
          } transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] grayscale-[0.3] group-hover:grayscale-0`}
        >
          <Image
            src={v.logo}
            alt={v.org}
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>

        <div className="text-[clamp(13px,1.5vw,16px)] font-bold leading-tight tracking-[-0.3px] text-[var(--foreground)]">
          {v.role}
        </div>
        <div className="text-[10px] font-medium leading-tight" style={{ color: v.color }}>
          {v.org}
        </div>

        <div className="relative flex h-4 items-center overflow-hidden rounded bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)]">
          <div
            className="absolute inset-0 origin-left opacity-20 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{
              background: v.color,
              transform: showDetails ? "scaleX(1)" : "scaleX(0.3)",
            }}
          />
          <span className="relative z-[1] px-1.5 font-portfolio-mono text-[8px] tracking-wide text-[var(--muted)] transition-colors group-hover:text-[var(--foreground)]">
            {v.period}
          </span>
        </div>

        <div
          className="text-[7px] uppercase leading-none tracking-wide text-[var(--muted)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]"
          style={{
            opacity: showDetails ? 0 : 0.55,
            transform: showDetails ? "translateY(4px)" : "translateY(0)",
          }}
        >
          Hover for details
        </div>
      </div>

      {showDetails && (
        <div
          role="region"
          aria-label={`${v.role} at ${v.org}`}
          className="absolute inset-0 z-30 flex flex-col rounded-[inherit] border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--background)_96%,var(--foreground))] shadow-2xl backdrop-blur-md transition-opacity duration-200"
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex shrink-0 items-center gap-2 border-b border-[var(--border-subtle)] px-3 py-2">
              <span className="text-[8px] font-medium uppercase tracking-wide text-[var(--muted)]">
                {v.category}
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3 pt-2">
              <div className="mb-2 flex items-start gap-2">
                <div className="relative mt-0.5 h-9 w-9 shrink-0">
                  <Image
                    src={v.logo}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    id={`vol-${v.id}-title`}
                    className="text-sm font-bold leading-snug text-[var(--foreground)]"
                  >
                    {v.role}
                  </div>
                  <div
                    className="text-[11px] font-semibold"
                    style={{ color: v.color }}
                  >
                    {v.org}
                  </div>
                </div>
              </div>
              <p className="text-[11px] font-light leading-relaxed text-[var(--muted)]">
                {v.desc}
              </p>
              <div className="mt-2 font-portfolio-mono text-[9px] text-[var(--muted)]">
                {v.period}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VolunteerSection() {
  const [secRef, secVis] = useReveal<HTMLElement>(0.03);
  const count = VOLUNTEER.length;

  return (
    <section
      className="relative overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px] before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--border-subtle)] before:to-transparent before:content-['']"
      id="volunteer"
      ref={secRef}
    >
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

        <div className="flex flex-wrap gap-6 md:gap-6">
          <CounterPill
            label="Roles"
            value={String(count)}
            color="#c9f31d"
            vis={secVis}
            delay={0.5}
          />
          <CounterPill
            label="Years"
            value="3+"
            color="#818cf8"
            vis={secVis}
            delay={0.6}
          />
          <CounterPill
            label="Orgs"
            value={String(count)}
            color="#06b6d4"
            vis={secVis}
            delay={0.7}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-3 md:gap-3">
        {VOLUNTEER.map((v, i) => (
          <VolCard key={v.id} v={v} index={i} globalVis={secVis} />
        ))}
      </div>
    </section>
  );
}
