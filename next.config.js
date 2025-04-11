/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['detect-libc'],
    webpack: (config, { isServer }) => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding', 'detect-libc');
      if (!isServer) {
        // Используем наш mock-файл для detect-libc на клиенте
        config.resolve.alias = {
          ...config.resolve.alias,
          'detect-libc': require.resolve('./mocks/detect-libc.js')
        };
        
        config.resolve.fallback = {
          ...config.resolve.fallback,
          net: {},
          tls: {},
          fs: {},
          http: {},
          https: {},
          stream: {},
          crypto: {},
          zlib: {},
          path: {},
          os: {},
          child_process: {},
        };
      }
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'magenta-patient-skink-342.mypinata.cloud',
          port: '',
          pathname: '/ipfs/**',
        },
      ],
      domains: ['magenta-patient-skink-342.mypinata.cloud'],
    },
  };
  
  module.exports = nextConfig;