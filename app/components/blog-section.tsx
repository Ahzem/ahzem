"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useReveal } from "../hooks/use-reveal";
import { BLOG_POSTS, type BlogPost } from "../portfolio-data";
import { usePortfolioCursor } from "./portfolio-cursor-context";
import { aboutHeadingClass, aboutLabelClass } from "./section-styles";

type BlogRowProps = {
  blog: BlogPost;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
  onHoverStart: (e: MouseEvent<HTMLAnchorElement>, index: number) => void;
};

/* ─── BLOG ROW ─── */
const BlogRow = ({
  blog,
  index,
  hovered,
  setHovered,
  onHoverStart,
}: BlogRowProps) => {
  const [ref, vis] = useReveal<HTMLAnchorElement>(0.15);
  const isActive = hovered === index;
  const isDimmed = hovered !== null && hovered !== index;

  return (
    <a
      ref={ref}
      href={blog.link}
      target="_blank"
      rel="noopener noreferrer"
      className="blog-row relative flex cursor-pointer items-start gap-[clamp(20px,4vw,60px)] border-b border-[var(--border-subtle)] py-8 transition-all duration-500"
      onMouseEnter={(e) => onHoverStart(e, index)}
      onMouseLeave={() => setHovered(null)}
      style={{
        opacity: vis ? (isDimmed ? 0.35 : 1) : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.5s cubic-bezier(.19,1,.22,1), transform 0.7s cubic-bezier(.19,1,.22,1) ${index * 0.06}s`,
        filter: isDimmed ? "blur(1px)" : "blur(0)",
      }}
    >
      {/* index number */}
      <div
        className="blog-index min-w-[32px] shrink-0 pt-1 font-portfolio-mono text-sm font-medium transition-colors duration-400"
        style={{
          color: isActive ? "var(--accent)" : "var(--counter-idle-stroke, #333)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* content */}
      <div className="blog-content min-w-0 flex-1">
        <div className="blog-tag-row mb-2.5 flex flex-wrap items-center gap-3.5">
          <span
            className="blog-tag rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.5px] transition-all duration-400"
            style={{
              borderColor: isActive
                ? "var(--accent)"
                : "var(--border-subtle)",
              color: isActive ? "var(--accent)" : "var(--muted)",
            }}
          >
            {blog.tag}
          </span>
          {blog.title.toLowerCase().includes("gem") && (
            <span
              className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.5px] text-[var(--accent)]"
              title="The thesis behind Ishq Gems"
            >
              Thesis behind Ishq Gems
            </span>
          )}
          <span className="blog-meta font-portfolio-mono text-xs tracking-[0.5px] text-[var(--muted)]">
            {blog.date} · {blog.readTime} read
          </span>
        </div>
        <h3
          className="blog-title text-[clamp(20px,3vw,30px)] font-bold leading-[1.25] tracking-[-0.5px] transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] max-md:!text-[var(--foreground)]"
          style={{
            color: isActive ? "var(--foreground)" : "var(--muted)",
            transform: isActive ? "translateX(12px)" : "translateX(0)",
          }}
        >
          {blog.title}
        </h3>
        <p
          className="blog-excerpt overflow-hidden text-sm font-light leading-[1.7] text-[var(--muted)] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] max-md:!mt-2 max-md:!max-h-none max-md:!opacity-100"
          style={{
            maxHeight: isActive ? "60px" : "0",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(12px)" : "translateX(0)",
            marginTop: isActive ? "8px" : "0",
          }}
        >
          {blog.excerpt}
        </p>
      </div>

      {/* arrow */}
      <div
        className="blog-arrow shrink-0 pt-2 text-2xl font-light text-[var(--accent)] transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] max-md:!rotate-[-45deg] max-md:!opacity-100"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive
            ? "translate(0,0) rotate(-45deg)"
            : "translate(-12px,12px) rotate(-45deg)",
        }}
        aria-hidden
      >
        →
      </div>

      {/* bottom line */}
      <div
        className="blog-line absolute -bottom-px inset-x-0 h-px bg-[var(--accent)] origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          transform: isActive ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </a>
  );
};

/* ─── FLOATING IMAGE PREVIEW (follows cursor) ─── */
type FloatingPreviewProps = {
  blog: BlogPost | null;
  mousePos: { x: number; y: number };
  visible: boolean;
};

const FloatingPreview = ({ blog, mousePos, visible }: FloatingPreviewProps) => {
  if (!blog) return null;
  return (
    <div
      className="blog-preview pointer-events-none fixed z-[9999] h-[186px] w-[280px] overflow-hidden rounded-lg border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] max-md:hidden"
      style={{
        left: mousePos.x,
        top: mousePos.y,
        opacity: visible ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.8}) rotate(${
          visible ? -3 : 0
        }deg)`,
      }}
    >
      <img
        src={blog.img}
        alt={blog.title}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="blog-preview-shine absolute inset-0 bg-gradient-to-br from-[rgba(201,243,29,0.15)] to-transparent" />
    </div>
  );
};

