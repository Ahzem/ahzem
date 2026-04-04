import {
  CONTACT_EMAIL,
  CONTACT_SOCIAL_LINKS,
  SKILLS_CENTER,
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from "../portfolio-data";
import {
  getSiteUrl,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_TITLE_DEFAULT,
} from "@/lib/site";

/** Structured data for search and answer engines (Person, WebSite, WebPage). */
export default function JsonLd() {
  const base = getSiteUrl();
  const sameAs = CONTACT_SOCIAL_LINKS.filter((l) => l.external).map((l) => l.href);
  const knowsAbout = [
    ...SKILLS_LEFT,
    ...SKILLS_RIGHT,
    ...SKILLS_CENTER,
  ];

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: SITE_AUTHOR,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": `${base}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${base}/#webpage`,
        url: base,
        name: SITE_TITLE_DEFAULT,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name: SITE_AUTHOR,
        url: base,
        email: CONTACT_EMAIL.href.replace(/^mailto:/i, ""),
        jobTitle: "Software Engineer",
        sameAs,
        knowsAbout,
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
