import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/itsvngo",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
