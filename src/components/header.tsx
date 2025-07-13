'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AdSpace from "@/components/ad-space";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-neutral-800 shadow-sm border-b border-gray-100 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer">QRGen</h1>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#generator" className="text-gray-900 dark:text-white hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                Generator
              </a>
              <a href="#features" className="text-neutral-600 dark:text-neutral-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-neutral-600 dark:text-neutral-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </a>
              <Link href="/blog" className="text-neutral-600 dark:text-neutral-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                Blog
              </Link>
              <Link href="/help" className="text-neutral-600 dark:text-neutral-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                Help
              </Link>
              <Button className="bg-primary text-white hover:bg-blue-600">
                Go Premium
              </Button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-neutral-700">
              <a 
                href="#generator" 
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Generator
              </a>
              <a 
                href="#features" 
                className="block px-3 py-2 text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="block px-3 py-2 text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Link 
                href="/blog"
                className="block px-3 py-2 text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/help"
                className="block px-3 py-2 text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Help Center
              </Link>
              <Link 
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-primary text-white hover:bg-blue-600">
                  Go Premium
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
