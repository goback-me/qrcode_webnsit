import type { Metadata } from "next";
import "./globals.css"; // Your main CSS file
import Header from "@/components/header"; // Assuming you move header.tsx to src/components
import Footer from "@/components/footer"; // Assuming you move footer.tsx to src/components
import { Toaster } from "@/components/ui/toaster"; // If you're using a global toaster

export const metadata: Metadata = {
  title: "QRGen - Free QR Code Generator", // From public/ai-content-schema.json
  description: "A free, privacy-friendly QR code generator web application...", // From public/ai-content-schema.json
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main> {/* This is where your page content will be rendered */}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}