"use client";

import { useState } from "react";

// Import the 4 modular components
import QRInput, { BulkQRData } from "./QRInput";
import QRCustomization, {
  BusinessSettings,
} from "./QRCustomization";
import QRGenerator, { BulkQRResult } from "./QRGenerator";
import QRAnalytics from "./QRAnalytics";



export default function BulkGenerator() {
  // Input state
  const [inputMethod, setInputMethod] = useState<"manual" | "csv">("manual");
  const [urls, setUrls] = useState("");
  const [csvData, setCsvData] = useState<BulkQRData[]>([]);

  // Customization state
  const [size, setSize] = useState("400");
  const [format, setFormat] = useState("png");
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    addLogo: false,
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    margin: 4,
    errorCorrection: "M",
    addBranding: false,
    brandingText: "",
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BulkQRResult[]>([]);

  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalGenerated: 0,
    successRate: 0,
    avgProcessingTime: 0,
    categoriesCount: {} as Record<string, number>,
  });

  const resetGenerator = () => {
    setUrls("");
    setCsvData([]);
    setResults([]);
    setProgress(0);
    setAnalytics({
      totalGenerated: 0,
      successRate: 0,
      avgProcessingTime: 0,
      categoriesCount: {},
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="banner-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Bulk QR Code Generator
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Generate hundreds of QR codes instantly from CSV files or manual entry. Perfect for businesses looking to create multiple codes efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {results.length === 0 ? (
          <>
            {/* Step Indicator */}
            <div className="mb-6 md:mb-12">
              <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-4">
                {/* Step 1 */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-blue-600 text-white font-bold text-xs sm:text-sm mb-1 sm:mb-2">
                    1
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 text-center">Input Data</p>
                </div>
                
                {/* Connector Line 1 */}
                <div className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-blue-600 to-gray-200 mb-6"></div>
                
                {/* Step 2 */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-blue-600 text-white font-bold text-xs sm:text-sm mb-1 sm:mb-2">
                    2
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 text-center">Customize</p>
                </div>
                
                {/* Connector Line 2 */}
                <div className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-gray-200 to-gray-200 mb-6"></div>
                
                {/* Step 3 */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gray-300 text-gray-700 font-bold text-xs sm:text-sm mb-1 sm:mb-2">
                    3
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 text-center">Generate</p>
                </div>
              </div>
            </div>

            {/* Input and Customization Cards - Equal Height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8">
              {/* Component 1: QR Input */}
              <div className="w-full h-full">
                <div className="h-full">
                  <QRInput
                    inputMethod={inputMethod}
                    setInputMethod={setInputMethod}
                    urls={urls}
                    setUrls={setUrls}
                    csvData={csvData}
                    setCsvData={setCsvData}
                    isGenerating={isGenerating}
                  />
                </div>
              </div>

              {/* Component 2: QR Customization */}
              <div className="w-full h-full">
                <div className="h-full">
                  <QRCustomization
                    size={size}
                    setSize={setSize}
                    format={format}
                    setFormat={setFormat}
                    businessSettings={businessSettings}
                    setBusinessSettings={setBusinessSettings}
                  />
                </div>
              </div>
            </div>

            {/* Component 3: QR Generator (Action Button) */}
            <div className="mb-8">
              <QRGenerator
                inputMethod={inputMethod}
                urls={urls}
                csvData={csvData}
                size={size}
                format={format}
                businessSettings={businessSettings}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
                progress={progress}
                setProgress={setProgress}
                results={results}
                setResults={setResults}
                setAnalytics={setAnalytics}
              />
            </div>
          </>
        ) : null}

        {/* Component 4: QR Analytics - Only show when there are results */}
        {results.length > 0 && (
          <div>
            <QRAnalytics
              results={results}
              analytics={analytics}
              onReset={resetGenerator}
            />
          </div>
        )}
      </main>
    </div>
  );
}