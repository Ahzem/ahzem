"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

export default function ThemeToggle({
  onHoverStart,
  onHoverEnd,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-10 w-10 shrink-0 border border-white/10 bg-transparent md:h-9 md:w-9"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-[#f0ece2] transition-colors duration-300 hover:border-[#c9f31d]/50 hover:text-[#c9f31d] md:h-9 md:w-9"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <Sun className="size-5 md:size-[18px]" strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon className="size-5 md:size-[18px]" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
