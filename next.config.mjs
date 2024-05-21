/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.wired.com',
      },
    ],
  },
};

export default nextConfig;
