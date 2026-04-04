/**
 * Caption from a gallery media key or URL: drops the extension, then turns
 * filename underscores into spaces (Cloudinary-style keys use `_` instead of spaces).
 */
export function getGalleryCaption(src: string) {
  const file = decodeURIComponent(src.split("/").pop() ?? src);
  const base = file.replace(/\.[^.]+$/, "");
  return base.replace(/_+/g, " ").trim();
}
