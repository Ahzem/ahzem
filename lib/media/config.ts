import type { MediaConfig, MediaProvider } from "./types";

function parseProvider(value: string | undefined): MediaProvider {
  if (value === "cloudinary" || value === "cloudflare" || value === "local") {
    return value;
  }
  return "local";
}

/**
 * Read once per process. Uses NEXT_PUBLIC_* so the same values run on server and client.
 *
 * Env:
 * - NEXT_PUBLIC_MEDIA_PROVIDER — `local` | `cloudinary` | `cloudflare` (default: local)
 * - NEXT_PUBLIC_MEDIA_ASSET_FOLDER — optional prefix **only** if it is part of the real
 *   Cloudinary public_id (check the path after `/upload/` in the asset’s delivery URL).
 *   A folder shown only in the Media Library UI is not always in the public_id — if you
 *   get `Resource not found`, leave this empty or paste the full URL via per-asset envs.
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME — required when provider is cloudinary
 * - NEXT_PUBLIC_CLOUDFLARE_MEDIA_BASE_URL — required when provider is cloudflare
 *
 * Experience logos (optional overrides — paste full `https://res.cloudinary.com/...` URL):
 * - NEXT_PUBLIC_EXPERIENCE_LOGO_EFITO
 * - NEXT_PUBLIC_EXPERIENCE_LOGO_NOLIMIT
 */
export function getMediaConfig(): MediaConfig {
  return {
    provider: parseProvider(process.env.NEXT_PUBLIC_MEDIA_PROVIDER),
    assetFolder: (process.env.NEXT_PUBLIC_MEDIA_ASSET_FOLDER ?? "").replace(/^\/+|\/+$/g, ""),
    cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
    cloudflareBaseUrl: (process.env.NEXT_PUBLIC_CLOUDFLARE_MEDIA_BASE_URL ?? "").replace(
      /\/+$/,
      "",
    ),
  };
}
