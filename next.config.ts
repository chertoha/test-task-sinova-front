/** @type {import('next').NextConfig} */

// import type { NextConfig } from "next";

const API_URL = process.env.API_URL as string;
const [_, domain] = API_URL.split("https://");

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: domain || "",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "9090",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
