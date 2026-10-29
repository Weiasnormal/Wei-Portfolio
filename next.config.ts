import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served at mysite.com/v1 through a rewrite from the v2 app.
  basePath: "/v1",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod.spline.design',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
