import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      // Auth routes (Better Auth)
      {
        source: "/api/auth/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://backend-foodhub-mrashed21.vercel.app/api/auth/:path*"
            : "http://localhost:5000/api/auth/:path*",
      },

      // API v1 routes
      {
        source: "/api/v1/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://backend-foodhub-mrashed21.vercel.app/api/v1/:path*"
            : "http://localhost:5000/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
