import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://backend-foodhub-mrashed21.vercel.app/api/:path*",
      },
      // {
      //   source: "/api/v1/:path*",
      //   destination:
      //     "https://backend-foodhub-mrashed21.vercel.app/api/v1/:path*",
      // },
    ];
  },
};

export default nextConfig;
