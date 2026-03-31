"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../portfolio-data";
import { useReveal } from "../hooks/use-reveal";

function TestimonialCard({
  t,
  index,
  activeIndex,
  onActivate,
}: {
  t: (typeof TESTIMONIALS)[number];
  index: number;
  activeIndex: number;
  onActivate: (i: number) => void;
}) {
  const isActive = activeIndex === index;

  return (
    <div
      className={`relative flex min-w-[clamp(300px,40vw,420px)] select-none flex-col gap-5 overflow-hidden border p-9 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] [scroll-snap-align:start] ${
        isActive
          ? "-translate-y-1.5 border-[var(--foreground)]/12 bg-[var(--foreground)]/[0.05] dark:border-white/10 dark:bg-white/[0.04]"
          : "border-[var(--border-subtle)] bg-[var(--foreground)]/[0.02] dark:bg-white/[0.02]"
      }`}
      onMouseEnter={() => onActivate(index)}
    >
      {/* top accent line */}
      <div
        className="absolute top-0 right-0 left-0 h-0.5 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          transform: isActive ? "scaleX(1)" : "scaleX(0)",
          background: t.color,
        }}
      />

      {/* giant quote mark */}
      <div
        className="pointer-events-none absolute -top-2.5 right-5 font-serif text-[160px] font-black leading-none transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          color: t.color,
          opacity: isActive ? 0.1 : 0.03,
          transform: isActive
            ? "translateY(-8px) scale(1.05)"
            : "translateY(0) scale(1)",
        }}
      >
        &ldquo;
      </div>

      {/* relation badge */}
      <div
        className={`inline-flex self-start rounded-full border px-3.5 py-1 text-[11px] font-medium tracking-wide transition-all duration-[400ms] ${
          !isActive ? "border-[var(--border-subtle)] text-[var(--muted)]" : ""
        }`}
        style={{
          borderColor: isActive ? t.color : undefined,
          color: isActive ? t.color : undefined,
        }}
      >
        {t.relation}
      </div>

      {/* quote */}
      <p
        className={`relative z-[1] text-[15px] font-light leading-[1.85] transition-colors duration-[400ms] ${
          isActive ? "text-[var(--foreground)]" : "text-[var(--muted)]"
        }`}
      >
        {t.quote}
      </p>

      {/* author row */}
      <div className="relative z-[1] mt-auto flex items-center gap-3.5">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold tracking-wide transition-all duration-[400ms]"
          style={{
            background: `${t.color}20`,
            color: t.color,
            transform: isActive ? "scale(1.08)" : "scale(1)",
          }}
        >
          {t.avatar}
        </div>
        <div>
          <div className="mb-0.5 text-[15px] font-semibold text-[var(--foreground)]">
            {t.name}
          </div>
          <div className="text-xs leading-snug text-[var(--muted)]">{t.role}</div>
        </div>
      </div>

      {/* linkedin badge */}
      <div
        className="relative z-[1] flex items-center gap-1.5 text-[11px] tracking-wide text-[#0a66c2] transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
        <span>LinkedIn Recommendation</span>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [secRef, secVis] = useReveal<HTMLElement>(0.05);
  const [activeIndex, setActiveIndex] = useState(-1);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startClientXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastSampleRef = useRef({ x: 0, t: 0 });
  const momentumRafRef = useRef<number | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

  const stopMomentum = useCallback(() => {
    if (momentumRafRef.current !== null) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
  }, []);

  useEffect(() => () => stopMomentum(), [stopMomentum]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const track = trackRef.current;
      if (!track) return;
      stopMomentum();
      isDraggingRef.current = true;
      setIsDragging(true);
      activePointerIdRef.current = e.pointerId;
      startClientXRef.current = e.clientX;
      startScrollLeftRef.current = track.scrollLeft;
      velocityRef.current = 0;
      lastSampleRef.current = { x: e.clientX, t: performance.now() };
      track.setPointerCapture(e.pointerId);
    },
    [stopMomentum],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || e.pointerId !== activePointerIdRef.current)
      return;
    const track = trackRef.current;
    if (!track) return;
    const x = e.clientX;
    const dx = x - startClientXRef.current;
    track.scrollLeft = startScrollLeftRef.current - dx;

    const now = performance.now();
    const dt = now - lastSampleRef.current.t;
    if (dt > 0) {
      const instPxPerMs = (lastSampleRef.current.x - x) / dt;
      const instPerFrame = instPxPerMs * (1000 / 60);
      velocityRef.current =
        velocityRef.current * 0.35 + instPerFrame * 0.65;
    }
    lastSampleRef.current = { x, t: now };
  }, []);

  const endPointer = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerId !== activePointerIdRef.current) return;
      const track = trackRef.current;
      isDraggingRef.current = false;
      setIsDragging(false);
      activePointerIdRef.current = null;
      if (track?.hasPointerCapture(e.pointerId)) {
        track.releasePointerCapture(e.pointerId);
      }

      let vel = velocityRef.current * 1.08;
      const friction = 0.965;
      const minVel = 0.4;
      if (Math.abs(vel) < minVel) return;

      const step = () => {
        const el = trackRef.current;
        if (!el) {
          momentumRafRef.current = null;
          return;
        }
        vel *= friction;
        if (Math.abs(vel) < minVel) {
          momentumRafRef.current = null;
          return;
        }
        el.scrollLeft += vel;
        momentumRafRef.current = requestAnimationFrame(step);
      };
      momentumRafRef.current = requestAnimationFrame(step);
    },
    [],
  );

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!secVis) return;
    let c = 0;
    const target = TESTIMONIALS.length;
    const iv = setInterval(() => {
      c++;
      setCount(c);
      if (c >= target) clearInterval(iv);
    }, 200);
    return () => clearInterval(iv);
  }, [secVis]);

  return (
    <section
      className="relative overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px] before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--border-subtle)] before:to-transparent before:content-['']"
      id="testimonials"
      ref={secRef}
    >
      {/* header */}
      <div className="mb-[60px] flex flex-wrap items-end justify-between gap-6">
        <div>
          <div
            className="mb-4 text-[11px] font-medium uppercase tracking-[4px] text-[var(--accent)]"
            style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.1s" }}
          >
            Testimonials
          </div>
          <div
            className="mb-6 text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] tracking-[-2px]"
            style={{
              opacity: secVis ? 1 : 0,
              transform: secVis ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s 0.2s",
            }}
          >
            What others
            <br />
            <span className="text-[var(--accent)]">say about me</span>
          </div>
          <p
            className="max-w-[420px] text-[15px] font-light leading-[1.7] text-[var(--muted)]"
            style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 0.4s" }}
          >
            Recommendations from teachers, mentors, managers, and teammates
            who&apos;ve witnessed my work firsthand.
          </p>
        </div>

        {/* big counter */}
        <div
          className="flex items-baseline gap-1.5"
          style={{
            opacity: secVis ? 1 : 0,
            transform: secVis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s 0.5s",
          }}
        >
          <span
            className="font-portfolio-mono text-[clamp(64px,10vw,96px)] font-extrabold leading-none text-transparent"
            style={{
              WebkitTextStroke: secVis
                ? "1.5px var(--accent)"
                : "1px var(--counter-idle-stroke)",
              transition: "all 0.6s 0.8s",
            }}
          >
            0{count}
          </span>
          <span className="max-w-[80px] text-[13px] uppercase leading-snug tracking-[1.5px] text-[var(--muted)]">
            LinkedIn
            <br />
            Recommendations
          </span>
        </div>
      </div>

      {/* draggable card track */}
      <div className="relative after:pointer-events-none after:absolute after:top-0 after:right-0 after:bottom-5 after:z-[2] after:w-[120px] after:bg-gradient-to-r after:from-transparent after:to-[var(--background)] after:content-['']">
        <div
          className={`flex touch-none select-none gap-6 overflow-x-auto pr-20 pb-5 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:h-0 ${
            isDragging
              ? "cursor-grabbing [scroll-snap-type:none]"
              : "cursor-grab [scroll-snap-type:x_proximity]"
          }`}
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              style={{
                opacity: secVis ? 1 : 0,
                transform: secVis
                  ? "translateY(0) translateX(0)"
                  : `translateY(30px) translateX(${40 + i * 20}px)`,
                transition: `all 0.7s cubic-bezier(.19,1,.22,1) ${0.3 + i * 0.1}s`,
              }}
            >
              <TestimonialCard
                t={t}
                index={i}
                activeIndex={activeIndex}
                onActivate={setActiveIndex}
              />
            </div>
          ))}
        </div>
      </div>

      {/* drag hint */}
      <div
        className="flex items-center gap-2.5 pt-5 text-[11px] uppercase tracking-[2px] text-[var(--muted)]"
        style={{ opacity: secVis ? 1 : 0, transition: "all 0.6s 1s" }}
      >
        <span className="h-px w-10 bg-gradient-to-r from-[var(--accent)] to-transparent" />
        Drag to explore
        <span className="animate-nudge text-[var(--muted)]">→</span>
      </div>

      {/* vertical dot ticker */}
      <div className="absolute top-1/2 right-[clamp(16px,3vw,40px)] z-0 flex -translate-y-1/2 flex-col items-center gap-3 max-md:hidden">
        {TESTIMONIALS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-[400ms] ${
              activeIndex === i
                ? "scale-[1.3] bg-[var(--accent)] shadow-[0_0_12px_color-mix(in_oklab,var(--accent)_40%,transparent)]"
                : "bg-[var(--border-subtle)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
