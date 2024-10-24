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

// const geistSans = localFont({
//  src: "./fonts/GeistVF.woff",
//  variable: "--font-geist-sans",
//  weight: "100 900",
// });
// const geistMono = localFont({
//  src: "./fonts/GeistMonoVF.woff",
//  variable: "--font-geist-mono",
//  weight: "100 900",
// });

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
   <body className={`${opensans.variable} antialiased`}>
    <section className="py-10">{children}</section>
   </body>
  </html>
 );
}
