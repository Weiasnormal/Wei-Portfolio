import { Github, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

export type SocialLink = {
  name: string;
  href: string;
  icon: React.ReactNode | "tiktok"; 
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/Weiasnormal", 
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/wincel-crusit-284364305",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/WincelCrusit",
    icon: <Facebook className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/wnclasusual_",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@wnclasusual",
    icon: <Youtube className="h-5 w-5" />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@wiwotech",
    icon: "tiktok",
  },
];