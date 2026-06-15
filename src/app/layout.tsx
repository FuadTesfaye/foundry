import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { platform } from "@/lib/config";

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
    default: `${platform.app.name} — ${platform.app.tagline}`,
    template: `%s — ${platform.app.name}`,
  },
  description: platform.app.description,
  openGraph: {
    type: "website",
    siteName: platform.app.name,
    title: platform.app.tagline,
    description: platform.app.description,
  },
  twitter: {
    card: "summary_large_image",
    title: platform.app.tagline,
    description: platform.app.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white antialiased">{children}</body>
    </html>
  );
}
