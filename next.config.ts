import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['prod.spline.design'],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
