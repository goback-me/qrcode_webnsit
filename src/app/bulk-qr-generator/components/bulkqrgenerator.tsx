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
    <div className="w-full my-10 px-5">
      {/* Input and Customization Section */}
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl w-full">
          {/* Component 1: QR Input */}
          <QRInput
            inputMethod={inputMethod}
            setInputMethod={setInputMethod}
            urls={urls}
            setUrls={setUrls}
            csvData={csvData}
            setCsvData={setCsvData}
            isGenerating={isGenerating}
          />

          {/* Component 2: QR Customization */}
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

      {/* Component 3: QR Generator (Action Button) */}
      <div className="max-w-7xl mx-auto mt-6">
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

      {/* Component 4: QR Analytics - Only show when there are results */}
      {results.length > 0 && (
        <div className="max-w-7xl mx-auto mt-6">
          <QRAnalytics
            results={results}
            analytics={analytics}
            onReset={resetGenerator}
          />
        </div>
      )}
    </div>
  );
}