"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";
import { useReveal } from "../hooks/use-reveal";
import { VENTURE_DATA as V } from "../portfolio-data";
import { usePortfolioCursor } from "./portfolio-cursor-context";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";

export default function VentureSection() {
  const [ref, vis] = useReveal<HTMLElement>(0.05);
  const { setCursor, resetCursor } = usePortfolioCursor();

  return (
    <section
      className="relative overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px]"
      id="venture"
      ref={ref}
    >
      {/* Standard section header */}
      <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
        <div>
          <div
            className={aboutLabelClass}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s 0.1s",
            }}
          >
            Venture
          </div>
          <div
            className={aboutHeadingClass}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s 0.2s",
            }}
          >
            Co-Founded &<br />
            <span className="text-[var(--accent)]">engineered</span>
          </div>
          <p
            className="max-w-[560px] text-[15px] font-light leading-[1.7] text-[var(--muted)]"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s 0.35s",
            }}
          >
            Co-founder and lead engineer of Ishq Gems — an international digital
            marketplace connecting NGJA-licensed Sri Lankan gem merchants with global
            buyers and connoisseurs.
          </p>
        </div>

        {/* Live production status badge */}
        <div
          className="flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-2 text-xs font-portfolio-mono shadow-sm"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s 0.4s",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="text-[var(--muted)]">Status:</span>
          <span className="font-medium text-[var(--accent)]">Live in Production</span>
        </div>
      </div>

      {/* Main showcase container */}
      <div
        className="relative mx-auto max-w-[1100px] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--foreground)_2.5%,var(--background))] p-[clamp(24px,5vw,56px)] shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-[border-color] duration-500 hover:border-[var(--accent)]/40"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(34px)",
          transition: "all 0.9s cubic-bezier(.19,1,.22,1) 0.25s",
        }}
      >
        {/* Company identity & role header */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[var(--border-subtle)] pb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2.5 shadow-sm transition-transform duration-300 hover:scale-105">
              <img
                src={V.logo}
                alt={`${V.name} official logo`}
                className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(201,243,29,0.35)]"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="font-portfolio text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
                  {V.name}
                </h3>
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2.5 py-0.5 font-portfolio-mono text-[10px] font-medium text-[var(--muted)]">
                  {V.legal}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 font-portfolio-mono text-xs text-[var(--muted)]">
                <span className="font-medium text-[var(--foreground)]">
                  {V.role}
                </span>
                <span>•</span>
                <span>{V.period}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3.5 py-1.5 text-xs text-[var(--muted)]">
            <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
            <span>NGJA Licensed Dealer &amp; Exporter</span>
          </div>
        </div>

        {/* Tagline & narrative */}
        <div className="mt-8">
          <p className="font-portfolio text-lg font-medium text-[var(--foreground)] md:text-xl">
            &ldquo;{V.tagline}&rdquo;
          </p>
          <p className="mt-3 max-w-[800px] text-[15px] font-light leading-[1.8] text-[var(--muted)]">
            {V.desc}
          </p>
        </div>

        {/* Official Credentials Grid (matching stat cards in About & Certifications) */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {V.credentials.map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 transition-colors duration-300 hover:border-[var(--accent)]"
            >
              <div className="text-[10px] uppercase tracking-[2px] text-[var(--muted)]">
                {c.label}
              </div>
              <div className="mt-2 font-portfolio-mono text-sm font-semibold tracking-wide text-[var(--accent)]">
                {c.value}
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            REAL WEBSITE HERO PREVIEW (Interactive Browser Frame)
            ══════════════════════════════════════════════════════ */}
        <div className="mt-10">
          <a
            href={V.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#0c0c0c] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_30px_80px_rgba(201,243,29,0.12)]"
            onMouseEnter={() => setCursor("visit")}
            onMouseLeave={resetCursor}
            aria-label="Experience the live Ishq Gems website in production (opens in new tab)"
          >
            {/* Browser window top bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#141414] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80" />
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-black/40 px-3 py-1 font-portfolio-mono text-[11px] text-white/60 transition-colors group-hover:border-[var(--accent)]/40 group-hover:text-white">
                <svg
                  className="h-3 w-3 text-[var(--accent)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>ishqgems.com</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--accent)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                <span className="hidden sm:inline">Live Marketplace</span>
              </div>
            </div>

            {/* Authentic Hero Section Stage */}
            <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-[#070707]">
              {/* Real website hero background image */}
              <img
                src="/images/ishq-hero.webp"
                alt="Ishq Gems live hero background"
                className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.62] contrast-[1.05] saturate-[0.95] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Ambient vignette & gradient overlays matching production */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80" />

              {/* Real Hero Navigation Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] bg-black/25 px-5 py-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/ishq-logo.png"
                    alt="Ishq Gems"
                    className="h-7 w-7 object-contain"
                  />
                  <span className="font-portfolio text-sm font-bold tracking-widest text-white">
                    ISHQ GEMS
                  </span>
                </div>
                <div className="hidden items-center gap-5 text-[11px] font-medium tracking-wide text-white/70 sm:flex">
                  <span className="text-white">Home</span>
                  <span className="hover:text-white">Gemstones</span>
                  <span className="hover:text-white">Jewelry</span>
                  <span className="hover:text-white">Stores</span>
                  <span className="hover:text-white">About</span>
                </div>
                <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium text-white/90">
                  NGJA Verified
                </div>
              </div>

              {/* Real Hero Headline & Concierge Prompt */}
              <div className="relative z-10 flex h-[calc(100%-55px)] flex-col items-center justify-center px-6 text-center">
                <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#f7edc8]/30 bg-[#f7edc8]/10 px-3 py-1 font-portfolio-mono text-[10px] font-medium tracking-widest text-[#f7edc8] uppercase">
                  ✨ Premium Collection
                </span>

                <h4 className="font-portfolio text-[clamp(20px,3.8vw,38px)] font-bold tracking-[-1px] text-white leading-tight">
                  Discover the{" "}
                  <span className="bg-gradient-to-r from-[#e6cf8a] via-[#f7edc8] to-[#c9a227] bg-clip-text text-transparent">
                    Art of Elegance
                  </span>
                </h4>

                <p className="mx-auto mt-2 max-w-lg text-[11px] sm:text-xs font-light leading-relaxed text-white/80 line-clamp-2">
                  Where passion meets perfection. Extraordinary gemstones that
                  tell stories of timeless beauty and unmatched craftsmanship.
                </p>

                {/* Real Ishq Noor AI Concierge pill */}
                <div className="mt-4 flex w-full max-w-md items-center justify-between rounded-full border border-white/20 bg-black/60 px-3.5 py-2 backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="flex items-center gap-2 text-left">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#c9a227] to-[#8a7526] text-[10px] font-bold text-black">
                      ✦
                    </div>
                    <span className="text-[10px] text-white/80 sm:text-[11px]">
                      Ask{" "}
                      <strong className="font-semibold text-white">
                        Ishq Noor
                      </strong>{" "}
                      AI concierge...
                    </span>
                  </div>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium text-white">
                    Find Gem
                  </span>
                </div>

                {/* Trust markers strip */}
                <div className="mt-4 hidden items-center gap-4 font-portfolio-mono text-[9px] text-white/60 sm:flex">
                  <span>Verified Gem Dealers</span>
                  <span>·</span>
                  <span>GIA / NGJA Certified</span>
                  <span>·</span>
                  <span>Worldwide Insured Shipping</span>
                </div>
              </div>
            </div>
          </a>

          <div className="mt-2.5 flex items-center justify-between text-xs text-[var(--muted)]">
            <span className="font-portfolio-mono text-[11px]">
              Production Showcase · ishqgems.com
            </span>
            <a
              href={V.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[var(--accent)] hover:underline"
            >
              Open live site
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Platform Capabilities & Architecture Grid */}
        <div className="mt-10">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[2px] text-[var(--muted)]">
            Key Architecture &amp; Capabilities
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {V.capabilities.map((c, i) => (
              <div
                key={c.k}
                className="group/cap rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-4.5 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[color-mix(in_oklab,var(--foreground)_3%,var(--surface-elevated))]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-portfolio-mono text-xs font-bold text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="font-portfolio text-sm font-semibold tracking-wide text-[var(--foreground)] transition-colors group-hover/cap:text-[var(--accent)]">
                  {c.k}
                </div>
                <div className="mt-1 text-xs font-light leading-[1.6] text-[var(--muted)]">
                  {c.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Bottom Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--border-subtle)] pt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-[var(--muted)]">Built with:</span>
            {V.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-1 font-portfolio-mono text-[11px] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 border-r border-[var(--border-subtle)] pr-4">
              {V.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-portfolio-mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <a
              href={V.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] px-6 py-2.5 text-xs font-medium uppercase tracking-[2px] text-[var(--foreground)] shadow-sm transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--selection-fg)] active:scale-[0.98]"
              onMouseEnter={() => setCursor("visit")}
              onMouseLeave={resetCursor}
            >
              <span>Explore Ishq Gems</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
