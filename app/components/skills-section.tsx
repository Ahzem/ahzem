"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import {
  SKILLS_CENTER,
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from "../portfolio-data";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";
import {
  ICONS8_TOOLKIT,
  icons8ToolkitPngUrl,
} from "./icons8-toolkit-data";

type SkillsSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

type TapeVariant = "bright" | "contrast";

// Three tape bands — colors from globals.css (--tape-*) so light / .dark themes match
const TAPES: readonly {
  items: readonly string[];
  dir: 1 | -1;
  speed: number;
  variant: TapeVariant;
}[] = [
  {
    items: [...SKILLS_LEFT, ...SKILLS_CENTER],
    dir: 1,
    speed: 0.55,
    variant: "bright",
  },
  {
    items: [...SKILLS_RIGHT, ...SKILLS_LEFT],
    dir: -1,
    speed: 0.42,
    variant: "contrast",
  },
  {
    items: [...SKILLS_CENTER, ...SKILLS_RIGHT],
    dir: 1,
    speed: 0.68,
    variant: "bright",
  },
];

const ROTATE = -4; // degrees — same angle for all bands

/** Wider than viewport so rotation never shows gaps; centered with negative margin */
const TAPE_BAND_WIDTH_PCT = 135;
const TAPE_ICON_PX = 36;

/** Icon from icons8 CDN (96px source — crisp at 36×36 display size) */
function TapeIcon({ skill, onDark }: { skill: string; onDark: boolean }) {
  const entry = ICONS8_TOOLKIT[skill];
  if (!entry) return null;
  const s = TAPE_ICON_PX;
  return (
    <Image
      src={icons8ToolkitPngUrl(entry)}
      alt=""
      width={s}
      height={s}
      unoptimized
      className="shrink-0 object-contain"
      style={{
        width: s,
        height: s,
        filter: onDark ? "none" : "var(--tape-icon-shadow)",
      }}
    />
  );
}

function TapeBand({
  items,
  dir,
  speed,
  variant,
  velRef,
}: {
  items: readonly string[];
  dir: 1 | -1;
  speed: number;
  variant: TapeVariant;
  velRef: { current: number };
}) {
  const onDark = variant === "contrast";
  const fgVar =
    variant === "bright" ? "var(--tape-bright-fg)" : "var(--tape-contrast-fg)";
  const bgVar =
    variant === "bright" ? "var(--tape-bright-bg)" : "var(--tape-contrast-bg)";
  const borderVar =
    variant === "bright"
      ? "var(--tape-bright-border)"
      : "var(--tape-contrast-border)";
  const shadowVar =
    variant === "bright"
      ? "var(--tape-shadow-bright)"
      : "var(--tape-shadow-contrast)";
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Stagger right-moving rows so adjacent bands don't mirror exactly
    if (dir === -1) xRef.current = track.scrollWidth / 4;

    let raf: number;
    const tick = () => {
      const hw = track.scrollWidth / 2;
      if (hw > 0) {
        xRef.current += speed * dir + velRef.current * 0.2;
        const offset = ((xRef.current % hw) + hw) % hw;
        track.style.transform = `translateX(${-offset}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dir, speed, velRef]);

  // Double items for a seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      style={{
        width: `${TAPE_BAND_WIDTH_PCT}%`,
        marginLeft: `${(100 - TAPE_BAND_WIDTH_PCT) / 2}%`,
        transform: `rotate(${ROTATE}deg)`,
        overflow: "hidden",
        backgroundColor: bgVar,
        borderTop: `3px solid ${borderVar}`,
        borderBottom: `3px solid ${borderVar}`,
        padding: "16px 0",
        boxShadow: shadowVar,
      }}
    >
      <div
        ref={trackRef}
        className="will-change-transform"
        style={{ display: "flex", alignItems: "center", width: "max-content" }}
      >
        {doubled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="flex shrink-0 items-center gap-3 whitespace-nowrap"
            style={{ color: fgVar, padding: "0 14px" }}
          >
            {/* Diamond separator */}
            <span
              className="font-portfolio-mono font-bold"
              style={{ fontSize: "12px", opacity: 0.6, letterSpacing: 0 }}
            >
              ◆
            </span>
            <TapeIcon skill={skill} onDark={onDark} />
            <span
              className="font-portfolio-mono font-extrabold uppercase"
              style={{ fontSize: "13px", letterSpacing: "3.5px" }}
            >
              {skill}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection({ sectionRef, visible }: SkillsSectionProps) {
  const velRef = useRef(0);
  const prevScrollY = useRef(0);

  useEffect(() => {
    prevScrollY.current = window.scrollY;

    const onScroll = () => {
      const delta = window.scrollY - prevScrollY.current;
      prevScrollY.current = window.scrollY;
      velRef.current = Math.max(-35, Math.min(35, velRef.current + delta * 0.6));
    };

    // Single shared decay loop — velocity decays once per frame, not once per band
    let decayRaf: number;
    const decay = () => {
      velRef.current *= 0.9;
      decayRaf = requestAnimationFrame(decay);
    };
    decayRaf = requestAnimationFrame(decay);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(decayRaf);
    };
  }, []);

  return (
    <section
      className="overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px]"
      id="skills"
      ref={sectionRef}
    >
      {/* Heading */}
      <div className="mb-20 text-center">
        <div
          className={`${aboutLabelClass} flex justify-center`}
          style={{ opacity: visible ? 1 : 0, transition: "all 0.6s 0.1s" }}
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
          Technologies I{" "}
          <span className="text-[#c9f31d]">work with</span>
        </div>
      </div>

      {/* Tape bands — negated padding so they bleed full-width */}
      <div
        className="-mx-[clamp(24px,5vw,80px)] flex flex-col gap-6"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s cubic-bezier(.19,1,.22,1) 0.4s",
        }}
      >
        {TAPES.map((tape, i) => (
          <TapeBand
            key={i}
            items={tape.items}
            dir={tape.dir}
            speed={tape.speed}
            variant={tape.variant}
            velRef={velRef}
          />
        ))}
      </div>
    </section>
  );
}
