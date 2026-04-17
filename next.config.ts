import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/serenity-bay",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
