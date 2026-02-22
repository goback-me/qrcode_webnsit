// app/bulk-qr-generator/page.tsx (Server Component)
import { Metadata } from "next";
import BulkGeneratorClient from "./components/bulkqrgenerator";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Bulk QR Code Generator – Generate Multiple QR Codes Instantly | Gen QR",
    description: "Generate hundreds of QR codes at once from Excel or CSV files.",
    alternates: {
    canonical: "https://www.genqrgenerator.com/bulk-qr-generator",
  },
  };
  
}

export default function BulkGeneratorPage() {
  return <BulkGeneratorClient />;
}