'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import AdSpace from "@/components/ad-space";

export default function QRGenerator() {
  const [url, setUrl] = useState("");
  const [size, setSize] = useState("400");
  const [format, setFormat] = useState("png");
  const [qrDataURL, setQrDataURL] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const isValidURL = (string: string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const generateQRCode = async () => {
    const trimmedUrl = url.trim();
    
    if (!trimmedUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive"
      });
      return;
    }

    if (!isValidURL(trimmedUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL (including http:// or https://)",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const dataURL = await QRCode.toDataURL(trimmedUrl, {
        width: parseInt(size),
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      setQrDataURL(dataURL);
      toast({
        title: "Success",
        description: "QR code generated successfully!",
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Error generating QR code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = async () => {
    if (!qrDataURL) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `qr-code-${size}x${size}.png`;
      link.href = qrDataURL;
      link.click();
    } else if (format === 'svg') {
      try {
        const svgString = await QRCode.toString(url.trim(), {
          type: 'svg',
          width: parseInt(size),
          margin: 2
        });
        
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url_obj = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `qr-code-${size}x${size}.svg`;
        link.href = url_obj;
        link.click();
        URL.revokeObjectURL(url_obj);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error generating SVG. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <section id="generator" className="text-center mb-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Create Free QR Codes{" "}
          <span className="text-primary">Instantly</span>
        </h2>
        <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
          Generate high-quality QR codes for your website, business, product, or personal use. 
          No signup required. 100% ad-safe and privacy-friendly.
        </p>
        
        <Card className="p-8 mb-8">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="text-left">
                <Label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your URL
                </Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generateQRCode()}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <Label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="200">200x200</SelectItem>
                      <SelectItem value="400">400x400</SelectItem>
                      <SelectItem value="800">800x800</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-left">
                  <Label htmlFor="format-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Format
                  </Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="svg">SVG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={generateQRCode}
                disabled={isGenerating}
                className="w-full bg-primary bg-blue-600 text-white hover:bg-blue-400"
              >
                {isGenerating ? "Generating..." : "Generate QR Code"}
              </Button>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-neutral-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                {qrDataURL ? (
                  <img src={qrDataURL} alt="Generated QR Code" className="max-w-full h-auto rounded-lg shadow-lg" />
                ) : (
                  <div className="text-center text-neutral-600">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="text-sm">QR code will appear here</p>
                  </div>
                )}
              </div>
              
              {qrDataURL && (
                <div className="space-y-3 w-full">
                  <Button 
                    onClick={downloadQRCode}
                    className="w-full bg-secondary text-white bg-green-600 hover:bg-green-400"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </Button>
                  <p className="text-xs text-neutral-600 text-center">High-quality, no watermark</p>
                </div>
              )}
            </div>
            
            {/* Ad space in QR generator - only show on larger screens */}
            <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
              <AdSpace size="square" label="Sponsored" className="w-64" />
            </div>
          </div>
        </Card>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-600">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-secondary mr-2" />
            No signup required
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-secondary mr-2" />
            100% Privacy-friendly
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-secondary mr-2" />
            No watermarks
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-secondary mr-2" />
            Google Ads compliant
          </div>
        </div>
      </div>
    </section>
  );
}
