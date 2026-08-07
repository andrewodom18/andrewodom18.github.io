export interface LinkItem {
  label: string;
  href: string;
}

export const portfolioContent = {
  site: {
    name: "Andrew Odom",
    url: "https://andrewodom18.github.io",
    title: "Andrew Odom | Software Developer",
    description:
      "Andrew Odom is a software developer at Air Force BESPIN building web and mobile applications.",
    email: "contact@aodom.dev"
  },
  navigation: [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Education", href: "/#education" },
    { label: "Skills", href: "/#skills" },
    { label: "Work", href: "/#work" },
    { label: "Resume", href: "/resume/" }
  ] satisfies readonly LinkItem[],
  social: [
    { label: "GitHub", href: "https://github.com/andrewodom18" },
    { label: "LinkedIn", href: "https://linkedin.com/in/andrewodom18/" },
    { label: "Email", href: "mailto:contact@aodom.dev" }
  ] satisfies readonly LinkItem[],
  hero: {
    eyebrow: "Software Developer · Air Force BESPIN",
    title: "Andrew Odom.",
    titleEmphasis: "Software developer.",
    summary:
      "I build web and mobile applications at Air Force BESPIN and through independent projects.",
    profile: [
      { label: "Current role", value: "Software Developer at Air Force BESPIN" },
      { label: "Experience", value: "December 2023 — Present" },
      { label: "Focus", value: "Web, mobile, data, and automation" }
    ]
  },
  about: {
    eyebrow: "About",
    title: "Building practical software across web and mobile.",
    paragraphs: [
      "I’m a software developer at Air Force BESPIN, where I contribute to mobile and web applications as part of a software factory team.",
      "My broader work includes TypeScript applications, Flutter mobile development, relational data systems, testing, and deployment automation. I’m also completing a bachelor’s degree in Computer Science."
    ],
    status: "Open to software engineering opportunities"
  },
  experience: {
    eyebrow: "Experience",
    title: "Work history.",
    role: "Software Developer",
    organization: "Air Force BESPIN",
    dates: "December 2023 — Present",
    summary: "Mobile and web application development within an Air Force software factory.",
    bullets: [
      "Build and maintain application features as part of a software delivery team.",
      "Contribute across application code, data integration, testing, and deployment.",
      "Write technical documentation and support software releases."
    ]
  },
  education: [
    {
      status: "In progress",
      title: "Bachelor’s in Computer Science",
      text: "Coursework includes programming, data structures, systems, and software architecture."
    },
    {
      status: "Planned",
      title: "Master’s in Cybersecurity",
      text: "Planned graduate study in secure systems and cybersecurity engineering."
    }
  ],
  skills: [
    {
      number: "A",
      title: "Languages",
      tools: ["TypeScript", "Dart", "Python", "SQL"]
    },
    {
      number: "B",
      title: "Web",
      tools: ["React", "Next.js", "Astro", "Node.js"]
    },
    {
      number: "C",
      title: "Mobile",
      tools: ["Flutter", "Riverpod", "GoRouter", "Secure storage"]
    },
    {
      number: "D",
      title: "Data and delivery",
      tools: ["PostgreSQL", "Supabase", "Playwright", "GitHub Actions", "Docker"]
    }
  ],
  contact: {
    eyebrow: "Contact",
    title: "Start a conversation.",
    text: "For software engineering roles and professional inquiries, email is the best way to reach me.",
    emailSubject: "Software engineering opportunity"
  }
} as const;

export type PortfolioContent = typeof portfolioContent;
