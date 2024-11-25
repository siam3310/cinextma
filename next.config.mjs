/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: false,
  reloadOnOnline: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  workboxOptions: {
    disableDevLogs: true
  }
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false
  },
};

const pwa = withPWA(nextConfig);

export default pwa;
