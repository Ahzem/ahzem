"use client";

import { ExternalLink } from "lucide-react";
import type { KeyboardEvent, RefObject } from "react";
import { PROJECTS } from "../portfolio-data";
import MediaImage from "./media-image";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";
import { usePortfolioCursor } from "./portfolio-cursor-context";

const GITHUB_REPOS_URL = "https://github.com/repos";

const viewMoreCardClass =
  "group/viewmore flex min-h-[70vh] min-w-[clamp(340px,45vw,600px)] shrink-0 flex-col items-center justify-center gap-6 border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--foreground)_3%,var(--background))] px-10 transition-[border-color,transform] duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[0.97] hover:border-[var(--accent)] max-md:cursor-pointer";

const viewMoreBtnClass =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] px-8 py-3 text-sm font-medium uppercase tracking-[2px] text-[var(--foreground)] shadow-sm transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--selection-fg)] active:scale-[0.98]";

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
      <section className="px-[clamp(24px,5vw,80px)] pt-[140px] pb-0" id="projects">
        <div className="mb-10">
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
                className={`group relative flex min-h-[70vh] min-w-[clamp(340px,45vw,600px)] flex-col justify-end overflow-hidden transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[0.97] ${
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
                <MediaImage
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  priority={project.num === "01"}
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background: `linear-gradient(to top, var(--background) 0%, color-mix(in oklab, var(--background) 90%, transparent) 38%, transparent 68%), linear-gradient(135deg, ${project.color}45 0%, transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%)`,
                  }}
                />

                <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center">
                  <span className="font-portfolio-mono font-black tracking-[-6px] text-[clamp(100px,15vw,180px)] text-[var(--foreground)] opacity-[0.08] dark:opacity-[0.06]">
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
            <a
              href={GITHUB_REPOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={viewMoreCardClass}
              aria-label="View more projects on GitHub (opens in new tab)"
              onMouseEnter={() => setCursor("visit")}
              onMouseLeave={resetCursor}
            >
              <span className="font-portfolio-mono text-xs uppercase tracking-[3px] text-[var(--muted)]">
                Repository
              </span>
              <p className="max-w-[280px] text-center text-[clamp(22px,3vw,32px)] font-bold leading-tight tracking-[-0.5px] text-[var(--foreground)]">
                More on <span className="text-[var(--accent)]">GitHub</span>
              </p>
              <span className={viewMoreBtnClass}>
                <ExternalLink className="size-[18px] shrink-0" aria-hidden />
                View more
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
