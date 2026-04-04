export type MediaProvider = "local" | "cloudinary" | "cloudflare";

/** Options passed to CDN transforms (Cloudinary today; mapped later for Cloudflare). */
export type MediaTransformOptions = {
  width?: number;
  height?: number;
  /** 1–100, or omit for provider “auto” quality where supported */
  quality?: number;
  /** `auto` lets Cloudinary pick format; ignored for local */
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
};

export type MediaConfig = {
  provider: MediaProvider;
  /** Optional prefix for remote public IDs, e.g. `portfolio` → `portfolio/gallery/...` */
  assetFolder: string;
  cloudinaryCloudName: string;
  /** Base URL for Cloudflare (R2, Images, or custom CDN) — no trailing slash */
  cloudflareBaseUrl: string;
};
