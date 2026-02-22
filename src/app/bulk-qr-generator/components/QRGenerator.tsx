"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import type { BulkQRData } from "./QRInput";
import type { BusinessSettings } from "./QRCustomization";


export interface BulkQRResult extends BulkQRData {
  success: boolean;
  error?: string;
  dataURL?: string;
  filename: string;
}

interface QRGeneratorProps {
  inputMethod: "manual" | "csv";
  urls: string;
  csvData: BulkQRData[];
  size: string;
  format: string;
  businessSettings: BusinessSettings;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
  results: BulkQRResult[];
  setResults: React.Dispatch<React.SetStateAction<BulkQRResult[]>>;
  setAnalytics: React.Dispatch<
    React.SetStateAction<{
      totalGenerated: number;
      successRate: number;
      avgProcessingTime: number;
      categoriesCount: Record<string, number>;
    }>
  >;
  onComplete?: () => void;
}

export default function QRGenerator({
  inputMethod,
  urls,
  csvData,
  size,
  format,
  businessSettings,
  isGenerating,
  setIsGenerating,
  progress,
  setProgress,
  results,
  setResults,
  setAnalytics,
  onComplete,
}: QRGeneratorProps) {
  const { toast } = useToast();

  const isValidURL = (string: string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const generateBulkQRCodes = async () => {
    let dataToProcess: BulkQRData[] = [];

    // Source data from input or CSV
    if (inputMethod === "csv") {
      dataToProcess = csvData;
    } else {
      const urlList = urls
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      dataToProcess = urlList.map((url, index) => ({
        id: `manual-${Date.now()}-${index}`,
        url,
        name: `QR Code ${index + 1}`,
        category: "Manual",
      }));
    }

    // Basic checks
    if (dataToProcess.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one URL or upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    if (dataToProcess.length > 1000) {
      toast({
        title: "Error",
        description: "Maximum 1000 URLs allowed for bulk generation",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const newResults: BulkQRResult[] = [];
    const startTime = Date.now();
    let successCount = 0;
    const categoryCounts: Record<string, number> = {};

    for (let i = 0; i < dataToProcess.length; i++) {
      const item = dataToProcess[i];

      try {
        if (!isValidURL(item.url)) {
          newResults.push({
            ...item,
            success: false,
            error: "Invalid URL format",
            filename: `${
              item.customFilename || item.name || `qr_${i + 1}`
            }_error.txt`,
          });
        } else {
          // Configure QR options with proper customization
          const qrOptions: any = {
            width: parseInt(size),
            margin: businessSettings.margin,
            color: {
              dark: businessSettings.foregroundColor,
              light: businessSettings.backgroundColor,
            },
            errorCorrectionLevel: businessSettings.errorCorrection,
          };

          let dataURL: string;
          const filename = `${
            item.customFilename ||
            item.name?.replace(/[^a-zA-Z0-9]/g, "_") ||
            `qr_${i + 1}`
          }.${format}`;

          // Generate based on format
          if (format === "svg") {
            // For SVG format - use callback-based approach
            const svg = await new Promise<string>((resolve, reject) => {
              QRCode.toString(item.url, {
                ...qrOptions,
                type: "svg",
              }, (err, svgStr) => {
                if (err) reject(err);
                else resolve(svgStr);
              });
            });
            
            // Convert SVG string to base64 data URL (compatible approach)
            const utf8Bytes = new TextEncoder().encode(svg);
            let binaryString = '';
            for (let i = 0; i < utf8Bytes.length; i++) {
              binaryString += String.fromCharCode(utf8Bytes[i]);
            }
            const base64SVG = btoa(binaryString);
            dataURL = `data:image/svg+xml;base64,${base64SVG}`;
          } else {
            // For PNG format (default) — use callback-style wrapped in a Promise to get a string
            dataURL = await new Promise<string>((resolve, reject) => {
              QRCode.toDataURL(item.url, qrOptions, (err, url) => {
                if (err) reject(err);
                else resolve(url as string);
              });
            });
          }

          newResults.push({
            ...item,
            success: true,
            dataURL,
            filename,
          });

          successCount++;

          const category = item.category || "Uncategorized";
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
      } catch (error) {
        console.error("QR Generation Error:", error);
        newResults.push({
          ...item,
          success: false,
          error: "Generation failed",
          filename: `${
            item.customFilename || item.name || `qr_${i + 1}`
          }_error.txt`,
        });
      }

      setProgress(((i + 1) / dataToProcess.length) * 100);
      setResults((prev) => [...prev, newResults[i]]);
    }

    const endTime = Date.now();
    const avgProcessingTime = (endTime - startTime) / dataToProcess.length;

    // Update analytics
    setAnalytics((prev) => {
      const previousTotal = prev?.totalGenerated || 0;
      const previousSuccess = ((prev?.successRate || 0) * previousTotal) / 100;
      const newTotal = previousTotal + dataToProcess.length;
      const newSuccess = previousSuccess + successCount;

      const updatedCategories = { ...(prev?.categoriesCount || {}) };
      for (const [cat, count] of Object.entries(categoryCounts)) {
        updatedCategories[cat] = (updatedCategories[cat] || 0) + count;
      }

      const newAvgTime =
        ((prev?.avgProcessingTime || 0) * previousTotal +
          avgProcessingTime * dataToProcess.length) /
        newTotal;

      return {
        totalGenerated: newTotal,
        successRate: (newSuccess / newTotal) * 100,
        avgProcessingTime: newAvgTime,
        categoriesCount: updatedCategories,
      };
    });

    setIsGenerating(false);

    toast({
      title: "Bulk Generation Complete",
      description: `Successfully generated ${successCount} out of ${dataToProcess.length} QR codes`,
    });

    if (onComplete) {
      onComplete();
    }
  };

  const hasInput =
    (inputMethod === "manual" && urls.trim().length > 0) ||
    (inputMethod === "csv" && csvData.length > 0);

  return (
    <div className="space-y-4">
      {/* No input provided */}
      {!isGenerating && results.length === 0 && !hasInput && (
        <div className="text-center py-8">
          <Button
            variant="outline"
            className="hover:bg-gray-100 w-full border-1 border-gray-700"
            disabled
          >
            Put URL For Input First
          </Button>
        </div>
      )}

      {/* Ready to Generate */}
      {!isGenerating && results.length === 0 && hasInput && (
        <div className="text-center py-8 w-full">
          <Button
            onClick={generateBulkQRCodes}
            disabled={isGenerating}
            className="bg-green-600 text-white hover:bg-blue-600 w-full"
          >
            Start Bulk Generation
          </Button>
        </div>
      )}

      {/* Generation in Progress */}
      {isGenerating && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Processing QR codes...</span>
            <span className="text-sm text-neutral-500">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-xs text-neutral-500 text-center">
            This may take a few moments depending on the number of URLs
          </p>
        </div>
      )}

      {/* Generation Complete */}
      {!isGenerating && results.length > 0 && (
        <div className="flex items-center justify-center flex-col">
          <Button
            onClick={generateBulkQRCodes}
            disabled={isGenerating || !hasInput}
            className="bg-blue-600 text-white hover:bg-blue-400 mt-10 w-full"
          >
            Generate More
          </Button>
        </div>
      )}
    </div>
  );
}