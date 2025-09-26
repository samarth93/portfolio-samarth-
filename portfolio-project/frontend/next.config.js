/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const destination = apiBase
      ? `${apiBase}/:path*`
      : 'http://localhost:8080/api/:path*';

    return [
      {
        source: '/api/:path*',
        destination,
      },
    ];
  },
};

module.exports = nextConfig; 