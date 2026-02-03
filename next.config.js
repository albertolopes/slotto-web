/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Ensure SWC minification is enabled for Next.js itself
  async rewrites() {
    return [
      {
        source: '/:slug((?!search|my-bookings|login|companies).*)', // Exclude known routes
        destination: '/companies/:slug',
      },
    ]
  },
}

export default nextConfig;
