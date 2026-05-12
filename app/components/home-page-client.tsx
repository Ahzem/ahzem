"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AboutSection from "./about-section";
import BuyMeCoffeeSection from "./buy-me-coffee-section";
import CertificationsSection from "./certifications-section";
import ContactSection from "./contact-section";
import EducationSection from "./education-section";
import VolunteerSection from "./volunteer-section";
import ExperienceSection from "./experience-section";
import HeroSection from "./hero-section";
import HolopinSection from "./holopin-section";
import MarqueeStrip from "./marquee-strip";
import {
  PortfolioCursorProvider,
  type PortfolioCursorApi,
} from "./portfolio-cursor-context";
import Preloader from "./preloader";
import ProjectsSection from "./projects-section";
import SectionDivider from "./section-divider";
import ServicesSection from "./services-section";
import SiteFooter from "./site-footer";
import SiteNav from "./site-nav";
import SkillsSection from "./skills-section";
import { useReveal } from "../hooks/use-reveal";

const GrainOverlay = dynamic(() => import("./grain-overlay"), { ssr: false });
const CustomCursor = dynamic(() => import("./custom-cursor"), { ssr: false });
const GallerySection = dynamic(() => import("./gallery-section"));
const TestimonialsSection = dynamic(() => import("./testimonials-section"));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

export default function HomePageClient() {
  const detectSupportsHeavyFx = () => {
    if (typeof window === "undefined") return true;
    return (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(pointer: fine)").matches
    );
  };

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorScale, setCursorScale] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [introDoneState, setIntroDoneState] = useState(false);
  const [supportsHeavyFx, setSupportsHeavyFx] = useState(detectSupportsHeavyFx);
  const [deferSecondarySections, setDeferSecondarySections] = useState(false);

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
  const [holopinRef, holopinVis] = useReveal<HTMLElement>(0.1);
  const [contactRef, contactVis] = useReveal<HTMLElement>(0.1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const sync = () => setSupportsHeavyFx(!reduced.matches && finePointer.matches);
    sync();
    reduced.addEventListener("change", sync);
    finePointer.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const timer = window.setTimeout(() => setLoaded(true), supportsHeavyFx ? 280 : 50);
    return () => window.clearTimeout(timer);
  }, [supportsHeavyFx]);

  useEffect(() => {
    if (!supportsHeavyFx) return;
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
  }, [supportsHeavyFx]);

  useEffect(() => {
    const section = hScrollRef.current;
    const wrap = hWrapRef.current;
    if (!section || !wrap) return;

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        const progress = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
        const maxTx = Math.max(wrap.scrollWidth - window.innerWidth, 0);
        wrap.style.transform = `translateX(${-progress * maxTx}px)`;
        rafId = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setDeferSecondarySections(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  const setCursor = useCallback((label: string, scale = 2.5) => {
    setCursorLabel(label);
    setCursorScale(scale);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorLabel("");
    setCursorScale(1);
  }, []);

  const onPreloaderHidden = useCallback(() => {
    setIntroDoneState(true);
  }, []);

  const introDone = !supportsHeavyFx || introDoneState;

  const cursorApi: PortfolioCursorApi = useMemo(
    () => ({ setCursor, resetCursor }),
    [setCursor, resetCursor],
  );

  return (
    <PortfolioCursorProvider value={cursorApi}>
      {supportsHeavyFx && <GrainOverlay />}

      {supportsHeavyFx && (
        <CustomCursor
          x={cursorPos.x}
          y={cursorPos.y}
          label={cursorLabel}
          scale={cursorScale}
        />
      )}

      {supportsHeavyFx && <Preloader loaded={loaded} onHidden={onPreloaderHidden} />}

      <SiteNav />

      <HeroSection sectionRef={heroRef} visible={heroVis} introDone={introDone} />

      <MarqueeStrip />

      <AboutSection sectionRef={aboutRef} visible={aboutVis} />

      <SectionDivider />

      <ExperienceSection sectionRef={expRef} visible={expVis} />

      <SectionDivider />

      <EducationSection />

      <SectionDivider />

      <VolunteerSection />

      <SectionDivider />

      <ProjectsSection hScrollRef={hScrollRef} hWrapRef={hWrapRef} />

      <ServicesSection />

      <SectionDivider />

      <SkillsSection sectionRef={skillRef} visible={skillVis} />

      <SectionDivider />

      <CertificationsSection sectionRef={certRef} visible={certVis} />

      <SectionDivider />

      <HolopinSection sectionRef={holopinRef} visible={holopinVis} />

      <SectionDivider />

      {deferSecondarySections && <GallerySection />}

      {deferSecondarySections && <TestimonialsSection />}

      <SectionDivider />

      <BuyMeCoffeeSection />

      <ContactSection sectionRef={contactRef} visible={contactVis} />

      <SiteFooter />
    </PortfolioCursorProvider>
  );
}
