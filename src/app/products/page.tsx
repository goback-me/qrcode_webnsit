import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Globe,
  Image,
  Layers,
  Mail,
  Palette,
  Phone,
  Users,
  Wifi,
} from "lucide-react";
import { Metadata } from "next";
import Reveal from "@/components/ui/reveal";
import Breadcrumb from "@/components/Breadcrumb";

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genqrgenerator.com' },
    { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.genqrgenerator.com/products' },
  ],
};

export const metadata: Metadata = {
  title: "Free QR Code Generator Features & Tools | GenQRGenerator",
  description:
    "Explore our free online QR code generator — create URL, WiFi, vCard, Text, Email & Phone QR codes. Add logos, bulk generate from CSV. Start creating now!",
  alternates: {
    canonical: "https://www.genqrgenerator.com/products",
  },
};

const singleGeneratorFeatures = [
  {
    title: "Multiple QR types",
    description: "Create Website URL, WiFi, vCard, Plain Text, Email, and Phone QR codes.",
    icon: Layers,
  },
  {
    title: "Logo upload",
    description: "Add your logo to the center of the QR code for a branded look.",
    icon: Image,
  },
  {
    title: "Design controls",
    description: "Set format, size, and logo corner style from one simple panel.",
    icon: Palette,
  },
  {
    title: "Flexible exports",
    description: "Download in PNG, SVG, or JPEG based on your use case.",
    icon: Download,
  },
];

const bulkFeatures = [
  {
    title: "CSV and manual input",
    description: "Generate many QR codes with CSV import or manual list input.",
    icon: FileText,
  },
  {
    title: "Batch processing",
    description: "Generate a large set of QR codes in one run.",
    icon: Layers,
  },
  {
    title: "Download workflow",
    description: "Review outputs and download your generated assets quickly.",
    icon: Download,
  },
  {
    title: "Result tracking",
    description: "See generation results and progress at a glance.",
    icon: CheckCircle2,
  },
];

const supportedTypes = [
  { label: "Website URL", icon: Globe },
  { label: "WiFi", icon: Wifi },
  { label: "vCard", icon: Users },
  { label: "Plain Text", icon: FileText },
  { label: "Email", icon: Mail },
  { label: "Phone", icon: Phone },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="border-b border-slate-200 bg-white">
        <Reveal className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <Breadcrumb items={[{ label: 'Products' }]} className="mb-4" />
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Products
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Build QR codes with tools you can actually use
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              No confusing extras. Just the real features available in Gen QR Generator, with a clear path to either single QR creation or bulk generation.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl">
            <Link
              href="/#generator"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-500">Single QR Generator</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Create one QR now</h2>
              <p className="mt-2 text-sm text-slate-600">Perfect for a single URL, contact card, WiFi, email, text, or phone QR code.</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700">
                Go to generator <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/bulk-qr-generator"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-500">Bulk QR Generator</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Generate in batches</h2>
              <p className="mt-2 text-sm text-slate-600">Best for campaigns, inventory, events, and large QR batches from CSV or lists.</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700">
                Go to bulk generator <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Single QR Generator Features</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {singleGeneratorFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mb-8 md:mb-10">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Bulk Generator Features</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {bulkFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Supported QR Types</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">These are the QR code types currently available in the main generator.</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {supportedTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Reveal key={type.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-800">{type.label}</span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-900 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Choose your path and start generating</h2>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">Single QR for quick tasks, or bulk mode for high-volume workflows.</p>
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