import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://foodhub-backend-pearl.vercel.app/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
