'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container flex items-center h-16">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-xl md:text-2xl font-extrabold cursor-pointer">QRGen</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-6 flex items-center gap-6">
              <Link href="/#generator" className="text-sm font-medium text-gray-900 hover:underline hover:text-primary transition-colors px-2 py-1">
                Generator
              </Link>
              <Link href="/products" className="text-sm font-medium text-neutral-600 hover:underline hover:text-primary transition-colors px-2 py-1">
                Products
              </Link>
              <Link href="/bulk-qr-generator" className="text-sm font-medium text-neutral-600 hover:underline hover:text-primary transition-colors px-2 py-1">
                Bulk
              </Link>
              <Link href="/help" className="text-sm font-medium text-neutral-600 hover:underline hover:text-primary transition-colors px-2 py-1">
                Help
              </Link>

            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="h-10 w-10">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg w-full">
            <div className="px-4 py-3 space-y-2">
              <Link 
                href="/#generator" 
                className="block px-3 py-3 text-sm md:text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Generator
              </Link>
              <Link 
                href="/products" 
                className="block px-3 py-3 text-sm md:text-base font-medium text-neutral-600 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/bulk-qr-generator" 
                className="block px-3 py-3 text-sm md:text-base font-medium text-neutral-600 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bulk Generator
              </Link>
              <Link 
                href="/help"
                className="block px-3 py-3 text-sm md:text-base font-medium text-neutral-600 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Help Center
              </Link>

            </div>
          </div>
        )}
      </div>
    </header>
  );
}
