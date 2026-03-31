export enum SectionId {
  About = "about",
  Experience = "experience",
  Education = "education",
  Volunteer = "volunteer",
  Projects = "projects",
  Services = "services",
  Skills = "skills",
  Gallery = "gallery",
  Testimonials = "testimonials",
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
  SectionId.Education,
  SectionId.Volunteer,
  SectionId.Projects,
  SectionId.Services,
  SectionId.Skills,
  SectionId.Gallery,
  SectionId.Testimonials,
  SectionId.Contact,
];

export type ContactLinkItem = {
  label: string;
  href: string;
  /** Opens in new tab */
  external?: boolean;
  /** Suggested filename when downloading PDFs from /public */
  downloadAs?: string;
};

/** `contact-section.tsx` — buttons. Add `resume.pdf` and `cv.pdf` to `/public` for downloads. */
export const CONTACT_EMAIL = {
  label: "Email",
  href: "mailto:muhammadhahzem1422@gmail.com",
} as const;

export const CONTACT_DOWNLOADS: ContactLinkItem[] = [
  { label: "Resume", href: "/resume.pdf", downloadAs: "Ahzem-Resume.pdf" },
];

/** Text links (social + profiles) below primary actions */
export const CONTACT_SOCIAL_LINKS: ContactLinkItem[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/ahzem", external: true },
  { label: "GitHub", href: "https://github.com/ahzem", external: true },
  { label: "Facebook", href: "https://web.facebook.com/mfm.ahzem", external: true },
  { label: "Instagram", href: "https://www.instagram.com/_ahzem_/", external: true },
  { label: "Threads", href: "https://www.threads.net/@_ahzem_", external: true },
  { label: "X", href: "https://x.com/_ahzem_", external: true },
  { label: "Medium", href: "https://medium.com/@ahzem", external: true },
  { label: "Coffee", href: "https://coff.ee/ahzem", external: true },
];

