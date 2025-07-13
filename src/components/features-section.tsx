'use client'

import { Card } from "@/components/ui/card";
import { Building2, FileText, Calendar, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const features = [
    {
      icon: Building2,
      title: "Business Marketing",
      description: "Drive traffic to your website, social media, or promotional pages with scannable QR codes."
    },
    {
      icon: FileText,
      title: "Restaurant Menus",
      description: "Create contactless menu experiences. Perfect for restaurants, cafes, and food businesses."
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Share event details, tickets, and registration links instantly with attendees."
    },
    {
      icon: ShoppingBag,
      title: "Product Packaging",
      description: "Add QR codes to products for warranty registration, manuals, or customer support."
    }
  ];

  return (
    <section id="features" className="py-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Perfect for Every Use Case</h3>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          From marketing campaigns to restaurant menus, our QR codes work everywhere
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className={`
              p-6 cursor-pointer transition-all duration-300 ease-in-out
              bg-white dark:bg-neutral-800 
              border border-gray-200 dark:border-neutral-700 
              hover:border-primary/30 dark:hover:border-primary/50
              hover:shadow-xl hover:-translate-y-2
              active:translate-y-0 active:shadow-lg
              ${hoveredCard === index ? 'shadow-xl -translate-y-2' : 'shadow-md'}
            `}
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => {
              console.log(`Feature clicked: ${feature.title}`);
              // Could add navigation or modal functionality here
            }}
          >
            <div className={`
              w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300
              ${hoveredCard === index 
                ? 'bg-primary/20 dark:bg-primary/30 scale-110' 
                : 'bg-primary/10 dark:bg-primary/20 scale-100'
              }
            `}>
              <feature.icon className={`
                w-6 h-6 transition-all duration-300
                ${hoveredCard === index ? 'text-primary scale-110' : 'text-primary'}
              `} />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
              {feature.title}
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
