import { ImageResponse } from "next/og";

// iOS ignores SVG favicons, so draw the same ❯_ mark as a PNG.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#1e1e2e",
      }}
    >
      <svg width="180" height="180" viewBox="0 0 64 64">
        <path
          d="M16 20l14 12-14 12"
          fill="none"
          stroke="#cba6f7"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="34" y="40" width="16" height="6" rx="2" fill="#a6e3a1" />
      </svg>
    </div>,
    size,
  );
}
