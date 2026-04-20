/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "rosy-kiwi-630.convex.cloud",
        protocol: "https",
        port: "",
      },
    ],
  },
}

export default nextConfig