export const PROJECTS: Project[] = [
  {
    num: "01",
    title: "OSDEM-DFEC",
    sub: "Institutional Management System",
    desc: "Full-stack platform with role-based access, CI/CD pipelines, Docker containers, and live analytics — all deployed on AWS.",
    tech: "Next.js · NestJS · PostgreSQL · AWS · Docker",
    link: "https://osdem-dfec-sc.org",
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
  {
    num: "05",
    title: "LK PRAYER",
    sub: "Smartwatch Prayer Time App",
    desc: "Built a prayer time app for Zepp OS smartwatches featuring real-time countdowns, Hijri date, and custom vibration alerts. Data pipeline built with Python and a Node.js REST API.",
    tech: "JavaScript · Node.js · TypeScript · Python · Zepp OS",
    link: null,
    color: "#10b981",
  },
  {
    num: "06",
    title: "CEYLONCHESTER",
    sub: "Business Showcase Webpage",
    desc: "Designed and developed a high-performing single-page business showcase. Delivered end-to-end branding, including logo and business card design, along with comprehensive technical SEO implementation.",
    tech: "Next.js · SEO · Graphic Design",
    link: "https://ceylonchester.netlify.app/",
    color: "#f97316",
  },
  {
    num: "07",
    title: "BUSIFY",
    sub: "Public Transport Tracking & Booking",
    desc: "A comprehensive public transport management system where passengers can seamlessly book tickets, track real-time bus locations, and rate services. Built by a collaborative team at the University of Moratuwa.",
    tech: "PHP · SQL",
    link: null,
    color: "#3b82f6",
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

export type EducationEntry = {
  id: number;
  year: string;
  endYear: string;
  institution: string;
  degree: string;
  field: string | null;
  location: string;
  grade: string | null;
  activities: string[] | null;
  modules: string[] | null;
  note: string | null;
  color: string;
};

export const EDUCATION: EducationEntry[] = [
  {
    id: 1,
    year: "2022",
    endYear: "2025",
    institution: "University of Moratuwa",
    degree: "National Diploma in Technology",
    field: "Information Technology",
    location: "Moratuwa, Sri Lanka",
    grade: null,
    activities: [
      "ITUM Computer Society",
      "ZeroPlastic NDT",
      "NDT Media Club",
      "Gavel Club NDT",
    ],
    modules: [
      "Software Development",
      "Web Technologies",
      "Database Management Systems",
      "Cloud Computing",
      "Machine Learning",
      "Operating Systems",
      "IoT",
      "Software Testing & QC",
      "Digital Marketing",
      "Mathematics & Statistics",
    ],
    note: "Programme includes four academic semesters and two semesters of industrial training.",
    color: "#c9f31d",
  },
  {
    id: 2,
    year: "2018",
    endYear: "2020",
    institution: "MR/Minhath National School",
    degree: "Advanced Level",
    field: "Physical Science",
    location: "Dikwella, Sri Lanka",
    grade: "Pass",
    activities: ["OSDEM-DFEC Science Project Collaboration"],
    modules: ["Combined Maths", "Physics", "Chemistry"],
    note: null,
    color: "#818cf8",
  },
  {
    id: 3,
    year: "2007",
    endYear: "2017",
    institution: "BD/Al-Yaseen Muslim Vidyalaya",
    degree: "Ordinary Level",
    field: null,
    location: "Sri Lanka",
    grade: "Pass",
    activities: [
      "Head Prefect (2017)",
      "Member of Students Parliament (2015–2017)",
    ],
    modules: null,
    note: null,
    color: "#06b6d4",
  },
];

export type VolunteerSize = "large" | "medium" | "small";

export type VolunteerEntry = {
  id: number;
  role: string;
  org: string;
  period: string;
  category: string;
  desc: string;
  /** Path under `/public`, e.g. `/clubs-logos/aws-cc.webp` */
  logo: string;
  color: string;
  size: VolunteerSize;
};

export const VOLUNTEER: VolunteerEntry[] = [
  {
    id: 1,
    role: "Vice President",
    org: "AWS Cloud Clubs — ITUM",
    period: "Apr 2025 — Present",
    category: "Science & Technology",
    desc: "Planning and executing marketing campaigns, managing social media, coordinating promotional content, and supporting community events such as AWS Student Community Day across Sri Lanka.",
    logo: "/clubs-logos/aws-cc.webp",
    color: "#FF9900",
    size: "large",
  },
  {
    id: 2,
    role: "Microsoft Student Ambassador",
    org: "Microsoft",
    period: "Jan 2024 — Jan 2026",
    category: "Science & Technology",
    desc: "Part of a global group of campus leaders helping fellow students create robust tech communities and develop technical and career skills for the future.",
    logo: "/clubs-logos/microsoft.webp",
    color: "#00A4EF",
    size: "medium",
  },
  {
    id: 3,
    role: "Webmaster",
    org: "Gavel Club of ITUM",
    period: "Mar 2024 — Apr 2025",
    category: "Science & Technology",
    desc: "Developed and managed the club's official website with event management, blog system, and secure hosting. Ensured a modern, user-friendly, and responsive platform.",
    logo: "/clubs-logos/gavel-ndt.webp",
    color: "#c9f31d",
    size: "medium",
  },
  {
    id: 4,
    role: "Publicity Director",
    org: "ITUM Computer Society",
    period: "May 2023 — Apr 2025",
    category: "Science & Technology",
    desc: "Dedicated to fostering a vibrant IT community on campus — organizing engaging events, facilitating collaboration, and promoting knowledge sharing and innovation.",
    logo: "/clubs-logos/itum-cs.webp",
    color: "#818cf8",
    size: "small",
  },
  {
    id: 5,
    role: "Director of Social Media",
    org: "ZeroPlastic NDT",
    period: "Aug 2023 — Apr 2025",
    category: "Environment",
    desc: "Working passionately towards reducing plastic waste and promoting environmental sustainability. Helped drive engagement and spread awareness about ZeroPlastic's mission.",
    logo: "/clubs-logos/zero-plastic.webp",
    color: "#22c55e",
    size: "large",
  },
  {
    id: 6,
    role: "Social Media Manager",
    org: "OSDEM-DFEC Science Project",
    period: "Ongoing",
    category: "Social Services",
    desc: "Volunteering time and skills to help provide free educational opportunities to students aspiring to become engineers and doctors through strategic social media campaigns.",
    logo: "/clubs-logos/osdem-dfec.webp",
    color: "#06b6d4",
    size: "small",
  },
  {
    id: 7,
    role: "Member",
    org: "Generation ALPHA",
    period: "Aug 2023 — Mar 2025",
    category: "Social Services",
    desc: "Committed to fostering innovation, personal growth, and collaboration within a dynamic community of learners and changemakers.",
    logo: "/clubs-logos/gen-alpha.webp",
    color: "#f472b6",
    size: "small",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  link?: string;
  image?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    name: "GitHub Foundations",
    issuer: "GitHub",
    date: "2024",
    link: "https://www.credly.com/go/aIhQdSVK",
    image: "https://images.credly.com/size/340x340/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png"
  },
  {
    name: "JavaScript Essential Training",
    issuer: "LinkedIn Learning",
    date: "2023",
    link: "https://www.linkedin.com/learning/certificates/286e332a59cede041e7c52542cb4529e4f9582ac0c65d1248f31b21db91b4614",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQH5elGnyGJ6Fw/feedshare-shrink_1280/feedshare-shrink_1280/0/1720404328766?e=1774978755&v=beta&t=qc_MCbHsHUH7ovW81vpdjpQEuhF-CI9N4bX3nbiyzVQ"
  },
  {
    name: "Postman Student Expert",
    issuer: "Postman",
    date: "2023",
    link: "https://api.badgr.io/public/assertions/zM_0cp_cQkitK2YJc654sw?identity__email=muhammadhahzem1422@gmail.com",
    image: "https://api.badgr.io/public/assertions/zM_0cp_cQkitK2YJc654sw/image"
  },
  {
    name: "Foundations of UX Design",
    issuer: "Google",
    date: "2023",
    link: "",
    image: ""
  },
  {
    name: "Build Wireframes & Prototypes",
    issuer: "Google",
    date: "2023",
    link: "",
    image: ""
  },
  {
    name: "UX Design Process",
    issuer: "Google",
    date: "2023",
    link: "",
    image: ""
  },
  {
    name: "Python, SQL, Java",
    issuer: "Provider",
    date: "2022",
    link: "",
    image: ""
  },
  {
    name: "C Programming Basics",
    issuer: "Provider",
    date: "2022",
    link: "",
    image: ""
  }
];

export type GalleryImage = {
  src: string;
  caption: string;
  col: 0 | 1 | 2;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", caption: "Tech Conference 2024", col: 0 },
  { src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80", caption: "Workshop Session", col: 1 },
  { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80", caption: "Hackathon Finals", col: 2 },
  { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80", caption: "Award Night", col: 0 },
  { src: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=600&q=80", caption: "Team Collaboration", col: 1 },
  { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80", caption: "Community Meetup", col: 2 },
  { src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&q=80", caption: "Pitching at Startup Event", col: 0 },
  { src: "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=600&q=80", caption: "Microsoft Ambassador Summit", col: 1 },
  { src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80", caption: "AWS Cloud Day 2025", col: 2 },
];

/** Lucide icon keys — rendered in `services-section.tsx` */
export type ServiceIconId =
  | "code2"
  | "smartphone"
  | "bot"
  | "globe"
  | "zap"
  | "trendingUp";

export type Service = {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  icon: ServiceIconId;
};

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Full-Stack Web Development",
    desc: "End-to-end web applications built with React, Next.js, Node.js, and NestJS — from architecture to deployment on AWS.",
    tags: ["React", "Next.js", "Node.js", "AWS"],
    icon: "code2",
  },
  {
    num: "02",
    title: "Mobile App Development",
    desc: "Cross-platform mobile applications using Flutter with native-grade performance, backend integration, and app store deployment.",
    tags: ["Flutter", "Dart", "REST APIs", "Firebase"],
    icon: "smartphone",
  },
  {
    num: "03",
    title: "AI Automation & Agents",
    desc: "Intelligent workflow automation using AI agents, chatbots, and voice assistants — replacing manual processes with smart systems.",
    tags: ["CrewAI", "n8n", "VAPI", "Python"],
    icon: "bot",
  },
  {
    num: "04",
    title: "Business Website + SEO",
    desc: "Complete business web presence with custom design, on-page SEO, Google Analytics, Search Console, and search engine indexing.",
    tags: ["SEO", "GA4", "Performance", "Responsive"],
    icon: "globe",
  },
  {
    num: "05",
    title: "Digital Solutions for Business",
    desc: "Custom software solutions to digitize operations — from institutional management systems to CRM integrations and data synchronization.",
    tags: ["SaaS", "CRM", "PostgreSQL", "Docker"],
    icon: "zap",
  },
  {
    num: "06",
    title: "Digital Marketing & Growth",
    desc: "Data-driven digital presence strategies including social media management, content optimization, and analytics-backed growth.",
    tags: ["Analytics", "Content", "Social", "Strategy"],
    icon: "trendingUp",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  relation: string;
  quote: string;
  highlight: string;
  avatar: string;
  color: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Waseema Beham",
    role: "Data Analyst · Muhammadh's Teacher",
    relation: "Teacher",
    quote: "An exceptionally talented student with a strong aptitude for learning. His growth has been remarkable — a competent IT student who consistently strives to excel with a unique ability to tackle challenges methodically.",
    highlight: "exceptionally talented",
    avatar: "WB",
    color: "#818cf8",
  },
  {
    name: "Mewan Jayathilake",
    role: "Lecturer — CS & Software Engineering, ITUM",
    relation: "Direct Manager",
    quote: "One of my most exceptional undergraduate students. He stood out distinctly with his commitment to excellence, self-motivation, and admirable attitude. A standout candidate who I am confident will excel in any opportunity.",
    highlight: "most exceptional",
    avatar: "MJ",
    color: "#c9f31d",
  },
  {
    name: "Dileepa Bandara",
    role: "Associate AI Engineer · Gold MSA (Alumni)",
    relation: "Teammate",
    quote: "A good team member in the Microsoft Learn Student Ambassadors — Sri Lanka community. He contributed to organizing events like the MS Build After Party, bringing creative ideas and helping ensure everything ran smoothly.",
    highlight: "creative ideas",
    avatar: "DB",
    color: "#06b6d4",
  },
  {
    name: "Raveen Amarasinghe",
    role: "General Manager — Oculus International",
    relation: "Mentor",
    quote: "Ahzem handled social media tasks effectively and proved to be a valuable volunteer, bringing enthusiasm and dedication to his role. His work helped drive engagement and spread awareness about ZeroPlastic NDT's mission.",
    highlight: "valuable volunteer",
    avatar: "RA",
    color: "#f472b6",
  },
  {
    name: "Diluksha Perera",
    role: "Associate Data Engineer · GOLD MSA",
    relation: "Teammate",
    quote: "Instrumental in our projects, often stepping up to take on key responsibilities with enthusiasm. His collaborative spirit and positive attitude have helped create an inspiring environment where everyone feels motivated.",
    highlight: "collaborative spirit",
    avatar: "DP",
    color: "#fb923c",
  },
];
