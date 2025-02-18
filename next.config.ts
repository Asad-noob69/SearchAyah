import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
const eslintConfig = {
  ignoreDuringBuilds: true,
};

const images = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
};

const optimizeFonts = true;

nextConfig.images = images;
nextConfig.optimizeFonts = optimizeFonts;

nextConfig.eslint = eslintConfig;

export default nextConfig;
