/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "ar",
    localeDetection: false,
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
