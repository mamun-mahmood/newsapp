/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
const withPWA = withPWAInit({
  dest: "public",
});
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
  // disable eslint for nextjs
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA(nextConfig);
