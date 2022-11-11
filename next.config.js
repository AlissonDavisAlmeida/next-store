/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  cleanDistDir: true,
  compiler: {
    emotion: true,
  }
}

module.exports = nextConfig
