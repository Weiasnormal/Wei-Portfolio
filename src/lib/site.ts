import type { Metadata } from "next";

export const site = {
  name: "Wincel Crusit",
  email: "crusitwincel@gmail.com",
  status: "Open for OJT",
  statusLong: "Open for OJT placement, BS Computer Science at LSPU",
  description:
    "Wincel Crusit leads small teams that build web and mobile apps, and is learning to build faster with AI workflows and automation.",
  githubUser: "Weiasnormal",
  resume: "/Resume/Crusit_Wincel_HARVARD_RESUME.pdf",
  photo: "/profile.jpg",
  /** 30-second intro clip. The intro button stays hidden until this is set. */
  introVideo: undefined as string | undefined,
  v1Path: "/v1",
};

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteUrl = new URL(resolveSiteUrl());

export function pageMetadata(title: string | null, description: string, path: string): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : site.name;
  return {
    title: title ?? { absolute: site.name },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
