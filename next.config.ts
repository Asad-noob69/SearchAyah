import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
const eslintConfig = {
  ignoreDuringBuilds: true,
};

nextConfig.eslint = eslintConfig;

export default nextConfig;
