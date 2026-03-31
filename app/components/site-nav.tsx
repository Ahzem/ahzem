"use client";

import { NAV_SECTIONS } from "../portfolio-data";
import { usePortfolioCursor } from "./portfolio-cursor-context";
import ThemeToggle from "./theme-toggle";

export default function SiteNav() {
  const { setCursor, resetCursor } = usePortfolioCursor();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
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

      <div className="flex items-center gap-4 md:gap-6">
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
      </div>
    </nav>
  );
}
