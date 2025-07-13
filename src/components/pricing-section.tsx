import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  const freeFeatures = [
    "Unlimited QR code generation",
    "High-quality PNG & SVG downloads",
    "No watermarks or branding",
    "Basic customization options"
  ];

  const premiumFeatures = [
    "Everything in Free",
    "Scan analytics & tracking",
    "Custom branding & logos",
    "Dynamic QR codes (editable URLs)",
    "Bulk generation (up to 1000)",
    "Priority support"
  ];

  const freeFeaturesList = [
    ...freeFeatures,
    "Basic bulk generation (up to 100)"
  ];

  return (
    <section id="pricing" className="py-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h3>
        <p className="text-lg text-neutral-600">Start free, upgrade when you need advanced features</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="p-8 shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Free</h4>
            <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
            <p className="text-neutral-600">Forever free, no strings attached</p>
          </div>
          
          <ul className="space-y-4 mb-8">
            {freeFeaturesList.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="space-y-3">
            <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 mb-2">
              Get Started Free
            </Button>
            <Link href="/bulk">
              <Button style={{border: "0.6px solid black"}} className="w-full border-red-400">
                Try Bulk Generator
              </Button>
            </Link>
          </div>
        </Card>
        
        <Card className="p-8 shadow-lg relative border-2 border-primary bg-primary bg-opacity-5">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Premium</h4>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              $9<span className="text-lg text-neutral-600">/month</span>
            </div>
            <p className="text-neutral-600">Advanced features for businesses</p>
          </div>
          
          <ul className="space-y-4 mb-8">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                {feature}
              </li>
            ))}
          </ul>
          
          <Button className="w-full bg-primary bg-blue-600 text-white hover:bg-blue-400">
            Start Premium Trial
          </Button>
        </Card>
      </div>
    </section>
  );
}
