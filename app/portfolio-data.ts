export enum SectionId {
  About = "about",
  Experience = "experience",
  Projects = "projects",
  Skills = "skills",
  Contact = "contact",
  Certifications = "certifications",
}

export type Project = {
  num: string;
  title: string;
  sub: string;
  desc: string;
  tech: string;
  link: string | null;
  color: string;
};

export type ExperienceRole = {
  period: string;
  role: string;
  desc: string;
};

export type Experience = {
  company: string;
  logo?: string;
  period: string;
  roles: ExperienceRole[];
};

export const NAV_SECTIONS: SectionId[] = [
  SectionId.About,
  SectionId.Experience,
  SectionId.Projects,
  SectionId.Skills,
  SectionId.Contact,
];

export const PROJECTS: Project[] = [
  {
    num: "01",
    title: "OSDEM-DFEC",
    sub: "Institutional Management System",
    desc: "Full-stack platform with role-based access, CI/CD pipelines, Docker containers, and live analytics — all deployed on AWS.",
    tech: "Next.js · NestJS · PostgreSQL · AWS · Docker",
    link: "https://osdem-dfec.com",
    color: "#c9f31d",
  },
  {
    num: "02",
    title: "INPRINT TPS",
    sub: "E-Commerce Platform",
    desc: "Production e-commerce for a Qatar-based promotional products company. Enterprise-grade security, SEO optimized, indexed on Google & Bing.",
    tech: "React 19 · TypeScript · Node.js · MongoDB · AWS",
    link: "https://inprint-tps.com",
    color: "#818cf8",
  },
  {
    num: "03",
    title: "SEYONI",
    sub: "Marketplace Mobile App",
    desc: "Led a team of four building a Flutter marketplace with real-time tracking, payment solutions, and cross-platform deployment.",
    tech: "Flutter · Node.js · Express.js · MongoDB",
    link: null,
    color: "#f472b6",
  },
  {
    num: "04",
    title: "GAVEL CLUB",
    sub: "Full-Stack Web Platform",
    desc: "Event calendar, blog, gallery, and a secure admin dashboard with JWT auth, CORS, and XSS protection — deployed on Azure.",
    tech: "React.js · Node.js · Azure · Cloudinary",
    link: null,
    color: "#06b6d4",
  },
];

export const SKILLS_LEFT = [
  "React",
  "Next.js",
  "Flutter",
  "TypeScript",
  "Node.js",
  "NestJS",
];

export const SKILLS_RIGHT = [
  "AWS",
  "Docker",
  "MongoDB",
  "PostgreSQL",
  "Python",
  "FastAPI",
];

export const SKILLS_CENTER = [
  "CrewAI",
  "n8n",
  "VAPI",
  "Prisma",
  "TailwindCSS",
  "Git",
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Efito Solutions",
    period: "2025 — Present",
    logo: "/company-logos/efito.webp",
    roles: [
      {
        period: "2026 — Present",
        role: "Associate Software Engineer",
        desc: "Built the BuilderBid mobile app from scratch in Flutter. Integrated QuickBooks Online. Drove system performance and UI modernization."
      },
      {
        period: "2025 — 2026",
        role: "Software Engineering Trainee",
        desc: "Built AI agents and chatbots with Python, FastAPI, CrewAI, and n8n. Designed voice-based AI agents with VAPI for production apps."
      }
    ]
  },
  {
    company: "NOLIMIT Sri Lanka",
    period: "2021 — 2022",
    logo: "/company-logos/nolimit.webp",
    roles: [
      {
        period: "Dec 2021 — Dec 2022",
        role: "Cashier",
        desc: "Promoted to cashier in two months. Handled retail transactions and immersed in retail operations, gaining valuable insights into essential life aspects."
      },
      {
        period: "Nov 2021 — Dec 2021",
        role: "Salesperson",
        desc: "Trained in product knowledge and marketing strategies by the Learning and Development Department. Delivered dedicated customer service and product promotion."
      },
      {
        period: "Oct 2021 — Nov 2021",
        role: "Sales Trainee",
        desc: "Focused on honing fundamental customer service skills and providing excellent service to customers."
      }
    ]
  }
];

export const CERTIFICATIONS = [
  "GitHub Foundations",
  "JavaScript Essential Training",
  "Postman Student Expert",
  "Foundations of UX Design",
  "Build Wireframes & Prototypes",
  "UX Design Process",
  "Python, SQL, Java",
  "C Programming Basics",
];
