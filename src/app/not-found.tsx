import Link from "next/link";
import { ArrowRight, Home, Layers, LifeBuoy, QrCode, FileText, BookOpen } from "lucide-react";

const quickLinks = [
  {
    title: "Home",
    description: "Go back to the homepage.",
    href: "/",
    icon: Home,
  },
  {
    title: "QR Generator",
    description: "Create a single QR code now.",
    href: "/#generator",
    icon: QrCode,
  },
  {
    title: "Bulk Generator",
    description: "Generate many QR codes in one flow.",
    href: "/bulk-qr-generator",
    icon: Layers,
  },
  {
    title: "Products",
    description: "Explore available features.",
    href: "/products",
    icon: FileText,
  },
  {
    title: "Help Center",
    description: "Find guides and support resources.",
    href: "/help",
    icon: LifeBuoy,
  },
  {
    title: "Blog",
    description: "Read tips and QR best practices.",
    href: "/blog",
    icon: BookOpen,
  },
];

export default function NotFoundPage() {
  return (
    <main className="min-h-[70vh] bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Error 404
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            The page you are looking for does not exist or may have moved. Use the links below to continue.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Back to Home
            </Link>
            <Link
              href="/#generator"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Open QR Generator
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700">
                  Open <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
