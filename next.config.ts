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

  // Allow device sensor APIs (DeviceOrientation) for the footer physics effect.
  // Without this, browsers may silently block accelerometer/gyroscope access.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value: "accelerometer=(self), gyroscope=(self), magnetometer=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

