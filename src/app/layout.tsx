import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kido-nest.fun";

export const metadata: Metadata = {
  title: "KidoNest — You Control. They Explore.",
  description:
    "KidoNest gives parents the power to approve videos, manage interests, and create a safe screen time experience for kids.",
  keywords: [
    "parental control",
    "kids videos",
    "safe content",
    "screen time",
    "KidoNest",
  ],
  metadataBase: new URL(siteUrl),
  themeColor: "#7B4DFF",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "KidoNest — You Control. They Explore.",
    description:
      "A safe, parent-controlled video platform built for families.",
    type: "website",
    url: siteUrl,
    siteName: "KidoNest",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KidoNest — safe learning for kids",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KidoNest — You Control. They Explore.",
    description:
      "A safe, parent-controlled video platform built for families.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-white font-sans antialiased">{children}</body>
    </html>
  );
}
