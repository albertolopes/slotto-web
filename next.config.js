/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
