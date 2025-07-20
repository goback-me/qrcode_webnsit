'use client';

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, Upload, X, ImageIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [url, setUrl] = useState("");
  const [sizeType, setSizeType] = useState("preset");
  const [presetSize, setPresetSize] = useState("400");
  const [customSize, setCustomSize] = useState("");
  const [format, setFormat] = useState("png");
  const [qrDataURL, setQrDataURL] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [cornerRadius, setCornerRadius] = useState(0); // New state for corner radius

  const { toast } = useToast();

  const isValidURL = (string: string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const getActualSize = () => {
    if (sizeType === "custom") {
      const size = parseInt(customSize);
      return isNaN(size) ? 400 : Math.min(Math.max(size, 100), 2000);
    }
    return parseInt(presetSize);
  };

  const validateInputs = () => {
    let hasErrors = false;
    
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setUrlError("Please enter a URL");
      hasErrors = true;
    } else if (!isValidURL(trimmedUrl)) {
      setUrlError("Please enter a valid URL (including http:// or https://)");
      hasErrors = true;
    } else {
      setUrlError("");
    }

    if (sizeType === "custom") {
      const size = parseInt(customSize);
      if (!customSize.trim()) {
        setSizeError("Please enter a size");
        hasErrors = true;
      } else if (isNaN(size)) {
        setSizeError("Size must be a number");
        hasErrors = true;
      } else if (size < 100) {
        setSizeError("Minimum size is 100px");
        hasErrors = true;
      } else if (size > 2000) {
        setSizeError("Maximum size is 2000px");
        hasErrors = true;
      } else {
        setSizeError("");
      }
    } else {
      setSizeError("");
    }

    return !hasErrors;
  };

  // Function to create rounded rectangle path
  const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const generateQRCode = useCallback(async () => {
    if (!validateInputs()) return;

    setIsGenerating(true);
    const trimmedUrl = url.trim();
    const actualSize = getActualSize();

    try {
      const canvas = document.createElement("canvas");
      
      await QRCode.toCanvas(canvas, trimmedUrl, {
        width: actualSize,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context is null");

      // Apply rounded corners if specified
      if (cornerRadius > 0) {
        const roundedCanvas = document.createElement("canvas");
        roundedCanvas.width = actualSize;
        roundedCanvas.height = actualSize;
        const roundedCtx = roundedCanvas.getContext("2d");
        
        if (roundedCtx) {
          // Create clipping mask with rounded corners
          roundedRect(roundedCtx, 0, 0, actualSize, actualSize, cornerRadius);
          roundedCtx.clip();
          
          // Draw the original QR code onto the rounded canvas
          roundedCtx.drawImage(canvas, 0, 0);
          
          // Replace the original canvas context with rounded version
          ctx.clearRect(0, 0, actualSize, actualSize);
          ctx.drawImage(roundedCanvas, 0, 0);
        }
      }

      if (logoPreview) {
        const logo = new Image();
        logo.src = logoPreview;

        logo.onload = () => {
          const logoSize = actualSize * 0.20; // Fixed 25% as requested
          const x = (actualSize - logoSize) / 2;
          const y = (actualSize - logoSize) / 2;

          // Add white background circle for logo
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(actualSize / 2, actualSize / 2, logoSize / 2 + 8, 0, 2 * Math.PI);
          ctx.fill();

          // Add subtle border
          ctx.strokeStyle = "#E5E7EB";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.drawImage(logo, x, y, logoSize, logoSize);
          const dataURL = canvas.toDataURL(`image/${format}`);
          setQrDataURL(dataURL);
          setIsGenerating(false);
        };

        logo.onerror = () => {
          console.error("Failed to load logo");
          const dataURL = canvas.toDataURL(`image/${format}`);
          setQrDataURL(dataURL);
          setIsGenerating(false);
        };
      } else {
        const dataURL = canvas.toDataURL(`image/${format}`);
        setQrDataURL(dataURL);
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      setIsGenerating(false);
    }
  }, [url, sizeType, presetSize, customSize, format, logoPreview, cornerRadius]);

  // Real-time QR code generation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (url.trim() && validateInputs()) {
        generateQRCode();
      } else {
        setQrDataURL(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [url, sizeType, presetSize, customSize, logoPreview, cornerRadius, generateQRCode]);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please upload a valid image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeImage = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const downloadQRCode = async () => {
    if (!qrDataURL || !url.trim() || !validateInputs()) return;

    const actualSize = getActualSize();
    const canvas = document.createElement("canvas");
    
    try {
      await QRCode.toCanvas(canvas, url.trim(), {
        width: actualSize,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context is null");

      // Apply rounded corners
      if (cornerRadius > 0) {
        const roundedCanvas = document.createElement("canvas");
        roundedCanvas.width = actualSize;
        roundedCanvas.height = actualSize;
        const roundedCtx = roundedCanvas.getContext("2d");
        
        if (roundedCtx) {
          roundedRect(roundedCtx, 0, 0, actualSize, actualSize, cornerRadius);
          roundedCtx.clip();
          roundedCtx.drawImage(canvas, 0, 0);
          ctx.clearRect(0, 0, actualSize, actualSize);
          ctx.drawImage(roundedCanvas, 0, 0);
        }
      }

      if (logoPreview) {
        const logo = new Image();
        logo.src = logoPreview;

        logo.onload = () => {
          const logoSize = actualSize * 0.25;
          const x = (actualSize - logoSize) / 2;
          const y = (actualSize - logoSize) / 2;

          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(actualSize / 2, actualSize / 2, logoSize / 2 + 8, 0, 2 * Math.PI);
          ctx.fill();

          ctx.strokeStyle = "#E5E7EB";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.drawImage(logo, x, y, logoSize, logoSize);
          
          const downloadURL = canvas.toDataURL(`image/${format}`);
          const link = document.createElement("a");
          link.download = `qr-code-${actualSize}x${actualSize}.${format}`;
          link.href = downloadURL;
          link.click();

          toast({
            title: "Success",
            description: `QR code downloaded as ${actualSize}x${actualSize} ${format.toUpperCase()}`,
          });
        };
      } else {
        const downloadURL = canvas.toDataURL(`image/${format}`);
        const link = document.createElement("a");
        link.download = `qr-code-${actualSize}x${actualSize}.${format}`;
        link.href = downloadURL;
        link.click();

        toast({
          title: "Success",
          description: `QR code downloaded as ${actualSize}x${actualSize} ${format.toUpperCase()}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download QR code",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="generator" className="text-center mb-16">
      <div className="">
        <h2 className="text-4xl font-poppins sm:text-5xl font-bold text-gray-900 mb-6">
          Create Free QR Codes <span className="text-blue-600">Instantly</span>
        </h2>
        <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
          Generate high-quality QR codes in real-time. No signup required. 100% ad-safe and privacy-friendly.
        </p>

        <Card className="p-8 mb-8 bg-white shadow-lg border-0">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
            <div className="space-y-6">
              {/* URL Input */}
              <div className="text-left">
                <div className="mb-4">
                  <p className="text-xl font-semibold text-gray-800">
                    <span className="bg-black text-white py-2 px-3 rounded-lg mr-3 text-lg font-bold">1</span>
                    Enter Your Content
                  </p>
                </div>
                <Label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL *
                </Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={`transition-all duration-200 ${urlError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                />
                {urlError && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {urlError}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200"></div>

              <div className="mb-4">
                <p className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="bg-black text-white py-2 px-3 rounded-lg mr-3 text-lg font-bold">2</span>
                  Customize Design
                </p>
              </div>
              
              {/* Logo Upload */}
              <div className="text-left">
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Add Logo (optional)
                </Label>
                
                {!logoPreview ? (
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group ${
                      isDragOver 
                        ? 'border-blue-500 bg-blue-50 transform scale-[1.02]' 
                        : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />
                    
                    <div className="space-y-4">
                      <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDragOver ? 'bg-blue-100 transform scale-110' : 'bg-gray-100 group-hover:bg-blue-100'
                      }`}>
                        <Upload className={`w-10 h-10 transition-all duration-300 ${
                          isDragOver ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                        }`} />
                      </div>
                      
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {isDragOver ? 'Drop your logo here!' : 'Drag & drop your logo'}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          or <span className="text-blue-600 font-medium">click to browse</span>
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 bg-white rounded-full px-4 py-2 mx-auto w-fit">
                        <ImageIcon className="w-4 h-4" />
                        <span>PNG, JPG, JPEG, GIF • Max 5MB</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={logoPreview}
                            alt="Logo Preview"
                            className="w-20 h-20 object-contain border-2 border-gray-200 rounded-lg shadow-sm bg-white"
                          />
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <p className="text-base font-semibold text-gray-900 truncate">
                            {logoFile?.name || 'Uploaded Logo'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {logoFile?.size ? `${(logoFile.size / 1024).toFixed(1)} KB` : 'Ready to use'}
                          </p>
                          <div className="flex items-center mt-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-xs text-green-600 font-medium">Logo ready</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={removeImage}
                          className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                          title="Remove logo"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    >
                      Change logo
                    </button>
                    
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Corner Style and Size/Format */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Corner Style */}
                <div className="text-left">
                  <Label className="block text-sm font-medium text-gray-700 mb-3">
                    Corner Style
                  </Label>
                  <Select value={cornerRadius.toString()} onValueChange={(value) => setCornerRadius(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="0">Square Corners</SelectItem>
                      <SelectItem value="8">Slightly Rounded</SelectItem>
                      <SelectItem value="16">Moderately Rounded</SelectItem>
                      <SelectItem value="24">Very Rounded</SelectItem>
                      <SelectItem value="32">Maximum Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Download Format */}
                <div className="text-left">
                  <Label className="block text-sm font-medium text-gray-700 mb-3">
                    Download Format
                  </Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="png">PNG - Best Quality</SelectItem>
                      <SelectItem value="jpeg">JPEG - Smaller Size</SelectItem>
                      <SelectItem value="webp">WebP - Modern Format</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* QR Code Size */}
              <div className="text-left">
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  QR Code Size
                </Label>
                <div className="space-y-3">
                  <Select value={sizeType} onValueChange={setSizeType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="preset">Preset Sizes</SelectItem>
                      <SelectItem value="custom">Custom Size</SelectItem>
                    </SelectContent>
                  </Select>

                  {sizeType === "preset" ? (
                    <Select value={presetSize} onValueChange={setPresetSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="200">Small - 200×200px</SelectItem>
                        <SelectItem value="400">Medium - 400×400px</SelectItem>
                        <SelectItem value="800">Large - 800×800px</SelectItem>
                        <SelectItem value="1200">XL - 1200×1200px</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div>
                      <Input
                        type="number"
                        placeholder="Enter size (100-2000)"
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        min="100"
                        max="2000"
                        className={`${sizeError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                      />
                      {sizeError && (
                        <div className="flex items-center mt-1 text-xs text-red-600">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {sizeError}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Size in pixels (100-2000)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
                    
            {/* QR Preview */}
            <div className="flex flex-col items-center">
               <div className="mb-4">
                  <p className="text-xl font-semibold text-gray-800">
                    <span className="bg-black text-white py-2 px-3 rounded-lg mr-3 text-lg font-bold">3</span>
                    Download QR Code
                  </p>
                </div>
              <div className="w-full max-w-sm">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 relative overflow-hidden">
                  {qrDataURL ? (
                    <>
                      <img
                        src={qrDataURL}
                        alt="Generated QR Code"
                        className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
                      />
                      {isGenerating && (
                        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-gray-500">
                      <svg
                        className="w-20 h-20 mx-auto mb-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                      <p className="text-sm font-medium">Enter a URL to generate QR code</p>
                      <p className="text-xs text-gray-400 mt-1">Real-time preview</p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={downloadQRCode}
                  disabled={!qrDataURL || !url.trim() || !!urlError || !!sizeError}
                  className={`w-full transition-all duration-200 ${
                    qrDataURL && url.trim() && !urlError && !sizeError
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {qrDataURL && url.trim() && !urlError && !sizeError 
                    ? `Download ${getActualSize()}×${getActualSize()} ${format.toUpperCase()}`
                    : 'Download QR Code'
                  }
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-3">
                  {qrDataURL && url.trim() && !urlError && !sizeError
                    ? `High-quality ${format.toUpperCase()} • No watermark`
                    : 'Enter valid URL to enable download'
                  }
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-600">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Real-time generation
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            No signup required
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Privacy-friendly
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            No watermarks
          </div>
        </div>
      </div>
    </section>
  );
}