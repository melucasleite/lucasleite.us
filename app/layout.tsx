import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/content";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

// Mono for headings, labels and art; a proportional face for reading.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// The share image comes from app/opengraph-image.jpg (+ .alt.txt), which
// Next wires into both og:image and twitter:image.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: [
    "Lucas Leite",
    "principal software engineer",
    "control and automation engineer",
    "robotics",
    "reef automation",
    "REEF64",
    "Desloper",
    "ai-desloper",
    "open source",
    "macOS",
    "SwiftUI",
    "AI agents",
    "Claude Agent SDK",
    "Elixir",
    "Phoenix LiveView",
    "Next.js",
    "Orlando",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
    firstName: "Lucas",
    lastName: "Leite",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1e1e2e",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: page changes jump to the top (or back to where you
    // were) instantly; in-page section links still scroll smoothly.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jetbrains.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
