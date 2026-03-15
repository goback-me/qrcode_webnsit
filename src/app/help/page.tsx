import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Globe,
  Image,
  Printer,
  RefreshCw,
  Smartphone,
  Play,
  Book,
  Mail,
  Code,
  CheckCircle2,
  AlertCircle,
  LucideIcon
} from "lucide-react";
import helpData from "@/content/pages/help.json";
import { Metadata } from "next";
import Reveal from "@/components/ui/reveal";
import Breadcrumb from "@/components/Breadcrumb";

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genqrgenerator.com' },
    { '@type': 'ListItem', position: 2, name: 'Help', item: 'https://www.genqrgenerator.com/help' },
  ],
};

export const metadata: Metadata = {
  title: helpData.meta.title,
  description: helpData.meta.description,
  alternates: {
    canonical: "https://www.genqrgenerator.com/help",
  },
};

// Type-safe icon mapping
const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  image: Image,
  printer: Printer,
  refresh: RefreshCw,
  smartphone: Smartphone,
  play: Play,
  book: Book,
  mail: Mail,
  code: Code
};

// Helper function to get icon safely
const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Globe;
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="border-b border-slate-200 bg-white">
        <Reveal className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <Breadcrumb items={[{ label: 'Help' }]} className="mb-4" />
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Help Center
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {helpData.hero.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Quick answers, practical guides, and direct links to the tools you need.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl">
            <Link
              href="/#generator"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-500">Quick Action</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">Open QR Generator</h2>
              <p className="mt-2 text-sm text-slate-600">Create a single QR code for URL, WiFi, vCard, text, email, or phone.</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700">
                Go to generator <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/bulk-qr-generator"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-500">Quick Action</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">Open Bulk Generator</h2>
              <p className="mt-2 text-sm text-slate-600">Generate many QR codes at once with CSV or manual list input.</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700">
                Go to bulk generator <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8 md:mb-12 leading-tight">
          {helpData.popularTopics.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {helpData.popularTopics.items.map((topic) => {
            const Icon = getIcon(topic.icon);
            return (
              <Reveal
                key={topic.id}
                delay={0.04}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <a
                  href={topic.link}
                  className="block"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <Icon className="w-5 h-5 text-slate-700 group-hover:text-blue-700 transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm md:text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                        {topic.title}
                      </h3>
                      <span className="mt-2 inline-flex items-center text-xs font-medium text-slate-500 group-hover:text-blue-700">
                        View guide <ChevronRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 md:pb-14 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Compass className="h-4 w-4 text-slate-500" />
                On this page
              </div>
              <nav className="space-y-1">
                {helpData.helpSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-6 md:space-y-8">
            {helpData.helpSections.map((section) => {
              const Icon = getIcon(section.icon);
              return (
                <Reveal key={section.id}>
                  <article id={section.id} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4 md:space-y-5">
                    {section.content.map((block: { type: string; text?: string; items?: string[] | Array<{ title: string; features: string[] }>; }, idx: number) => {
                      if (block.type === "paragraph") {
                        return (
                          <p key={idx} className="text-sm md:text-base text-slate-700 leading-7">
                            {block.text}
                          </p>
                        );
                      }

                      if (block.type === "steps" && Array.isArray(block.items)) {
                        return (
                          <ol key={idx} className="space-y-2.5">
                            {block.items.map((step, stepIdx) => (
                              <li key={stepIdx} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                                  {stepIdx + 1}
                                </span>
                                <span className="text-sm md:text-base text-slate-700 leading-7">
                                  {step as string}
                                </span>
                              </li>
                            ))}
                          </ol>
                        );
                      }

                      if (block.type === "list" && Array.isArray(block.items)) {
                        return (
                          <ul key={idx} className="space-y-2">
                            {block.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                                <span className="text-sm md:text-base text-slate-700 leading-7">
                                  {item as string}
                                </span>
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      if (block.type === "comparison" && Array.isArray(block.items)) {
                        return (
                          <div key={idx} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {block.items.map((item, itemIdx) => {
                              const typedItem = item as { title: string; features: string[] };
                              return (
                                <div
                                  key={itemIdx}
                                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                >
                                  <h4 className="text-base md:text-lg font-semibold text-slate-900 mb-3">
                                    {typedItem.title}
                                  </h4>
                                  <ul className="space-y-2">
                                    {typedItem.features.map((feature, featureIdx) => (
                                      <li key={featureIdx} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-xs md:text-sm text-slate-700 leading-6">
                                          {feature}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }

                      if (block.type === "tip") {
                        return (
                          <div
                            key={idx}
                            className="rounded-xl border border-blue-200 bg-blue-50 p-4"
                          >
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-sm md:text-base text-blue-900 mb-1">
                                  Pro Tip
                                </p>
                                <p className="text-xs md:text-sm text-blue-900/90 leading-6">
                                  {block.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8 md:mb-12 leading-tight">
          {helpData.faq.title}
        </h2>
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          {helpData.faq.items.map((faq, index) => (
            <Reveal key={index} delay={index * 0.04} className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2 md:mb-3">
                {faq.question}
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-7">{faq.answer}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpData.resources.items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <Reveal key={item.title}>
                  <Link href={item.link} className="group block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900 group-hover:text-blue-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Need immediate help?</h2>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">Jump straight to the generator and test your QR code in seconds.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/#generator" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100">
                Open QR Generator
              </Link>
              <Link href="/bulk-qr-generator" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500">
                Open Bulk Generator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}