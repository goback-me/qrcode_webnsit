'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Reveal from '@/components/ui/reveal';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <Reveal key={index} delay={index * 0.03}>
          <div className="bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="text-[#111827] font-semibold pr-4">
                {faq.question}
              </span>
              <span className="flex-shrink-0">
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-[#4F46E5]" />
                ) : (
                  <Plus className="w-5 h-5 text-[#6B7280]" />
                )}
              </span>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-out ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-5 pb-5 border-t border-[#E5E7EB]">
                <p className="text-[#6B7280] pt-4 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
