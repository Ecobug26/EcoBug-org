import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Pin the Turbopack workspace root to this package — a stray lockfile in
     the user's home directory otherwise trips Next.js root inference. */
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
