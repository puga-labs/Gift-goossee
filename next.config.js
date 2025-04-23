/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  reactStrictMode: true,
  // Отключение предупреждений о несоответствии гидратации
  onDemandEntries: {
    // Опциональная настройка
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Опция suppressHydrationWarning должна использоваться в React компонентах, а не в next.config.js
  // suppressHydrationWarning: true,
  transpilePackages: ["detect-libc"],
  webpack: (config, { isServer }) => {
    // Добавляем внешние зависимости
    config.externals = [...(config.externals || []), "pino-pretty", "lokijs", "encoding", "detect-libc"];
    
    // Настройки только для клиентской сборки
    if (!isServer) {
      // Mock для detect-libc
      if (!config.resolve) config.resolve = {};
      if (!config.resolve.alias) config.resolve.alias = {};
      
      config.resolve.alias["detect-libc"] = require.resolve("./mocks/detect-libc.js");
      
      // Правильная настройка fallback (бэкпорт для модулей Node.js)
      config.resolve.fallback = {
        // Отключаем эти модули Node.js на клиенте
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
        child_process: false
      };
    }
    
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "magenta-patient-skink-342.mypinata.cloud", 
        port: "",
        pathname: "/ipfs/**",
      },
    ],
    domains: ["magenta-patient-skink-342.mypinata.cloud"],
  },
  async rewrites() {
    return [
      {
        source: "/ipfs/:hash*",
        destination: "https://magenta-patient-skink-342.mypinata.cloud/ipfs/:hash*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/receive",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
