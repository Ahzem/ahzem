"use client";

type PreloaderProps = {
  loaded: boolean;
};

export default function Preloader({ loaded }: PreloaderProps) {
  return (
    <div
      className="fixed inset-0 z-[10100] flex items-center justify-center bg-[var(--background)] transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
      style={{ clipPath: loaded ? "inset(0 0 100% 0)" : "inset(0 0 0 0)" }}
      aria-hidden={loaded}
    >
      <span className="flex items-center gap-2 text-sm font-light uppercase tracking-[6px] text-[var(--muted)]">
        <span className="size-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
        Loading
      </span>
    </div>
  );
}
