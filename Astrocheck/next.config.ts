import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // untuk gambar eksternal, nggak perlu untuk lokal
  },
};

export default nextConfig;
