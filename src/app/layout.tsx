import type { Metadata } from "next";
import { Poppins , DM_Sans} from "next/font/google";
import "./globals.css";
import Header from "@/components/header"; 
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster"; 

// Configure Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dmSans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QRGen - Free QR Code Generator", 
  description: "A free, privacy-friendly QR code generator web application...",
   verification: {
    google: "G16UW3Zll9XXi-ZkcLrzUfaWwhLK7wqEPTFVeFAt1oA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dmSans.variable} site-bg`}>
        <Header />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}