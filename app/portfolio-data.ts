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
  /** Logical media key (e.g. `projects/osdem-dfec.webp`) or full `https://` URL — resolved by `buildMediaUrl`. */
  image: string;
};

export type ExperienceRole = {
  period: string;
  role: string;
  desc: string;
};

export type Experience = {
  company: string;
  /** Logical media key — resolved by `buildMediaUrl` (e.g. `company-logos/efito` + folder env → Cloudinary). */
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
    image: "osdem-dfec-webapp.webp",
  },
  {
    num: "02",
    title: "INPRINT TPS",
    sub: "E-Commerce Platform",
    desc: "Production e-commerce for a Qatar-based promotional products company. Enterprise-grade security, SEO optimized, indexed on Google & Bing.",
    tech: "React 19 · TypeScript · Node.js · MongoDB · AWS",
    link: "https://inprint-tps.com",
    color: "#818cf8",
    image: "inprint.webp",
  },
  {
    num: "03",
    title: "SEYONI",
    sub: "Marketplace Mobile App",
    desc: "Led a team of four building a Flutter marketplace with real-time tracking, payment solutions, and cross-platform deployment.",
    tech: "Flutter · Node.js · Express.js · MongoDB",
    link: null,
    color: "#f472b6",
    image: "seyoni.webp",
  },
  {
    num: "04",
    title: "GAVEL CLUB",
    sub: "Full-Stack Web Platform",
    desc: "Event calendar, blog, gallery, and a secure admin dashboard with JWT auth, CORS, and XSS protection — deployed on Azure.",
    tech: "React.js · Node.js · Azure · Cloudinary",
    link: null,
    color: "#06b6d4",
    image: "gavel.webp",
  },
  {
    num: "05",
    title: "LK PRAYER",
    sub: "Smartwatch Prayer Time App",
    desc: "Built a prayer time app for Zepp OS smartwatches featuring real-time countdowns, Hijri date, and custom vibration alerts. Data pipeline built with Python and a Node.js REST API.",
    tech: "JavaScript · Node.js · TypeScript · Python · Zepp OS",
    link: null,
    color: "#10b981",
    image: "lk-prayer.webp",
  },
  {
    num: "06",
    title: "CEYLONCHESTER",
    sub: "Business Showcase Webpage",
    desc: "Designed and developed a high-performing single-page business showcase. Delivered end-to-end branding, including logo and business card design, along with comprehensive technical SEO implementation.",
    tech: "Next.js · SEO · Graphic Design",
    link: "https://ceylonchester.netlify.app/",
    color: "#f97316",
    image: "chester.webp",
  },
  {
    num: "07",
    title: "BUSIFY",
    sub: "Public Transport Tracking & Booking",
    desc: "A comprehensive public transport management system where passengers can seamlessly book tickets, track real-time bus locations, and rate services. Built by a collaborative team at the University of Moratuwa.",
    tech: "PHP · SQL",
    link: null,
    color: "#3b82f6",
    image: "busify.webp",
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
    logo: "efito.webp",
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
    logo: "nolimit.webp",
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
    location: "Bandarawela, Sri Lanka",
    grade: "Pass",
    activities: [
      "Prefect (2017)",
      "Member of Students Parliament (2015–2017)",
    ],
    modules: ["English", "Tamil", "Mathematics", "Science", "History", "Religion", "Art", "Second Language (Sinhala)", "Health & Science"],
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
  /** Logical media key or full URL (resolved by `buildMediaUrl`). */
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
    logo: "aws-cc.webp",
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
    logo: "microsoft.webp",
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
    logo: "gavel-ndt.webp",
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
    logo: "itum-cs.webp",
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
    logo: "zero-plastic.webp",
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
    logo: "osdem-dfec-logo.webp",
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
    logo: "gen-alpha.webp",
    color: "#f472b6",
    size: "small",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  link?: string;
  /** Logical media key (e.g. `certifications/File.webp`) or full `https://` URL — resolved by `buildMediaUrl`. */
  image?: string;
};

