/** @type {import('next').NextConfig} */
const nextConfig = {
     reactStrictMode: false,
     swcMinify: true,
     trailingSlash: false,
     images: {
          unoptimized: true, // เพิ่มบรรทัดนี้
          domains: [
               'localhost',
               'cdn.runrepeat.com',
               'encrypted-tbn0.gstatic.com',
               'encrypted-tbn2.gstatic.com'
          ],
     },
};

export default nextConfig;
