import Link from "next/link";
import { getHomePageContent } from "@/lib/content";

export default function Footer() {
  const content = getHomePageContent();
  
  return (
    <footer className="bg-white border-t border-[#E5E7EB]">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h5 className="text-xl font-semibold text-[#111827] mb-3">GenQR</h5>
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs">
              {content.footer.about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="font-semibold text-[#111827] mb-4 text-sm">Quick Links</h6>
            <ul className="space-y-3">
              {content.footer.quickLinks.map((link: { title: string; url: string }, index: number) => (
                <li key={index}>
                  <Link 
                    href={link.url} 
                    className="text-[#6B7280] text-sm hover:text-[#4F46E5] transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h6 className="font-semibold text-[#111827] mb-4 text-sm">Resources</h6>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/blog" 
                  className="text-[#6B7280] text-sm hover:text-[#4F46E5] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/help" 
                  className="text-[#6B7280] text-sm hover:text-[#4F46E5] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-[#6B7280] text-sm hover:text-[#4F46E5] transition-colors"
                >
                  QR Types
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h6 className="font-semibold text-[#111827] mb-4 text-sm">Contact</h6>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              {content.footer.contact}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E5E7EB] pt-8 mt-12">
          <p className="text-center text-[#6B7280] text-sm">
            &copy; {new Date().getFullYear()} GenQR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
