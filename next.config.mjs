/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  distDir: isDev ? ".next-dev" : ".next-build",
  allowedDevOrigins: ["127.0.0.1", "localhost"]
};

export default nextConfig;
