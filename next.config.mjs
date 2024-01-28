/** @type {import('next').NextConfig} */
const nextConfig = {
  // image hostname
  images: {
    //  domains wilcard
    domains: ["*"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**/.*/**",
      },
    ],
  },
};

export default nextConfig;
