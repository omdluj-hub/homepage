import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/bbs-admin/:path*',
        destination: 'https://bbs-ruddy-iota.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
