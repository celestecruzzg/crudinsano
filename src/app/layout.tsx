import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CRUD Insano",
  description: "CRUD Insano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="crudinsano" />
      <link rel="manifest" href="/site.webmanifest" />
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
