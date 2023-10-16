/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      }
    ],
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
