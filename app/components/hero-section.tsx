"use client";

import type { RefObject } from "react";
import { FlipHoverText } from "./flip-hover-text";
import MediaImage from "./media-image";
import { heroNameClass } from "./section-styles";

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
  const show = visible && introDone;

  return (
    <section
      id="hero"
      className="relative flex h-screen flex-col justify-center overflow-hidden px-[clamp(24px,5vw,80px)] text-[#f0ece2]"
      ref={sectionRef}
    >
      <MediaImage
        src="bg-3.webp"
        alt="Hero background"
        fill
        priority
        media={{ width: 1920, quality: 72 }}
        sizes="100vw"
        className="absolute inset-0 object-cover object-[80%_center] md:object-right"
      />
      <div className="pointer-events-none absolute inset-0 w-full bg-gradient-to-r from-[#0c0c0c] via-[#0c0c0c]/80 to-transparent md:w-3/4 lg:w-2/3" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 70% 40%, rgba(201,243,29,0.06), transparent)",
        }}
      />
      <div className="relative z-10 w-full max-w-7xl">
        <div className="overflow-hidden leading-none">
          <FlipHoverText
            text="MUHAMMADH"
            visible={show}
            revealDelay={0.5}
            className={heroNameClass}
            style={{
              color: "#f0ece2",
              WebkitTextFillColor: "#f0ece2",
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
              WebkitTextStroke: "1.5px #f0ece2",
              WebkitTextFillColor: "transparent",
            }}
          />
        </div>
        <div className="overflow-hidden">
          <div
            className="mt-6 text-[clamp(14px,2vw,20px)] font-light uppercase tracking-[4px] text-[#a3a3a3] transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] [transition-delay:1.4s]"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(100%)",
            }}
          >
            Software Engineer <span className="text-[#c9f31d]">·</span> AI
            Integration <span className="text-[#c9f31d]">·</span> Full-Stack
            Developer
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-1000 [transition-delay:2s]"
        style={{ opacity: show ? 1 : 0 }}
      >
        <span className="text-[10px] uppercase tracking-[3px] text-white/45">
          Scroll
        </span>
        <div className="h-[60px] w-px animate-scroll-pulse bg-gradient-to-b from-[#c9f31d] to-transparent" />
      </div>
    </section>
  );
}
