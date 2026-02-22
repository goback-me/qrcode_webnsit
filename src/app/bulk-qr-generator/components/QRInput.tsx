"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, Download, FileText } from "lucide-react";
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

    if (!file.name.endsWith(".csv")) {
      toast({
        title: "Error",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const data = parseCSV(csvText);
        setCsvData(data);
        setInputMethod("csv");
        toast({
          title: "Success",
          description: `Loaded ${data.length} URLs from CSV`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to parse CSV",
          variant: "destructive",
        });
      }
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
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Data Input Methods
      </h3>

      <div className="flex gap-4 mb-6">
        <Button
          variant={inputMethod === "manual" ? "default" : "outline"}
          onClick={() => setInputMethod("manual")}
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Manual Entry
        </Button>
        <Button
          variant={inputMethod === "csv" ? "default" : "outline"}
          onClick={() => setInputMethod("csv")}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          CSV Import
        </Button>
      </div>

      {inputMethod === "manual" ? (
        <div className="space-y-4">
          <Label htmlFor="bulk-urls" className="text-sm font-medium">
            URLs (one per line)
          </Label>
          <Textarea
            id="bulk-urls"
            rows={12}
            placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            disabled={isGenerating}
            className="w-full font-mono text-sm"
          />
          <p className="text-xs text-neutral-500">
            {urls.split("\n").filter((url) => url.trim().length > 0).length}{" "}
            URLs entered (max 1000)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">CSV File Upload</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadCSVTemplate}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Template
            </Button>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mb-2"
            >
              Upload CSV File
            </Button>
            <p className="text-sm text-neutral-500">
              CSV should contain columns: url, name, category, filename
            </p>
          </div>

          {csvData.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">
                CSV Data Loaded Successfully
              </h4>
              <p className="text-sm text-green-600">
                {csvData.length} URLs loaded from CSV file
              </p>
              <div className="mt-2 max-h-32 overflow-y-auto">
                {csvData.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    className="text-xs text-green-600"
                  >
                    {item.name || `Item ${index + 1}`}: {item.url}
                  </div>
                ))}
                {csvData.length > 5 && (
                  <div className="text-xs text-green-600">
                    ... and {csvData.length - 5} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}