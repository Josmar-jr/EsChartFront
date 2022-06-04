/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  defaultLocale: 'en-US',
  i18n: {
    locales: ['pt-BR', 'en-US', 'fr', 'nl-NL'],
    defaultLocale: 'pt-BR'
  }
};

module.exports = nextConfig;
