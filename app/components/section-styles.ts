/** Shared typography classes for section labels / headings */
export const heroNameClass =
  "text-[clamp(48px,10vw,140px)] font-bold tracking-[-4px] max-md:tracking-[-2px] leading-[0.95]";

export const aboutLabelClass =
  "mb-4 text-[11px] font-medium uppercase tracking-[4px] text-[var(--accent)]";

export const aboutHeadingClass =
  "mb-8 text-[clamp(36px,5vw,64px)] font-bold tracking-[-2px] leading-[1.1] text-[var(--foreground)]";

/** Makes children unselectable — use on sections with drag/physics backgrounds */
export const unselectableClass = "select-none [-webkit-user-select:none]";
