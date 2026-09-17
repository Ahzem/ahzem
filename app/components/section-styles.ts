/** Shared typography classes for section labels / headings */
export const heroNameClass =
  "text-[clamp(36px,10.5vw,50px)] max-md:tracking-[-1.5px] md:text-[clamp(64px,7.5vw,110px)] xl:text-[clamp(92px,6.8vw,118px)] min-[1600px]:text-[clamp(120px,7.3vw,140px)] font-bold tracking-[-3px] min-[1600px]:tracking-[-4px] leading-[0.92] md:leading-[0.95]";

export const aboutLabelClass =
  "mb-4 text-[11px] font-medium uppercase tracking-[4px] text-[var(--accent)]";

export const aboutHeadingClass =
  "mb-8 text-[clamp(36px,5vw,64px)] font-bold tracking-[-2px] leading-[1.1] text-[var(--foreground)]";

/** Makes children unselectable — use on sections with drag/physics backgrounds */
export const unselectableClass = "select-none [-webkit-user-select:none]";
