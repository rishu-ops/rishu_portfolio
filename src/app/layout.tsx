import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MouseSpotlight } from "@/components/ui/spotlight";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://rishurana.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rishu Rana — Fullstack Developer",
    template: "%s | Rishu Rana",
  },
  description:
    "Fullstack developer with 1.5+ years of experience in React.js and Node.js, building fast, clean web applications. Based in Chandigarh, India.",
  keywords: [
    "Rishu Rana",
    "Fullstack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Frontend Developer",
    "Web Developer",
    "Chandigarh",
    "India",
  ],
  authors: [{ name: "Rishu Rana", url: siteUrl }],
  creator: "Rishu Rana",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Rishu Rana Portfolio",
    title: "Rishu Rana — Fullstack Developer",
    description:
      "Fullstack developer with 1.5+ years of experience in React.js and Node.js.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rishu Rana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishu Rana — Fullstack Developer",
    description: "Fullstack developer — React, Next.js, Node.js. Chandigarh.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: [{ url: "/favicon.ico" }] },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <MouseSpotlight />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
