"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const DURATION = 0.25;
const STAGGER = 0.025;

type FlipHoverTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Fade in when true (e.g. after preloader). */
  visible?: boolean;
  /** Seconds before opacity reveal starts. */
  revealDelay?: number;
};

/**
 * Per-letter vertical flip on hover (no link). Based on staggered dual-layer motion spans.
 */
export function FlipHoverText({
  text,
  className = "",
  style,
  visible = true,
  revealDelay = 0,
}: FlipHoverTextProps) {
  const chars = Array.from(text);

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative block cursor-default overflow-hidden whitespace-nowrap ${className}`}
      style={{ lineHeight: 0.82, ...style }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{
        duration: 0.55,
        delay: revealDelay,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <div>
        {chars.map((l, i) => (
          <motion.span
            key={`flip-a-${i}-${l}`}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block [color:inherit] [-webkit-text-fill-color:inherit] [-webkit-text-stroke:inherit]"
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      <div
        className="absolute inset-0 [color:inherit] [-webkit-text-fill-color:inherit] [-webkit-text-stroke:inherit]"
        aria-hidden
      >
        {chars.map((l, i) => (
          <motion.span
            key={`flip-b-${i}-${l}`}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block [color:inherit] [-webkit-text-fill-color:inherit] [-webkit-text-stroke:inherit]"
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
