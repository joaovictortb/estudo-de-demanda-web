/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Removido ignoreBuildErrors para melhor qualidade de código
    // ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuração para Edge Runtime
  experimental: {
    runtime: "edge",
  },
};

export default nextConfig;
