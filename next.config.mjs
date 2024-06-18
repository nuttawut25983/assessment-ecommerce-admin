/** @type {import('next').NextConfig} */
const nextConfig = {
     reactStrictMode: false,
     swcMinify: true,
     trailingSlash: false,
     images: {
          domains: [
               'localhost',
               'cdn.runrepeat.com',
               'encrypted-tbn0.gstatic.com',
               'encrypted-tbn2.gstatic.com'
          ],
     },
};

export default nextConfig;
