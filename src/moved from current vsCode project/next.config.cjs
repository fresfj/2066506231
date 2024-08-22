/**
 * @type {import('next').NextConfig}
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 */
const { composePlugins, withNx } = require('@nx/next');
const isStaticExport = 'false';

const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
};
const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

export default nextConfig;

module.exports = composePlugins(...plugins)(nextConfig);