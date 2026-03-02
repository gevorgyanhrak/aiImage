import type { NextConfig } from 'next';
import { config as loadEnv } from 'dotenv-flow';
import { APP_ENV } from '@/constants/globals';

loadEnv({ path: './env', node_env: APP_ENV, silent: true });

const nextConfig: NextConfig = {
  turbopack: {
    root: '/Users/hrak/Desktop/project/hrakAi',
  },
  compress: false,
  output: 'standalone',
  reactCompiler: true,
  // See : https://stackoverflow.com/questions/71847778/why-is-my-nextjs-component-rendering-twice
  reactStrictMode: false,
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    deviceSizes: [320, 375, 414, 480, 560, 640, 768, 960, 1024, 1280, 1440, 1536, 1920],
    imageSizes: [64, 96, 128, 160, 192, 224, 256, 288, 320],
    formats: ['image/avif', 'image/webp'],
  },
  redirects: () => [
    {
      source: '/:a/:b/:c/:rest*',
      destination: '/',
      permanent: true,
    },
  ],
};

export default nextConfig;
