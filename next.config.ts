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
    minimumCacheTTL: 31536000, // 1 year in seconds for better caching
  },
  optimizeFonts: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add cache headers for static assets
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
  // Disable unnecessary polyfills for modern browsers
  // This reduces bundle size by avoiding transpilation of features supported in modern browsers
  experimental: {
    // Disable polyfills for ES6+ features that are widely supported
    fallbackNodePolyfills: false,
    // Enable modern optimizations
    optimizePackageImports: ['lucide-react', '@radix-ui/react-select', '@radix-ui/react-tabs'],
    // Optimize CSS
    optimizeCss: true,
  },
  // Configure compiler options for better optimization
  compiler: {
    // Remove console.log statements in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configure build optimization
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    // Avoid transpiling modern JavaScript features
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      use: [
        {
          loader: 'next-swc-loader',
          options: {
            jsc: {
              target: 'es2020',
              // Avoid polyfilling modern browser features
              transform: {
                useDefineForClassFields: false,
              },
            },
          },
        },
      ],
    });

    // Enable tree shaking
    if (!dev && !isServer) {
      // Optimize production builds
      config.optimization = {
        ...config.optimization,
        // Ensure unused exports are removed
        usedExports: true,
        // Optimize chunk size
        splitChunks: {
          chunks: 'all',
          // Create smaller chunks
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Group common dependencies
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              reuseExistingChunk: true,
            },
            // Create a separate chunk for React
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 20,
            },
            // Create a separate chunk for large libraries
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: { context: string | undefined }) {
                const packageName =
                  module.context?.match(/[\\/]node_modules[\\/]([^@].*?)(?:[\\/]|$)/)?.[1] || 'lib';
                return `npm.${packageName.replace('@', '')}`;
              },
              priority: 10,
              chunks: 'all',
              minChunks: 2,
            },
          },
        },
      }
    }

    return config;
  }
}

export default nextConfig;
