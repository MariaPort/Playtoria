/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: '/',
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  rewrites: async () => [
    {
      source: '/dynamic-sitemap.xml',
      destination: '/dynamic-sitemap',
    },
    {
      source: '/dynamic-sitemap-:page.xml',
      destination: '/dynamic-sitemap/:page',
    },
  ],
};

module.exports = nextConfig;
