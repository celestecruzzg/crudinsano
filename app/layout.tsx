// app/layout.tsx
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./components/ui/modal/ModalContext";

const monaSans = Mona_Sans({ variable: "--font-mona-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLife",
  description: "Tu guía definitiva para una vida saludable y activa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} font-sans antialiased`}>
          <ModalProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </ModalProvider>
      </body>
    </html>
  );
}
