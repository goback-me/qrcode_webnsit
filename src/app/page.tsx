import QRGenerator from "@/components/(qr-generator)/QrGenerator";
import { CheckCircle, Star, Check, Palette, Zap, Grid3X3, FileText, Download, BookOpen, BarChart3, PencilLine, SlidersHorizontal, ScanLine, Link2, ContactRound, ShieldCheck } from "lucide-react";
import { getHomePageContent } from "@/lib/content";
import Image from "next/image";
import { Metadata } from "next";
import Reveal from "@/components/ui/reveal";


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

  const howItWorksIcons = [PencilLine, SlidersHorizontal, ScanLine];
  const useCaseIcons = [Link2, ContactRound, ShieldCheck, Grid3X3, BookOpen, BarChart3];
  const useCaseAccents = [
    "border-blue-100 bg-blue-50/50",
    "border-emerald-100 bg-emerald-50/50",
    "border-amber-100 bg-amber-50/45",
  ];

  const analyticsStats = [
    { value: "4.2K", label: "Total scans" },
    { value: "86%", label: "Mobile" },
    { value: "42", label: "Countries" },
  ];

  const testimonials = [
    {
      quote:
        "QRGen transformed how we run campaigns",
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechCorp",
    },
    {
      quote:
        "Best QR generator we used so far.",
      name: "Michael Rodriguez",
      role: "Founder",
      company: "Startup Owner",
    },
    {
      quote:
        "We use QRGen for digital menus and updates instantly. Customers love it.",
      name: "Emily Johnson",
      role: "Owner",
      company: "Cafe Delight",
    },
  ];

  const pricingPlans = [
    // {
    //   name: "Free",
    //   price: "$0",
    //   unit: "forever",
    //   cta: "Get Started",
    //   featured: false,
    //   features: ["5 QR codes", "PNG export", "Basic colors", "Community support"],
    // },
    {
      name: "Pro",
      price: "$9",
      unit: "/month",
      cta: "Start Free Trial",
      featured: true,
      features: [
        "Unlimited QR codes",
        "SVG + PDF export",
        "Custom logo",
        "Analytics dashboard",
        "Dynamic QR codes",
      ],
    },
    {
      name: "Business",
      price: "$29",
      unit: "/month",
      cta: "Contact Sales",
      featured: false,
      features: [
        "Everything in Pro",
        "Developer API",
        "Team collaboration",
        "White label",
        "Advanced analytics",
      ],
    },
  ];

  return (
    <div className="font-poppins">
      {/* Hero Banner with Gradient */}
      <section className="banner-gradient">
        <div className="mt-8 md:mt-16 container py-4 md:py-8">
          <Reveal className="main_heading_content flex justify-center flex-col mb-8 md:mb-12 max-w-7xl mx-auto px-4 md:px-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 text-gray-900 leading-tight">
              {content.heroSection.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
              {content.heroSection.subheadline}
            </p>
          </Reveal>
          <Reveal className="flex justify-center w-full px-4 md:px-0" delay={0.08}>
            <div className="input-card w-full max-w-7xl">
              <QRGenerator />
            </div>
          </Reveal>
        </div>
      </section>

      <main className="main_website_content">

        {/* How It Works Section */}
        <section className="py-12 md:py-16 section-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 mb-4">
                Simple workflow
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-4 leading-tight">
                {content.howItWorks.heading}
              </h2>
              <p className="text-base sm:text-lg text-body max-w-2xl mx-auto leading-relaxed">
                A focused three-step flow that keeps the process obvious from the first click to the final download.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5 lg:gap-6">
              {content.howItWorks.steps.map((step, index) => (
                <Reveal
                  key={index}
                  delay={index * 0.06}
                  className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                >
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                      {(() => {
                        const Icon = howItWorksIcons[index] ?? ScanLine;
                        return <Icon className="h-5 w-5" />;
                      })()}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Step 0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-heading mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-body text-sm md:text-base leading-7">
                    {step.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase Section */}
        <section className="py-12 md:py-16 section-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading mb-4 leading-tight">
                Everything you need, nothing you don't
              </h2>
            </div>

            {/* Top Row - 2 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              {/* Custom Design Studio */}
              <div className="glass-card p-6 md:p-8">
                <div className="flex items-start mb-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <Palette className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-heading">
                  Custom Design Studio
                </h3>
                <p className="text-body text-sm md:text-base mb-4">
                  Create stunning QR codes with custom colors, logos, and patterns
                </p>
                <div className="flex gap-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-blue-500 rounded-md"></div>
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-black rounded-md"></div>
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-emerald-500 rounded-md"></div>
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-amber-500 rounded-md"></div>
                </div>
              </div>

              {/* Dynamic QR */}
              <div className="glass-card p-6 md:p-8">
                <div className="flex items-start mb-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-heading">
                  Dynamic QR
                </h3>
                <p className="text-body text-sm md:text-base">
                  Edit content anytime without reprinting. Update your QR codes on the fly
                </p>
              </div>
            </div>

            {/* Bottom Row - 5 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {/* 15+ QR Types */}
              <div className="glass-card p-5 md:p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <h4 className="font-semibold text-heading text-sm md:text-base mb-1">15+ QR Types</h4>
                <p className="text-body text-xs md:text-sm">URL, WiFi, vCard, Menu & more</p>
              </div>

              {/* Bulk Generator */}
              <div className="glass-card p-5 md:p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <Grid3X3 className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <h4 className="font-semibold text-heading text-sm md:text-base mb-1">Bulk Generator</h4>
                <p className="text-body text-xs md:text-sm">Generate thousands from CSV</p>
              </div>

              {/* Multiple Formats */}
              <div className="glass-card p-5 md:p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <Download className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <h4 className="font-semibold text-heading text-sm md:text-base mb-1">Multiple Formats</h4>
                <p className="text-body text-xs md:text-sm">PNG, SVG, PDF & other formats</p>
              </div>

              {/* Blog Page */}
              <div className="glass-card p-5 md:p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <h4 className="font-semibold text-heading text-sm md:text-base mb-1">Blog & Resources</h4>
                <p className="text-body text-xs md:text-sm">Tips, guides, and QR code insights</p>
              </div>

              {/* Analytics */}
              <div className="glass-card p-5 md:p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <h4 className="font-semibold text-heading text-sm md:text-base mb-1">Analytics</h4>
                <p className="text-body text-xs md:text-sm">Track scans and monitor performance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section
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
        </section> */}

        {/* Use Cases Section */}
        <section className="py-12 md:py-16 section-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 mb-4">
                Where it works best
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-4 leading-tight">
                {content.useCases.heading}
              </h2>
              <p className="text-base sm:text-lg text-body max-w-2xl mx-auto leading-relaxed">
                Discover how QR codes can transform your business and personal projects
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5 lg:gap-6">
              {content.useCases.items.map((item, index) => (
                <Reveal
                  key={index}
                  delay={index * 0.06}
                  className={[
                    "rounded-[22px] border p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]",
                    useCaseAccents[index % useCaseAccents.length],
                  ].join(" ")}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white text-slate-700 shadow-sm">
                      {(() => {
                        const Icon = useCaseIcons[index] ?? Link2;
                        return <Icon className="h-5 w-5" />;
                      })()}
                    </div>
                    <span className="rounded-full border border-white/70 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
                      Use case
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-heading tracking-tight md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm md:text-base leading-7 max-w-[36rem]">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 section-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6 md:gap-10 items-start">
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                <div className="mb-8">
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 mb-3">
                    Why choose us
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-heading leading-tight">
                    {content.whyChooseUs.heading}
                  </h2>
                </div>

                <div className="space-y-4">
                  {content.whyChooseUs.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-1 text-heading">
                          {reason.title}
                        </h3>
                        <p className="text-body text-sm md:text-base leading-7">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-6 text-center">
                  <div className="bg-white p-4 rounded-2xl shadow-md mb-5 inline-block">
                    <div className="w-32 h-32 rounded-xl flex items-center justify-center">
                      <Image src="/business_qrcode.svg" width={128} height={128} alt="qrgen_qrcode"/>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-heading">
                    Professional Results
                  </h3>
                  <p className="text-body text-sm md:text-base leading-7">
                    Create QR codes that look great and work flawlessly across all devices and platforms.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Free</p>
                      <p className="mt-1 text-base font-semibold text-slate-900">Unlimited usage</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Output</p>
                      <p className="mt-1 text-base font-semibold text-slate-900">PNG, SVG, JPEG</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        {/* <section className="py-12 md:py-16 section-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="analytics-shell">
              <div className="mb-8 md:mb-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading mb-4 leading-tight">
                  Track every scan
                </h2>
                <p className="text-base sm:text-lg text-body max-w-3xl leading-relaxed">
                  Get detailed insights into how your QR codes perform with real-time analytics and comprehensive reports.
                </p>
              </div>

              <div className="analytics-stats-grid">
                {analyticsStats.map((item, index) => (
                  <div key={index} className="analytics-stat-card">
                    <p className="analytics-stat-value">{item.value}</p>
                    <p className="analytics-stat-label">{item.label}</p>
                  </div>
                ))}
              </div>

              <ul className="analytics-list mt-8">
                <li><CheckCircle className="h-5 w-5" /> Scans over time</li>
                <li><CheckCircle className="h-5 w-5" /> Country breakdown</li>
                <li><CheckCircle className="h-5 w-5" /> Device and browser data</li>
                <li><CheckCircle className="h-5 w-5" /> Hourly heatmap</li>
              </ul>
            </div>
          </div>
        </section> */}

        {/* Testimonials Section */}
        <section className="py-12 md:py-16 section-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading leading-tight">
                Loved by businesses worldwide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {testimonials.map((item, index) => (
                <Reveal key={index} delay={index * 0.06} className="testimonial-card">
                  <div className="flex gap-1 mb-4 text-blue-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="testimonial-quote">&quot;{item.quote}&quot;</p>
                  <div>
                    <p className="testimonial-name">{item.name}</p>
                    <p className="testimonial-role">{item.role}</p>
                    <p className="testimonial-role">{item.company}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {/* <section className="py-12 md:py-16 section-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading mb-4 leading-tight">
                Simple, transparent pricing
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`pricing-card ${plan.featured ? "pricing-card-featured" : ""}`}
                >
                  {plan.featured && <span className="pricing-badge">Most Popular</span>}
                  <p className="pricing-name">{plan.name}</p>
                  <div className="mb-6">
                    
                    <span className="pricing-price">0$</span>
                    <span className="text-2xl font-light line-through mx-2">{plan.price}</span>
                    <span className="pricing-unit">{plan.unit}</span>
                  </div>
                  <button
                    className={`w-full rounded-xl px-4 py-3 font-semibold transition-colors ${
                      plan.featured
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta}
                  </button>
                  <ul className="pricing-list">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check className="h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section> */}

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
                <Reveal key={index} delay={index * 0.04} className="faq_item glass-card">
                  <h3 className="faq_question text-xl font-semibold mb-2 text-heading">
                    {faq.question}
                  </h3>
                  <p className="faq_answer text-body">{faq.answer}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
