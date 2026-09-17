"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import { FlipHoverText } from "./flip-hover-text";
import { heroNameClass } from "./section-styles";

const emptySubscribe = () => () => { };

const ROWS: string[][] = [
  ["architecture:s"],
  ["intelligence:s", "system:s"],
  // ["neural:l", "model"],
  ["compute:s", "pipeline:l"],
  ["code:l", "frontend", "cloud:l"],
  ["algorithm", "scalability:s"],
  ["tensorflow:l", "AI:s"],
  ["resolution:s", "runtime:s", "API", "server:l"],
  ["code:l", "codebase:l", "API:l"],
  ["database:l", "resources:l", "api:s"],
  ["platform", "frontend", "cloud:l", "Python:l"],
  ["JavaScript:l", "navigation"],
  ["environment", "data", "cloud", "security:l", "AI"],
  ["reduce", "code", "security", "the:s", "app"],
  ["git", "docker", "frontend", "backend", "git:s"],
  ["microservices", "git:l", "free:s", "solution"],
  ["node:l", "backend:l", "part:s", "with:s"],
  ["JavaScript", "code", "development", "Python:s"],
  ["devops:s", "microservices:s", "node:s"],
];

type WordPhysics = {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  hot: boolean;
};

type HeroSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
  /** True after preloader has fully finished and unmounted */
  introDone: boolean;
};

