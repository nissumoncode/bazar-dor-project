import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাংলাদেশের বাজার দর",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col">
        <Toaster position="top-right" />
        <div className="sticky top-0 z-50">
          <Navbar />
          <PriceTicker />
        </div>
        <main className="bg-blue-100 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
