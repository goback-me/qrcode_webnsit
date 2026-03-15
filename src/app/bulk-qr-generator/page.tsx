// app/bulk-qr-generator/page.tsx (Server Component)
import { Metadata } from "next";
import BulkGeneratorClient from "./components/bulkqrgenerator";

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genqrgenerator.com' },
    { '@type': 'ListItem', position: 2, name: 'Bulk QR Generator', item: 'https://www.genqrgenerator.com/bulk-qr-generator' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Bulk QR Code Generator – CSV & Batch | GenQRGenerator",
    description: "Generate hundreds of QR codes at once with our bulk QR code generator. Upload a CSV or enter URLs manually. Free, fast & no sign up needed. Start now!",
    alternates: {
    canonical: "https://www.genqrgenerator.com/bulk-qr-generator",
  },
  };
  
}

export default function BulkGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BulkGeneratorClient />
    </>
  );
}