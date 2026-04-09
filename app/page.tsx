"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AboutSection from "./components/about-section";
import BuyMeCoffeeSection from "./components/buy-me-coffee-section";
import CertificationsSection from "./components/certifications-section";
import ContactSection from "./components/contact-section";
import EducationSection from "./components/education-section";
import VolunteerSection from "./components/volunteer-section";
import CustomCursor from "./components/custom-cursor";
import ExperienceSection from "./components/experience-section";
import GallerySection from "./components/gallery-section";
import GrainOverlay from "./components/grain-overlay";
import HeroSection from "./components/hero-section";
import MarqueeStrip from "./components/marquee-strip";
import {
  PortfolioCursorProvider,
  type PortfolioCursorApi,
} from "./components/portfolio-cursor-context";
import Preloader from "./components/preloader";
import ProjectsSection from "./components/projects-section";
import SectionDivider from "./components/section-divider";
import ServicesSection from "./components/services-section";
import SiteFooter from "./components/site-footer";
import SiteNav from "./components/site-nav";
import SkillsSection from "./components/skills-section";
import TestimonialsSection from "./components/testimonials-section";
import { useReveal } from "./hooks/use-reveal";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorScale, setCursorScale] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [introDone, setIntroDone] = useState(false);

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
    // Prevent the browser from restoring a previous scroll position on revisit
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

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

  const setCursor = useCallback((label: string, scale = 2.5) => {
    setCursorLabel(label);
    setCursorScale(scale);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorLabel("");
    setCursorScale(1);
  }, []);

  const onPreloaderHidden = useCallback(() => {
    setIntroDone(true);
  }, []);

  const cursorApi: PortfolioCursorApi = useMemo(
    () => ({ setCursor, resetCursor }),
    [setCursor, resetCursor],
  );

  return (
    <PortfolioCursorProvider value={cursorApi}>
      <GrainOverlay />

      <CustomCursor
        x={cursorPos.x}
        y={cursorPos.y}
        label={cursorLabel}
        scale={cursorScale}
      />

      <Preloader loaded={loaded} onHidden={onPreloaderHidden} />

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

      <GallerySection />

      <TestimonialsSection />

      <SectionDivider />

      <BuyMeCoffeeSection />

      <ContactSection sectionRef={contactRef} visible={contactVis} />

      <SiteFooter />
    </PortfolioCursorProvider>
  );
}
