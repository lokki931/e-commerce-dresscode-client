/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: 'http://localhost:5544/api/v1',
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
