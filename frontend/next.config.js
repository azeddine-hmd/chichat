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
        hostname: "backend",
        protocol: "http",
      },
      {
        hostname: "media.discordapp.net",
        protocol: "https",
      },
      (process.env.NODE_ENV === "production") ? {
        hostname: process.env.BACKEND_HOST,
        protocol: process.env.BACKEND_PROTOCOL,
      } : undefined,
    ],
  },
  productionBrowserSourceMaps: process.env.NODE_ENV === "development",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig
