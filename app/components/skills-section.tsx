"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import {
  SKILLS_CENTER,
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from "../portfolio-data";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";
import ToolkitIcon from "./toolkit-icon";

type SkillsSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
};

const RIBBONS: readonly {
  items: readonly string[];
  dir: 1 | -1;
  speed: number;
  rotateDeg: number;
  offsetY: number;
}[] = [
  {
    items: [...SKILLS_LEFT, ...SKILLS_CENTER],
    dir: 1,
    speed: 0.64,
    rotateDeg: -7,
    offsetY: -22,
  },
  {
    items: [...SKILLS_RIGHT, ...SKILLS_LEFT],
    dir: -1,
    speed: 0.5,
    rotateDeg: 7,
    offsetY: 22,
  },
];

const RIBBON_WIDTH_PCT = 150;

function RibbonBand({
  items,
  dir,
  speed,
  rotateDeg,
  offsetY,
  velRef,
}: {
  items: readonly string[];
  dir: 1 | -1;
  speed: number;
  rotateDeg: number;
  offsetY: number;
  velRef: { current: number };
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

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

  const doubled = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 overflow-hidden bg-[var(--foreground)] dark:bg-[var(--foreground)]"
      style={{
        width: `${RIBBON_WIDTH_PCT}%`,
        top: "50%",
        transform: `translate(-50%, calc(-50% + ${offsetY}px)) rotate(${rotateDeg}deg)`,
        borderTop: "2.5px solid color-mix(in oklab, var(--accent) 60%, transparent)",
        borderBottom: "2.5px solid color-mix(in oklab, var(--accent) 60%, transparent)",
        boxShadow: "0 20px 60px -24px rgb(0 0 0 / 70%)",
        padding: "14px 0",
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
            className="flex shrink-0 items-center gap-3 whitespace-nowrap px-5 text-[var(--background)]"
          >
            <ToolkitIcon
              skill={skill}
              size={36}
              className="shrink-0 brightness-[1.05]"
            />
            <span className="font-portfolio-mono text-[13px] font-black uppercase tracking-[2.5px]">
              {skill}
            </span>
            <span className="mx-1 font-portfolio-mono text-[10px] opacity-30">◆</span>
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
        <p
          className="mx-auto max-w-2xl text-center text-sm text-[var(--muted)]"
          style={{ opacity: visible ? 1 : 0, transition: "all 0.7s 0.3s" }}
        >
          Production stack used across web, mobile, AI, and cloud projects.
        </p>
      </div>

      <div
        className="-mx-[clamp(24px,5vw,80px)] relative h-[280px]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s cubic-bezier(.19,1,.22,1) 0.4s",
        }}
      >
        {RIBBONS.map((ribbon, i) => (
          <RibbonBand
            key={i}
            items={ribbon.items}
            dir={ribbon.dir}
            speed={ribbon.speed}
            rotateDeg={ribbon.rotateDeg}
            offsetY={ribbon.offsetY}
            velRef={velRef}
          />
        ))}
      </div>
    </section>
  );
}
