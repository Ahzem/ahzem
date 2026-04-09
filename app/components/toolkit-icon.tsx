"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ICONS8_TOOLKIT,
  icons8LocalSvgPath,
  icons8ToolkitPngUrl,
  type Icons8ToolkitEntry,
} from "./icons8-toolkit-data";

type ToolkitIconProps = {
  skill: string;
  className?: string;
  size?: number;
};

const TRY_LOCAL_ICONS8_SVG =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_ICONS8_LOCAL_SVG === "1";

export default function ToolkitIcon({
  skill,
  className,
  size = 48,
}: ToolkitIconProps) {
  const entry: Icons8ToolkitEntry | undefined = ICONS8_TOOLKIT[skill];
  const [useCdnPng, setUseCdnPng] = useState(false);

  if (!entry) {
    return (
      <span
        className={`flex items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[10px] text-[var(--muted)] ${className ?? ""}`}
        style={{ width: size, height: size }}
      >
        ?
      </span>
    );
  }

  const localSvg = entry.localSvgKey ? icons8LocalSvgPath(entry.localSvgKey) : null;
  const png = icons8ToolkitPngUrl(entry);
  const showSvg = TRY_LOCAL_ICONS8_SVG && localSvg && !useCdnPng;

  if (showSvg) {
    return (
      <span
        className={`relative block shrink-0 ${className ?? ""}`}
        style={{ width: size, height: size }}
      >
        <img
          src={localSvg}
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-contain opacity-90 transition-[filter,opacity,transform] duration-300 group-hover:opacity-100 dark:brightness-[0.95] dark:group-hover:brightness-110"
          onError={() => setUseCdnPng(true)}
        />
      </span>
    );
  }

  return (
    <Image
      src={png}
      alt=""
      width={size}
      height={size}
      className={`object-contain opacity-90 transition-[filter,opacity,transform] duration-300 group-hover:opacity-100 dark:brightness-[0.95] dark:group-hover:brightness-110 ${className ?? ""}`}
      style={{ width: size, height: size }}
      unoptimized
    />
  );
}
