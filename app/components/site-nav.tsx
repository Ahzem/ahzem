"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { NAV_SECTIONS } from "../portfolio-data";
import { usePortfolioCursor } from "./portfolio-cursor-context";
import ThemeToggle from "./theme-toggle";

export default function SiteNav() {
  const { setCursor, resetCursor } = usePortfolioCursor();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const openMenu = useCallback(() => setMenuOpen(true), []);

  const onNavLink = useCallback(
    (id: string) => {
      scrollToSection(id);
      closeMenu();
    },
    [closeMenu],
  );

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const closeIfDesktop = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 flex items-center justify-between px-[clamp(20px,5vw,40px)] py-6 transition-[background-color,backdrop-filter,mix-blend-mode,z-index] duration-200 ${
          menuOpen
            ? "z-[210] bg-[var(--background)]/95 backdrop-blur-md mix-blend-normal md:z-[100] md:bg-transparent md:backdrop-blur-none md:mix-blend-difference"
            : "z-[100] mix-blend-difference"
        }`}
      >
        <button
          type="button"
          className="border-none bg-transparent p-0 font-inherit text-lg font-bold tracking-[-0.5px]"
          aria-label="Scroll to top"
          onMouseEnter={() => setCursor("home")}
          onMouseLeave={resetCursor}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            closeMenu();
          }}
        >
          AHZEM
        </button>

        <div className="flex items-center gap-3 md:gap-6">
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

          <ThemeToggle
            onHoverStart={() => setCursor("")}
            onHoverEnd={resetCursor}
          />

          <button
            type="button"
            className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors hover:border-[#c9f31d]/50 hover:text-[#c9f31d] md:hidden ${
              menuOpen
                ? "border-[var(--border-subtle)] text-[var(--foreground)]"
                : "border-white/15 text-[#f0ece2]"
            }`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
          >
            {menuOpen ? (
              <X className="size-5" strokeWidth={1.75} aria-hidden />
            ) : (
              <Menu className="size-5" strokeWidth={1.75} aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu (below fixed nav bar) */}
      {menuOpen && (
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[200] flex flex-col bg-[var(--background)] pt-[calc(env(safe-area-inset-top)+5.75rem)] pb-[max(env(safe-area-inset-bottom),1rem)] md:hidden"
        >
          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-[clamp(24px,6vw,48px)]">
            <ul className="flex flex-col gap-0 py-2">
              {NAV_SECTIONS.map((section) => (
                <li key={section}>
                  <button
                    type="button"
                    className="w-full border-b border-[var(--border-subtle)] py-5 text-left text-[clamp(18px,5vw,26px)] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] transition-colors hover:text-[#c9f31d]"
                    onClick={() => onNavLink(section)}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
