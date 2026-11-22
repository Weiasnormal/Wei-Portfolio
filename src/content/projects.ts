import type { AlsoBuilt, Honor, MiniProject, Project } from "./types";

export const projects: Project[] = [
  {
    slug: "avera",
    title: "AVERA",
    badge: "Thesis",
    summary:
      "Android app that verifies handwritten signatures with a Siamese network and explainable AI.",
    role: "Project lead, ML and frontend",
    platforms: "Mobile and web",
    intro:
      "An Android app that checks whether a handwritten signature is genuine, and shows which parts of the signature drove each result.",
    description:
      "Android app that verifies handwritten signatures with a Siamese network and explainable AI.",
    reelName: "AVERA reel",
    cover: "/projects/avera-poster.jpg",
    links: [{ label: "Web app", href: "https://avera-seven.vercel.app/sign-in" }],
    views: [
      {
        id: "mobile",
        label: "Mobile",
        placeholder: "Mobile app walkthrough goes here (video, 16:9)",
        src: "/videos/Avera_ad_58s_3D_Mark_v2.mp4",
        poster: "/projects/avera-poster.jpg",
        captions: "/projects/avera-demo-captions.vtt",
        ratio: "16/9",
      },
      { id: "web", label: "Web", placeholder: "Web side goes here (screenshots or video)" },
      { id: "model", label: "Model", placeholder: "Model results and explainability visuals go here" },
    ],
    facts: [
      { label: "My role", value: "Project lead, ML and frontend" },
      { label: "Team", value: "[team size]" },
      { label: "Timeline", value: "Apr to Nov 2026" },
      { label: "Built with", value: "React Native, PyTorch, TensorFlow" },
    ],
    sections: [
      { heading: "The problem", body: "[Who checks signatures today, how, and what goes wrong]" },
      {
        heading: "What we built",
        body: "A Siamese neural network compares a signature against a reference. Explainable AI highlights the regions that decided the result, so the person checking can see why, not just a yes or no. [Add the web side]",
      },
      {
        heading: "How I led it",
        body: "[How you split design, backend and ML work, and one decision you made as lead]",
      },
      { heading: "Results", body: "[Accuracy, defense outcome, or user feedback]" },
    ],
    gallery: [
      { label: "Phone screen" },
      { label: "Phone screen" },
      { label: "Phone screen" },
      { label: "Web screen or model visual", wide: true },
    ],
    footer: [
      { label: "All projects", href: "/projects" },
      { label: "Next: ResQLine", href: "/projects/resqline" },
    ],
  },
  {
    slug: "resqline",
    title: "ResQLine",
    badge: "Finalist",
    summary: "Verified emergency reports with photo and GPS, plus a responder dashboard.",
    role: "Team lead, mobile, pitch",
    platforms: "Mobile and web",
    intro:
      "An emergency reporting system for UN SDG 16. Citizens send verified reports with a photo and exact location, and responders manage them from a web dashboard.",
    description:
      "Emergency reporting system: verified citizen reports with photo and GPS, plus a responder dashboard.",
    reelName: "ResQLine reel",
    cover: "/projects/resqline-poster.jpg",
    views: [
      {
        // The ad covers both the citizen app and the responder dashboard. Its captions are burned in,
        // so it has no separate captions file.
        id: "overview",
        label: "Overview",
        placeholder: "Overview video goes here",
        src: "/projects/resqline-demo.mp4",
        poster: "/projects/resqline-poster.jpg",
        ratio: "16/9",
      },
      { id: "mobile", label: "Mobile", placeholder: "Citizen app walkthrough goes here (video, 16:9)" },
      { id: "web", label: "Web dashboard", placeholder: "Admin dashboard walkthrough goes here" },
      { id: "pitch", label: "Pitch", placeholder: "Pitch video goes here" },
    ],
    facts: [
      { label: "My role", value: "Team lead, mobile, pitch" },
      { label: "Team", value: "4 members" },
      { label: "Event", value: "Batang Techno Hackathon, Apr 2026" },
      { label: "Built with", value: "React Native, Next.js, ML backend" },
    ],
    sections: [
      { heading: "The problem", body: "[What slows emergency reporting down where you live]" },
      {
        heading: "What we built",
        body: "A React Native app for citizen reports with a photo and precise GPS, and a Next.js dashboard where responders review and act on them, backed by an ML model. [What the ML part does]",
      },
      {
        heading: "How I led it",
        body: "[Who owned what, and how you kept four people shipping to one deadline]",
      },
      { heading: "Results", body: "Reached the finals. [Judges' feedback or what happened next]" },
    ],
    gallery: [
      { label: "Phone screen" },
      { label: "Phone screen" },
      { label: "Phone screen" },
      { label: "Dashboard screen", wide: true },
    ],
    footer: [
      { label: "Previous: AVERA", href: "/projects/avera" },
      { label: "Next: Cryolipo", href: "/projects/cryolipo" },
    ],
  },
  {
    slug: "cryolipo",
    title: "Cryolipo",
    badge: "Client",
    summary: "Client Shopify website built from a partner's Figma designs, with custom Liquid theme sections.",
    role: "Shopify developer",
    platforms: "Web, Shopify",
    intro:
      "A client Shopify website, built with a UI/UX design partner. I turned the Figma designs into a working store with custom theme sections and responsive components.",
    description: "Client Shopify website built from Figma designs, with custom Liquid theme sections.",
    reelName: "Cryolipo reel",
    cover: "/projects/cryolipo-poster.jpg",
    links: [{ label: "Live store", href: "https://akqjxh-j6.myshopify.com/" }],
    views: [
      {
        id: "desktop",
        label: "Desktop",
        placeholder: "Desktop walkthrough goes here (video, 16:9)",
        src: "/projects/cryolipo-demo.mp4",
        poster: "/projects/cryolipo-poster.jpg",
        captions: "/projects/cryolipo-demo-captions.vtt",
        ratio: "16/9",
      },
      { id: "mobile", label: "Mobile", placeholder: "Mobile walkthrough goes here" },
    ],
    facts: [
      { label: "My role", value: "Shopify developer" },
      { label: "Team", value: "With a UI/UX design partner" },
      { label: "Timeline", value: "Sep to Nov 2026" },
      { label: "Built with", value: "Shopify Liquid, HTML, CSS, JavaScript" },
    ],
    sections: [
      { heading: "The client", body: "[Who Cryolipo is and what the store needed to do]" },
      {
        heading: "What we built",
        body: "Custom theme sections and responsive components in Shopify Liquid, plus the store structure, product collections and site navigation.",
      },
      { heading: "How I led it", body: "[How you worked with the design partner and the client]" },
      { heading: "Results", body: "[Launch status, live link, or client feedback]" },
    ],
    gallery: [
      { label: "Store page" },
      { label: "Store page" },
      { label: "Store page" },
      { label: "Desktop screen", wide: true },
    ],
    footer: [
      { label: "Previous: ResQLine", href: "/projects/resqline" },
      { label: "All projects", href: "/projects" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const miniProjects: MiniProject[] = [
  {
    title: "Sheetquo",
    year: "2026",
    summary:
      "Turns a customer's chat message into an editable Excel quotation that keeps the business's own template layout. Paste the request, review the items, download the .xlsx. Runs in the browser and works offline, with no account or server.",
    stack: ["React", "TypeScript", "ExcelJS", "IndexedDB", "PWA"],
    href: "https://sheetquo.vercel.app/",
    video: { src: "/mini/sheetquo-demo.mp4", poster: "/mini/sheetquo-poster.jpg" },
  },
  {
    title: "Pixmora",
    year: "2026",
    summary:
      "Packs ID and photo prints onto shared paper at their exact physical size, so a print shop can fit several orders on one sheet. Crop, edit and remove backgrounds, then export a print-ready PDF. Photos never leave the browser.",
    stack: ["Next.js", "TypeScript", "Transformers.js", "pdf-lib"],
    href: "https://pixmora.vercel.app/",
    video: {
      src: "/mini/pixmora-demo.mp4",
      poster: "/mini/pixmora-poster.jpg",
      captions: "/mini/pixmora-demo-captions.vtt",
    },
  },
];

export const alsoBuilt: AlsoBuilt[] = [
  {
    title: "DriveMinded",
    year: "2026",
    description:
      "n8n workflow that drafts three posts per car listing and sends them to the owner on Telegram for one-tap approval. First Runner-Up, iSITE.",
    href: "/writing/driveminded-isite",
  },
  {
    title: "Statera",
    year: "2026",
    description: "Mobile app, React Native and Expo. [one-line description]",
    href: "https://github.com/Weiasnormal/Statera_App",
    external: true,
  },
  {
    title: "OCTA website",
    year: "2025",
    description: "Web design for a student organization. [your role]",
    href: "https://ccs-octa.com/home",
    external: true,
  },
  {
    title: "Sona Music",
    year: "2025",
    description: "Web platform. [one-line description]",
    href: "https://sona-ten.vercel.app/mbti-selection",
    external: true,
  },
  {
    title: "WorkHive",
    year: "2024",
    description: "Desktop app in C# WinForms. [one-line description]",
    href: "https://github.com/recca383/WorkHive",
    external: true,
  },
];

export const honors: Honor[] = [
  { title: "First Runner-Up", detail: "iSITE AI Hackathon, 2026" },
  { title: "Finalist", detail: "Batang Techno Hackathon, 2026" },
  { title: "Special Recognition", detail: "Multimedia Arts" },
];
