import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

function getDocsSlugs(): string[] {
  const docsDir = path.join(process.cwd(), "app/docs");
  return fs.readdirSync(docsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !name.startsWith("["));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kenchiku.ai";
  const docsEntries = getDocsSlugs().map((slug) => ({
    url: `${baseUrl}/docs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/docs`, lastModified: new Date(), priority: 0.8 },
    ...docsEntries,
  ];
}