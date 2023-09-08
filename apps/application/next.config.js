/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    domains: ["assets.poap.xyz"],
    hostname: "https://assets.poap.xyz",
  },
};

module.exports = nextConfig;
