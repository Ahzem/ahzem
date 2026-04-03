"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PreloaderProps = {
  loaded: boolean;
  /** Fires once after exit animation, when the overlay is removed */
  onHidden?: () => void;
};

export default function Preloader({ loaded, onHidden }: PreloaderProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [exit, setExit] = useState(false);
  const [hidden, setHidden] = useState(false);

  const waveRef = useRef<SVGPathElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    if (hidden) return;

    let p = progressRef.current;
    let doneTimer: number | null = null;
    let exitTimer: number | null = null;
    let hideTimer: number | null = null;

    const iv = window.setInterval(() => {
      const target = loaded ? 100 : 92;
      const distance = Math.max(target - p, 0);
      const step = loaded
        ? Math.max(0.55, distance * 0.12 + Math.random() * 0.45)
        : Math.max(0.15, distance * 0.045 + Math.random() * 0.22);

      p = Math.min(p + step, target);
      progressRef.current = p;
      setProgress(Math.round(p));

      if (loaded && p >= 100) {
        window.clearInterval(iv);
        doneTimer = window.setTimeout(() => setDone(true), 150);
        exitTimer = window.setTimeout(() => setExit(true), 900);
        hideTimer = window.setTimeout(() => setHidden(true), 1700);
      }
    }, 72);

    return () => {
      window.clearInterval(iv);
      if (doneTimer !== null) window.clearTimeout(doneTimer);
      if (exitTimer !== null) window.clearTimeout(exitTimer);
      if (hideTimer !== null) window.clearTimeout(hideTimer);
    };
  }, [loaded, hidden]);

  useEffect(() => {
    if (!hidden) return;
    onHidden?.();
  }, [hidden, onHidden]);

  const animateWave = useCallback(() => {
    const el = waveRef.current;
    if (!el) {
      rafRef.current = window.requestAnimationFrame(animateWave);
      return;
    }

    const t = timeRef.current;
    const fill = progressRef.current / 100;
    const waterY = 180 - fill * 180;

    let d = "";
    for (let x = 0; x <= 720; x += 4) {
      const y =
        waterY +
        Math.sin(x * 0.025 + t * 1.45) * 5 +
        Math.sin(x * 0.015 + t * 1.0) * 3 +
        Math.sin(x * 0.04 + t * 1.95) * 2;
      d += x === 0 ? `M 0 ${y}` : ` L ${x} ${y}`;
    }
    d += " L 720 180 L 0 180 Z";
    el.setAttribute("d", d);

    timeRef.current += 0.024;
    rafRef.current = window.requestAnimationFrame(animateWave);
  }, []);

  useEffect(() => {
    rafRef.current = window.requestAnimationFrame(animateWave);
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animateWave]);

  const theme = useMemo(
    () =>
      isDark
        ? {
            bg: "#000000",
            label: "text-white/[0.05]",
            loading: "text-white/20",
            loadingDot: "text-white/40",
            outline: "rgba(255,255,255,0.09)",
            baseFill: "rgba(255,255,255,0.03)",
            band: "rgba(255,255,255,0.08)",
            bubble: "rgba(255,255,255,0.16)",
            barTrack: "rgba(255,255,255,0.08)",
            fillTop: "rgba(255,255,255,0.95)",
            fillMid: "rgba(255,255,255,0.78)",
            fillBottom: "rgba(255,255,255,0.58)",
            foamTop: "rgba(255,255,255,0.95)",
            foamBottom: "rgba(255,255,255,0)",
            progressOn: "rgba(255,255,255,0.95)",
            progressOff: "rgba(255,255,255,0.55)",
            progressUnit: "rgba(255,255,255,0.35)",
            barStart: "rgba(255,255,255,0.35)",
            barEnd: "rgba(255,255,255,0.75)",
          }
        : {
            bg: "#ffffff",
            label: "text-black/[0.08]",
            loading: "text-black/30",
            loadingDot: "text-black/45",
            outline: "rgba(8,8,12,0.2)",
            baseFill: "rgba(8,8,12,0.05)",
            band: "rgba(8,8,12,0.12)",
            bubble: "rgba(8,8,12,0.18)",
            barTrack: "rgba(8,8,12,0.12)",
            fillTop: "rgba(8,8,12,0.92)",
            fillMid: "rgba(8,8,12,0.76)",
            fillBottom: "rgba(8,8,12,0.58)",
            foamTop: "rgba(8,8,12,0.85)",
            foamBottom: "rgba(8,8,12,0)",
            progressOn: "rgba(8,8,12,0.9)",
            progressOff: "rgba(8,8,12,0.55)",
            progressUnit: "rgba(8,8,12,0.35)",
            barStart: "rgba(8,8,12,0.3)",
            barEnd: "rgba(8,8,12,0.7)",
          },
    [isDark],
  );

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[10100] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${
        exit ? "pointer-events-none scale-110 opacity-0" : "scale-100 opacity-100"
      }`}
      style={{ backgroundColor: theme.bg }}
      aria-hidden={exit}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className={`absolute top-6 left-8 text-[11px] font-semibold tracking-[3px] uppercase ${theme.label}`}
      >
        Portfolio
      </div>

      <div className={`absolute top-6 right-8 text-[11px] font-mono tracking-[3px] uppercase ${theme.loading}`}>
        {done ? "Ready" : "Loading"}
        <span className={`ml-0.5 animate-pulse ${theme.loadingDot}`}>.</span>
      </div>

      <svg
        viewBox="0 0 720 180"
        className="relative z-10 h-auto w-[clamp(250px,58vw,640px)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.fillTop} />
            <stop offset="35%" stopColor={theme.fillMid} />
            <stop offset="100%" stopColor={theme.fillBottom} />
          </linearGradient>

          <linearGradient id="wFoam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.foamTop} />
            <stop offset="100%" stopColor={theme.foamBottom} />
          </linearGradient>

          <clipPath id="wClip">
            <path ref={waveRef} d="M0 180 L720 180 L720 180 L0 180Z" />
          </clipPath>

          <clipPath id="textClip">
            <text
              x="360"
              y="140"
              textAnchor="middle"
              style={{
                fontSize: 138,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 900,
                letterSpacing: "4px",
              }}
            >
              AHZEM
            </text>
          </clipPath>
        </defs>

        <text
          x="360"
          y="140"
          textAnchor="middle"
          fill="none"
          stroke={theme.outline}
          strokeWidth="1"
          style={{
            fontSize: 138,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            letterSpacing: "4px",
          }}
        >
          AHZEM
        </text>

        <g clipPath="url(#textClip)">
          <rect x="0" y="0" width="720" height="180" fill={theme.baseFill} />

          <g clipPath="url(#wClip)">
            <rect x="0" y="0" width="720" height="180" fill="url(#wFill)" />

            {[0.2, 0.4, 0.55, 0.7, 0.85].map((pct, i) => (
              <rect
                key={i}
                x="0"
                y={180 * pct}
                width="720"
                height="3"
                fill={theme.band}
                rx="1"
              />
            ))}

            {[
              { cx: 120, r: 3, d: 0 },
              { cx: 280, r: 2, d: 0.5 },
              { cx: 400, r: 2.5, d: 1 },
              { cx: 520, r: 2, d: 1.5 },
              { cx: 640, r: 3, d: 0.3 },
              { cx: 200, r: 1.5, d: 0.8 },
              { cx: 460, r: 2, d: 1.2 },
            ].map((b, i) => (
              <circle
                key={i}
                cx={b.cx}
                r={b.r}
                fill={theme.bubble}
                style={{
                  animation: `bubble ${2 + b.d}s ease-in-out infinite ${b.d}s`,
                }}
              />
            ))}
          </g>

          <g clipPath="url(#wClip)">
            <rect
              x="0"
              y={180 - (progress / 100) * 180 - 6}
              width="720"
              height="8"
              fill="url(#wFoam)"
              opacity="0.5"
            />
          </g>
        </g>

        {done && (
          <text
            x="360"
            y="140"
            textAnchor="middle"
            fill="none"
            stroke={theme.fillMid}
            strokeWidth="0.5"
            opacity="0.3"
            style={{
              fontSize: 138,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              letterSpacing: "4px",
              filter: "blur(8px)",
              transition: "opacity 0.5s",
            }}
          >
            AHZEM
          </text>
        )}
      </svg>

      <div className="relative z-10 mt-10 flex items-baseline gap-1">
        <span
          className="font-mono text-sm tracking-widest transition-colors duration-300"
          style={{ color: done ? theme.progressOn : theme.progressOff }}
        >
          {String(progress).padStart(3, "0")}
        </span>
        <span className="font-mono text-xs" style={{ color: theme.progressUnit }}>
          %
        </span>
      </div>

      <div
        className="relative z-10 mt-4 h-px w-[clamp(160px,30vw,300px)] overflow-hidden"
        style={{ background: theme.barTrack }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-150 ease-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${theme.barStart}, ${theme.barEnd})`,
          }}
        />
      </div>

      <style>{`
        @keyframes bubble {
          0%, 100% { cy: 160; opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.1; }
          100% { cy: 20; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
