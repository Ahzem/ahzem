"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type RefObject,
} from "react";
import {
  CERTIFICATIONS,
  EXPERIENCES,
  NAV_SECTIONS,
  PROJECTS,
  SKILLS_CENTER,
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from "./portfolio-data";
import Image from "next/image";
import ServicesSection from "./components/services-section";
import GallerySection from "./components/gallery-section";
import TestimonialsSection from "./components/testimonials-section";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

const useReveal = <T extends HTMLElement>(
  thresh = 0.12,
): [RefObject<T | null>, boolean] => {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: thresh },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [thresh]);

  return [ref, visible];
};

type SplitTextProps = {
  text: string;
  visible: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

const SplitText = ({
  text,
  visible,
  delay = 0,
  className = "",
  style = {},
}: SplitTextProps) => (
  <span className={`inline-block ${className}`} style={style}>
    {text.split("").map((ch, i) => (
      <span
        key={`${text}-${i}`}
        className="inline-block"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) rotateX(0)"
            : "translateY(100%) rotateX(-80deg)",
          transition: `all 0.6s cubic-bezier(.19,1,.22,1) ${delay + i * 0.03}s`,
          whiteSpace: ch === " " ? "pre" : "normal",
        }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ))}
  </span>
);

const heroNameClass =
  "text-[clamp(48px,10vw,140px)] font-bold tracking-[-4px] max-md:tracking-[-2px] leading-[0.95]";

const aboutLabelClass =
  "mb-4 text-[11px] font-medium uppercase tracking-[4px] text-[#c9f31d]";

