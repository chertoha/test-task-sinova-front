import "../styles/globals.css";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
// import localFont from "next/font/local";

const opensans = Open_Sans({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: "Sinova test task",
  description: "Description - Sinova test task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/android-icon-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="./apple-icon-180x180.png" sizes="180x180" />
      </head>

      <body className={`${opensans.variable} antialiased`}>
        <section className="py-10">{children}</section>
      </body>
    </html>
  );
}
