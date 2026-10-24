import { ImageResponse } from "next/og";
import { REPOS } from "@/lib/content";

// A share card per project, in the site's palette.
export const alt = "Open-source project by Lucas Leite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return REPOS.map((r) => ({ slug: r.name }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = REPOS.find((p) => p.name === slug) ?? REPOS[0];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background:
          "radial-gradient(circle at 0% 0%, #4a3a6b 0%, #1e1e2e 45%, #11111b 100%)",
        color: "#cdd6f4",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, color: "#7f849c" }}>
        <span style={{ color: "#a6e3a1", marginRight: 16 }}>$</span>
        cd ~/projects/{r.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#cba6f7",
            letterSpacing: -2,
          }}
        >
          {r.title ?? r.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            lineHeight: 1.35,
            color: "#a6adc8",
            maxWidth: 1000,
          }}
        >
          {r.blurb.length > 140 ? r.blurb.slice(0, 137) + "…" : r.blurb}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
          color: "#7f849c",
        }}
      >
        <div style={{ display: "flex", gap: 18 }}>
          {r.tags.map((t) => (
            <span key={t}>[{t}]</span>
          ))}
        </div>
        <span style={{ color: "#89b4fa" }}>lucasleite.us</span>
      </div>
    </div>,
    size,
  );
}
