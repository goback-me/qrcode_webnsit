import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header"; 
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster"; 

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GenQR Generator - Free QR Code Generator", 
  description: "Free QR code generator for Website URLs, WiFi, vCard, Text, Email and Phone numbers. No sign-up required. No watermark.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://genqrgenerator.com"),
  verification: {
    google: "G16UW3Zll9XXi-ZkcLrzUfaWwhLK7wqEPTFVeFAt1oA",
  },
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GenQRGenerator',
  url: 'https://www.genqrgenerator.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.genqrgenerator.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GenQRGenerator',
  url: 'https://www.genqrgenerator.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.genqrgenerator.com/business_qrcode.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} font-sans`}>
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
