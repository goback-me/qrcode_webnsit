export interface HomePageContent {
  heroSection: {
    title: string;
    subheadline: string;
    ctas: string[];
  };
  howItWorks: {
    heading: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  featuresSection: {
    heading: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  useCases: {
    heading: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  whyChooseUs: {
    heading: string;
    reasons: Array<{
      title: string;
      description: string;
    }>;
  };
  ctaSection: {
    heading: string;
    subheadline: string;
    button: string;
  };
  faqSection: {
    heading: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  footer: {
    quickLinks: string[];
    about: string;
    contact: string;
  };
}