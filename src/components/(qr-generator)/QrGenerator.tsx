"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ChevronDown, Info } from "lucide-react";
import { Label } from "@/components/ui/label";

// Components
import QrTypeSelector, { QRDataType } from "./QrTypeSelector";
import QrUrlInput from "./QrUrlInput";
import QrWiFiInput from "./QrWiFiInput";
import QrVCardInput from "./QrVCardInput";
import QrTextInput from "./QrTextInput";
import QrEmailInput from "./QrEmailInput";
import QrPhoneInput from "./QrPhoneInput";
import QrLogoUploader from "./QrLogoUploader";
import QrCornerStyle from "./QrCornerStyle";
import QrFormatSelect from "./QrFormatSelect";
import QrSizeSelect from "./QrSizeSelect";
import QrPreview from "./QrPreview";
import QrDownloadButton from "./QrDownloadButton";

type ValidationErrors = Partial<Record<
  | "url"
  | "ssid"
  | "password"
  | "firstName"
  | "lastName"
  | "vcardPhone"
  | "vcardEmail"
  | "vcardUrl"
  | "email"
  | "phone",
  string
>>;

export default function   QrGenerator() {
  const [qrType, setQrType] = useState<QRDataType>("url");
  const [url, setUrl] = useState("");
  const [wifiData, setWifiData] = useState<{
    ssid: string;
    password: string;
    security: "WPA" | "WEP" | "nopass";
  }>({
    ssid: "",
    password: "",
    security: "WPA",
  });
  const [vCardData, setVCardData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
    url: "",
  });
  const [plainText, setPlainText] = useState("");
  const [emailData, setEmailData] = useState({
    email: "",
    subject: "",
    body: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  const [logo, setLogo] = useState<File | null>(null);
  const [cornerStyle, setCornerStyle] = useState("square");
  const [format, setFormat] = useState("svg");
  const [size, setSize] = useState(300);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isValidHttpUrl = (value: string) => {
    try {
      const parsed = new URL(value);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isValidPhone = (value: string) => {
    const cleanPhone = value.replace(/[^0-9+]/g, "");
    const digitsOnly = cleanPhone.replace(/\+/g, "");
    return digitsOnly.length >= 7;
  };

  const getValidationErrors = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    switch (qrType) {
      case "url": {
        if (url.trim() && !isValidHttpUrl(url.trim())) {
          errors.url = "Enter a valid URL starting with http:// or https://";
        }
        break;
      }

      case "wifi": {
        const hasAnyWifiInput = Boolean(wifiData.ssid.trim() || wifiData.password.trim());

        if (hasAnyWifiInput && !wifiData.ssid.trim()) {
          errors.ssid = "Network name is required";
        }

        if (wifiData.security !== "nopass" && hasAnyWifiInput && !wifiData.password.trim()) {
          errors.password = "Password is required for secured networks";
        }
        break;
      }

      case "vcard": {
        const hasAnyVCardInput = Boolean(
          vCardData.firstName.trim() ||
          vCardData.lastName.trim() ||
          vCardData.phone.trim() ||
          vCardData.email.trim() ||
          vCardData.organization.trim() ||
          vCardData.url.trim()
        );

        if (hasAnyVCardInput && !vCardData.firstName.trim()) {
          errors.firstName = "First name is required";
        }

        if (hasAnyVCardInput && !vCardData.lastName.trim()) {
          errors.lastName = "Last name is required";
        }

        if (vCardData.phone.trim() && !isValidPhone(vCardData.phone.trim())) {
          errors.vcardPhone = "Enter a valid phone number";
        }

        if (vCardData.email.trim() && !isValidEmail(vCardData.email.trim())) {
          errors.vcardEmail = "Enter a valid email address";
        }

        if (vCardData.url.trim() && !isValidHttpUrl(vCardData.url.trim())) {
          errors.vcardUrl = "Enter a valid website URL";
        }
        break;
      }

      case "email": {
        const hasAnyEmailInput = Boolean(
          emailData.email.trim() || emailData.subject.trim() || emailData.body.trim()
        );

        if (hasAnyEmailInput && !emailData.email.trim()) {
          errors.email = "Email address is required";
        } else if (emailData.email.trim() && !isValidEmail(emailData.email.trim())) {
          errors.email = "Enter a valid email address";
        }
        break;
      }

      case "phone": {
        if (phoneNumber.trim() && !isValidPhone(phoneNumber.trim())) {
          errors.phone = "Enter a valid phone number";
        }
        break;
      }

      default:
        break;
    }

    return errors;
  };

  const validationErrors = getValidationErrors();
  const hasValidationErrors = Object.keys(validationErrors).length > 0;


  const hasRequiredInput = (): boolean => {
    switch (qrType) {
      case "url":
        return Boolean(url.trim());
      case "wifi":
        return Boolean(wifiData.ssid.trim());
      case "vcard":
        return Boolean(vCardData.firstName.trim() && vCardData.lastName.trim());
      case "text":
        return Boolean(plainText.trim());
      case "email":
        return Boolean(emailData.email.trim());
      case "phone":
        return Boolean(phoneNumber.trim());
      default:
        return false;
    }
  };

  const canGenerate = hasRequiredInput() && !hasValidationErrors;

  const generateQrData = (): string => {
    switch (qrType) {
      case "url":
        if (!isValidHttpUrl(url.trim())) {
          throw new Error("Please enter a valid URL starting with http:// or https://");
        }
        return url;

      case "wifi":
        // WiFi QR format: WIFI:T:security;S:SSID;P:password;;
        if (!wifiData.ssid.trim()) {
          throw new Error("Please enter WiFi network name");
        }
        if (wifiData.security !== "nopass" && !wifiData.password.trim()) {
          throw new Error("Please enter the WiFi password");
        }
        const securityType = wifiData.security === "nopass" ? "" : wifiData.security;
        const passwordPart =
          wifiData.security === "nopass" ? "" : `;P:${wifiData.password}`;
        return `WIFI:T:${securityType};S:${wifiData.ssid}${passwordPart};;`;

      case "vcard":
        // vCard format
        if (!vCardData.firstName.trim() || !vCardData.lastName.trim()) {
          throw new Error("Please enter first and last name for vCard");
        }
        if (vCardData.email.trim() && !isValidEmail(vCardData.email.trim())) {
          throw new Error("Please enter a valid email address for vCard");
        }
        if (vCardData.url.trim() && !isValidHttpUrl(vCardData.url.trim())) {
          throw new Error("Please enter a valid website URL for vCard");
        }
        if (vCardData.phone.trim() && !isValidPhone(vCardData.phone.trim())) {
          throw new Error("Please enter a valid phone number for vCard");
        }
        const vCardLines = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:${vCardData.firstName} ${vCardData.lastName}`,
          `N:${vCardData.lastName};${vCardData.firstName};;;`,
        ];

        if (vCardData.phone) vCardLines.push(`TEL:${vCardData.phone}`);
        if (vCardData.email) vCardLines.push(`EMAIL:${vCardData.email}`);
        if (vCardData.organization) vCardLines.push(`ORG:${vCardData.organization}`);
        if (vCardData.url) vCardLines.push(`URL:${vCardData.url}`);

        vCardLines.push("END:VCARD");
        return vCardLines.join("\n");

      case "text":
        if (!plainText.trim()) {
          throw new Error("Please enter text");
        }
        return plainText;

      case "email":
        if (!emailData.email.trim()) {
          throw new Error("Please enter email address");
        }
        if (!isValidEmail(emailData.email.trim())) {
          throw new Error("Please enter a valid email address");
        }
        let emailLink = `mailto:${emailData.email}`;
        const params = [];
        if (emailData.subject) params.push(`subject=${encodeURIComponent(emailData.subject)}`);
        if (emailData.body) params.push(`body=${encodeURIComponent(emailData.body)}`);
        if (params.length > 0) emailLink += `?${params.join("&")}`;
        return emailLink;

      case "phone":
        if (!phoneNumber.trim()) {
          throw new Error("Please enter phone number");
        }
        if (!isValidPhone(phoneNumber.trim())) {
          throw new Error("Please enter a valid phone number");
        }
        // Remove special characters and keep only digits and +
        const cleanPhone = phoneNumber.replace(/[^0-9+]/g, "");
        return `tel:${cleanPhone}`;

      default:
        return "";
    }
  };

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

  const generateQr = async (showErrors = true) => {
    try {
      const qrData = generateQrData();

      if (format === "svg" && !logo) {
        // SVG without logo
        const qr = await QRCode.toString(qrData, {
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
        await QRCode.toCanvas(canvas, qrData, {
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
      if (showErrors) {
        alert(
          err instanceof Error ? err.message : "Failed to generate QR code. Please check your input and try again."
        );
      }
    }
  };

  useEffect(() => {
    if (!canGenerate) {
      setQrDataUrl("");
      return;
    }

    const timer = setTimeout(() => {
      void generateQr(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [
    canGenerate,
    qrType,
    url,
    wifiData,
    vCardData,
    plainText,
    emailData,
    phoneNumber,
    logo,
    cornerStyle,
    format,
    size,
  ]);

  const inputHeading = {
    url: "Enter website URL",
    wifi: "Configure WiFi",
    vcard: "Enter contact details",
    text: "Enter your text",
    email: "Enter email details",
    phone: "Enter phone number",
  }[qrType];

  return (
    <section id="generator" className="font-poppins">
      <div className="rounded-[26px] border-0 bg-transparent p-0 shadow-none sm:border sm:border-slate-200 sm:bg-white sm:p-4 sm:shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-5 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
              Create QR code
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">Pick a type, add content, generate.</p>
          </div>
        </div>

        <div>
          <QrTypeSelector value={qrType} onChange={setQrType} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
          <div className="rounded-[20px] border border-slate-200 bg-white p-4 sm:rounded-[22px] sm:p-5">
            <div className="space-y-5">
              <div className="space-y-1">
                <Label className="block text-base font-semibold tracking-tight text-slate-950 sm:text-lg">
                  {inputHeading}
                </Label>
              </div>

              {qrType === "url" && (
                <QrUrlInput value={url} onChange={setUrl} error={validationErrors.url} />
              )}
              {qrType === "wifi" && (
                <QrWiFiInput
                  data={wifiData}
                  onChange={setWifiData}
                  errors={{
                    ssid: validationErrors.ssid,
                    password: validationErrors.password,
                  }}
                />
              )}
              {qrType === "vcard" && (
                <QrVCardInput
                  data={vCardData}
                  onChange={setVCardData}
                  errors={{
                    firstName: validationErrors.firstName,
                    lastName: validationErrors.lastName,
                    phone: validationErrors.vcardPhone,
                    email: validationErrors.vcardEmail,
                    url: validationErrors.vcardUrl,
                  }}
                />
              )}
              {qrType === "text" && (
                <QrTextInput value={plainText} onChange={setPlainText} />
              )}
              {qrType === "email" && (
                <QrEmailInput data={emailData} onChange={setEmailData} error={validationErrors.email} />
              )}
              {qrType === "phone" && (
                <QrPhoneInput value={phoneNumber} onChange={setPhoneNumber} error={validationErrors.phone} />
              )}

              <div className="rounded-2xl border border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setShowAdvanced((value) => !value)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">Advanced options</p>
                    <p className="text-xs text-slate-500">Logo, format, size</p>
                  </div>
                  <ChevronDown
                    className={[
                      "h-4 w-4 text-slate-500 transition-transform duration-200",
                      showAdvanced ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                {showAdvanced && (
                  <div className="space-y-4 border-t border-slate-200 px-3 py-3 sm:px-4 sm:py-4">
                    <QrLogoUploader onUpload={setLogo} />

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-3">
                        <div className="mb-2 flex items-center gap-2">
                          <Label className="text-sm font-medium text-slate-800">Size</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info size={15} className="text-slate-500" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-white">
                                <p>Set the QR code size.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <QrSizeSelect value={size} onChange={setSize} />
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-3">
                        <div className="mb-2 flex items-center gap-2">
                          <Label className="text-sm font-medium text-slate-800">Format</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info size={15} className="text-slate-500" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-white">
                                <p>Select the export file format.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <QrFormatSelect value={format} onChange={setFormat} />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 flex items-center gap-2">
                        <Label className="text-sm font-medium text-slate-800">Logo corner style</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info size={15} className="text-slate-500" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-white">
                              <p>Select whether the logo frame is square or circular.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <QrCornerStyle value={cornerStyle} onChange={setCornerStyle} />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => void generateQr(true)}
                  disabled={!canGenerate}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.22)] transition-all duration-200 hover:bg-blue-700 sm:w-auto"
                >
                  Generate QR Code
                </button>
                <p className="text-xs text-slate-500 sm:text-right">
                  {hasValidationErrors ? "Fix the highlighted fields to generate." : "Preview updates while you type."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white p-4 xl:hidden">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Preview</h3>
                <p className="mt-1 text-xs text-slate-500">Live preview while typing.</p>
              </div>
            </div>

            <div className="mt-4">
              <QrPreview qrDataUrl={qrDataUrl} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-medium text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
                <span className="block text-[11px] uppercase tracking-[0.16em] text-slate-400">Format</span>
                <span className="mt-1 block text-sm font-semibold text-slate-900">{format.toUpperCase()}</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
                <span className="block text-[11px] uppercase tracking-[0.16em] text-slate-400">Size</span>
                <span className="mt-1 block text-sm font-semibold text-slate-900">{size}px</span>
              </div>
            </div>

            <div className="mt-4">
              <QrDownloadButton qrDataUrl={qrDataUrl} format={format} />
            </div>
          </div>

          <div className="hidden rounded-[22px] border border-slate-200 bg-slate-50/80 p-4 sm:p-5 xl:sticky xl:top-24 xl:block">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Preview</h3>
                <p className="mt-1 text-xs text-slate-500">Download when ready.</p>
              </div>
            </div>

            <div className="mt-4">
              <QrPreview qrDataUrl={qrDataUrl} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-medium text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
                <span className="block text-[11px] uppercase tracking-[0.16em] text-slate-400">Format</span>
                <span className="mt-1 block text-sm font-semibold text-slate-900">{format.toUpperCase()}</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
                <span className="block text-[11px] uppercase tracking-[0.16em] text-slate-400">Size</span>
                <span className="mt-1 block text-sm font-semibold text-slate-900">{size}px</span>
              </div>
            </div>

            <div className="mt-4">
              <QrDownloadButton qrDataUrl={qrDataUrl} format={format} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
