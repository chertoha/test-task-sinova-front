/** @type {import('next').NextConfig} */

// import type { NextConfig } from "next";

const API_URL = process.env.API_URL as string;
const [_, hostname] = API_URL.split("https://");

const nextConfig = {
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname,
    port: "",
    pathname: "/**",
   },
  ],
 },
};

export default nextConfig;
