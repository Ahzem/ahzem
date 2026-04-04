"use client";

import Image, { type ImageProps } from "next/image";
import { buildMediaUrl, type MediaTransformOptions } from "@/lib/media";

export type MediaImageProps = Omit<ImageProps, "src"> & {
  src: string;
  /** CDN transforms (Cloudinary today; reserved for Cloudflare later). */
  media?: MediaTransformOptions;
};

/**
 * Same as `next/image`, but `src` is a logical media key, `/public` path, or absolute URL.
 * Resolved through {@link buildMediaUrl} based on `NEXT_PUBLIC_MEDIA_PROVIDER`.
 *
 * Pass `width`/`height` (or `fill`) plus `sizes` when appropriate — required by `next/image`
 * for remote delivery URLs. Use `media` for Cloudinary transform caps (`w_`, `h_`, etc.).
 * Variable-aspect masonry (e.g. gallery) should use `buildMediaUrl` + a plain `<img>` instead.
 *
 * Remote `https://` URLs default to `unoptimized` so the browser loads the CDN directly
 * (transforms are already in the URL). Override with `unoptimized={false}` to use the
 * Next.js image optimizer.
 */
export default function MediaImage({
  src,
  media,
  unoptimized,
  ...props
}: MediaImageProps) {
  const resolved = buildMediaUrl(src, media);
  const isRemote = /^https?:\/\//i.test(resolved);
  return (
    <Image src={resolved} unoptimized={unoptimized ?? isRemote} {...props} />
  );
}
