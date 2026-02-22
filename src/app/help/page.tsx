import { Card } from "@/components/ui/card";
import { 
  Globe,
  Image,
  Printer,
  RefreshCw,
  Smartphone,
  Play,
  Book,
  Mail,
  Code,
  CheckCircle2,
  AlertCircle,
  LucideIcon
} from "lucide-react";
import helpData from "@/content/pages/help.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: helpData.meta.title,
  description: helpData.meta.description
};

// Type-safe icon mapping
const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  image: Image,
  printer: Printer,
  refresh: RefreshCw,
  smartphone: Smartphone,
  play: Play,
  book: Book,
  mail: Mail,
  code: Code
};

// Helper function to get icon safely
const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Globe;
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            {helpData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-2 md:px-0">
            {helpData.hero.description}
          </p>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12 leading-tight">
          {helpData.popularTopics.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {helpData.popularTopics.items.map((topic) => {
            const Icon = getIcon(topic.icon);
            return (
              <a
                key={topic.id}
                href={topic.link}
                className="block group"
              >
                <Card className="p-4 md:p-6 h-full border-0 bg-white hover:shadow-xl hover:border-blue-500 hover:border-2 transition-all duration-300">
                  <div className="flex items-start gap-2 md:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-sm md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {topic.title}
                    </h3>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </section>

      {/* Help Sections */}
      <section className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            {helpData.helpSections.map((section) => {
              const Icon = getIcon(section.icon);
              return (
                <div key={section.id} id={section.id} className="scroll-mt-20">
                  <Card className="p-4 md:p-8 border-0 bg-white shadow-lg">
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                      </div>
                      <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
                        {section.title}
                      </h2>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      {section.content.map((block: any, idx: number) => {
                        if (block.type === "paragraph") {
                          return (
                            <p key={idx} className="text-sm md:text-lg text-gray-700 leading-relaxed">
                              {block.text}
                            </p>
                          );
                        }

                        if (block.type === "steps") {
                          return (
                            <ol key={idx} className="space-y-2 md:space-y-3 ml-2 md:ml-4">
                              {block.items.map((step: string, stepIdx: number) => (
                                <li key={stepIdx} className="flex items-start gap-2 md:gap-3">
                                  <span className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-semibold mt-0.5">
                                    {stepIdx + 1}
                                  </span>
                                  <span className="text-sm md:text-base text-gray-700 leading-relaxed pt-0.5">
                                    {step}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          );
                        }

                        if (block.type === "list") {
                          return (
                            <ul key={idx} className="space-y-1 md:space-y-2 ml-2 md:ml-4">
                              {block.items.map((item: string, itemIdx: number) => (
                                <li key={itemIdx} className="flex items-start gap-2 md:gap-3">
                                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 mt-0.5 md:mt-0" />
                                  <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        if (block.type === "comparison") {
                          return (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                              {block.items.map((item: any, itemIdx: number) => (
                                <div
                                  key={itemIdx}
                                  className="bg-gray-50 p-4 md:p-6 rounded-lg border-2 border-gray-200"
                                >
                                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                                    {item.title}
                                  </h4>
                                  <ul className="space-y-1 md:space-y-2">
                                    {item.features.map((feature: string, featureIdx: number) => (
                                      <li key={featureIdx} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0 mt-1 md:mt-0.5" />
                                        <span className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                          {feature}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          );
                        }

                        if (block.type === "tip") {
                          return (
                            <div
                              key={idx}
                              className="bg-blue-50 border-l-4 border-blue-600 p-3 md:p-4 rounded-r-lg"
                            >
                              <div className="flex items-start gap-2 md:gap-3">
                                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 mt-0.5 md:mt-0" />
                                <div>
                                  <p className="font-semibold text-sm md:text-base text-blue-900 mb-1">
                                    Pro Tip
                                  </p>
                                  <p className="text-xs md:text-sm text-blue-800 leading-relaxed">
                                    {block.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12 leading-tight">
          {helpData.faq.title}
        </h2>
        <div className="max-w-3xl mx-auto space-y-2 md:space-y-4">
          {helpData.faq.items.map((faq, index) => (
            <Card key={index} className="p-4 md:p-6 border-0 bg-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">
                {faq.question}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}