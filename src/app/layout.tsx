import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clothing Nexus | Leading Manufacturer of Metal Garment Accessories",
  description: "Clothing Nexus specializes in high-quality jeans buttons, rivets, snap buttons, and metal eyelets for the global garment industry. 20+ years of excellence.",
  keywords: "jeans buttons, rivets, snap buttons, metal eyelets, garment accessories, clothing nexus",
};

import { InquiryProvider } from "@/context/InquiryContext";
import InquiryFooter from "@/components/InquiryFooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-teal/30 selection:text-navy`}>
        <InquiryProvider>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <InquiryFooter />
        </InquiryProvider>
      </body>
    </html>
  );
}
