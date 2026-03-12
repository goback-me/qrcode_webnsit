'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#generator", label: "Features" },
    { href: "/products", label: "QR Types" },
    { href: "/bulk-qr-generator", label: "Bulk Generate" },
    { href: "/blog", label: "Blog" },
    { href: "/help", label: "Help" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="container flex items-center justify-between h-[74px] gap-4">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0"> 
          <span className="text-xl md:text-2xl font-semibold tracking-tight cursor-pointer">QRGen</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-base font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex-shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="h-10 w-10"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
        
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[74px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg w-full">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="block px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
