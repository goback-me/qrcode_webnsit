import QRGenerator from "@/components/(qr-generator)/QrGenerator";
import { CheckCircle, Smartphone, Globe, Shield } from "lucide-react";
import { getHomePageContent } from "@/lib/content";
import Image from "next/image";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Gen QR Generator - Create QR Codes Instantly",
  description:
    "Generate high-quality QR codes for URLs, PDFs, WhatsApp, and more.",

    alternates: {
    canonical: "https://www.genqrgenerator.com/",
  },
};

export default function Home() {
  const content = getHomePageContent();

  return (
    <div className="font-poppins">
      {/* Hero Banner with Gradient */}
      <section className="banner-gradient">
        <div className="mt-16 md:mt-25 container py-6 md:py-8">
          <div className="main_heading_content flex justify-center flex-col mb-8 md:mb-12 max-w-7xl mx-auto px-4 md:px-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 text-gray-900 leading-tight">
              {content.heroSection.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
              {content.heroSection.subheadline}
            </p>
          </div>
          <div className="flex justify-center w-full px-4 md:px-0">
            <div className="input-card w-full max-w-7xl">
              <QRGenerator />
            </div>
          </div>
        </div>
      </section>

      <main className="main_website_content">

        {/* How It Works Section */}
        <section className="py-12 md:py-16 section-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-4 leading-tight">
                {content.howItWorks.heading}
              </h2>
            </div>

            <div className="steps_wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {content.howItWorks.steps.map((step, index) => (
                <div key={index} className="step_item">
                  <div className="step_number bg-primary text-white px-3 py-4 w-2 h-0 flex items-center justify-center rounded-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="step_title text-2xl mt-5 mb-4 text-heading font-semibold">
                    {step.title}
                  </h3>
                  <p className="step_description text-body">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 section-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-4 leading-tight">
                {content.featuresSection.heading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {content.featuresSection.features.map((feature, index)=> (
                <div key={index} className="glass-card">
                  <h3 className="feature_title text-xl font-semibold mb-3 text-heading">
                    {feature.title}
                  </h3>
                  <p className="feature_description text-body">
                    {feature.description}
                  </p>
                </div>  
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-12 md:py-16 section-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-4 leading-tight">
                {content.useCases.heading}
              </h2>
              <p className="text-base sm:text-lg text-body max-w-2xl mx-auto leading-relaxed">
                Discover how QR codes can transform your business and personal projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {content.useCases.items.map((item, index) => (
                <div key={index} className="glass-card">
                  <h3 className="use_case_title text-xl font-semibold mb-3 text-heading">
                    {item.title}
                  </h3>
                  <p className="use_case_description text-body">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 section-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-heading mb-6">
                  {content.whyChooseUs.heading}
                </h2>
                <div className="space-y-6">
                  {content.whyChooseUs.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="text-primary w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-heading">
                          {reason.title}
                        </h3>
                        <p className="text-body">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg mb-6 inline-block">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image src="/business_qrcode.svg" width={150} height={150} alt="qrgen_qrcode"/>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-heading">
                    Professional Results
                  </h3>
                  <p className="text-body">
                    Create QR codes that look great and work flawlessly across all devices and platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 section-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-4 leading-tight">
                {content.faqSection.heading}
              </h2>
              <p className="text-base sm:text-lg text-body leading-relaxed">
                Everything you need to know about QR codes
              </p>
            </div>

            <div className="space-y-6">
              {content.faqSection.faqs.map((faq, index) => (
                <div key={index} className="faq_item glass-card">
                  <h3 className="faq_question text-xl font-semibold mb-2 text-heading">
                    {faq.question}
                  </h3>
                  <p className="faq_answer text-body">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
