import type { StackGroup } from "./types";

/** Files in public/logos. Brand colors, left out for the darkest logos so they follow the theme. Tools without an entry show as text. */
export const stackLogos: Record<string, { file: string; color?: string }> = {
  "React Native": { file: "react", color: "#61DAFB" },
  Expo: { file: "expo" },
  "Next.js": { file: "nextdotjs" },
  TypeScript: { file: "typescript", color: "#3178C6" },
  "Shopify Liquid": { file: "shopify", color: "#7AB55C" },
  n8n: { file: "n8n", color: "#EA4B71" },
  OpenRouter: { file: "openrouter", color: "#94A3B8" },
  PyTorch: { file: "pytorch", color: "#EE4C2C" },
  TensorFlow: { file: "tensorflow", color: "#FF6F00" },
  Python: { file: "python", color: "#3776AB" },
  "Node.js": { file: "nodedotjs", color: "#5FA04E" },
  Firebase: { file: "firebase", color: "#DD2C00" },
  PostgreSQL: { file: "postgresql", color: "#4169E1" },
  MongoDB: { file: "mongodb", color: "#47A248" },
  MySQL: { file: "mysql", color: "#4479A1" },
  JavaScript: { file: "javascript", color: "#F7DF1E" },
  HTML: { file: "html5", color: "#E34F26" },
  CSS: { file: "css", color: "#663399" },
  "Google Colab": { file: "googlecolab", color: "#F9AB00" },
  Roboflow: { file: "roboflow", color: "#6706CE" },
  Ngrok: { file: "ngrok" },
  Git: { file: "git", color: "#F03C2E" },
  GitHub: { file: "github" },
  Figma: { file: "figma", color: "#F24E1E" },
  "DaVinci Resolve": { file: "davinciresolve" },
};

export const stack: StackGroup[] = [
  {
    name: "Programming and web",
    items: ["React Native", "Expo", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Shopify Liquid", "Python", "C#"],
  },
  { name: "Backend and databases", items: ["Node.js", "MySQL", "MongoDB", "Firebase", "PostgreSQL"] },
  { name: "AI and machine learning", items: ["PyTorch", "TensorFlow", "Google Colab", "Roboflow"] },
  { name: "Workflow and DevOps", items: ["n8n", "Ngrok", "OpenRouter", "Git", "GitHub"] },
  { name: "Multimedia and design", items: ["Figma", "Canva", "Photoshop", "CapCut", "DaVinci Resolve"] },
];