const aboutHeadingClass =
  "mb-8 text-[clamp(36px,5vw,64px)] font-bold tracking-[-2px] leading-[1.1]";

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorScale, setCursorScale] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const hScrollRef = useRef<HTMLElement | null>(null);
  const hWrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [heroRef, heroVis] = useReveal<HTMLElement>(0.1);
  const [aboutRef, aboutVis] = useReveal<HTMLElement>(0.1);
  const [expRef, expVis] = useReveal<HTMLElement>(0.1);
  const [skillRef, skillVis] = useReveal<HTMLElement>(0.08);
  const [certRef, certVis] = useReveal<HTMLElement>(0.1);
  const [contactRef, contactVis] = useReveal<HTMLElement>(0.1);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      cursorRef.current.x = lerp(cursorRef.current.x, mouseRef.current.x, 0.12);
      cursorRef.current.y = lerp(cursorRef.current.y, mouseRef.current.y, 0.12);
      setCursorPos({ x: cursorRef.current.x, y: cursorRef.current.y });
      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const section = hScrollRef.current;
    const wrap = hWrapRef.current;
    if (!section || !wrap) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const progress = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      const maxTx = Math.max(wrap.scrollWidth - window.innerWidth, 0);
      wrap.style.transform = `translateX(${-progress * maxTx}px)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const setCursor = (label: string, scale = 2.5) => {
    setCursorLabel(label);
    setCursorScale(scale);
  };

  const resetCursor = () => {
    setCursorLabel("");
    setCursorScale(1);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openProject = (link: string | null) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const handleProjectKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    link: string | null,
  ) => {
    if (!link) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(link);
    }
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[9000] bg-grain opacity-[0.035]" />

      <div
        className="pointer-events-none fixed z-[9999] flex items-center justify-center mix-blend-difference transition-[width,height,background-color] duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] max-md:!hidden"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: cursorScale === 1 ? 12 : 80,
          height: cursorScale === 1 ? 12 : 80,
          borderRadius: "50%",
          background: cursorLabel ? "#c9f31d" : "#f0ece2",
          transform: "translate(-50%,-50%)",
        }}
      >
        <span
          className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-[#0c0c0c] transition-opacity duration-300 ${
            cursorLabel ? "opacity-100" : "opacity-0"
          }`}
        >
          {cursorLabel}
        </span>
      </div>

      <div
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0c0c0c] transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{ clipPath: loaded ? "inset(0 0 100% 0)" : "inset(0 0 0 0)" }}
      >
        <span className="text-sm font-light uppercase tracking-[6px] text-[#555]">
          Loading
        </span>
      </div>

      <nav className="fixed top-0 right-0 left-0 z-[100] flex items-center justify-between px-10 py-6 mix-blend-difference">
        <button
          type="button"
          className="border-none bg-transparent p-0 font-inherit text-lg font-bold tracking-[-0.5px]"
          aria-label="Scroll to top"
          onMouseEnter={() => setCursor("home")}
          onMouseLeave={resetCursor}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          AHZEM
        </button>

        <div className="hidden gap-8 md:flex">
          {NAV_SECTIONS.map((section) => (
              <button
                key={section}
                type="button"
                className="relative border-none bg-transparent p-0 font-inherit text-[13px] font-normal uppercase tracking-wide text-[#999] transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[#f0ece2] hover:after:w-full"
                onClick={() => scrollToSection(section)}
                onMouseEnter={() => setCursor("")}
                onMouseLeave={resetCursor}
              >
                {section}
              </button>
            ))}
        </div>
      </nav>

      <section
        className="relative flex h-screen flex-col justify-center overflow-hidden px-[clamp(24px,5vw,80px)]"
        ref={heroRef}
      >
        <div
          className="absolute inset-0 bg-cover bg-[80%_center] md:bg-right bg-no-repeat"
          style={{ backgroundImage: "url('/bg-2.png')" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-[#0c0c0c]/80 to-transparent pointer-events-none w-full md:w-3/4 lg:w-2/3"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 70% 40%, rgba(201,243,29,0.06), transparent)",
          }}
        />
        <div className="relative z-10 w-full max-w-7xl">
          <div className="overflow-hidden leading-none">
            <SplitText
              text="MUHAMMADH"
              visible={heroVis && loaded}
              delay={0.5}
              className={heroNameClass}
            />
          </div>
          <div className="overflow-hidden leading-none">
            <SplitText
              text="AHZEM"
              visible={heroVis && loaded}
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
                opacity: heroVis && loaded ? 1 : 0,
                transform:
                  heroVis && loaded ? "translateY(0)" : "translateY(100%)",
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
          style={{ opacity: heroVis && loaded ? 1 : 0 }}
        >
          <span className="text-[10px] uppercase tracking-[3px] text-[#444]">
            Scroll
          </span>
          <div className="h-[60px] w-px animate-scroll-pulse bg-gradient-to-b from-[#c9f31d] to-transparent" />
        </div>
      </section>

      <div className="overflow-hidden whitespace-nowrap border-y border-white/[0.06] py-7">
        <div className="inline-flex animate-marquee hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, j) => (
            <span
              key={`marquee-${j}`}
              className="inline-flex items-center gap-10 px-10 text-[15px] font-normal uppercase tracking-[3px] text-[#444]"
            >
              {[
                "React",
                "Flutter",
                "Node.js",
                "AWS",
                "Azure",
                "Next.js",
                "AI Agents",
                "Docker",
                "TypeScript",
                "Python",
                "PostgreSQL",
                "NestJS",
                "CrewAI",
              ].map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="inline-flex items-center gap-10"
                >
                  {skill}
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9f31d]" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section
        className="grid grid-cols-1 items-start gap-10 px-[clamp(24px,5vw,80px)] py-40 md:grid-cols-2 md:gap-20"
        id="about"
        ref={aboutRef}
      >
        <div>
          <div
            className={aboutLabelClass}
            style={{
              opacity: aboutVis ? 1 : 0,
              transform: aboutVis ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s 0.1s",
            }}
          >
            About
          </div>
          <div
            className={aboutHeadingClass}
            style={{
              opacity: aboutVis ? 1 : 0,
              transform: aboutVis ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(.19,1,.22,1) 0.2s",
            }}
          >
            Building things
            <br />
            that <span className="text-[#c9f31d]">matter</span>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              ["1+", "Years"],
              ["11+", "Projects"],
              ["4", "Live Apps"],
            ].map(([n, label], i) => (
              <div
                key={label}
                className="rounded border border-white/[0.06] p-6 transition-[border-color] duration-300 hover:border-[#c9f31d]"
                style={{
                  opacity: aboutVis ? 1 : 0,
                  transform: aboutVis ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ${0.4 + i * 0.1}s`,
                }}
              >
                <div className="font-portfolio-mono text-[40px] font-bold text-[#c9f31d]">
                  {n}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[2px] text-[#666]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            className="text-base font-light leading-[1.9] text-[#999] [&_strong]:font-medium [&_strong]:text-[#f0ece2]"
            style={{
              opacity: aboutVis ? 1 : 0,
              transform: aboutVis ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s 0.3s",
            }}
          >
            I&apos;m a full-stack software engineer from <strong>Sri Lanka</strong>{" "}
            with professional experience at <strong>Efito Solutions</strong>,
            where I was promoted from Trainee to Associate Software Engineer
            within one year — recognized as{" "}
            <strong className="font-medium text-[#c9f31d]">
              &quot;Rising Star of 2025.&quot;
            </strong>
            <br />
            <br />
            I specialize in building <strong>production-grade applications</strong>{" "}
            — from Flutter mobile apps and Next.js platforms to AI-powered
            integrations using CrewAI, n8n, and VAPI voice agents.
            <br />
            <br />
            My work spans the full stack:{" "}
            <strong>React, Node.js, NestJS, Python, AWS, Docker</strong>, and
            beyond. I care about clean architecture, smooth user experiences, and
            shipping things that work at scale.
          </div>
        </div>
      </section>

      <div className="mx-[clamp(24px,5vw,80px)] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <section
        className="px-[clamp(24px,5vw,80px)] py-40"
        id="experience"
        ref={expRef}
      >
        <div className="mb-20 flex items-end justify-between border-b border-white/[0.06] pb-6">
          <div>
            <div
              className={aboutLabelClass}
              style={{ opacity: expVis ? 1 : 0, transition: "all 0.6s 0.1s" }}
            >
              Experience
            </div>
            <div
              className={aboutHeadingClass}
              style={{
                opacity: expVis ? 1 : 0,
                transform: expVis ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s 0.2s",
              }}
            >
              Where I&apos;ve
              <br />
              <span className="text-[#c9f31d]">worked</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {EXPERIENCES.map((item, i) => (
            <div
              key={item.company}
              className="relative grid grid-cols-1 gap-3 overflow-hidden border-b border-white/[0.06] py-10 transition-[background-color] duration-[400ms] before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-[#c9f31d] before:transition-transform before:duration-[400ms] before:ease-[cubic-bezier(0.19,1,0.22,1)] before:content-[''] hover:bg-[rgba(201,243,29,0.02)] hover:before:scale-y-100 md:grid-cols-[200px_1fr] md:gap-10"
              onMouseEnter={() => setCursor("view")}
              onMouseLeave={resetCursor}
              style={{
                opacity: expVis ? 1 : 0,
                transform: expVis ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.7s cubic-bezier(.19,1,.22,1) ${0.3 + i * 0.15}s`,
              }}
            >
              <div className="pt-1 font-portfolio-mono text-sm text-[#555]">
                {item.period}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  {item.logo && (
                    <Image
                      src={item.logo}
                      alt={item.company}
                      className="h-10 w-10 rounded-md object-contain"
                      width={40}
                      height={40}
                    />
                  )}
                  <div className="text-[28px] font-bold tracking-[-0.5px]">
                    {item.company}
                  </div>
                </div>
                {item.roles && item.roles.length > 0 && (
                  <div className="ml-[19px] mt-6 flex flex-col gap-8 border-l border-white/[0.08] pb-2 pl-8">
                    {item.roles.map((role) => (
                      <div key={role.role} className="relative">
                        <div className="absolute -left-[38px] top-2 h-3 w-3 rounded-full border-[2px] border-[#0c0c0c] bg-[#444]" />
                        <div className="mb-1 text-[22px] font-bold tracking-[-0.5px]">
                          {role.role}
                        </div>
                        <div className="mb-3 font-portfolio-mono text-[13px] tracking-wide text-[#c9f31d]">
                          {role.period}
                        </div>
                        <div className="max-w-[560px] text-sm leading-[1.8] text-[#777]">
                          {role.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-[clamp(24px,5vw,80px)] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <section className="pt-20 pb-0">
        <div className="mb-10 px-[clamp(24px,5vw,80px)]">
          <div className={aboutLabelClass}>Selected Work</div>
          <div className={aboutHeadingClass}>
            Projects<span className="text-[#c9f31d]">.</span>
          </div>
        </div>
      </section>
      <section className="relative h-[300vh]" ref={hScrollRef}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div
            className="flex gap-10 px-20 will-change-transform"
            ref={hWrapRef}
          >
            {PROJECTS.map((project) => (
              <div
                key={project.num}
                className={`group relative flex min-h-[70vh] min-w-[clamp(340px,45vw,600px)] flex-col justify-end overflow-hidden rounded-lg transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[0.97] ${
                  project.link ? "cursor-none max-md:cursor-pointer" : "cursor-default"
                }`}
                role={project.link ? "link" : undefined}
                tabIndex={project.link ? 0 : undefined}
                aria-label={project.link ? `Open ${project.title}` : undefined}
                onMouseEnter={() => setCursor(project.link ? "visit" : "view")}
                onMouseLeave={resetCursor}
                onClick={() => openProject(project.link)}
                onKeyDown={(event) => handleProjectKeyDown(event, project.link)}
              >
                <div
                  className="absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}18, ${project.color}08 40%, #0c0c0c 80%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-portfolio-mono font-black tracking-[-6px] text-[clamp(100px,15vw,180px)] opacity-[0.04]"
                  >
                    {project.num}
                  </span>
                </div>
                <div className="relative z-[2] p-10">
                  <div className="mb-2 font-portfolio-mono text-xs text-white/50">
                    {project.num}
                  </div>
                  <div className="mb-1 text-[clamp(28px,4vw,48px)] font-bold tracking-[-1px]">
                    {project.title}
                  </div>
                  <div className="mb-4 text-sm font-light text-white/70">
                    {project.sub}
                  </div>
                  <div className="mb-4 max-w-[400px] text-[13px] leading-[1.7] text-white/50">
                    {project.desc}
                  </div>
                  <div className="font-portfolio-mono text-[11px] tracking-wide text-white/35">
                    {project.tech}
                  </div>
                  {project.link && (
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] text-[#c9f31d] transition-[gap] duration-300 group-hover:gap-3.5">
                      Visit Live ↗
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />

      <div className="mx-[clamp(24px,5vw,80px)] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <section
        className="overflow-hidden px-[clamp(24px,5vw,80px)] py-40"
        id="skills"
        ref={skillRef}
      >
        <div className="text-center">
          <div
            className={`${aboutLabelClass} flex justify-center`}
            style={{
              opacity: skillVis ? 1 : 0,
              transition: "all 0.6s 0.1s",
            }}
          >
            Toolkit
          </div>
          <div
            className={aboutHeadingClass}
            style={{
              opacity: skillVis ? 1 : 0,
              transform: skillVis ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s 0.2s",
            }}
          >
            Technologies I <span className="text-[#c9f31d]">work with</span>
          </div>
        </div>
        <div className="mx-auto mt-[60px] flex max-w-[900px] flex-wrap justify-center gap-3">
          {[...SKILLS_LEFT, ...SKILLS_CENTER, ...SKILLS_RIGHT].map((skill, i) => (
            <div
              key={skill}
              className="relative cursor-default overflow-hidden rounded-full border border-white/[0.08] px-7 py-3.5 text-[15px] font-normal text-[#888] transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-[#c9f31d] before:transition-transform before:duration-[400ms] before:ease-[cubic-bezier(0.19,1,0.22,1)] before:content-[''] hover:border-[#c9f31d] hover:text-[#0c0c0c] hover:before:scale-x-100"
              onMouseEnter={() => setCursor("")}
              onMouseLeave={resetCursor}
              style={{
                opacity: skillVis ? 1 : 0,
                transform: skillVis ? "translateY(0)" : "translateY(25px)",
                transition: `all 0.5s cubic-bezier(.19,1,.22,1) ${0.3 + i * 0.04}s`,
              }}
            >
              <span className="relative z-10">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-[clamp(24px,5vw,80px)] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <section
        className="border-t border-white/[0.06] px-[clamp(24px,5vw,80px)] py-[120px]"
        id="certifications"
        ref={certRef}
      >
        <div
          className={aboutLabelClass}
          style={{ opacity: certVis ? 1 : 0, transition: "all 0.6s 0.1s" }}
        >
          Credentials
        </div>
        <div
          className={aboutHeadingClass}
          style={{
            opacity: certVis ? 1 : 0,
            transform: certVis ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s 0.2s",
          }}
        >
          Certifications<span className="text-[#c9f31d]">.</span>
        </div>
        <div className="mt-[60px] grid gap-px bg-white/[0.06] [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]">
          {CERTIFICATIONS.map((cert, i) => {
            const hasLink = Boolean(cert.link);
            return (
              <div
                key={cert.name}
                className={`group relative flex flex-col gap-5 bg-[#0c0c0c] p-8 transition-[background-color] duration-300 hover:bg-[rgba(201,243,29,0.03)] ${
                  hasLink ? "cursor-none max-md:cursor-pointer" : ""
                }`}
                role={hasLink ? "link" : undefined}
                tabIndex={hasLink ? 0 : undefined}
                aria-label={hasLink ? `View credential for ${cert.name}` : undefined}
                onMouseEnter={() => setCursor(hasLink ? "visit" : "")}
                onMouseLeave={resetCursor}
                onClick={() => hasLink && window.open(cert.link, "_blank", "noopener,noreferrer")}
                onKeyDown={(e) => {
                  if (hasLink && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    window.open(cert.link, "_blank", "noopener,noreferrer");
                  }
                }}
                style={{
                  opacity: certVis ? 1 : 0,
                  transform: certVis ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ${0.3 + i * 0.06}s`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-portfolio-mono text-xs text-[#555]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-portfolio-mono text-[11px] uppercase tracking-wider text-[#c9f31d]">
                    {cert.date}
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 text-[20px] font-bold tracking-[-0.5px] transition-colors group-hover:text-[#c9f31d]">
                    {cert.name}
                  </div>
                  <div className="text-[13px] tracking-wide text-[#777]">
                    {cert.issuer}
                  </div>
                </div>
                <div className="mt-2 flex aspect-[16/10] w-full overflow-hidden rounded bg-white/[0.03]">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      width={400}
                      height={250}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#333] transition-colors duration-300 group-hover:text-[#444]">
                      <span className="text-[11px] uppercase tracking-wide">Certificate Image</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mx-[clamp(24px,5vw,80px)] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <GallerySection />

      <TestimonialsSection />

      <div className="mx-[clamp(24px,5vw,80px)] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <section
        className="px-[clamp(24px,5vw,80px)] py-40 text-center"
        id="contact"
        ref={contactRef}
      >
        <div
          className={`${aboutLabelClass} flex justify-center`}
          style={{
            opacity: contactVis ? 1 : 0,
            transition: "all 0.6s 0.1s",
          }}
        >
          Contact
        </div>
        <div
          className="mb-10 text-[clamp(40px,8vw,120px)] font-bold leading-none tracking-[-3px] max-md:tracking-[-1px]"
          style={{
            opacity: contactVis ? 1 : 0,
            transform: contactVis ? "translateY(0)" : "translateY(50px)",
            transition: "all 0.8s cubic-bezier(.19,1,.22,1) 0.2s",
          }}
        >
          LET&apos;S <span className="text-[#c9f31d]">TALK</span>
        </div>
        <div
          className="flex flex-wrap justify-center gap-10"
          style={{ opacity: contactVis ? 1 : 0, transition: "all 0.6s 0.5s" }}
        >
          <a
            href="mailto:muhammadhahzem1422@gmail.com"
            className="relative pb-1 text-sm uppercase tracking-[2px] text-[#666] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[#f0ece2] hover:after:w-full"
            onMouseEnter={() => setCursor("mail")}
            onMouseLeave={resetCursor}
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/ahzem"
            target="_blank"
            rel="noreferrer"
            className="relative pb-1 text-sm uppercase tracking-[2px] text-[#666] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[#f0ece2] hover:after:w-full"
            onMouseEnter={() => setCursor("open")}
            onMouseLeave={resetCursor}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ahzem"
            target="_blank"
            rel="noreferrer"
            className="relative pb-1 text-sm uppercase tracking-[2px] text-[#666] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[#f0ece2] hover:after:w-full"
            onMouseEnter={() => setCursor("open")}
            onMouseLeave={resetCursor}
          >
            GitHub
          </a>
          <a
            href="tel:+94781769199"
            className="relative pb-1 text-sm uppercase tracking-[2px] text-[#666] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#c9f31d] after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-[#f0ece2] hover:after:w-full"
            onMouseEnter={() => setCursor("call")}
            onMouseLeave={resetCursor}
          >
            +94 78 176 9199
          </a>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] px-[clamp(24px,5vw,80px)] py-10 text-center md:flex-row md:text-left">
        <span className="text-xs tracking-wide text-[#333]">
          © 2026 MUHAMMADH AHZEM
        </span>
        <span className="text-xs tracking-wide text-[#333]">
          DESIGNED & BUILT BY AHZEM
        </span>
      </footer>
    </>
  );
}
