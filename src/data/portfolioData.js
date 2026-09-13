// src/data/portfolioData.js
import projectPharmaHub from "../assets/project_pharmahub.png";
import projectStyleThread from "../assets/project_stylethread.png";
import projectLandingPage from "../assets/project_landing_page.png";
import projectAiDashboard from "../assets/project_ai_dashboard.png";
import projectFitPulse from "../assets/project_fitpulse.jpg";
import projectNovaPay from "../assets/project_novapay.jpg";
import projectDiuRoutine from "../assets/project_diu_routine.jpg";
import projectDeenApp from "../assets/project_deen_app.jpg";
import profilePhoto from "../assets/profile_photo.png";
import shijanPias from "../assets/shijan_pias.jpg";

export const agencyInfo = {
  name: "Nexora Labs",
  shortName: "Nexora",
  title: "Software & Mobile App Agency",
  titles: [
    "Software Agency & Lab",
    "Mobile Apps (iOS & Android)",
    "React Native Specialists",
    "Full-Stack Web & Cloud Systems",
  ],
  tagline: "We engineer scalable software, mobile apps & enterprise platforms",
  bio: "Nexora Labs is a premier software agency specializing in cross-platform mobile apps for iOS and Android using React Native, enterprise web platforms, and scalable cloud architectures.",
  location: "Bangalore, India • Global Remote",
  email: "contact@nexoralabs.com",
  phone: "+91 98765 43210",
  available: true,
  cvUrl:
    "https://drive.google.com/file/d/1ColX-fSYNYeB536xxM0Ld3q3tZ8vhxkv/view?usp=sharing",
  avatar: profilePhoto,
};

// Backward-compatible alias
export const personalInfo = agencyInfo;

export const stats = [
  { number: 6, suffix: "+", label: "Years Experience" },
  { number: 80, suffix: "+", label: "Projects Delivered" },
  { number: 45, suffix: "+", label: "Happy Clients" },
  { number: 15, suffix: "+", label: "Awards & Recognitions" },
];

