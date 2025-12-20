import QRGenerator from "@/components/(qr-generator)/QrGenerator";
import { CheckCircle, Smartphone, Globe, Shield } from "lucide-react";
import { getHomePageContent } from "@/lib/content";
import Image from "next/image";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Gen QR Generator - Create QR Codes Instantly",
  description:
    "Generate high-quality QR codes for URLs, PDFs, WhatsApp, and more.",
};

export default function Home() {
  const content = getHomePageContent();

  return (
    <div className="min-h-screen font-poppins">
      {/* Qr Generator   */}
      <main className="main_website_content">
        <section className="banner_wrapper_section responsive-margin">
          <div className="main_heading_content flex items-center justify-center flex-col py-10 md:pb-20 md:py-0">
            <h1 className="text-4xl font-medium mb-2">
              {content.heroSection.title}
            </h1>
            <p>{content.heroSection.subheadline}</p>
          </div>
          <div className=" flex justify-center w-full">
            <div className="p-2 bg-gray-200 rounded-lg max-w-6xl w-full">
              <QRGenerator />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium text-gray-900 mb-4">
                {content.howItWorks.heading}
              </h2>
            </div>

            <div className="steps_wrapper grid-cols-3 grid gap-5">
              {content.howItWorks.steps.map((step, index) => (
                <div key={index} className="step_item">
                  <div className="step_number bg-black text-white px-3 py-4 w-2 h-0 flex items-center justify-center rounded-sm">
                    {index + 1}
                  </div>
                  <h3 className="step_title text-2xl mt-5 mb-4">
                    {step.title}
                  </h3>
                  <p className="step_description text-gray-700">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-inherit responsive-margin">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium text-gray-900 mb-4">
                {content.featuresSection.heading}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-10">
              {content.featuresSection.features.map((feature, index)=> (
                <div key={index} className="feature_item p-5 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="feature_title text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="feature_description text-gray-700">
                    {feature.description}
                  </p>
                </div>  
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium text-gray-900 mb-4">
                {content.useCases.heading}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover how QR codes can transform your business and personal
                projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.useCases.items.map((item, index) => (
                <div key={index} className="use_case_item bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <h3 className="use_case_title text-xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="use_case_description text-gray-700">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-medium text-gray-900 mb-6">
                  {content.whyChooseUs.heading}
                </h2>
                <div className="space-y-6">
                  {content.whyChooseUs.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="text-blue-600 w-6 h-6 mt-1 mr-4" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-gray-700">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg mb-6 inline-block">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image src="/business_qrcode.svg" width={150} height={150} alt="qrgen_qrcode"/>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Professional Results
                  </h3>
                  <p className="text-gray-600">
                    Create QR codes that look great and work flawlessly across
                    all devices and platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium text-gray-900 mb-4">
                {content.faqSection.heading}
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about QR codes
              </p>
            </div>

            <div className="space-y-6">
              {content.faqSection.faqs.map((faq, index) => (
                <div key={index} className="faq_item bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <h3 className="faq_question text-xl font-semibold mb-2">
                    {faq.question}
                  </h3>
                  <p className="faq_answer text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
