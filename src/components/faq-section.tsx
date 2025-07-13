import { Card } from "@/components/ui/card";

export default function FAQSection() {
  const faqs = [
    {
      question: "Are the QR codes really free?",
      answer: "Yes! You can generate unlimited QR codes completely free. No hidden fees, no account required, no expiration dates on your QR codes."
    },
    {
      question: "Do the QR codes expire?",
      answer: "Free QR codes never expire. They are static QR codes that will work forever as long as the destination URL remains active."
    },
    {
      question: "What's the difference between free and premium?",
      answer: "Free QR codes are static and perfect for most uses. Premium adds analytics, custom branding, dynamic URLs you can edit later, and bulk generation features."
    },
    {
      question: "Are QR codes safe to use?",
      answer: "Yes, our QR codes are completely safe. We don't track scans on free codes, don't collect personal data, and our service is fully compliant with privacy regulations."
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <p className="text-lg text-neutral-600">Everything you need to know about our QR code generator</p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <Card key={index} className="p-6 shadow-md">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h4>
            <p className="text-neutral-600">{faq.answer}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