export const social = [
  { name: "GitHub", url: "https://github.com/Arun-DEV-prog", icon: "FiGithub" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/arunkumar-roy/", icon: "FiLinkedin" },
  { name: "Twitter", url: "https://twitter.com", icon: "FiTwitter" },
  { name: "Facebook", url: "https://www.facebook.com/arunkumar.roy.52090008/", icon: "FiFacebook" },
];

export const teamMembers = [
  {
    id: 1,
    name: "Arun Kumar",
    role: "Founder & Lead Architect",
    specialty: "Mobile & Full-Stack Architecture",
    bio: "Lead architect specializing in scalable distributed web systems, cross-platform React Native mobile architectures, and cloud ecosystems.",
    image: profilePhoto,
    skills: ["React Native", "iOS & Android", "React / Next.js", "Node.js", "System Design"],
    social: {
      github: "https://github.com/Arun-DEV-prog",
      linkedin: "https://www.linkedin.com/in/arunkumar-roy/",
      twitter: "https://twitter.com",
    },
  },
  {
    id: 2,
    name: "Shijan Pias",
    role: "Full-Stack Developer",
    specialty: "Full-Stack Web & Mobile Engineering",
    bio: "Passionate full-stack developer experienced in building modern high-performance web applications, responsive user interfaces, and robust backend APIs.",
    image: shijanPias,
    skills: ["React / Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    social: {
      github: "https://github.com",
      linkedin: "https://www.linkedin.com/in/shijan-pias/",
      twitter: "https://twitter.com",
    },
  },
];

export const skills = {
  mobile: [
    { name: "React Native (iOS & Android)", percent: 98 },
    { name: "Expo & Native Modules", percent: 95 },
    { name: "Reanimated & Gesture Handler", percent: 92 },
    { name: "App Store & Play Store Deployment", percent: 96 },
    { name: "Push Notifications & Offline Sync", percent: 90 },
  ],
  frontend: [
    { name: "React / Next.js", percent: 98 },
    { name: "TypeScript", percent: 94 },
    { name: "Tailwind CSS", percent: 96 },
    { name: "Framer Motion", percent: 90 },
    { name: "GSAP & WebGL", percent: 85 },
  ],
  backend: [
    { name: "Node.js / Express", percent: 92 },
    { name: "Python / FastAPI", percent: 80 },
    { name: "GraphQL & REST APIs", percent: 94 },
    { name: "Microservices & WebSockets", percent: 85 },
  ],
  database: [
    { name: "PostgreSQL & Prisma", percent: 88 },
    { name: "MongoDB", percent: 90 },
    { name: "Redis & Caching", percent: 78 },
    { name: "Firebase & Supabase", percent: 92 },
  ],
  tools: [
    { name: "Git / CI/CD Pipelines", percent: 96 },
    { name: "Xcode & Android Studio", percent: 94 },
    { name: "Figma UI/UX & Prototypes", percent: 92 },
    { name: "Docker & AWS Cloud", percent: 86 },
  ],
};

export const techStack = [
  { name: "React Native", icon: "TbBrandReactNative", color: "#61DAFB", highlighted: true },
  { name: "Android", icon: "FaAndroid", color: "#3DDC84", highlighted: true },
  { name: "iOS / Apple", icon: "FaApple", color: "#A2AAAD", highlighted: true },
  { name: "React / Next", icon: "FaReact", color: "#61DAFB" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "Node.js", icon: "FaNodeJs", color: "#68A063" },
  { name: "Tailwind", icon: "SiTailwindcss", color: "#06B6D4" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "Figma", icon: "FaFigma", color: "#F24E1E" },
  { name: "Git", icon: "FaGitAlt", color: "#F05032" },
  { name: "Python", icon: "FaPython", color: "#3776AB" },
  { name: "Docker", icon: "FaDocker", color: "#2496ED" },
];

export const education = [
  {
    id: 1,
    type: "education",
    period: "2022 - 2027",
    title: "Computer Science & Engineering Lab",
    organization: "GSTU Innovation Hub",
    description:
      "Core engineering excellence, distributed systems research, and advanced software architecture.",
    icon: "HiAcademicCap",
  },
  {
    id: 2,
    type: "education",
    period: "2024 - Present",
    title: "Advanced Full-Stack Agency Accreditation",
    organization: "Global Dev Standards & Tech Guild",
    description:
      "Comprehensive certification in modern cloud infrastructures, enterprise security, and scalable UI engineering.",
    icon: "HiAcademicCap",
  },
];

export const experience = [
  {
    id: 3,
    type: "experience",
    period: "2024 - Present",
    title: "Nexora Labs Agency",
    organization: "Global Client Solutions",
    description:
      "Delivering high-end digital products, SaaS platforms, and enterprise web solutions to international clients.",
    icon: "HiBriefcase",
  },
  {
    id: 4,
    type: "experience",
    period: "2023 - 2024",
    title: "Lead Digital Engineering",
    organization: "Creative Tech Ventures",
    description:
      "Designed and built high-conversion interfaces and SaaS tools serving 50k+ active daily users.",
    icon: "HiBriefcase",
  },
];

export const projects = [
  {
    id: 1,
    title: "PharmaHub — Multi-Vendor Pharmacy Platform",
    description:
      "Comprehensive multi-vendor online pharmacy marketplace with genuine medicine inventory, prescription processing, live express delivery tracking, and vendor dashboards.",
    category: "fullstack",
    tags: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase"],
    image: projectPharmaHub,
    liveUrl: "https://twelve1-assignment-ph.web.app/",
    githubUrl: "https://github.com/Arun-DEV-prog",
    year: "2025",
    role: "Full-Stack Architecture & UI",
    featured: true,
  },
  {
    id: 2,
    title: "StyleThread — Multi-Vendor T-Shirt Marketplace",
    description:
      "Modern e-commerce apparel platform featuring multi-vendor custom tee storefronts, interactive product customizer, dynamic cart flow, and secure payment processing.",
    category: "fullstack",
    tags: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Stripe API"],
    image: projectStyleThread,
    liveUrl: "https://t-shirt-project-fda13.web.app/",
    githubUrl: "https://github.com/Arun-DEV-prog",
    year: "2025",
    role: "Full-Stack Development & UX",
    featured: true,
  },
  {
    id: 3,
    title: "Restaurants Operating System",
    description:
      "Full-scale restaurant management SaaS platform featuring QR code ordering, real-time kitchen tracking, table reservation, and analytical business dashboards.",
    category: "fullstack",
    tags: [
      "Next.js",
      "GSAP",
      "Framer Motion",
      "Tailwind",
      "MongoDB",
      "Socket.IO",
    ],
    image: projectLandingPage,
    liveUrl: "https://saas-frontend-gules.vercel.app/",
    githubUrl: "https://github.com/Arun-DEV-prog/saas_restuarant_os",
    year: "2025",
    role: "Full-Stack Engineering & UX",
    featured: true,
  },
  {
    id: 4,
    title: "AI Analytics Dashboard",
    description:
      "Modern analytics platform with AI-powered predictive insights, dark mode, and real-time streaming data visualization.",
    category: "frontend",
    tags: ["React", "TypeScript", "Recharts", "TailwindCSS"],
    image: projectAiDashboard,
    liveUrl: "#",
    githubUrl: "#",
    year: "2024",
    role: "Lead Frontend Architecture",
    featured: false,
  },
  {
    id: 5,
    title: "FitPulse — AI Workout & Health Tracker App",
    description:
      "Smart fitness and workout companion mobile app for iOS and Android featuring AI-driven workout plans, real-time heart rate monitoring, interactive activity rings, calorie tracking, and seamless wearable synchronization.",
    category: "mobile",
    tags: ["React Native", "Expo", "iOS & Android", "TypeScript", "HealthKit", "Tailwind CSS"],
    image: projectFitPulse,
    liveUrl: "https://fitpulse.app",
    githubUrl: "https://github.com/Arun-DEV-prog/fitpulse-mobile-app",
    year: "2025",
    role: "Mobile App Architecture & UI/UX",
    featured: true,
  },
  {
    id: 6,
    title: "NovaPay — Fintech & Digital Wallet Mobile App",
    description:
      "Next-generation cross-platform mobile banking and digital wallet app built with React Native. Supports multi-currency crypto and fiat wallets, instant peer-to-peer transfers, virtual debit card issuance, and biometric security.",
    category: "mobile",
    tags: ["React Native", "TypeScript", "Node.js", "Plaid API", "Stripe", "Reanimated"],
    image: projectNovaPay,
    liveUrl: "https://novapay.io",
    githubUrl: "https://github.com/Arun-DEV-prog/novapay-fintech-app",
    year: "2025",
    role: "Lead Mobile & Fintech Engineering",
    featured: true,
  },
  {
    id: 7,
    title: "DIU Routine Scraper — Smart Class & Exam Schedule App",
    description:
      "Automated university routine scraper and timetable manager app for Daffodil International University (DIU) students. Features instant class schedule scraping, real-time exam countdowns, teacher room lookup, and automated schedule update notifications.",
    category: "mobile",
    tags: ["React Native", "Python / Scrapy", "Node.js", "Expo", "Push Notifications", "Tailwind CSS"],
    image: projectDiuRoutine,
    liveUrl: "https://github.com/Arun-DEV-prog/diu-routine-scraper",
    githubUrl: "https://github.com/Arun-DEV-prog/diu-routine-scraper",
    year: "2025",
    role: "Mobile App Development & Web Scraping",
    featured: true,
  },
  {
    id: 8,
    title: "Deen — Islamic Lifestyle, Quran & Prayer Companion App",
    description:
      "All-in-one Islamic mobile application featuring accurate geolocation prayer times with adhan alerts, daily prayer tracker, full Al-Quran with recitation audio, authenticated Al-Hadith collections, real-time Qibla compass, and essential daily Duas.",
    category: "mobile",
    tags: ["React Native", "Expo", "Audio Streaming", "Geolocation", "SQLite / Offline", "Tailwind CSS"],
    image: projectDeenApp,
    liveUrl: "https://deenapp.islamic",
    githubUrl: "https://github.com/Arun-DEV-prog/deen-islamic-app",
    year: "2025",
    role: "Mobile App Architecture & UI/UX",
    featured: true,
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "design", label: "UI/UX Design" },
  { id: "backend", label: "Backend & Cloud" },
];

export const services = [
  {
    id: 1,
    icon: "HiDeviceMobile",
    title: "Mobile App Development (iOS & Android)",
    shortDesc: "Cross-platform React Native apps with native performance",
    highlight: true,
    badge: "🔥 Core Specialization",
    description:
      "We design and engineer industry-leading mobile applications for both Apple iOS and Google Android using React Native. From fluid 60fps animations to seamless offline sync and App Store / Play Store releases.",
    features: [
      "React Native & Expo Ecosystem",
      "Native iOS & Android Performance",
      "App Store & Google Play Publishing",
      "Push Notifications & Offline-First Sync",
      "Biometrics & Hardware Integrations",
      "Smooth 60fps Gesture UX & Reanimated",
    ],
    price: "Starting at $2,200",
  },
  {
    id: 2,
    icon: "HiCode",
    title: "Web & SaaS Development",
    shortDesc: "Scalable, blazing-fast React and Next.js platforms",
    description:
      "We engineer enterprise-grade web applications with modern architectures, state-of-the-art security, and lightning speed. From MVPs to high-scale platforms.",
    features: [
      "React / Next.js / TypeScript",
      "Full-Stack Architecture",
      "Performance & SEO Optimization",
      "API Integrations & Webhooks",
      "Automated Testing & CI/CD",
    ],
    price: "Starting at $1,500",
  },
  {
    id: 3,
    icon: "HiPaintBrush",
    title: "UI/UX & Mobile Product Design",
    shortDesc: "Award-worthy aesthetics backed by UX research",
    description:
      "We shape unforgettable digital brand identities and craft bespoke, intuitive mobile & web interfaces that turn visitors into loyal customers.",
    features: [
      "Mobile-First & Web Design Systems",
      "iOS Human Interface & Material UI",
      "User Journey & Wireframing",
      "Interactive High-Fidelity Prototypes",
      "Brand Identity & Design Tokens",
    ],
    price: "Starting at $1,200",
  },
  {
    id: 4,
    icon: "HiServer",
    title: "Backend & Cloud Architecture",
    shortDesc: "Resilient microservices, databases & DevOps",
    description:
      "Robust backend infrastructure engineered for scalability. We handle database design, REST/GraphQL APIs, serverless functions, and multi-cloud deployment.",
    features: [
      "Node.js, Express & Python",
      "PostgreSQL, MongoDB & Redis",
      "Cloud Deployment (AWS/Vercel)",
      "Real-time Sockets & Mobile Push",
      "High Security & Data Encryption",
    ],
    price: "Starting at $2,000",
  },
  {
    id: 5,
    icon: "HiSparkles",
    title: "AI Integration & Smart Workflows",
    shortDesc: "Next-gen intelligent apps with fluid interactions",
    description:
      "Supercharge your mobile and web products with custom AI/LLM integrations, computer vision, and smooth GSAP/Framer Motion animations.",
    features: [
      "OpenAI & Gemini Integrations",
      "Custom Mobile AI Assistants & RAG",
      "GSAP ScrollTrigger & WebGL",
      "Micro-interactions & Physics",
      "Zero-Lag Responsive Design",
    ],
    price: "Starting at $1,800",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "CEO, TechVenture",
    avatar: null,
    rating: 5,
    text: "Nexora Labs delivered an absolutely stunning digital platform that exceeded all expectations. Their engineering rigor and fluid animations made our product feel world-class. Conversion increased by 40% immediately post-launch.",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Product Director, Fintech Co",
    avatar: null,
    rating: 5,
    text: "Working with the Nexora Labs team was an exceptional experience. They translated complex enterprise requirements into an intuitive, high-speed dashboard. Code quality and delivery pace were phenomenal.",
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Founder, DesignLab",
    avatar: null,
    rating: 5,
    text: "Nexora Labs built our entire design system and web ecosystem. 80+ components, perfect documentation, and it scales gracefully. Best agency partnership we've ever made.",
  },
  {
    id: 4,
    name: "Raj Patel",
    role: "CTO, SaaS Startup",
    avatar: null,
    rating: 5,
    text: "The landing page and SaaS platform Nexora Labs built for us converts at an incredible 12%. Smooth motion, bulletproof architecture, and stellar aesthetics. Highly recommended!",
  },
];

export const awards = [
  {
    title: "Top SaaS Innovation Award",
    org: "GSTU Tech Showcase",
    year: "2025",
  },
  {
    title: "Excellence in Web Engineering",
    org: "Developer Guild Award",
    year: "2024",
  },
];

export const navItems = [
  { id: "home", label: "Home", icon: "HiHome" },
  { id: "about", label: "About", icon: "HiBuildingOffice2" },
  { id: "services", label: "Services", icon: "HiSparkles" },
  { id: "portfolio", label: "Portfolio", icon: "HiFolder" },
  { id: "team", label: "Team", icon: "HiUserGroup" },
  { id: "experience", label: "Milestones", icon: "HiBriefcase" },
  { id: "testimonials", label: "Testimonials", icon: "HiChatBubbleLeft" },
  { id: "contact", label: "Contact Us", icon: "HiEnvelope" },
];
