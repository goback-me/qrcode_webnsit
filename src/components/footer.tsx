import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h5 className="text-lg font-bold text-gray-900 mb-4">QRGen</h5>
            <p className="text-neutral-600 mb-4 max-w-md">
              The simplest way to create high-quality QR codes for any purpose. 
              Privacy-focused, ad-safe, and completely free to use.
            </p>
          </div>
          
          <div>
            <h6 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h6>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-600 dark:text-neutral-300 hover:text-primary">QR Generator</Link></li>
              <li><a href="#pricing" className="text-neutral-600 dark:text-neutral-300 hover:text-primary">Premium Features</a></li>
              <li><Link href="/bulk" className="text-neutral-600 dark:text-neutral-300 hover:text-primary">Bulk Generation</Link></li>
              <li><a href="#" className="text-neutral-600 dark:text-neutral-300 hover:text-primary">API Access</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h6>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-neutral-600 dark:text-neutral-300 hover:text-primary">Blog & Guides</Link></li>
              <li><Link href="/help" className="text-neutral-600 dark:text-neutral-300 hover:text-primary">Help Center</Link></li>
              <li><Link href="/contact" className="text-neutral-600 dark:text-neutral-300 hover:text-primary">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-neutral-600 dark:text-neutral-300 hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-neutral-600 dark:text-neutral-300 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8">
          <p className="text-center text-neutral-600 text-sm">
            © 2025 QRGen. All rights reserved. Made with ❤️ for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
