interface LinkItem {
  label: string;
  href: string;
}

export const resumeContent = {
  site: {
    name: "Andrew Odom",
    url: "https://andrewodom18.github.io",
    title: "Andrew Odom | Software Developer",
    description:
      "Resume and professional profile for Andrew Odom, a software developer at Air Force BESPIN and creator of ODOM Tech.",
    email: "contact@aodom.dev",
    resumePdf: "/resume.pdf"
  },
  navigation: [
    { label: "GitHub", href: "https://github.com/andrewodom18" },
    { label: "LinkedIn", href: "https://linkedin.com/in/andrewodom18/" },
    { label: "Resume", href: "/resume/" },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/andrewodom18" }
  ] satisfies readonly LinkItem[],
  social: [
    { label: "GitHub", href: "https://github.com/andrewodom18" },
    { label: "LinkedIn", href: "https://linkedin.com/in/andrewodom18/" },
    { label: "Email", href: "mailto:contact@aodom.dev" }
  ] satisfies readonly LinkItem[],
  hero: {
    eyebrow: "Software Developer · Air Force BESPIN",
    title: "Andrew Odom",
    summary:
      "I build reliable web and mobile applications, data systems, and delivery automation. I’m also the creator of ODOM Tech, my personal tech and project brand for apps, tools, and experiments.",
    profile: [
      { label: "Current role", value: "Software Developer at Air Force BESPIN" },
      { label: "Current tenure", value: "December 2023 — Present" },
      { label: "Projects", value: "Creator of ODOM Tech" }
    ]
  },
  about: {
    eyebrow: "Profile",
    title: "Practical software, built with care.",
    paragraphs: [
      "I’m a software developer at Air Force BESPIN, where I contribute to mobile and web applications as part of a collaborative software factory team.",
      "My work spans TypeScript applications, Flutter development, relational data systems, automated testing, technical documentation, and deployment workflows. I’m also completing a bachelor’s degree in Computer Science."
    ],
    status: "Open to software engineering opportunities"
  },
  experience: {
    eyebrow: "Experience",
    title: "Professional experience.",
    role: "Software Developer",
    organization: "Air Force BESPIN",
    dates: "December 2023 — Present",
    summary: "Mobile and web application development within an Air Force software factory.",
    bullets: [
      "Develop and maintain web and mobile application features within a collaborative software delivery team.",
      "Work across application code, relational data integration, automated testing, and deployment workflows.",
      "Produce technical documentation and support reliable software releases."
    ]
  },
  education: [
    {
      status: "In progress",
      title: "Bachelor’s in Computer Science",
      text: "Coursework includes programming, data structures, systems, and software architecture."
    }
  ],
  skills: [
    {
      number: "01",
      title: "Languages",
      tools: ["TypeScript", "JavaScript", "Python", "Dart", "SQL", "Shell"]
    },
    {
      number: "02",
      title: "Web",
      tools: ["React", "Next.js", "Astro", "Node.js", "Tailwind CSS"]
    },
    {
      number: "03",
      title: "Mobile",
      tools: ["Flutter", "Riverpod", "GoRouter"]
    },
    {
      number: "04",
      title: "Data and backend",
      tools: ["PostgreSQL", "Supabase", "Convex", "SQLite", "Drizzle ORM"]
    },
    {
      number: "05",
      title: "Delivery",
      tools: ["Docker", "Linux", "GitHub Actions", "Playwright", "Automated testing"]
    }
  ],
  ownership: {
    eyebrow: "ODOM Tech",
    title: "Creator",
    text: "ODOM Tech is my personal tech and project brand, the home for my independent software projects, developer tools, and tech experiments. Visit the organization to explore what I’m building.",
    href: "https://github.com/odom-technology"
  },
  contact: {
    eyebrow: "Contact",
    title: "Start a conversation.",
    text: "For software engineering roles and professional inquiries, email is the best way to reach me.",
    projectText: "For ODOM Tech and ODOM Tech project-related conversations, please use the contact form on the ODOM Tech website.",
    projectHref: "https://odomtech.com/contact/",
    emailSubject: "Software engineering opportunity"
  }
} as const;
