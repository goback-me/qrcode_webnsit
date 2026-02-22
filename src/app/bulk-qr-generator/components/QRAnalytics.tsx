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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">
                Success Rate
              </p>
              <p className="text-2xl font-bold text-green-800">
                {analytics.successRate.toFixed(1)}%
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">
                Total Generated
              </p>
              <p className="text-2xl font-bold text-blue-800">
                {successfulResults.length}
              </p>
            </div>
            <Layers className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">
                Avg. Time
              </p>
              <p className="text-2xl font-bold text-purple-800">
                {analytics.avgProcessingTime.toFixed(0)}ms
              </p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-end">
        <Button
          onClick={downloadAll}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          disabled={successfulResults.length === 0}
        >
          <Download className="w-4 h-4" />
          Download All ({successfulResults.length})
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>

      {/* Successful QR Codes */}
      {successfulResults.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Successful QR Codes ({successfulResults.length})
            </h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-50 sticky top-0">
                <tr>
                  <th className="text-left p-3">Preview</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">URL</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Filename</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {successfulResults.map((result, index) => (
                  <tr
                    key={index}
                    className="border-t border-neutral-200 hover:bg-neutral-50"
                  >
                    <td className="p-3">
                      <img
                        src={result.dataURL}
                        alt={result.name || "QR Code"}
                        className="w-12 h-12 object-contain border border-neutral-200 rounded"
                      />
                    </td>
                    <td className="p-3 font-medium">
                      {result.name || `QR ${index + 1}`}
                    </td>
                    <td
                      className="p-3 max-w-xs truncate text-neutral-600 text-xs"
                      title={result.url}
                    >
                      {result.url}
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {result.category || "Uncategorized"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className="text-gray-700 font-mono text-xs">
                        {result.filename}
                      </span>
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadSingle(result)}
                        className="flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Failed QR Codes */}
      {failedResults.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Failed QR Codes ({failedResults.length})
            </h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-red-50 sticky top-0">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">URL</th>
                  <th className="text-left p-3">Error</th>
                </tr>
              </thead>
              <tbody>
                {failedResults.map((result, index) => (
                  <tr
                    key={index}
                    className="border-t border-neutral-200 hover:bg-red-50/50"
                  >
                    <td className="p-3 font-medium">
                      {result.name || `QR ${index + 1}`}
                    </td>
                    <td
                      className="p-3 max-w-xs truncate text-neutral-600 text-xs"
                      title={result.url}
                    >
                      {result.url}
                    </td>
                    <td className="p-3">
                      <span className="text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded">
                        {result.error}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Category Breakdown */}
      {Object.keys(analytics.categoriesCount).length > 0 && (
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Category Breakdown
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analytics.categoriesCount).map(
              ([category, count]) => (
                <div
                  key={category}
                  className="text-center p-3 bg-neutral-50 rounded-lg"
                >
                  <p className="text-sm font-medium text-gray-900">
                    {category}
                  </p>
                  <p className="text-2xl font-bold text-primary">{count}</p>
                </div>
              )
            )}
          </div>
        </Card>
      )}
    </div>
  );
}