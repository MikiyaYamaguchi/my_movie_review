import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ['image.tmdb.org'], // ここで画像のホストを指定
  },
};

export default nextConfig;
