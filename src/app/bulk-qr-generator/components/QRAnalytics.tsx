"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  CheckCircle,
  XCircle,
  RefreshCw,
  Layers,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import JSZip from "jszip";
import type { BulkQRResult } from "./QRGenerator";

interface QRAnalyticsProps {
  results: BulkQRResult[];
  analytics: {
    totalGenerated: number;
    successRate: number;
    avgProcessingTime: number;
    categoriesCount: Record<string, number>;
  };
  onReset: () => void;
}

export default function QRAnalytics({
  results,
  analytics,
  onReset,
}: QRAnalyticsProps) {
  const { toast } = useToast();

  if (results.length === 0) {
    return null;
  }

  // Separate successful and failed results, reverse to show recent first
  const successfulResults = results.filter((r) => r.success).reverse();
  const failedResults = results.filter((r) => !r.success).reverse();

  const downloadSingle = (result: BulkQRResult) => {
    if (!result.dataURL) {
      toast({
        title: "Error",
        description: "QR code data not available",
        variant: "destructive",
      });
      return;
    }

    try {
      const a = document.createElement("a");
      a.href = result.dataURL;
      a.download = result.filename;
      a.click();

      toast({
        title: "Success",
        description: `Downloaded ${result.filename}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  const downloadAll = async () => {
    if (successfulResults.length === 0) {
      toast({
        title: "Error",
        description: "No QR codes to download",
        variant: "destructive",
      });
      return;
    }

    const zip = new JSZip();

    // Add QR codes to zip
    for (const result of successfulResults) {
      if (result.dataURL) {
        // Handle both PNG and SVG formats
        if (result.filename.endsWith(".svg")) {
          // For SVG, decode the base64 data URL
          const base64Data = result.dataURL.split(",")[1];
          const svgContent = atob(base64Data);
          zip.file(result.filename, svgContent);
        } else {
          // For PNG, use base64
          const base64Data = result.dataURL.split(",")[1];
          zip.file(result.filename, base64Data, { base64: true });
        }
      }
    }

    // Add analytics report
    const analyticsReport = `QR Code Bulk Generation Report
Generated: ${new Date().toLocaleString()}
Total URLs: ${analytics.totalGenerated}
Successful: ${successfulResults.length}
Failed: ${failedResults.length}
Success Rate: ${analytics.successRate.toFixed(1)}%
Average Processing Time: ${analytics.avgProcessingTime.toFixed(0)}ms per code

Categories:
${Object.entries(analytics.categoriesCount)
  .map(([cat, count]) => `- ${cat}: ${count}`)
  .join("\n")}

Generated Files:
${successfulResults
  .map((r) => `- ${r.filename} (${r.name || r.url})`)
  .join("\n")}

${
  failedResults.length > 0
    ? `\nFailed URLs:\n${failedResults
        .map((r) => `- ${r.url} (${r.error})`)
        .join("\n")}`
    : ""
}
`;

    zip.file("generation_report.txt", analyticsReport);

    // Generate and download zip
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr_codes_bulk_${new Date().toISOString().split("T")[0]}.zip`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: `Downloaded ${successfulResults.length} QR codes with analytics report`,
    });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Results & Analytics</h2>
        <p className="text-sm sm:text-base text-gray-600">Review your generated QR codes and download them</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="glass-card p-4 sm:p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Success Rate</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">
                {analytics.successRate.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {successfulResults.length}/{results.length} successful
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="glass-card p-4 sm:p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Generated</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
                {successfulResults.length}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {failedResults.length} failed
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
              <Layers className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="glass-card p-4 sm:p-6 md:p-8 sm:col-span-2 md:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Avg. Time per Code</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600">
                {analytics.avgProcessingTime.toFixed(0)}ms
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Processing speed
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0">
              <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Prominent and Mobile Responsive */}
      <div className="flex flex-col sm:flex-row gap-3 sticky top-20 z-10 bg-white/80 backdrop-blur p-4 rounded-lg border border-gray-200">
        <Button
          onClick={downloadAll}
          disabled={successfulResults.length === 0}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg transition-all shadow-lg"
        >
          <Download className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
          Download All ({successfulResults.length})
        </Button>
        <Button 
          onClick={onReset}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg transition-all"
        >
          <RefreshCw className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
          Generate Again
        </Button>
      </div>

      {/* Successful QR Codes Table */}
      {successfulResults.length > 0 && (
        <div className="glass-card p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 pb-6 border-b border-gray-200 flex-wrap">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Successful QR Codes
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{successfulResults.length} codes ready to download</p>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8">
            <div className="inline-block min-w-full px-4 sm:px-6 md:px-8">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-2 sm:px-3 py-3 font-semibold text-gray-700">Preview</th>
                    <th className="text-left px-2 sm:px-3 py-3 font-semibold text-gray-700">Name</th>
                    <th className="text-left px-2 sm:px-3 py-3 font-semibold text-gray-700 hidden sm:table-cell">URL</th>
                    <th className="text-left px-2 sm:px-3 py-3 font-semibold text-gray-700 hidden md:table-cell">Category</th>
                    <th className="text-left px-2 sm:px-3 py-3 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {successfulResults.slice(0, 10).map((result, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-2 sm:px-3 py-3">
                        <img
                          src={result.dataURL}
                          alt={result.name || "QR Code"}
                          className="w-10 sm:w-12 h-10 sm:h-12 object-contain border border-gray-200 rounded-lg p-1"
                        />
                      </td>
                      <td className="px-2 sm:px-3 py-3">
                        <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                          {result.name || `QR ${index + 1}`}
                        </p>
                      </td>
                      <td className="px-2 sm:px-3 py-3 max-w-xs truncate text-gray-600 hidden sm:table-cell">
                        <span className="text-xs" title={result.url}>{result.url}</span>
                      </td>
                      <td className="px-2 sm:px-3 py-3 hidden md:table-cell">
                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                          {result.category || "Uncategorized"}
                        </Badge>
                      </td>
                      <td className="px-2 sm:px-3 py-3">
                        <Button
                          size="sm"
                          onClick={() => downloadSingle(result)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 sm:px-3"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {successfulResults.length > 10 && (
                <div className="text-center py-3 text-xs text-gray-600 border-t border-gray-200 mt-3">
                  Showing 10 of {successfulResults.length} — Download all to get the rest
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Failed QR Codes Table */}
      {failedResults.length > 0 && (
        <div className="glass-card p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 pb-6 border-b border-gray-200 flex-wrap">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <XCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Failed QR Codes
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{failedResults.length} codes that couldn't be generated</p>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8">
            <div className="inline-block min-w-full px-4 sm:px-6 md:px-8">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-2 sm:px-3 py-3 font-semibold text-gray-700">Name</th>
                    <th className="text-left px-2 sm:px-3 py-3 font-semibold text-gray-700 hidden sm:table-cell">URL</th>
                    <th className="text-left px-2 sm:px-3 py-3 font-semibold text-gray-700">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {failedResults.map((result, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                      <td className="px-2 sm:px-3 py-3">
                        <p className="font-medium text-gray-900 text-xs sm:text-sm">
                          {result.name || `QR ${index + 1}`}
                        </p>
                      </td>
                      <td className="px-2 sm:px-3 py-3 max-w-xs truncate text-gray-600 hidden sm:table-cell">
                        <span className="text-xs" title={result.url}>{result.url}</span>
                      </td>
                      <td className="px-2 sm:px-3 py-3">
                        <span className="text-red-700 text-xs bg-red-100 px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap">
                          {result.error}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      {Object.keys(analytics.categoriesCount).length > 0 && (
        <div className="glass-card p-4 sm:p-6 md:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Category Breakdown</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {Object.entries(analytics.categoriesCount).map(([category, count]) => (
              <div key={category} className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2 truncate">{category}</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}