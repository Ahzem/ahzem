"use client";

type CustomCursorProps = {
  x: number;
  y: number;
  label: string;
  scale: number;
};

export default function CustomCursor({
  x,
  y,
  label,
  scale,
}: CustomCursorProps) {
  return (
    <div
      className="pointer-events-none fixed z-[9999] flex items-center justify-center mix-blend-difference transition-[width,height,background-color] duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] max-md:!hidden"
      style={{
        left: x,
        top: y,
        width: scale === 1 ? 12 : 80,
        height: scale === 1 ? 12 : 80,
        borderRadius: "50%",
        background: label ? "#c9f31d" : "#f0ece2",
        transform: "translate(-50%,-50%)",
      }}
    >
      <span
        className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-[#0c0c0c] transition-opacity duration-300 ${
          label ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
