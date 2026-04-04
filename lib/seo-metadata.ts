import type { Metadata } from "next";
import {
  getSiteUrl,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_TITLE_DEFAULT,
} from "./site";

/** Root layout metadata — Open Graph, Twitter, robots, canonical. */
export function buildRootMetadata(): Metadata {
  const base = getSiteUrl();

  return {
    metadataBase: new URL(base),
    title: {
      default: SITE_TITLE_DEFAULT,
      template: `%s | ${SITE_AUTHOR}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_AUTHOR,
    authors: [{ name: SITE_AUTHOR, url: base }],
    creator: SITE_AUTHOR,
    publisher: SITE_AUTHOR,
    keywords: [
      "Muhammadh Ahzem",
      "Ahzem",
      "software engineer",
      "full-stack developer",
      "web developer",
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Flutter",
      "AWS",
      "portfolio",
      "Sri Lanka",
    ],
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: base,
      languages: { "en-US": base },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: base,
      siteName: SITE_AUTHOR,
      title: SITE_TITLE_DEFAULT,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE_DEFAULT,
      description: SITE_DESCRIPTION,
      creator: "@_ahzem_",
    },
    manifest: "/favicon/site.webmanifest",
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          },
        }
      : {}),
  };
}
