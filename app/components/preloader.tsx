"use client";

type PreloaderProps = {
  loaded: boolean;
};

export default function Preloader({ loaded }: PreloaderProps) {
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0c0c0c] transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
      style={{ clipPath: loaded ? "inset(0 0 100% 0)" : "inset(0 0 0 0)" }}
    >
      <span className="text-sm font-light uppercase tracking-[6px] text-[#555]">
        Loading
      </span>
    </div>
  );
}