export default function HeroSection({
  sectionRef,
  visible,
  introDone,
}: HeroSectionProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const cloudRef = useRef<HTMLDivElement | null>(null);
  const faceRef = useRef<HTMLImageElement | null>(null);
  const show = visible && introDone;

  useEffect(() => {
    const cloud = cloudRef.current;
    const face = faceRef.current;
    if (!cloud || !face) return;

    // Words: interactive kinetic physics
    const wordElements = Array.from(cloud.querySelectorAll<HTMLSpanElement>(".hero-w"));
    const words: WordPhysics[] = wordElements.map((el) => ({
      el,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      rot: 0,
      hot: false,
    }));

    // Keep the cloud flush against the face's centerline (bridge of nose)
    function layout() {
      if (!cloud || !face) return;
      const narrow = window.matchMedia("(max-width: 768px)").matches;
      if (narrow) {
        cloud.style.setProperty("--cloud-right", "0px");
        return;
      }
      const h = face.clientHeight || window.innerHeight;
      // Position words a bit further left across the facial contour
      const cloudRight = Math.round(h * 0.395);
      cloud.style.setProperty("--cloud-right", `${cloudRight}px`);
    }

    let rects: { cx: number; cy: number }[] = [];
    let rectTick = 0;

    function measure() {
      rects = words.map((w) => {
        const r = w.el.getBoundingClientRect();
        return {
          cx: r.left + r.width / 2 - w.x,
          cy: r.top + r.height / 2 - w.y,
        };
      });
    }

    const onImageReady = () => {
      layout();
      measure();
    };

    if (face.complete) {
      layout();
      measure();
    } else {
      face.addEventListener("load", onImageReady);
    }

    window.addEventListener("resize", onImageReady);
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        layout();
        measure();
      });
    }
    // Also measure after layout settles
    const initialMeasureTimeout = setTimeout(() => {
      layout();
      measure();
    }, 100);

    // Cursor physics: words get pushed away, then spring home
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let px = -9999;
    let py = -9999;
    let active = false;
    const RADIUS = () => Math.max(Math.min(window.innerWidth, window.innerHeight) * 0.22, 180);

    function point(e: MouseEvent | TouchEvent | PointerEvent) {
      const p = "touches" in e && e.touches.length ? e.touches[0] : (e as MouseEvent);
      px = p.clientX;
      py = p.clientY;
      active = true;
    }

    window.addEventListener("mousemove", point, { passive: true });
    window.addEventListener("pointermove", point, { passive: true });
    window.addEventListener("touchmove", point, { passive: true });

    const onLeave = () => {
      active = false;
      px = -9999;
      py = -9999;
    };
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointercancel", onLeave);
    window.addEventListener("touchend", onLeave);
    window.addEventListener("touchcancel", onLeave);

    let rafId: number;
    function frame() {
      if (++rectTick % 30 === 0) measure();
      const R = RADIUS();

      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        const r = rects[i];
        if (!r) continue;

        let fx = 0;
        let fy = 0;
        let hot = false;

        if (active) {
          const dx = r.cx - px;
          const dy = r.cy - py;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0) {
            const k = 1 - d / R;
            const push = k * k * R * 0.55;
            fx = (dx / d) * push;
            fy = (dy / d) * push;
            hot = k > 0.35;
          }
        }

        if (reduce) {
          w.x = 0;
          w.y = 0;
        } else {
          // spring toward the pushed target, damped
          w.vx += (fx - w.x) * 0.12;
          w.vy += (fy - w.y) * 0.12;
          w.vx *= 0.78;
          w.vy *= 0.78;
          w.x += w.vx;
          w.y += w.vy;
        }

        const rot = w.x * 0.04;
        w.el.style.transform = `translate(${w.x.toFixed(2)}px,${w.y.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
        if (hot !== w.hot) {
          w.hot = hot;
          w.el.classList.toggle("hot", hot);
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    const onScroll = () => {
      measure();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(initialMeasureTimeout);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      face.removeEventListener("load", onImageReady);
      window.removeEventListener("resize", onImageReady);
      window.removeEventListener("mousemove", point);
      window.removeEventListener("pointermove", point);
      window.removeEventListener("touchmove", point);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointercancel", onLeave);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("touchcancel", onLeave);
    };
  }, [show]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-stage relative flex min-h-screen min-h-[100dvh] flex-col justify-end md:justify-center overflow-hidden px-[clamp(20px,5vw,80px)] pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] pb-[max(8.5rem,calc(env(safe-area-inset-bottom)+7rem))] md:py-0 transition-opacity duration-700"
      style={{ opacity: show ? 1 : 0 }}
    >
      {/* Cloud of developer words hugging the face */}
      <div className="hero-cloud" ref={cloudRef} aria-hidden="true">
        {ROWS.map((row, rIdx) => (
          <div key={rIdx} className="hero-row">
            {row.map((item, wIdx) => {
              const [txt, sz] = item.split(":");
              return (
                <span
                  key={wIdx}
                  className={`hero-w${sz ? ` ${sz}` : ""}`}
                >
                  {txt}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Face: pinned to top on mobile, right on desktop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={faceRef}
        src="/images/bg/bg-dark.webp"
        alt=""
        aria-hidden="true"
        className="hero-face opacity-0 dark:opacity-100"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={faceRef}
        src="/images/bg/bg-light.webp"
        alt=""
        aria-hidden="true"
        className="hero-face opacity-100 dark:opacity-0"
      />

      {/* Mobile subtle gradient backdrop to guarantee bottom content legibility */}
      <div
        className="md:hidden pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[var(--background)] via-[var(--background)]/85 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Left side: hero title & name with interactive flip hover */}
      <div className="pointer-events-none relative z-20 w-full max-w-7xl">
        <div className="pointer-events-auto inline-block max-w-[min(65vw,740px)] max-md:max-w-full min-[1600px]:max-w-none">
          {/* Status pill */}
          <div
            className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--foreground)_3%,var(--background))] px-3.5 py-1 text-[11px] font-portfolio-mono shadow-sm backdrop-blur-md"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.6s cubic-bezier(.19,1,.22,1) 0.3s",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="text-[var(--muted)]">Available for projects</span>
          </div>

          <div className="overflow-hidden leading-none">
            <FlipHoverText
              text="MUHAMMADH"
              visible={show}
              revealDelay={0.5}
              className={heroNameClass}
              style={{
                color: "var(--foreground)",
                WebkitTextFillColor: "var(--foreground)",
              }}
            />
          </div>
          <div className="overflow-hidden leading-none">
            <FlipHoverText
              text="AHZEM"
              visible={show}
              revealDelay={0.8}
              className={heroNameClass}
              style={{
                WebkitTextStroke: "1.5px var(--foreground)",
                WebkitTextFillColor: "transparent",
              }}
            />
          </div>

          {/* Desktop roles line */}
          <div className="hidden overflow-hidden md:block">
            <div
              className="mt-5 min-[1600px]:mt-6 text-[clamp(13px,1.3vw,16px)] min-[1600px]:text-[clamp(14px,2vw,20px)] font-light uppercase tracking-[2.5px] min-[1600px]:tracking-[4px] text-[var(--muted)] transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] [transition-delay:1.4s]"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(100%)",
              }}
            >
              Software Engineer <span className="text-[var(--accent)]">·</span> AI
              Integration <span className="text-[var(--accent)]">·</span> Full-Stack
              Developer
            </div>
          </div>

          {/* Mobile roles chips */}
          <div
            className="md:hidden mt-3 flex flex-wrap items-center gap-1.5 font-portfolio-mono text-xs text-[var(--muted)]"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s cubic-bezier(.19,1,.22,1) 1.2s",
            }}
          >
            <span className="font-medium text-[var(--foreground)]">Software Engineer</span>
            <span className="text-[var(--accent)]">•</span>
            <span>Full-Stack</span>
            <span className="text-[var(--accent)]">•</span>
            <span>AI Integration</span>
          </div>

          {/* Mobile quick action buttons */}
          <div
            className="md:hidden mt-5 flex items-center gap-3"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s cubic-bezier(.19,1,.22,1) 1.35s",
            }}
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full bg-[var(--foreground)] px-5 py-2 text-xs font-medium uppercase tracking-[1.5px] text-[var(--background)] shadow-sm transition-transform active:scale-95"
            >
              <span>Work</span>
              <span>↓</span>
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--background)]/80 px-5 py-2 text-xs font-medium uppercase tracking-[1.5px] text-[var(--foreground)] backdrop-blur-md transition-transform active:scale-95"
            >
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle bottom scroll prompt */}
      <div
        className="hero-scroll-prompt pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 transition-opacity duration-1000 [transition-delay:1.5s]"
        style={{ opacity: show ? 1 : 0 }}
      >
        <span className="text-[10px] uppercase tracking-[3px] text-[var(--hero-word)]/70">
          Scroll
        </span>
        <div className="h-[40px] w-px animate-scroll-pulse bg-gradient-to-b from-[var(--hero-word)] to-transparent" />
      </div>
    </section>
  );
}
