import Link from "next/link";
import { getHomePageContent } from "@/lib/content";

export default function Footer() {
  const content = getHomePageContent();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
          <div className="md:col-span-2">
            <h5 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3">GEN QR</h5>
            <p className="muted-text text-sm md:text-base mb-4 max-w-md">{content.footer.about}</p>
            {/* <div className="flex items-center gap-3 mt-4">
              <a href="#" aria-label="twitter" className="text-neutral-500 hover:text-primary">Twitter</a>
              <a href="#" aria-label="facebook" className="text-neutral-500 hover:text-primary">Facebook</a>
              <a href="#" aria-label="linkedin" className="text-neutral-500 hover:text-primary">LinkedIn</a>
            </div> */}
          </div>

          <div>
            <h6 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Quick Links</h6>
            <ul className="space-y-2">
              {content.footer.quickLinks.map((link: any, index: number) => (
                <li key={index}>
                  <Link href={link.url} className="link-accent muted-text hover:underline text-sm md:text-base">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Contact</h6>
            {content.footer.contact.split('\n').map((line: string, index: number) => (
              <p key={index} className="muted-text text-sm md:text-base mb-2">{line}</p>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 md:pt-8 mt-6 md:mt-8">
          <p className="text-center muted-text text-xs md:text-sm">© 2025 GENQR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}