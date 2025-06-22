/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['straus.s3.amazonaws.com', 'localhost'],
    remotePatterns: [
      {
        protocol: new URL(process.env.NEXT_PUBLIC_BACK_END_URL).protocol.replace(':', ''), // remove the trailing colon
        hostname: new URL(process.env.NEXT_PUBLIC_BACK_END_URL).hostname,
        port: new URL(process.env.NEXT_PUBLIC_BACK_END_URL).port || '', // empty if no port
        pathname: '/**', // wildcard for all images
      },
    ],
  },
};

export default nextConfig;