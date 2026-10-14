import type { Metadata, Viewport } from "next";
import { Anybody, Fragment_Mono } from "next/font/google";

import "./globals.css";

// Anybody's width axis runs from 50 to 150, so one family covers both the
// ultra-expanded display type and normal-width body copy.
const anybody = Anybody({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-anybody",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Harun Şahinol",
  description:
    "Developer in Turkey building web and mobile apps, from the interface down to the servers.",
};

export const viewport: Viewport = {
  themeColor: "#E7E6FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anybody.variable} ${fragmentMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
