"use client";

import type { CSSProperties } from "react";

type SplitTextProps = {
  text: string;
  visible: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

export function SplitText({
  text,
  visible,
  delay = 0,
  className = "",
  style = {},
}: SplitTextProps) {
  return (
    <span className={`inline-block ${className}`} style={style}>
      {text.split("").map((ch, i) => (
        <span
          key={`${text}-${i}`}
          className="inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) rotateX(0)"
              : "translateY(100%) rotateX(-80deg)",
            transition: `all 0.6s cubic-bezier(.19,1,.22,1) ${delay + i * 0.03}s`,
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
