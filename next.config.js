/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'daisyui.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
