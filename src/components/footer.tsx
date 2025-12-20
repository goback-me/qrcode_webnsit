import Link from "next/link";
import { getHomePageContent } from "@/lib/content";

export default function Footer() {
  const content = getHomePageContent();
  
  return (
    <footer className="bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-4">GEN QR</h5>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4 max-w-md">
              {content.footer.about}
            </p>
          </div>

          <div>
            <h6 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h6>
            <ul className="space-y-2">
              {content.footer.quickLinks.map((link: any, index: number) => (
                <li key={index}>
                  <Link 
                    href={link.url} 
                    className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h6>
            {content.footer.contact.split('\n').map((line: string, index: number) => (
              <p key={index} className="text-neutral-600 dark:text-neutral-300 mb-2">
                {line}
              </p>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-neutral-700 pt-8 mt-8">
          <p className="text-center text-neutral-600 dark:text-neutral-300 text-sm">
            © 2025 GENQR. All rights reserved. Made with ❤️ for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}