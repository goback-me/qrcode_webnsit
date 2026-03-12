"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";

export interface BusinessSettings {
  addLogo: boolean;
  logoFile?: File;
  foregroundColor: string;
  backgroundColor: string;
  margin: number;
  errorCorrection: "L" | "M" | "Q" | "H";
  addBranding: boolean;
  brandingText: string;
}

interface QRCustomizationProps {
  size: string;
  setSize: (size: string) => void;
  format: string;
  setFormat: (format: string) => void;
  businessSettings: BusinessSettings;
  setBusinessSettings: React.Dispatch<React.SetStateAction<BusinessSettings>>;
}

export default function QRCustomization({
  size,
  setSize,
  format,
  setFormat,
  businessSettings,
  setBusinessSettings,
}: QRCustomizationProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="glass-card p-4 sm:p-6 md:p-8 h-full flex flex-col">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="inline-flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-blue-100 text-blue-600 font-semibold flex-shrink-0">
            <Palette className="w-4 sm:w-5 h-4 sm:h-5" />
          </span>
          <span>Customize Design</span>
        </h3>

        <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6">
          {/* QR Code Settings */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">QR Code Settings</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="size" className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                    Size
                  </Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger className="border-gray-200 rounded-lg text-xs sm:text-sm h-9 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="200">200x200</SelectItem>
                      <SelectItem value="400">400x400</SelectItem>
                      <SelectItem value="600">600x600</SelectItem>
                      <SelectItem value="800">800x800</SelectItem>
                      <SelectItem value="1000">1000x1000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="format" className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                    Format
                  </Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="border-gray-200 rounded-lg text-xs sm:text-sm h-9 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="svg">SVG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                  Error Correction
                </Label>
                <Select
                  value={businessSettings.errorCorrection}
                  onValueChange={(value: "L" | "M" | "Q" | "H") =>
                    setBusinessSettings((prev) => ({
                      ...prev,
                      errorCorrection: value,
                    }))
                  }
                >
                  <SelectTrigger className="border-gray-200 rounded-lg text-xs sm:text-sm h-9 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="L">Low (7%)</SelectItem>
                    <SelectItem value="M">Medium (15%)</SelectItem>
                    <SelectItem value="Q">Quartile (25%)</SelectItem>
                    <SelectItem value="H">High (30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Colors Section */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">Colors</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-end gap-2 sm:gap-3">
                <div className="flex-1">
                  <Label htmlFor="fg-color" className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                    Foreground
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="fg-color"
                      type="color"
                      value={businessSettings.foregroundColor}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({
                          ...prev,
                          foregroundColor: e.target.value,
                        }))
                      }
                      className="h-9 sm:h-10 w-12 sm:w-16 border-gray-200 rounded-lg cursor-pointer p-1"
                    />
                    <input
                      type="text"
                      value={businessSettings.foregroundColor}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({
                          ...prev,
                          foregroundColor: e.target.value,
                        }))
                      }
                      className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg font-mono"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-2 sm:gap-3">
                <div className="flex-1">
                  <Label htmlFor="bg-color" className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                    Background
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="bg-color"
                      type="color"
                      value={businessSettings.backgroundColor}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({
                          ...prev,
                          backgroundColor: e.target.value,
                        }))
                      }
                      className="h-9 sm:h-10 w-12 sm:w-16 border-gray-200 rounded-lg cursor-pointer p-1"
                    />
                    <input
                      type="text"
                      value={businessSettings.backgroundColor}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({
                          ...prev,
                          backgroundColor: e.target.value,
                        }))
                      }
                      className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg font-mono"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Margin Section */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">Margin</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="margin" className="text-xs sm:text-sm font-medium text-gray-700">
                  Margin (modules)
                </Label>
                <span className="text-xs sm:text-sm font-semibold text-blue-600">{businessSettings.margin}px</span>
              </div>
              <input
                id="margin"
                type="range"
                min="0"
                max="10"
                value={businessSettings.margin}
                onChange={(e) =>
                  setBusinessSettings((prev) => ({
                    ...prev,
                    margin: parseInt(e.target.value) || 4,
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}