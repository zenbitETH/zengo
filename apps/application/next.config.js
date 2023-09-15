/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    domains: ["assets.poap.xyz"],
    remotePatterns: [
      {
        hostname: "assets.poap.xyz",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
