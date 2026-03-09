import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Removed to enable API routes (Nodemailer)
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
