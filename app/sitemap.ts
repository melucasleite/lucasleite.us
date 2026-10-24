import type { MetadataRoute } from "next";
import { LAB, LIVE, REPOS, SITE } from "@/lib/content";

// The homepage with every image on it, then the projects index and one
// page per project.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE.url}/opengraph-image.jpg`,
        ...[...new Set([...LIVE, ...REPOS].flatMap((p) => p.shot ?? []))].map(
          (shot) => SITE.url + shot,
        ),
        ...LAB.map((b) => SITE.url + b.img),
      ],
    },
    {
      url: `${SITE.url}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...REPOS.map((r) => ({
      url: `${SITE.url}/projects/${r.name}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      ...(r.shot && { images: [SITE.url + r.shot] }),
    })),
  ];
}
