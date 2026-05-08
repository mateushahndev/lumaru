import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 ano
    dangerouslyAllowSVG: false,
    remotePatterns: [],
  },
  
  compress: true,
  
  poweredByHeader: false, // Remove X-Powered-By header
  
  reactStrictMode: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Headers de segurança para SEO e performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Content-Security-Policy para permitir Google Analytics e Clarity
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.google-analytics.com https://*.clarity.ms; connect-src 'self' https://*.google-analytics.com https://*.clarity.ms; frame-src 'self' https://*.clarity.ms;",
          },
        ],
      },
      {
        source: "/:path*.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  
  // Redirects: www para non-www E Vercel para domínio principal
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.lumaruskin.com",
          },
        ],
        destination: "https://lumaruskin.com/:path*",
        permanent: true,
      },
      // Redirect do domínio da Vercel para o domínio principal
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "lumaru.vercel.app",
          },
        ],
        destination: "https://lumaruskin.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;