/** Keys are Cloudinary public_id paths (encoded by `buildMediaUrl`). If your folder is named `certificates`, swap the prefix to `certificates/`. */
export const CERTIFICATIONS: Certification[] = [
  {
    name: "GitHub Foundations",
    issuer: "GitHub",
    date: "2024",
    link: "https://www.credly.com/go/aIhQdSVK",
    image: "GitHub_Foundations_-_GitHub.webp",
  },
  {
    name: "JavaScript Essential Training",
    issuer: "LinkedIn Learning",
    date: "2023",
    link: "https://www.linkedin.com/learning/certificates/286e332a59cede041e7c52542cb4529e4f9582ac0c65d1248f31b21db91b4614",
    image: "JavaScript_Essential_Training_-_LinkedIn.webp",
  },
  {
    name: "Introduction to Agentic AI",
    issuer: "LinkedIn Learning",
    date: "2023",
    link: "https://www.linkedin.com/learning/certificates/9da8b4f41c04dd2d1e30db7ec0392e8a2960a949dcc774239faec890addf875f",
    image:
      "Introduction_to_Agentic_AI_Getting_Started_with_AutoGen_Studio_-_LinkedIn.webp",
  },
  {
    name: "Postman Student Expert",
    issuer: "Postman",
    date: "2023",
    link: "https://api.badgr.io/public/assertions/zM_0cp_cQkitK2YJc654sw?identity__email=muhammadhahzem1422@gmail.com",
    image: "Postman_Student_Expert_-_Postman.webp",
  },
  {
    name: "Foundations of UX Design",
    issuer: "Google",
    date: "2023",
    link: "https://coursera.org/verify/J76UTYSRXEZA",
    image: "Foundations_of_User_Experience_UX_Design_-_Google.webp",
  },
  {
    name: "Build Wireframes & Prototypes",
    issuer: "Google",
    date: "2023",
    link: "https://icoursera.org/verify/9NUY77X7HYEQ",
    image: "Build_Wireframes_and_Low_Fidelity_Prototypes_-_Google.webp",
  },
  {
    name: "UX Design Process",
    issuer: "Google",
    date: "2023",
    link: "https://coursera.org/verify/U86NEH6QLLWW",
    image: "Start_the_UX_Design_Process_Empathize_Define_and_Ideate_-_Google.webp",
  },
  {
    name: "Get Started with Figma",
    issuer: "Coursera",
    date: "2023",
    link: "https://www.coursera.org/account/accomplishments/records/VWJB59H6ZFBL",
    image: "Get_Started_with_Figma_-_Coursera.webp",
  },
  {
    name: "Introduction to Python",
    issuer: "365 Data Science",
    date: "2023",
    link: "https://learn.365datascience.com/c/4b3b9d255f",
    image: "Introduction_to_Python_-_365_Data_Science.webp",
  },
  {
    name: "JavaScript Intermediate",
    issuer: "SoloLearn",
    date: "2023",
    link: "https://www.sololearn.com/certificates/CC-2FAQYFXS",
    image: "JavaScript_Intro_Intermediate_-_Sololearn.webp",
  },
  {
    name: "Java Intermediate",
    issuer: "Sololearn",
    date: "2023",
    link: "https://www.sololearn.com/certificates/CC-HIKNGOUD",
    image: "Java_Intro_Intermediate_-_Sololearn.webp",
  },
  {
    name: "C Programming Basics",
    issuer: "Udemy",
    date: "2023",
    link: "ude.my/UC-fb7a490d-2c5e-4279-a15e-8e6775dcad3c",
    image: "C_Programming_The_Basics_-_Udemy.webp",
  }
];

