export default function SiteFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t border-[var(--border-subtle)] px-[clamp(24px,5vw,80px)] py-10 text-center md:flex-row md:text-left">
      <span className="text-xs tracking-wide text-[var(--muted)]">
        © 2026 MUHAMMADH AHZEM
      </span>
      <span className="text-xs tracking-wide text-[var(--muted)]">
        DESIGNED & BUILT BY AHZEM
      </span>
    </footer>
  );
}
