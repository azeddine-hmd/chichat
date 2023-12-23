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
    ],
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
