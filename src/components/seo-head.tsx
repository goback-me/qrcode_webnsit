'use client'

import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  tags?: string[];
  structuredData?: object;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = "/qr-generator-og.png", // Default OG image
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
  category,
  tags = [],
  structuredData
}: SEOHeadProps) {
  
  useEffect(() => {
    // Set page title
    document.title = title;
    
    // Helper function to set or update meta tags
    const setMetaTag = (property: string, content: string, type: 'name' | 'property' = 'name') => {
      let meta = document.querySelector(`meta[${type}="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(type, property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords.join(', '));
    
    // Open Graph tags
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:type', ogType, 'property');
    setMetaTag('og:image', ogImage, 'property');
    setMetaTag('og:site_name', 'QRGen - Free QR Code Generator', 'property');
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);
    
    // Additional article meta tags for blog posts
    if (ogType === 'article') {
      if (publishedTime) setMetaTag('article:published_time', publishedTime, 'property');
      if (modifiedTime) setMetaTag('article:modified_time', modifiedTime, 'property');
      if (author) setMetaTag('article:author', author, 'property');
      if (category) setMetaTag('article:section', category, 'property');
      
      // Article tags
      tags.forEach(tag => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }
    
    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }
    
    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
    
    // Cleanup function to remove article tags on component unmount
    return () => {
      if (ogType === 'article') {
        const articleTags = document.querySelectorAll('meta[property^="article:"]');
        articleTags.forEach(tag => tag.remove());
      }
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, publishedTime, modifiedTime, author, category, tags, structuredData]);
  
  return null; // This component doesn't render anything
}

// Helper function to generate structured data for blog articles
export function generateArticleStructuredData({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  url,
  imageUrl,
  category,
  tags
}: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  url: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://qrgen.replit.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "QRGen",
      "url": "https://qrgen.replit.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qrgen.replit.app/logo.png"
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(imageUrl && {
      "image": {
        "@type": "ImageObject",
        "url": imageUrl,
        "width": 1200,
        "height": 630
      }
    }),
    ...(category && { "articleSection": category }),
    ...(tags && tags.length > 0 && { "keywords": tags.join(", ") }),
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };
}

// Helper function to generate structured data for the blog listing page
export function generateBlogStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "QRGen Blog - QR Code Insights & Best Practices",
    "description": "Expert guides, industry insights, and proven strategies for maximizing your QR code campaigns. Stay ahead with the latest trends in contactless technology.",
    "url": "https://qrgen.replit.app/blog",
    "publisher": {
      "@type": "Organization",
      "name": "QRGen",
      "url": "https://qrgen.replit.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qrgen.replit.app/logo.png"
      }
    },
    "inLanguage": "en-US",
    "genre": ["Technology", "Marketing", "Business"],
    "audience": {
      "@type": "Audience",
      "audienceType": "Business professionals, marketers, developers"
    }
  };
}

// Helper function to generate structured data for the QR generator tool
export function generateWebApplicationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "QRGen - Free QR Code Generator",
    "description": "Create free, high-quality QR codes instantly. No signup required. Privacy-friendly QR code generator for URLs, business cards, and more.",
    "url": "https://qrgen.replit.app",
    "applicationCategory": "Utility",
    "operatingSystem": "Any",
    "permissions": "No special permissions required",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Free QR code generation",
      "Instant download",
      "Multiple formats (PNG, SVG)",
      "Bulk generation",
      "No registration required",
      "Privacy-focused"
    ],
    "screenshot": "https://qrgen.replit.app/app-screenshot.png",
    "softwareVersion": "1.0",
    "datePublished": "2025-01-01",
    "author": {
      "@type": "Organization",
      "name": "QRGen",
      "url": "https://qrgen.replit.app"
    }
  };
}