/* ─── MAIN SECTION ─── */
export default function BlogSection() {
  const [secRef, secVis] = useReveal<HTMLElement>(0.03);
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { setCursor, resetCursor } = usePortfolioCursor();

  useEffect(() => {
    if (hovered !== null && BLOG_POSTS[hovered]) {
      setActiveBlog(BLOG_POSTS[hovered]);
    }
  }, [hovered]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleRowHoverStart = (
    e: MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setHovered(index);
    setActiveBlog(BLOG_POSTS[index] ?? null);
  };

  return (
    <section
      className="blog-section relative overflow-hidden px-[clamp(24px,5vw,80px)] pt-[140px] pb-[120px] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--border-subtle)] before:to-transparent"
      id="blog"
      ref={secRef}
      onMouseMove={handleMouseMove}
    >
      {/* header */}
      <div className="blog-header mb-[60px] flex flex-wrap items-end justify-between gap-6 max-md:flex-col max-md:items-start">
        <div>
          <div
            className={aboutLabelClass}
            style={{
              opacity: secVis ? 1 : 0,
              transform: secVis ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s 0.1s",
            }}
          >
            Writing
          </div>
          <div
            className={aboutHeadingClass}
            style={{
              opacity: secVis ? 1 : 0,
              transform: secVis ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s 0.2s",
            }}
          >
            From the
            <br />
            <span className="text-[var(--accent)]">blog</span>
          </div>
          <p
            className="blog-sub max-w-[420px] text-[15px] font-light leading-[1.7] text-[var(--muted)]"
            style={{
              opacity: secVis ? 1 : 0,
              transform: secVis ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s 0.4s",
            }}
          >
            Thoughts on development, cloud, AI, and the occasional debugging war
            story.
          </p>
        </div>

        <a
          href="https://medium.com/@ahzem"
          target="_blank"
          rel="noopener noreferrer"
          className="blog-medium-btn group inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] px-6 py-3 text-[13px] font-medium text-[var(--muted)] transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_8px_30px_rgba(201,243,29,0.15)]"
          style={{
            opacity: secVis ? 1 : 0,
            transform: secVis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s 0.5s",
          }}
          onMouseEnter={() => setCursor("visit")}
          onMouseLeave={resetCursor}
          aria-label="View all articles on Medium (opens in a new tab)"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
            className="transition-transform duration-400 group-hover:scale-110"
          >
            <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
          </svg>
          View all on Medium
          <span
            className="transition-transform duration-400 group-hover:translate-x-1"
            aria-hidden
          >
            ↗
          </span>
        </a>
      </div>

      {/* blog list */}
      <div className="blog-list border-t border-[var(--border-subtle)]">
        {BLOG_POSTS.map((blog, i) => (
          <BlogRow
            key={blog.link}
            blog={blog}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            onHoverStart={handleRowHoverStart}
          />
        ))}
      </div>

      {/* floating cursor preview */}
      <FloatingPreview
        blog={activeBlog}
        mousePos={mousePos}
        visible={hovered !== null}
      />
    </section>
  );
}
