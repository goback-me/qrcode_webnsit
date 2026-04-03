'use client'

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/#generator", label: "Features" },
    { href: "/products", label: "QR Types" },
    { href: "/bulk-qr-generator", label: "Bulk Generate" },
    { href: "/blog", label: "Blog" },
    { href: "/help", label: "Help" },
  ];

  return (
    <header 
      className={`bg-white border-b border-[#E5E7EB] sticky top-0 z-50 transition-shadow duration-200 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0"> 
          <span className="text-xl font-semibold tracking-tight text-[#111827]">GenQR</span>
        </Link>

        {/* Navigation - Center */}
        <nav className="hidden md:flex items-center justify-center flex-1 px-8">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* CTA Button - Right */}
        <div className="hidden md:flex items-center">
          <Link 
            href="/#generator" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338CA] transition-colors"
          >
            Generate Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 text-[#6B7280]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
        
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#E5E7EB] shadow-lg">
          <div className="container py-4 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="block px-3 py-3 text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 px-3">
              <Link 
                href="/#generator" 
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338CA] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Generate Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
