"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, Download, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface BulkQRData {
  id: string;
  url: string;
  name?: string;
  category?: string;
  customFilename?: string;
}

interface QRInputProps {
  inputMethod: "manual" | "csv";
  setInputMethod: (method: "manual" | "csv") => void;
  urls: string;
  setUrls: (urls: string) => void;
  csvData: BulkQRData[];
  setCsvData: (data: BulkQRData[]) => void;
  isGenerating: boolean;
}

export default function QRInput({
  inputMethod,
  setInputMethod,
  urls,
  setUrls,
  csvData,
  setCsvData,
  isGenerating,
}: QRInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const parseCSV = (csvText: string): BulkQRData[] => {
    const lines = csvText.trim().split("\n");
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const urlIndex = headers.findIndex(
      (h) => h.includes("url") || h.includes("link")
    );
    const nameIndex = headers.findIndex(
      (h) => h.includes("name") || h.includes("title")
    );
    const categoryIndex = headers.findIndex(
      (h) => h.includes("category") || h.includes("type")
    );
    const filenameIndex = headers.findIndex(
      (h) => h.includes("filename") || h.includes("file")
    );

    if (urlIndex === -1) {
      throw new Error("CSV must contain a URL column");
    }

    return lines
      .slice(1)
      .map((line, index) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
        return {
          id: `csv-${index}`,
          url: values[urlIndex] || "",
          name: nameIndex !== -1 ? values[nameIndex] : undefined,
          category: categoryIndex !== -1 ? values[categoryIndex] : undefined,
          customFilename:
            filenameIndex !== -1 ? values[filenameIndex] : undefined,
        };
      })
      .filter((item) => item.url);
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Security validation: Check file type and size
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['text/csv', 'application/vnd.ms-excel'];
    
    if (!file.name.endsWith(".csv")) {
      toast({
        title: "Error",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Error",
        description: `File size must be less than 5MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`,
        variant: "destructive",
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        
        // Security: Validate CSV content structure
        if (!csvText.trim()) {
          throw new Error('CSV file is empty');
        }
        
        const data = parseCSV(csvText);
        if (data.length === 0) {
          throw new Error('No valid data found in CSV file');
        }
        
        setCsvData(data);
        setInputMethod("csv");
        toast({
          title: "Success",
          description: `Loaded ${data.length} URLs from CSV file: ${file.name}`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to parse CSV",
          variant: "destructive",
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read the file. Please try again.",
        variant: "destructive",
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    
    reader.readAsText(file);
  };

  const downloadCSVTemplate = () => {
    const template = `url,name,category,filename
https://example.com,Example Website,Marketing,example_qr
https://mystore.com/product1,Product 1,Product,product1_qr
https://event.com/register,Event Registration,Event,event_qr`;

    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr_bulk_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="glass-card p-4 sm:p-6 md:p-8 h-full flex flex-col">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="inline-flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-blue-100 text-blue-600 font-semibold flex-shrink-0">
            <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
          </span>
          <span>Data Input</span>
        </h3>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6 flex-shrink-0">
          <button
            onClick={() => setInputMethod("manual")}
            className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base transition-all ${
              inputMethod === "manual"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FileText className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1 sm:mr-2" />
            Manual
          </button>
          <button
            onClick={() => setInputMethod("csv")}
            className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base transition-all ${
              inputMethod === "csv"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Upload className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1 sm:mr-2" />
            CSV
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {inputMethod === "manual" ? (
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Label htmlFor="bulk-urls" className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                  URLs (one per line)
                </Label>
                <Textarea
                  id="bulk-urls"
                  rows={8}
                  placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  disabled={isGenerating}
                  className="w-full font-mono text-xs sm:text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200 text-xs sm:text-sm">
                <span className="font-medium text-blue-900">
                  {urls.split("\n").filter((url) => url.trim().length > 0).length} URLs
                </span>
                <span className="text-blue-700">Max 1000</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between gap-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700">CSV File Upload</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCSVTemplate}
                  className="flex items-center gap-1 text-xs sm:text-sm border-blue-200 text-blue-600 hover:bg-blue-50 px-2 sm:px-3 py-1 sm:py-2"
                >
                  <Download className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span className="hidden sm:inline">Template</span>
                </Button>
              </div>

              <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 sm:p-6 md:p-8 text-center bg-blue-50 transition-colors hover:bg-blue-100">
                <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-blue-400 mx-auto mb-2 sm:mb-3" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm mb-2"
                >
                  Choose File
                </Button>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  CSV: url, name, category, filename
                </p>
              </div>

              {csvData.length > 0 && (
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg border-l-4 border-green-500 space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-green-900 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                        <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5" />
                        Loaded
                      </h4>
                      <p className="text-xs sm:text-sm text-green-700 mt-1">
                        {csvData.length} URLs ready
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCsvData([]);
                        setInputMethod('manual');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-xs sm:text-sm font-medium text-green-600 hover:text-red-600 bg-white px-2 sm:px-3 py-1 rounded border border-green-200"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-1 sm:gap-2 max-h-20 overflow-y-auto text-xs">
                    {csvData.slice(0, 3).map((item, index) => (
                      <div key={index} className="text-green-700 bg-white p-1.5 sm:p-2 rounded border border-green-200 truncate">
                        <strong>{item.name || `Item ${index + 1}`}</strong>: {item.url}
                      </div>
                    ))}
                    {csvData.length > 3 && (
                      <div className="text-green-700 text-center py-1 text-xs">
                        +{csvData.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}