export type GalleryImage = {
  /** Logical media key or full `https://` URL — resolved by `buildMediaUrl` (Cloudinary when configured). */
  src: string;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "Efito_Award_Ceromoney_2025_-_2.webp" },
  { src: "Efito_Award_Ceromoney_2025_-_3.webp" },
  { src: "Efito_Award_Ceromoney_2025_-_4.webp" },
  { src: "Efito_Award_Ceromoney_2025_-_5.webp" },
  { src: "Efito_Award_Ceromoney_2025_Rising_Start_Award_Winning_Moment_-_1.webp" },
  { src: "KCD_Sri_Lanka_2025_-_1.webp" },
  { src: "KCD_Sri_Lanka_2025_-_2.webp" },
  { src: "KCD_Sri_Lanka_2025_-_3.webp" },
  { src: "KCD_Sri_Lanka_2025_-_4.webp" },
  { src: "KCD_Sri_Lanka_2025_-_5.webp" },
  { src: "Zoholics_2025_City_of_Dreams_-1.webp" },
  { src: "Zoholics_2025_City_of_Dreams_-2.webp" },
  { src: "Zoholics_2025_City_of_Dreams_-3.webp" },
  { src: "Zoholics_2025_City_of_Dreams_-4.webp" },
  { src: "Zoholics_2025_City_of_Dreams_-5.webp" },
  { src: "GDG_Devfest_2025_-_1.webp" },
  { src: "GDG_Devfest_2025_-_2.webp" },
  { src: "GDG_Devfest_2025_-_3.webp" },
  { src: "GDG_Devfest_2025_-_4.webp" },
  { src: "1st_day_at_university.webp" },
  { src: "Being_Beta_MLSA_Swags_Pack.webp" },
  { src: "Beyond_the_book_ZeroPlastic_2023_-_1.webp" },
  { src: "Beyond_the_book_ZeroPlastic_2023_-_2.webp" },
  { src: "Beyond_the_book_ZeroPlastic_2023_-_3.webp" },
  { src: "Beyond_the_book_ZeroPlastic_2024_-_1.webp" },
  { src: "Beyond_the_book_ZeroPlastic_2024_-_2.webp" },
  { src: "devfest_codelabs_2023_-_2.webp" },
  { src: "devfest_codelabs_2023_-_3.webp" },
  { src: "devfest_codelabs_2023_-_4.webp" },
  { src: "devfest_codelabs_2023_-_5.webp" },
  { src: "devfest_codelabs_2023_-1.webp" },
  { src: "DevFest_Main_Conference_2023_-_1.webp" },
  { src: "DevFest_Main_Conference_2023_-_2.webp" },
  { src: "DevFest_Main_Conference_2023_-_3.webp" },
  { src: "DevFest_Main_Conference_2023_-_4.webp" },
  { src: "DevFest_Main_Conference_2023_-_5.webp" },
  { src: "DevFest_Main_Conference_2023_-_6.webp" },
  { src: "Engineering_Excellence_ZeroPlastic_2024_-_1.webp" },
  { src: "Engineering_Excellence_ZeroPlastic_2024_-_2.webp" },
  { src: "Engineering_Excellence_ZeroPlastic_2024_-_3.webp" },
  { src: "Engineering_Excellence_ZeroPlastic_2024_-_4.webp" },
  { src: "Google_IO_Extended_2024_-_1.webp" },
  { src: "Google_IO_Extended_2024_-_2.webp" },
  { src: "Google_IO_Extended_2024_-_3.webp" },
  { src: "Google_IO_Extended_2024_-_4.webp" },
  { src: "Google_IO_Extended_2024_-_5.webp" },
  { src: "KCD_Sri_Lanka_2025_-_6.webp" },
  { src: "KCD_Sri_Lanka_2025_-_7.webp" },
  { src: "KCD_Sri_Lanka_2025_-_8.webp" },
  { src: "KCD_Sri_Lanka_2025_-_9.webp" },
  { src: "Microsoft_Build_After_Party_2024.webp" },
  { src: "Microsoft_Student_Champs_April_Meet_Up_2024_-_2.webp" },
  { src: "Microsoft_Student_Champs_April_Meet_Up_2024_-_3.webp" },
  { src: "Microsoft_Student_Champs_April_Meet_Up_2024_-1.webp" },
  { src: "Microsoft_Student_Champs_July_MeetUp_2024_-_1.webp" },
  { src: "Microsoft_Student_Champs_July_MeetUp_2024_-_2.webp" },
  { src: "Microsoft_Student_Champs_July_MeetUp_2024_-_3.webp" },
  { src: "Microsoft_Student_Champs_July_MeetUp_2024_-_4.webp" },
  { src: "Microsoft_Student_Champs_March_2024_-_1.webp" },
  { src: "Microsoft_Student_Champs_March_2024_-_2.webp" },
  { src: "Microsoft_Student_Champs_March_2024_-_3.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_1.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_10.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_2.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_3.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_4.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_5.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_6.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_7.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_8.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024_-_9.webp" },
  { src: "Microsoft_Student_Champs_October_MeetUp_2024.webp" },
  { src: "MLSA_Meetup_Microsoft_LK_2024_-_1.webp" },
  { src: "MLSA_Meetup_Microsoft_LK_2024_-_2.webp" },
  { src: "MLSA_Meetup_Microsoft_LK_2024_-_3.webp" },
  { src: "MLSA_Meetup_Microsoft_LK_2024_-_4.webp" },
  { src: "The_code_in_the_sand.webp" },
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
  /** Hover preview — logical media key for `buildMediaUrl` (same as projects). */
  image: string;
};

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Full-Stack Web Development",
    desc: "End-to-end web applications built with React, Next.js, Node.js, and NestJS — from architecture to deployment on AWS.",
    tags: ["React", "Next.js", "Node.js", "AWS"],
    icon: "code2",
    image: "osdem-dfec-webapp.webp",
  },
  {
    num: "02",
    title: "Mobile App Development",
    desc: "Cross-platform mobile applications using Flutter with native-grade performance, backend integration, and app store deployment.",
    tags: ["Flutter", "Dart", "REST APIs", "Firebase"],
    icon: "smartphone",
    image: "seyoni.webp",
  },
  {
    num: "03",
    title: "AI Automation & Agents",
    desc: "Intelligent workflow automation using AI agents, chatbots, and voice assistants — replacing manual processes with smart systems.",
    tags: ["CrewAI", "n8n", "VAPI", "Python"],
    icon: "bot",
    image: "inprint.webp",
  },
  {
    num: "04",
    title: "Business Website + SEO",
    desc: "Complete business web presence with custom design, on-page SEO, Google Analytics, Search Console, and search engine indexing.",
    tags: ["SEO", "GA4", "Performance", "Responsive"],
    icon: "globe",
    image: "chester.webp",
  },
  {
    num: "05",
    title: "Digital Solutions for Business",
    desc: "Custom software solutions to digitize operations — from institutional management systems to CRM integrations and data synchronization.",
    tags: ["SaaS", "CRM", "PostgreSQL", "Docker"],
    icon: "zap",
    image: "gavel.webp",
  },
  {
    num: "06",
    title: "Digital Marketing & Growth",
    desc: "Data-driven digital presence strategies including social media management, content optimization, and analytics-backed growth.",
    tags: ["Analytics", "Content", "Social", "Strategy"],
    icon: "trendingUp",
    image: "busify.webp",
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
    relation: "Lecturer",
    quote: "One of my most exceptional undergraduate students. He stood out distinctly with his commitment to excellence, self-motivation, and admirable attitude. A standout candidate who I am confident will excel in any opportunity.",
    highlight: "most exceptional",
    avatar: "MJ",
    color: "#c9f31d",
  },
  {
    name: "Dileepa Bandara",
    role: "Associate AI Engineer · Gold MSA (Alumni)",
    relation: "Mentor - MLSA",
    quote: "A good team member in the Microsoft Learn Student Ambassadors — Sri Lanka community. He contributed to organizing events like the MS Build After Party, bringing creative ideas and helping ensure everything ran smoothly.",
    highlight: "creative ideas",
    avatar: "DB",
    color: "#06b6d4",
  },
  {
    name: "Raveen Amarasinghe",
    role: "General Manager — Oculus International",
    relation: "Mentor - ZeroPlastic NDT",
    quote: "Ahzem handled social media tasks effectively and proved to be a valuable volunteer, bringing enthusiasm and dedication to his role. His work helped drive engagement and spread awareness about ZeroPlastic NDT's mission.",
    highlight: "valuable volunteer",
    avatar: "RA",
    color: "#f472b6",
  },
  {
    name: "Diluksha Perera",
    role: "Associate Data Engineer · GOLD MSA",
    relation: "Teammate - MLSA",
    quote: "Instrumental in our projects, often stepping up to take on key responsibilities with enthusiasm. His collaborative spirit and positive attitude have helped create an inspiring environment where everyone feels motivated.",
    highlight: "collaborative spirit",
    avatar: "DP",
    color: "#fb923c",
  },
];
