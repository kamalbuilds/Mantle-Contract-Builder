/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript : {
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: true,
        missingSuspenseWithCSRBailout: false,
    }
};

export default nextConfig;
