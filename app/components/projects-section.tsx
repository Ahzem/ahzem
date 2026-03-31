"use client";

import type { KeyboardEvent, RefObject } from "react";
import { PROJECTS } from "../portfolio-data";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";

type ProjectsSectionProps = {
  hScrollRef: RefObject<HTMLElement | null>;
  hWrapRef: RefObject<HTMLDivElement | null>;
};

export default function ProjectsSection({
  hScrollRef,
  hWrapRef,
}: ProjectsSectionProps) {
  const { setCursor, resetCursor } = usePortfolioCursor();

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
      <section className="pt-20 pb-0">
        <div className="mb-10 px-[clamp(24px,5vw,80px)]">
          <div className={aboutLabelClass}>Selected Work</div>
          <div className={aboutHeadingClass}>
            Projects<span className="text-[var(--accent)]">.</span>
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
                  project.link
                    ? "cursor-none max-md:cursor-pointer"
                    : "cursor-default"
                }`}
                role={project.link ? "link" : undefined}
                tabIndex={project.link ? 0 : undefined}
                aria-label={project.link ? `Open ${project.title}` : undefined}
                onMouseEnter={() =>
                  setCursor(project.link ? "visit" : "view")
                }
                onMouseLeave={resetCursor}
                onClick={() => openProject(project.link)}
                onKeyDown={(event) =>
                  handleProjectKeyDown(event, project.link)
                }
              >
                <div
                  className="absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}18, ${project.color}08 40%, var(--background) 82%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-portfolio-mono font-black tracking-[-6px] text-[clamp(100px,15vw,180px)] text-[var(--foreground)] opacity-[0.06] dark:opacity-[0.04]">
                    {project.num}
                  </span>
                </div>
                <div className="relative z-[2] p-10">
                  <div className="mb-2 font-portfolio-mono text-xs text-[var(--muted)]">
                    {project.num}
                  </div>
                  <div className="mb-1 text-[clamp(28px,4vw,48px)] font-bold tracking-[-1px] text-[var(--foreground)]">
                    {project.title}
                  </div>
                  <div className="mb-4 text-sm font-light text-[var(--muted)]">
                    {project.sub}
                  </div>
                  <div className="mb-4 max-w-[400px] text-[13px] leading-[1.7] text-[var(--muted)]">
                    {project.desc}
                  </div>
                  <div className="font-portfolio-mono text-[11px] tracking-wide text-[var(--muted)] opacity-80">
                    {project.tech}
                  </div>
                  {project.link && (
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--accent)] transition-[gap] duration-300 group-hover:gap-3.5">
                      Visit Live ↗
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
