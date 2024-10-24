/** @type {import('next').NextConfig} */

// import type { NextConfig } from "next";

const API_URL = process.env.API_URL;
const hostname = API_URL?.split("https://")[1] || "localhost";

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
