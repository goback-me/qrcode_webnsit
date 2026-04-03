import QRGenerator from "@/components/(qr-generator)/QrGenerator";
import { 
  Link2, 
  Wifi, 
  Contact, 
  FileText, 
  Mail, 
  Phone,
  Palette,
  Zap,
  Download,
  BarChart3,
  Shield,
  Globe,
  Check,
  X,
  Plus,
  Minus
} from "lucide-react";
import { getHomePageContent } from "@/lib/content";
import Image from "next/image";
import { Metadata } from "next";
import Reveal from "@/components/ui/reveal";
import { FAQSection } from "@/components/home/FAQSection";

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GenQRGenerator - Free QR Code Generator',
  url: 'https://www.genqrgenerator.com',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Free QR code generator for Website URLs, WiFi, vCard, Text, Email and Phone numbers. No sign-up required.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '120',
  },
};

export const metadata: Metadata = {
  title: "Free QR Code Generator - URL, WiFi, vCard & More | GenQR",
  description:
    "Generate QR codes free for Website URLs, WiFi, vCard, Text, Email & Phone. No sign up required. No watermark. Create & download yours now!",
  alternates: {
    canonical: "https://www.genqrgenerator.com/",
  },
};

export default function Home() {
  const content = getHomePageContent();

  const howItWorksSteps = [
    {
      number: "1",
      title: "Choose QR Type",
      description: "Select from URL, WiFi, vCard, Text, Email or Phone.",
      icon: FileText,
    },
    {
      number: "2",
      title: "Enter Your Content",
      description: "Add your link, text, or contact details.",
      icon: Palette,
    },
    {
      number: "3",
      title: "Download & Share",
      description: "Get your QR code in PNG, SVG, or PDF format.",
      icon: Download,
    },
  ];

  const features = [
    {
      title: "Custom Design",
      description: "Add logos, change colors, and customize your QR codes.",
      icon: Palette,
    },
    {
      title: "Multiple Formats",
      description: "Download in PNG, SVG, PDF and more formats.",
      icon: Download,
    },
    {
      title: "Instant Generation",
      description: "Create QR codes in seconds with live preview.",
      icon: Zap,
    },
    {
      title: "Analytics Ready",
      description: "Track scans and monitor performance.",
      icon: BarChart3,
    },
    {
      title: "Privacy First",
      description: "Your data stays private. No tracking.",
      icon: Shield,
    },
    {
      title: "Works Everywhere",
      description: "Compatible with all QR code scanners.",
      icon: Globe,
    },
  ];

  const qrTypes = [
    { label: "URL", icon: Link2 },
    { label: "WiFi", icon: Wifi },
    { label: "vCard", icon: Contact },
    { label: "Text", icon: FileText },
    { label: "Email", icon: Mail },
    { label: "Phone", icon: Phone },
  ];

  const comparisonData = [
    { feature: "Unlimited QR codes", genqr: true, others: false },
    { feature: "No sign up required", genqr: true, others: false },
    { feature: "No watermark", genqr: true, others: false },
    { feature: "Custom logo upload", genqr: true, others: true },
    { feature: "Multiple formats (PNG, SVG)", genqr: true, others: true },
    { feature: "100% Free forever", genqr: true, others: false },
  ];

  const whyChooseUs = [
    {
      title: "100% Free",
      description: "Generate unlimited QR codes without any cost.",
      icon: Check,
    },
    {
      title: "No Sign Up",
      description: "Start creating immediately. No registration.",
      icon: Check,
    },
    {
      title: "No Watermark",
      description: "Clean, professional QR codes every time.",
      icon: Check,
    },
    {
      title: "Privacy Focused",
      description: "We don&apos;t store or track your data.",
      icon: Shield,
    },
  ];

  const testimonials = [
    {
      quote: "GenQR transformed how we run campaigns. Simple and effective.",
      name: "Sarah Chen",
      role: "Marketing Director",
      initials: "SC",
    },
    {
      quote: "Best QR generator we&apos;ve used. Clean and straightforward.",
      name: "Michael Rodriguez",
      role: "Founder",
      initials: "MR",
    },
    {
      quote: "We use GenQR for digital menus. Customers love it.",
      name: "Emily Johnson",
      role: "Restaurant Owner",
      initials: "EJ",
    },
  ];

  return (
    <div className="font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      {/* 1. Hero Section - White bg */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <Reveal>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] text-sm font-medium mb-6">
                  Free &middot; No Sign Up &middot; No Watermark
                </div>
              </Reveal>
              
              <Reveal delay={0.05}>
                <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#111827] leading-tight mb-6 text-balance">
                  Generate QR Codes Instantly
                </h1>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="text-base md:text-lg text-[#6B7280] mb-8 max-w-xl leading-relaxed">
                  Create high-quality QR codes for URLs, WiFi, vCard, and more. 
                  Free, fast, and no account needed.
                </p>
              </Reveal>
              
              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="#generator" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-all hover:scale-[1.02]"
                  >
                    Generate QR Code
                  </a>
                  <a 
                    href="/bulk-qr-generator" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#E5E7EB] text-[#6B7280] font-medium rounded-lg hover:border-[#6B7280] hover:text-[#111827] transition-colors"
                  >
                    Bulk Generator
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right - QR Preview Card with float animation */}
            <Reveal delay={0.2} className="flex justify-center lg:justify-end">
              <div className="animate-float">
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-lg">
                  <div className="w-48 h-48 mx-auto mb-4">
                    <Image 
                      src="/business_qrcode.svg" 
                      width={192} 
                      height={192} 
                      alt="Sample QR Code"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-center text-[#6B7280] text-sm">
                    Scan to visit genqrgenerator.com
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Generator Widget Section - Off-white bg */}
      <section id="generator" className="bg-[#F9FAFB] py-16 md:py-20">
        <div className="container">
          <Reveal className="max-w-5xl mx-auto">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8">
              <QRGenerator />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. How It Works - Off-white bg */}
      <section className="bg-[#F9FAFB] py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#111827] mb-4">
                How It Works
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base md:text-lg text-[#6B7280] max-w-2xl mx-auto">
                Create your QR code in three simple steps
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            {howItWorksSteps.map((step, index) => (
              <Reveal key={index} delay={index * 0.1} className="relative">
                <div className="text-center">
                  {/* Step number with dashed border */}
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#E5E7EB] flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#4F46E5] font-semibold">{step.number}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-[#6B7280]" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Dashed connector line */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] border-t-2 border-dashed border-[#E5E7EB]" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Features Bento Grid - White bg */}
      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#111827] mb-4">
                Everything You Need
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base md:text-lg text-[#6B7280] max-w-2xl mx-auto">
                Powerful features to create professional QR codes
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#4F46E5] transition-colors group">
                  <div className="w-10 h-10 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-[#6B7280]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QR Types Row - Off-white bg */}
      <section className="bg-[#F9FAFB] py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#111827] mb-4">
                Supported QR Types
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {qrTypes.map((type, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="flex flex-col items-center gap-3 p-4 bg-white border border-[#E5E7EB] rounded-xl">
                  <type.icon className="w-6 h-6 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#6B7280]">{type.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Comparison Table - White bg */}
      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#111827] mb-4">
                Why GenQR?
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base md:text-lg text-[#6B7280] max-w-2xl mx-auto">
                See how we compare to other QR generators
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="max-w-2xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-[#111827] font-semibold border-b border-[#E5E7EB]">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 text-[#111827] font-semibold border-b border-[#E5E7EB] bg-[#EEF2FF]">
                      GenQR
                    </th>
                    <th className="text-center py-4 px-4 text-[#111827] font-semibold border-b border-[#E5E7EB]">
                      Others
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index}>
                      <td className="py-4 px-4 text-[#6B7280] border-b border-[#E5E7EB]">
                        {row.feature}
                      </td>
                      <td className="py-4 px-4 text-center border-b border-[#E5E7EB] bg-[#EEF2FF]">
                        {row.genqr ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-[#6B7280] mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-4 text-center border-b border-[#E5E7EB]">
                        {row.others ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-[#6B7280] mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. Why Choose Us - Off-white bg */}
      <section className="bg-[#F9FAFB] py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#111827] mb-4">
                Why Choose GenQR
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-center">
                  <div className="w-10 h-10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-[#6B7280]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials - White bg */}
      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#111827] mb-4">
                Trusted by Businesses
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
                  <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center">
                      <span className="text-[#6B7280] text-sm font-medium">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#111827] font-medium text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-[#6B7280] text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ - Off-white bg */}
      <section className="bg-[#F9FAFB] py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#111827] mb-4">
                Frequently Asked Questions
              </h2>
            </Reveal>
          </div>

          <div className="max-w-2xl mx-auto">
            <FAQSection faqs={content.faqSection.faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
