"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Code2,
  Globe,
  Smartphone,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { buildMediaUrl } from "@/lib/media";
import { SERVICES, type ServiceIconId } from "../portfolio-data";
import { useReveal } from "../hooks/use-reveal";

const SERVICE_ICONS: Record<ServiceIconId, LucideIcon> = {
  code2: Code2,
  smartphone: Smartphone,
  bot: Bot,
  globe: Globe,
  zap: Zap,
  trendingUp: TrendingUp,
};

const springConfig = { stiffness: 400, damping: 90, mass: 0.8 };

const HOVER_IMG_MEDIA = { width: 520, height: 360 } as const;

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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);
  const imgTop = useTransform(mouseYSpring, [0.5, -0.5], ["38%", "62%"]);
  const imgLeft = useTransform(mouseXSpring, [0.5, -0.5], ["58%", "72%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMouseX((e.clientX - rect.left) / rect.width);

    const w = rect.width;
    const h = rect.height;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    x.set(mx / w - 0.5);
    y.set(my / h - 0.5);
  };

  const setRefs = (el: HTMLDivElement | null) => {
    (rRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    rowRef.current = el;
  };

  const Icon = SERVICE_ICONS[service.icon];
  const imgSrc = buildMediaUrl(service.image, HOVER_IMG_MEDIA);
  const subheading = service.tags.join(" · ");

  return (
    <div
      ref={setRefs}
      className="group/row relative overflow-hidden border-b border-white/[0.08]"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.7s cubic-bezier(.19,1,.22,1) ${index * 0.08}s, transform 0.7s cubic-bezier(.19,1,.22,1) ${index * 0.08}s`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[#c9f31d] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: mouseX < 0.5 ? "left" : "right",
        }}
      />

      <motion.div
        ref={rowRef}
        initial="initial"
        whileHover="whileHover"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => {
          setHovered(false);
          x.set(0);
          y.set(0);
        }}
        onMouseMove={handleMouseMove}
        className="relative z-[1] cursor-pointer"
      >
        <motion.img
          style={{
            top: imgTop,
            left: imgLeft,
            translateX: "-50%",
            translateY: "-50%",
          }}
          variants={{
            initial: { scale: 0, rotate: "-12.5deg", opacity: 0 },
            whileHover: { scale: 1, rotate: "12.5deg", opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          src={imgSrc}
          alt=""
          className="pointer-events-none absolute z-0 h-24 w-32 rounded-lg object-cover shadow-lg ring-1 ring-black/10 md:h-48 md:w-64 dark:ring-white/10"
        />

        <div
          className="relative z-[2] flex items-center gap-[clamp(16px,3vw,40px)] py-7 transition-[padding] duration-[400ms]"
          style={{ padding: hovered ? "28px 20px" : undefined }}
        >
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

          <div
            className="hidden shrink-0 transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] max-md:hidden md:block"
            style={{
              transform: hovered
                ? "scale(1) rotate(0deg)"
                : "scale(0) rotate(-90deg)",
              opacity: hovered ? 1 : 0,
            }}
          >
            <Icon className="size-6 text-[#0c0c0c]" strokeWidth={1.75} aria-hidden />
          </div>

          <div className="relative min-w-0 flex-1">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: -8 },
              }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
                staggerChildren: 0.04,
                delayChildren: 0.06,
              }}
              className="relative z-10 flex flex-wrap items-center gap-y-1 text-[clamp(18px,3vw,32px)] font-bold tracking-[-0.5px] text-[var(--foreground)] transition-colors duration-500 group-hover/row:text-[#0c0c0c] md:whitespace-nowrap"
              style={{
                color: hovered ? "#0c0c0c" : undefined,
              }}
            >
              {Array.from(service.title).map((char, i) => (
                <motion.span
                  key={`${service.num}-${i}-${char}`}
                  variants={{
                    initial: { x: 0 },
                    whileHover: { x: 10 },
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
            <span
              className="relative z-10 mt-1.5 block max-w-full text-sm text-[var(--muted)] transition-colors duration-500 md:truncate"
              style={{ color: hovered ? "#333" : undefined }}
            >
              {subheading}
            </span>
          </div>

          <motion.div
            variants={{
              initial: { x: "40%", opacity: 0 },
              whileHover: { x: "0%", opacity: 1 },
            }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative z-10 shrink-0 p-2"
          >
            <ArrowRight
              className="size-8 text-[#0c0c0c] md:size-10"
              strokeWidth={2}
              aria-hidden
            />
          </motion.div>
        </div>

        <div
          className="relative z-[2] overflow-hidden transition-[max-height,opacity,padding-bottom] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
          style={{
            maxHeight: hovered ? 220 : 0,
            opacity: hovered ? 1 : 0,
            paddingBottom: hovered ? 28 : 0,
          }}
        >
          <div className="pl-[clamp(56px,6vw,100px)] pr-5">
            <p
              className="mb-3.5 max-w-[560px] text-sm leading-[1.8] transition-colors"
              style={{ color: hovered ? "#333" : "var(--muted)" }}
            >
              {service.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((t, i) => (
                <span
                  key={t}
                  className="rounded-full border border-[rgba(12,12,12,0.15)] px-3.5 py-1 text-[11px] font-medium tracking-wide text-[#333] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  style={{
                    transitionDelay: hovered ? `${0.12 + i * 0.05}s` : "0s",
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
      </motion.div>
    </div>
  );
}

export default function ServicesSection() {
  const [sRef, sVis] = useReveal<HTMLElement>(0.05);

  return (
    <section
      className="relative overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px]"
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
