import type { MetadataRoute } from "next";
import { LAB, LIVE, SITE } from "@/lib/content";

// One page, so one entry, with every on-page image listed for image search.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE.url}/opengraph-image.jpg`,
        ...LIVE.map((p) => SITE.url + p.shot),
        ...LAB.map((b) => SITE.url + b.img),
      ],
    },
  ];
}
