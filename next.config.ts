import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  images: {
    domains: [
      "report-photos-131715058503.s3.amazonaws.com",
      "dev-report-photos-131715058503.s3.amazonaws.com",
    ],
  },
  // i18n: {
  //   locales: ["en", "jp"],
  //   defaultLocale: "en",
  // },
};

export default nextConfig;
