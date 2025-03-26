/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: true,
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
