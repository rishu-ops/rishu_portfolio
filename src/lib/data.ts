export const skills = [
  { title: "JavaScript" },
  { title: "TypeScript" },
  { title: "React.js" },
  { title: "Next.js" },
  { title: "Node.js" },
  { title: "Express.js" },
  { title: "Redux Toolkit" },
  { title: "Zustand" },
  { title: "MongoDB" },
  { title: "PostgreSQL" },
  { title: "Payload CMS" },
  { title: "Tailwind CSS" },
  { title: "Shadcn UI" },
  { title: "Ant Design" },
  { title: "Material-UI" },
  { title: "Socket.IO" },
  { title: "React Flow" },
  { title: "Razorpay" },
  { title: "Sequelize" },
  { title: "Git" },
];

export const experiences = [
  {
    title: "Frontend Developer",
    company: "Lakhera Global Services",
    period: "Nov 2025 – Apr 2026",
    location: "Chandigarh",
    description:
      "Owned the entire ZYVO CRM frontend — built modules for CRM, HRM, Leads, Tasks, and Assets from the ground up. Shipped a drag-and-drop workflow builder using React Flow, wired up real-time notifications via Socket.IO, and kept the UI consistent across 10+ feature areas with Ant Design. Separately built the LGS corporate website with Next.js, PostgreSQL, and Sequelize including a custom admin panel.",
    tech: ["React", "TypeScript", "React Flow", "Socket.IO", "Ant Design", "Next.js", "PostgreSQL"],
  },
  {
    title: "Fullstack Developer",
    company: "Rashi Technologies",
    period: "Nov 2024 – Nov 2025",
    location: "New Delhi",
    description:
      "Built meribhaktiapp.com from scratch — a devotional content platform with subscription payments via Razorpay and a CMS-driven content layer using Payload. Set up the full analytics stack: GA4, Meta Pixel, Microsoft Clarity, and Google Ads conversion tracking.",
    tech: ["Next.js", "Payload CMS", "Razorpay", "GA4", "Meta Pixel"],
  },
  {
    title: "Backend Developer Intern",
    company: "Infotech Edge",
    period: "May 2024 – Aug 2024",
    location: "Remote",
    description:
      "Built an RBAC system in Node.js/Express covering three roles: Jobseeker, Recruiter, and Admin. Each role had its own permission set and route guards. Also completed a set of job search and filtering APIs with multi-field query support.",
    tech: ["Node.js", "Express.js", "RBAC", "REST APIs"],
  },
];

export const projects = [
  {
    title: "ZYVO CRM",
    description:
      "A full enterprise CRM I built solo at LGS. Covers CRM, HRM, lead management, task tracking, asset management, and a custom workflow automation engine. The workflow builder uses React Flow — users can drag, connect, and configure automation nodes visually. Real-time updates over Socket.IO.",
    tech: ["React", "TypeScript", "Ant Design", "React Flow", "Socket.IO"],
    link: "#",
    featured: true,
  },
  {
    title: "LGS Website",
    description:
      "Corporate site for Lakhera Global Services. Server-side rendered with Next.js, PostgreSQL for the data layer, Sequelize as ORM, and a custom admin panel for content management.",
    tech: ["Next.js", "PostgreSQL", "Sequelize", "Tailwind CSS"],
    link: "#",
    featured: false,
  },
  {
    title: "meribhaktiapp.com",
    description:
      "Devotional content platform with Razorpay subscription payments, Payload CMS for editorial control, and a complete analytics stack (GA4, Meta Pixel, Clarity). Built and shipped solo at Rashi Technologies.",
    tech: ["Next.js", "Payload CMS", "Razorpay", "GA4"],
    link: "#",
    featured: false,
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Uttaranchal University",
    period: "2024 – Present",
    grade: "CGPA 8.50",
  },
  {
    degree: "Senior Secondary (Science)",
    institution: "Gyan Bharti Public School",
    period: "2022 – 2023",
    grade: "83%",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
