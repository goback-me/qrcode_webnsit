'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container flex items-center h-16">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-2xl font-extrabold cursor-pointer">QRGen</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-6 flex items-center gap-4">
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
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link 
                href="/#generator" 
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Generator
              </Link>
              <Link 
                href="/products" 
                className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/bulk-qr-generator" 
                className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bulk Generator
              </Link>
              <Link 
                href="/help"
                className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary transition-colors"
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
