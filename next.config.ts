import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Version 1.0 is a separate Vercel deployment built with basePath "/v1".
// Visitors reach it at mysite.com/v1 through these rewrites.
const v1Origin = process.env.V1_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The 3D setup's model, video and posters are fetched with a ?v= version (SetupExplorer.tsx), so browsers can
  // keep them for a year. Only files under /setup/, never the /setup page itself.
  async headers() {
    return [
      {
        source: "/setup/:file(.+\\.(?:glb|mp4|webp))",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async rewrites() {
    if (!v1Origin) return [];
    return [
      { source: "/v1", destination: `${v1Origin}/v1` },
      { source: "/v1/:path*", destination: `${v1Origin}/v1/:path*` },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
