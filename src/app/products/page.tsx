import { Card } from "@/components/ui/card";
import { 
  Palette, 
  RefreshCw, 
  Sparkles, 
  Printer, 
  Wifi, 
  ScanLine, 
  Settings, 
  Wrench,
  Megaphone,
  Share2,
  BarChart3,
  Cpu
} from "lucide-react";
import featuresData from "@/content/pages/products.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic & Custom QR Code Generator Features – Free Online Tool | Gen QR Generator",
  description:
    "Explore powerful QR code generator features: dynamic QR codes, custom designs with logos, 3D & animated codes, bulk generation, WiFi QR codes, and more. Perfect for business, marketing, and personal use.",
};

// Type-safe icon mapping - this is the key fix
const iconMap: { [key: string]: any } = {
  palette: Palette,
  refresh: RefreshCw,
  sparkles: Sparkles,
  printer: Printer,
  wifi: Wifi,
  scan: ScanLine,
  settings: Settings,
  tool: Wrench,
  megaphone: Megaphone,
  share2: Share2,
  barChart: BarChart3,
  cpu: Cpu
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {featuresData.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            {featuresData.hero.subtitle}
          </p>
          <a
            href={featuresData.hero.ctaLink}
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg"
          >
            {featuresData.hero.ctaText}
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {featuresData.features.sectionTitle}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuresData.features.items.map((feature: any) => {
            const Icon = iconMap[feature.icon as string] || Settings;
            return (
              <Card
                key={feature.id}
                className="p-6 hover:shadow-xl transition-shadow duration-300 border-0 bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {featuresData.useCases.sectionTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuresData.useCases.items.map((useCase: any, index: number) => {
              const Icon = iconMap[useCase.icon as string] || Megaphone;
              return (
                <Card
                  key={index}
                  className="p-6 border-0 bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {useCase.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {useCase.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {featuresData.faq.sectionTitle}
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {featuresData.faq.items.map((faq: any, index: number) => (
            <Card key={index} className="p-6 border-0 bg-white shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {featuresData.cta.title}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {featuresData.cta.subtitle}
          </p>
        </div>
      </section>
    </div>
  );
}