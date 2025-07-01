import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 31536000, // 1 year
  },

  optimizeFonts: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  experimental: {
    // 👇 REMOVE this — `fallbackNodePolyfills` can break Vercel builds in App Router
    // fallbackNodePolyfills: false,

    // 👇 KEEP THIS OFF for now — it triggers critters and may break during static export
    optimizeCss: false,

    // 👇 Leave this commented out unless you're sure your packages support it
    // optimizePackageImports: ['lucide-react', '@radix-ui/react-select', '@radix-ui/react-tabs'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  swcMinify: true,

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              reuseExistingChunk: true,
            },
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 20,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: { context?: string }) {
                const packageName =
                  module.context?.match(/[\\/]node_modules[\\/]([^@/][^\\/]*)(?:[\\/]|$)/)?.[1] || 'lib';
                return `npm.${packageName.replace('@', '')}`;
              },
              priority: 10,
              chunks: 'all',
              minChunks: 2,
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
