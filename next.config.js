/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  reactStrictMode: true,
  transpilePackages: ["detect-libc"],
  webpack: (config, { isServer }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", "detect-libc");
    if (!isServer) {
      // Используем наш mock-файл для detect-libc на клиенте
      config.resolve.alias = {
        ...config.resolve.alias,
        "detect-libc": require.resolve("./mocks/detect-libc.js"),
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
        destination:
          "https://magenta-patient-skink-342.mypinata.cloud/ipfs/:hash*",
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
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
