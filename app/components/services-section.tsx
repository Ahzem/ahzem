"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  Bot,
  Code2,
  Globe,
  Smartphone,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type ServiceIconId } from "../portfolio-data";

const SERVICE_ICONS: Record<ServiceIconId, LucideIcon> = {
  code2: Code2,
  smartphone: Smartphone,
  bot: Bot,
  globe: Globe,
  zap: Zap,
  trendingUp: TrendingUp,
};

const useReveal = <T extends HTMLElement>(
  thresh = 0.12,
): [RefObject<T | null>, boolean] => {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          o.unobserve(el);
        }
      },
      { threshold: thresh },
    );
    o.observe(el);
    return () => o.disconnect();
  }, [thresh]);

  return [ref, visible];
};

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [rRef, vis] = useReveal<HTMLDivElement>(0.1);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMouseX((e.clientX - rect.left) / rect.width);
  };

  const setRefs = (el: HTMLDivElement | null) => {
    (rRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    rowRef.current = el;
  };

  const Icon = SERVICE_ICONS[service.icon];

  return (
    <div
      ref={setRefs}
      className="group relative cursor-pointer overflow-hidden border-b border-white/[0.08]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.7s cubic-bezier(.19,1,.22,1) ${index * 0.08}s, transform 0.7s cubic-bezier(.19,1,.22,1) ${index * 0.08}s`,
      }}
    >
      {/* wipe background */}
      <div
        className="absolute inset-0 z-0 bg-[#c9f31d] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: mouseX < 0.5 ? "left" : "right",
        }}
      />

      <div
        className="relative z-[1] flex items-center gap-[clamp(16px,3vw,40px)] py-7 transition-[padding] duration-[400ms]"
        style={{ padding: hovered ? "28px 20px" : undefined }}
      >
        {/* number — rolling */}
        <div className="relative h-7 w-10 shrink-0 overflow-hidden">
          <span
            className="absolute w-full font-portfolio-mono text-sm text-[#333] transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{
              transform: hovered ? "translateY(-110%)" : "translateY(0)",
            }}
          >
            {service.num}
          </span>
          <span
            className="absolute w-full font-portfolio-mono text-sm text-[#0c0c0c] transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{
              transform: hovered ? "translateY(0)" : "translateY(110%)",
            }}
          >
            {service.num}
          </span>
        </div>

        {/* icon */}
        <div
          className="shrink-0 transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] max-md:hidden"
          style={{
            transform: hovered
              ? "scale(1) rotate(0deg)"
              : "scale(0) rotate(-90deg)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <Icon className="size-6 text-[#0c0c0c]" strokeWidth={1.75} aria-hidden />
        </div>

        {/* title — rolling */}
        <div className="relative h-[clamp(28px,4vw,40px)] flex-1 overflow-hidden">
          <span
            className="absolute inset-0 flex items-center whitespace-nowrap text-[clamp(18px,3vw,32px)] font-bold tracking-[-0.5px] transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{
              transform: hovered ? "translateY(-110%)" : "translateY(0)",
            }}
          >
            {service.title}
          </span>
          <span
            className="absolute inset-0 flex items-center whitespace-nowrap text-[clamp(18px,3vw,32px)] font-bold tracking-[-0.5px] text-[#0c0c0c] transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{
              transform: hovered ? "translateY(0)" : "translateY(110%)",
            }}
          >
            {service.title}
          </span>
        </div>

        {/* arrow */}
        <div
          className="shrink-0 text-xl font-bold -rotate-45 text-[#0c0c0c] transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
          style={{
            transform: hovered
              ? "translateX(0) rotate(-45deg)"
              : "translateX(-20px) rotate(-45deg)",
            opacity: hovered ? 1 : 0,
          }}
        >
          →
        </div>
      </div>

      {/* expandable content */}
      <div
        className="relative z-[1] overflow-hidden transition-[max-height,opacity,padding-bottom] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          maxHeight: hovered ? 200 : 0,
          opacity: hovered ? 1 : 0,
          paddingBottom: hovered ? 28 : 0,
        }}
      >
        <div className="pl-[clamp(56px,6vw,100px)] pr-5">
          <p
            className="mb-3.5 max-w-[560px] text-sm leading-[1.8] transition-colors"
            style={{ color: hovered ? "#333" : "#555" }}
          >
            {service.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map((t, i) => (
              <span
                key={t}
                className="rounded-full border border-[rgba(12,12,12,0.15)] px-3.5 py-1 text-[11px] font-medium tracking-wide text-[#333] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{
                  transitionDelay: hovered ? `${0.15 + i * 0.05}s` : "0s",
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateY(0)" : "translateY(10px)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [sRef, sVis] = useReveal<HTMLElement>(0.05);

  return (
    <section
      className="px-[clamp(24px,5vw,80px)] pt-[140px] pb-[100px]"
      id="services"
      ref={sRef}
    >
      <div className="mb-[60px]">
        <div
          className="mb-4 text-[11px] font-medium uppercase tracking-[4px] text-[#c9f31d]"
          style={{ opacity: sVis ? 1 : 0, transition: "all 0.6s 0.1s" }}
        >
          Services
        </div>
        <div
          className="mb-6 text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] tracking-[-2px]"
          style={{
            opacity: sVis ? 1 : 0,
            transform: sVis ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s 0.2s",
          }}
        >
          What I can
          <br />
          <span className="text-[#c9f31d]">build for you</span>
        </div>
      </div>
      <div className="border-t border-white/[0.08]">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.num} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
