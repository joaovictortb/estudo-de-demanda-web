/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Remover configuração experimental de Edge Runtime
  // Isso pode causar problemas com CSS/Tailwind na Vercel
};

export default nextConfig;
