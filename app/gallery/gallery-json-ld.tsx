import { getSiteUrl, SITE_AUTHOR } from "@/lib/site";

const GALLERY_DESCRIPTION =
  "Photo gallery: tech events, conferences, community meetups, and milestones from Muhammadh Ahzem’s journey as a software engineer.";

export default function GalleryJsonLd() {
  const base = getSiteUrl();
  const url = `${base}/gallery`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}/#page`,
        url,
        name: `Gallery | ${SITE_AUTHOR}`,
        description: GALLERY_DESCRIPTION,
        inLanguage: "en-US",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
