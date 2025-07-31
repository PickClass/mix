import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		// serverActions: true,
	},
	allowedDevOrigins: ['192.168.2.42']
};

export default nextConfig;
