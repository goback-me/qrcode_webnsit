"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import QRCode from "qrcode";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";

// Components
import QrUrlInput from "./QrUrlInput";
import QrLogoUploader from "./QrLogoUploader";
import QrCornerStyle from "./QrCornerStyle";
import QrFormatSelect from "./QrFormatSelect";
import QrSizeSelect from "./QrSizeSelect";
import QrPreview from "./QrPreview";
import QrDownloadButton from "./QrDownloadButton";

export default function QrGenerator() {
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [cornerStyle, setCornerStyle] = useState("square");
  const [format, setFormat] = useState("svg");
  const [size, setSize] = useState(300);
  const [qrDataUrl, setQrDataUrl] = useState("");

  const generateQrWithLogo = async (
    qrCanvas: HTMLCanvasElement,
    logoFile: File
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = size;
      canvas.height = size;

      // Draw QR code
      ctx.drawImage(qrCanvas, 0, 0, size, size);

      // Create logo image
      const logoImg = new Image();
      logoImg.onload = () => {
        // Calculate logo size (about 15% of QR code size)
        const logoSize = size * 0.15;
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;

        // Create white background circle/square for logo
        ctx.fillStyle = "white";
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 2;

        if (cornerStyle === "circle") {
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, logoSize / 2 + 4, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        } else {
          const padding = 4;
          ctx.fillRect(
            logoX - padding,
            logoY - padding,
            logoSize + padding * 2,
            logoSize + padding * 2
          );
          ctx.strokeRect(
            logoX - padding,
            logoY - padding,
            logoSize + padding * 2,
            logoSize + padding * 2
          );
        }

        // Draw logo
        if (cornerStyle === "circle") {
          ctx.save();
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, logoSize / 2, 0, 2 * Math.PI);
          ctx.clip();
        }

        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

        if (cornerStyle === "circle") {
          ctx.restore();
        }

        resolve(canvas.toDataURL());
      };

      logoImg.src = URL.createObjectURL(logoFile);
    });
  };

  const generateQr = async () => {
    if (!url.trim()) {
      alert("Please enter a URL first");
      return;
    }

    try {
      if (format === "svg" && !logo) {
        // SVG without logo
        const qr = await QRCode.toString(url, {
          type: "svg",
          width: size,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        const blob = new Blob([qr], { type: "image/svg+xml" });
        setQrDataUrl(URL.createObjectURL(blob));
      } else {
        // Canvas-based generation (for logo support or non-SVG formats)
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, url, {
          width: size,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        let finalDataUrl: string;

        if (logo) {
          // Generate QR with logo
          finalDataUrl = await generateQrWithLogo(canvas, logo);
        } else {
          // Generate QR without logo
          finalDataUrl = canvas.toDataURL(
            `image/${format === "jpeg" ? "jpeg" : "png"}`
          );
        }

        if (format === "svg" && logo) {
          // Convert canvas to SVG if SVG format is selected with logo
          const img = new Image();
          img.onload = () => {
            const svgCanvas = document.createElement("canvas");
            svgCanvas.width = size;
            svgCanvas.height = size;
            const svgCtx = svgCanvas.getContext("2d")!;
            svgCtx.drawImage(img, 0, 0);

            // Create SVG with embedded image
            const svgContent = `
              <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
                <image href="${finalDataUrl}" width="${size}" height="${size}"/>
              </svg>
            `;
            const blob = new Blob([svgContent], { type: "image/svg+xml" });
            setQrDataUrl(URL.createObjectURL(blob));
          };
          img.src = finalDataUrl;
        } else {
          setQrDataUrl(finalDataUrl);
        }
      }
    } catch (err) {
      console.error("QR generation failed:", err);
      alert("Failed to generate QR code. Please check your URL and try again.");
    }
  };

  return (
    <section id="generator" className="text-center font-poppins">
      <div className="input-card ">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
          {/* LEFT: inputs */}
          <div className="space-y-6">
            {/* Step 1: URL */}
            <div className="flex items-center justify-start">
              <Label htmlFor="url" className="text-lg font-medium text-left">
                <span className="bg-black text-white px-2 rounded-md">1</span>{" "}
                Enter Website URL
              </Label>
            </div>
            <QrUrlInput onChange={setUrl} />

            {/* Step 2: Logo */}
            <QrLogoUploader onUpload={setLogo} />

                       <div className="grid grid-cols-2 w-full justify-between gap-5 mb-5">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center mb-2">
                  <Label>Size</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={15} />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white">
                        <p>Set the QR code size.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Step 4: Size */}
                <QrSizeSelect value={size} onChange={setSize} />
              </div>
              <div>
                <div className="flex gap-2 items-center mb-2">
                  <Label>Format</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={15} />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white">
                        <p>Select QR code format.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <QrFormatSelect value={format} onChange={setFormat} />
              </div>
            </div>
            <div className="flex w-full gap-2 mb-5 flex-col">
              <div className="flex gap-2 items-center mb-2">
                <Label>Image Corner</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={15} />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Select image style: circle or square.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <QrCornerStyle value={cornerStyle} onChange={setCornerStyle} />
            </div>

            {/* Step 5: Generate Button */}
            <button
              onClick={generateQr}
              disabled={!url.trim()}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              Generate QR Code
            </button>
          </div>

          {/* RIGHT: preview + download */}
          <div className="flex flex-col items-center top-20 md:sticky">
            <QrPreview qrDataUrl={qrDataUrl} />

            <QrDownloadButton qrDataUrl={qrDataUrl} format={format} />
          </div>
        </div>
      </div>
    </section>
  );
}
