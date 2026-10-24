import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const description =
  "Control & automation engineer turned principal software engineer. Builds robots, games, reef robots and AI tooling.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lucasleite.us"),
  title: "Lucas Leite",
  description,
  openGraph: {
    title: "lucas@leite ~ ❯",
    description,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "lucas@leite ~ ❯",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e1e2e",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body>{children}</body>
    </html>
  );
}
