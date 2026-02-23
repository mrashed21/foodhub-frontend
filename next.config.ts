import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination:
          "https://backend-foodhub-mrashed21.vercel.app/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
