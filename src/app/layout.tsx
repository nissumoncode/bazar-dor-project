import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import PriceTicker from "@/components/PriceTicker";

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
        <Navbar />
        <PriceTicker />
        <main className="bg-blue-100 flex-1">{children}</main>
      </body>
    </html>
  );
}
