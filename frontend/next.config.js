/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
      {
        hostname: "i.pravatar.cc",
        protocol: "https",
      },
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "backend",
        protocol: "http",
      }
    ],
  },
  productionBrowserSourceMaps: process.env.NODE_ENV === "development",
}

module.exports = nextConfig
