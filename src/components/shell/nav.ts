import type { IconName } from "../Icon";

export type NavItem = { href: string; label: string; icon: IconName };

export const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Work",
    items: [
      { href: "/", label: "Home", icon: "home" },
      { href: "/projects", label: "Projects", icon: "projects" },
      { href: "/experience", label: "Experience", icon: "experience" },
      { href: "/certifications", label: "Certifications", icon: "certifications" },
      { href: "/writing", label: "Writing", icon: "writing" },
    ],
  },
  {
    title: "Me",
    items: [
      { href: "/outside", label: "Outside the IDE", icon: "outside" },
      { href: "/setup", label: "Setup", icon: "setup" },
      { href: "/community", label: "Community", icon: "community" },
      { href: "/guestbook", label: "Guestbook", icon: "guestbook" },
    ],
  },
];

export function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
