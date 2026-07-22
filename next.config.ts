import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
