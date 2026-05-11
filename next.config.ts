import type { NextConfig } from "next";

const cloudflareMediaHost = (() => {
  const raw = process.env.NEXT_PUBLIC_CLOUDFLARE_MEDIA_BASE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).hostname;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      ...(cloudflareMediaHost
        ? [
            {
              protocol: "https" as const,
              hostname: cloudflareMediaHost,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
