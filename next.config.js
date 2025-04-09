/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          net: false,
          tls: false,
          fs: false,
          http: false,
          https: false,
          stream: false,
          crypto: false,
          zlib: false,
          path: false,
          os: false,
        };
      }
      return config;
    },
    images: {
      domains: ['magenta-patient-skink-342.mypinata.cloud'],
    },
  };
  
  module.exports = nextConfig;