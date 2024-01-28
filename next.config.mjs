/** @type {import('next').NextConfig} */
const nextConfig = {
  // image hostname
  images: {
    domains: [
      "localhost",
      "s.yimg.com",
      "i.ytimg.com",
      "yt3.ggpht.com",
      "media.wired.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
