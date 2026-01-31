import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
