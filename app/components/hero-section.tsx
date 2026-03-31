"use client";

import type { RefObject } from "react";
import { heroNameClass } from "./section-styles";
import { SplitText } from "./split-text";

type HeroSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  visible: boolean;
  loaded: boolean;
};

export default function HeroSection({
  sectionRef,
  visible,
  loaded,
}: HeroSectionProps) {
  const show = visible && loaded;

  return (
    <section
      className="relative flex h-screen flex-col justify-center overflow-hidden px-[clamp(24px,5vw,80px)]"
      ref={sectionRef}
    >
      <div
        className="absolute inset-0 bg-cover bg-[80%_center] bg-no-repeat md:bg-right"
        style={{ backgroundImage: "url('/bg-3.png')" }}
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
          <SplitText
            text="MUHAMMADH"
            visible={show}
            delay={0.5}
            className={heroNameClass}
            style={{
              WebkitTextFillColor: "#f0ece2",
            }}
          />
        </div>
        <div className="overflow-hidden leading-none">
          <SplitText
            text="AHZEM"
            visible={show}
            delay={0.8}
            className={heroNameClass}
            style={{
              WebkitTextStroke: "1.5px #f0ece2",
              WebkitTextFillColor: "transparent",
            }}
          />
        </div>
        <div className="overflow-hidden">
          <div
            className="mt-6 text-[clamp(14px,2vw,20px)] font-light uppercase tracking-[4px] text-[#888] transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] [transition-delay:1.4s]"
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
        <span className="text-[10px] uppercase tracking-[3px] text-[#444]">
          Scroll
        </span>
        <div className="h-[60px] w-px animate-scroll-pulse bg-gradient-to-b from-[#c9f31d] to-transparent" />
      </div>
    </section>
  );
}
