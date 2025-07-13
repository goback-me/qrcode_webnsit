
import QRGenerator from "@/components/qr-generator";
import FeaturesSection from "@/components/features-section";
import PricingSection from "@/components/pricing-section";
import FAQSection from "@/components/faq-section";
// import AdSpace from "@/components/ad-space";
// import SEOHead, { generateWebApplicationStructuredData } from "@/components/seo-head";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      
      {/* Top Leaderboard Ad */}
      {/* <div className="flex justify-center py-4 px-4">
        <AdSpace size="leaderboard" label="Sponsored" />
      </div> */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QRGenerator />
        
        {/* Ad after QR Generator */}
        {/* <div className="flex justify-center my-16">
          <AdSpace size="rectangle" label="Advertisement" />
        </div> */}
        
        <FeaturesSection />
        
        {/* Ad between Features and Pricing */}
        {/* <div className="flex justify-center my-16">
          <AdSpace size="banner" label="Sponsored Content" />
        </div> */}
        
        <PricingSection />
        
        {/* Ad before FAQ */}
        {/* <div className="flex justify-center my-16">
          <AdSpace size="square" label="Advertisement" />
        </div> */}
        
        <FAQSection />
        
        {/* Bottom Ad before Footer */}
        {/* <div className="flex justify-center mt-16 mb-8">
          <AdSpace size="leaderboard" label="Sponsored" />
        </div> */}
      </main>
    </div>
  );
}