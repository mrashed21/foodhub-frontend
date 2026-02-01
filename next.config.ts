import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://foodhub-backend-pearl.vercel.app/api/auth/:path*",
      },
      {
        source: "/api/v1/:path*",
        destination: "https://foodhub-backend-pearl.vercel.app/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
