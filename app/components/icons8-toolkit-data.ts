/**
 * Icons8 OMG-IMG CDN: https://img.icons8.com/{style}/{size}/{slug}.png
 * Free tier is PNG (max 512px). SVG is not available on the public CDN; export SVG
 * from the Icons8 app into /public/icons8/<key>.svg and set `localSvgKey` to use it.
 * License: https://icons8.com/license (backlink in footer).
 */

export type Icons8ToolkitEntry = {
  slug: string;
  /** Icons8 style name (e.g. color, fluency) */
  style: string;
  /** Pixel size on CDN (use 96 for sharp 48px CSS) */
  size: number;
  /** If set, `<img src={/public/icons8/${localSvgKey}.svg}>` is used when the file exists — handled in the component via optional override list */
  localSvgKey?: string;
};

export const ICONS8_TOOLKIT: Record<string, Icons8ToolkitEntry> = {
  React: { slug: "react-native", style: "color", size: 96, localSvgKey: "react" },
  "Next.js": { slug: "nextjs", style: "color", size: 96, localSvgKey: "nextjs" },
  Flutter: { slug: "flutter", style: "color", size: 96, localSvgKey: "flutter" },
  TypeScript: { slug: "typescript", style: "color", size: 96, localSvgKey: "typescript" },
  "Node.js": { slug: "nodejs", style: "color", size: 96, localSvgKey: "nodejs" },
  NestJS: { slug: "nestjs", style: "color", size: 96, localSvgKey: "nestjs" },
  CrewAI: { slug: "artificial-intelligence", style: "color", size: 96, localSvgKey: "crewai" },
  n8n: { slug: "workflow", style: "color", size: 96, localSvgKey: "n8n" },
  VAPI: { slug: "microphone", style: "color", size: 96, localSvgKey: "vapi" },
  Prisma: { slug: "prisma-orm", style: "color", size: 96, localSvgKey: "prisma" },
  TailwindCSS: { slug: "tailwindcss", style: "color", size: 96, localSvgKey: "tailwindcss" },
  Git: { slug: "git", style: "color", size: 96, localSvgKey: "git" },
  AWS: { slug: "amazon-web-services", style: "color", size: 96, localSvgKey: "aws" },
  Docker: { slug: "docker", style: "color", size: 96, localSvgKey: "docker" },
  MongoDB: { slug: "mongodb", style: "color", size: 96, localSvgKey: "mongodb" },
  PostgreSQL: { slug: "elephant", style: "color", size: 96, localSvgKey: "postgresql" },
  Python: { slug: "python", style: "color", size: 96, localSvgKey: "python" },
  FastAPI: { slug: "api", style: "color", size: 96, localSvgKey: "fastapi" },
};

export function icons8ToolkitPngUrl(entry: Icons8ToolkitEntry): string {
  return `https://img.icons8.com/${entry.style}/${entry.size}/${entry.slug}.png`;
}

export function icons8LocalSvgPath(localSvgKey: string): string {
  return `/icons8/${localSvgKey}.svg`;
}
