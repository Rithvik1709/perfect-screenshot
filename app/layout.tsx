import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Perfect-Screenshot",
    template: "%s | Perfect-Screenshot",
  },
  description: "Create stunning showcase images for your projects with customizable templates and layouts. A fully in-browser canvas editor for adding images, text, and backgrounds—no external services required.",
  keywords: ["image editor", "canvas editor", "design tool", "image showcase", "template builder", "in-browser editor", "client-side export"],
  authors: [{ name: "Perfect-Screenshot" }],
  creator: "Perfect-Screenshot",
  publisher: "Perfect-Screenshot",
  metadataBase: new URL(process.env.BETTER_AUTH_URL || "https://stage-psi-one.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Apply Perfect",
    title: "Apply Perfect - Image Showcase Builder",
    description: "Create stunning showcase images for your projects with customizable templates and layouts",
    images: [
      {
        url: "https://stage-psi-one.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Perfect-Screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply Perfect - Image Showcase Builder",
    description: "Create stunning showcase images for your projects with customizable templates and layouts",
    images: ["https://stage-psi-one.vercel.app/og.png"],
    creator: "@stage",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // icons removed (logo intentionally removed)
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
      <script defer src="https://cloud.umami.is/script.js" data-website-id="11f36f2b-1ef5-4014-bfdb-089aa4770c53"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
