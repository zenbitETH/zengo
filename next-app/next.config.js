// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
module.exports = {
  reactStrictMode: true,
  env: {
    POAP_API_KEY: process.env.POAP_API_KEY,
  }
}