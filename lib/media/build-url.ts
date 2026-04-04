import { getMediaConfig } from "./config";
import type { MediaTransformOptions } from "./types";

/** Normalize app paths: `/gallery/x.webp` → `gallery/x.webp` */
function stripLeadingSlash(path: string): string {
  return path.replace(/^\/+/, "");
}

/** Encode each path segment for URLs (spaces, @, etc.) */
function encodePathSegments(path: string): string {
  return stripLeadingSlash(path)
    .split("/")
    .filter(Boolean)
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

function withFolder(folder: string, key: string): string {
  const k = stripLeadingSlash(key);
  if (!folder) return k;
  return `${folder}/${k}`;
}

/** Local `public/` paths: if the filename has no extension, assume `.webp` (matches Cloudinary keys without extension). */
function normalizeLocalPublicPath(trimmed: string): string {
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${stripLeadingSlash(trimmed)}`;
  const segments = withSlash.split("/").filter(Boolean);
  const last = segments[segments.length - 1] ?? "";
  if (/\.[a-z0-9]{2,8}$/i.test(last)) {
    return withSlash;
  }
  return `${withSlash}.webp`;
}

function buildCloudinaryTransformSegment(opts: MediaTransformOptions | undefined): string {
  if (!opts) return "f_auto,q_auto";

  const parts: string[] = [];
  if (opts.width != null) parts.push(`w_${Math.round(opts.width)}`);
  if (opts.height != null) parts.push(`h_${Math.round(opts.height)}`);
  if (opts.quality != null) {
    parts.push(`q_${Math.round(opts.quality)}`);
  } else {
    parts.push("q_auto");
  }
  if (opts.format && opts.format !== "auto") {
    parts.push(`f_${opts.format}`);
  } else {
    parts.push("f_auto");
  }
  return parts.join(",");
}

function isCloudinaryUploadUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl);
    return (
      url.hostname.endsWith("res.cloudinary.com") &&
      url.pathname.includes("/image/upload/")
    );
  } catch {
    return false;
  }
}

/**
 * Apply/replace transform segment on full Cloudinary delivery URLs.
 * Examples:
 * - .../image/upload/v123/foo.webp -> .../image/upload/w_128,h_128,q_auto,f_auto/v123/foo.webp
 * - .../image/upload/c_fill,w_80/v123/foo.webp -> .../image/upload/w_128,h_128,q_auto,f_auto/v123/foo.webp
 */
function withCloudinaryTransforms(rawUrl: string, transform?: MediaTransformOptions): string {
  if (!transform || !isCloudinaryUploadUrl(rawUrl)) return rawUrl;

  const url = new URL(rawUrl);
  const marker = "/image/upload/";
  const index = url.pathname.indexOf(marker);
  if (index < 0) return rawUrl;

  const transformSeg = buildCloudinaryTransformSegment(transform);
  const afterUpload = url.pathname.slice(index + marker.length);
  if (!afterUpload) return rawUrl;

  // Keep version/public id path, replacing only an existing transform segment if present.
  let remainder = afterUpload;
  const firstSlash = afterUpload.indexOf("/");
  const firstSeg = firstSlash >= 0 ? afterUpload.slice(0, firstSlash) : afterUpload;
  const looksLikeVersion = /^v\d+$/.test(firstSeg);

  if (!looksLikeVersion && firstSlash >= 0) {
    remainder = afterUpload.slice(firstSlash + 1);
  }

  url.pathname = `${url.pathname.slice(0, index + marker.length)}${transformSeg}/${remainder}`;
  return url.toString();
}

/**
 * Resolve a logical media key to a URL for the active provider.
 *
 * - **local**: same-origin paths; extension-less keys get `.webp` (e.g. `company-logos/efito` → `/company-logos/efito.webp`).
 * - **cloudinary**: builds `https://res.cloudinary.com/<cloud>/image/upload/<transform>/<public_id>`.
 * - **cloudflare**: builds `<NEXT_PUBLIC_CLOUDFLARE_MEDIA_BASE_URL>/<encoded path>`.
 */
export function buildMediaUrl(
  src: string,
  transform?: MediaTransformOptions,
): string {
  const trimmed = src.trim();
  if (!trimmed) return trimmed;

  if (/^https?:\/\//i.test(trimmed)) {
    return withCloudinaryTransforms(trimmed, transform);
  }

  const cfg = getMediaConfig();

  if (cfg.provider === "local") {
    return normalizeLocalPublicPath(trimmed);
  }

  if (cfg.provider === "cloudflare") {
    if (!cfg.cloudflareBaseUrl) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[media] NEXT_PUBLIC_CLOUDFLARE_MEDIA_BASE_URL is empty; falling back to local URL for:",
          trimmed,
        );
      }
      return normalizeLocalPublicPath(trimmed);
    }
    const path = encodePathSegments(withFolder(cfg.assetFolder, trimmed));
    return `${cfg.cloudflareBaseUrl}/${path}`;
  }

  if (cfg.provider === "cloudinary") {
    if (!cfg.cloudinaryCloudName) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[media] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is empty; falling back to local URL for:",
          trimmed,
        );
      }
      return normalizeLocalPublicPath(trimmed);
    }
    const publicId = encodePathSegments(withFolder(cfg.assetFolder, trimmed));
    const transformSeg = buildCloudinaryTransformSegment(transform);
    return `https://res.cloudinary.com/${cfg.cloudinaryCloudName}/image/upload/${transformSeg}/${publicId}`;
  }

  return normalizeLocalPublicPath(trimmed);
}
