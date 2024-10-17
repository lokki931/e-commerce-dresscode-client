/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: 'http://localhost:5544/api/v1',
    backUrl: 'http://localhost:5544',
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5544', // specify the port if needed
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
