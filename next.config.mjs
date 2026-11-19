/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/.well-known/discord",
          destination: "/api/discord-verification",
        },
      ],
    };
  },
};
export default nextConfig;
