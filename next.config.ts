import type { NextConfig } from "next";
import { SORTS } from "./lib/types";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    inlineCss: true,
  },
  async rewrites() {
    return SORTS.map(sort => ({
        source: `/api/${sort}.json`,
        destination: `https://reddtok.nyc3.cdn.digitaloceanspaces.com/api/${sort}.json`,
    }))
  },
};

export default nextConfig;
