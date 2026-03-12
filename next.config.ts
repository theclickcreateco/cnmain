import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Removed to enable API routes (Nodemailer)
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
