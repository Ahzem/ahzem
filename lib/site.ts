/**
 * Canonical site URL for metadata, sitemap, and JSON-LD.
 * Set `NEXT_PUBLIC_SITE_URL` in Netlify (e.g. `https://ahzem.dev`) — no trailing slash.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ahzem.dev";
  return raw.replace(/\/$/, "");
}

export const SITE_AUTHOR = "Muhammadh Ahzem" as const;

/** Default index title — template suffix is “| Muhammadh Ahzem” via layout metadata. */
export const SITE_TITLE_DEFAULT =
  "Muhammadh Ahzem | Software Engineer & Full-Stack Developer" as const;

/**
 * Primary meta description: clear facts for search + answer engines (AEO).
 * Keep under ~160 characters for SERP; extended detail lives in JSON-LD.
 */
export const SITE_DESCRIPTION =
  "Muhammadh Ahzem is a software engineer building full-stack web and mobile apps with Next.js, NestJS, Flutter, AWS, and AI integrations. Explore projects and contact." as const;
