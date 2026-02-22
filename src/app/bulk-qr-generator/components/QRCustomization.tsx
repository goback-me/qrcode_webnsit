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
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Palette className="w-5 h-5" />
        Business Branding & Customization
      </h3>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">
            QR Code Settings
          </Label>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size" className="text-sm mb-2 block">
                  Size (pixels)
                </Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
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
                <Label htmlFor="format" className="text-sm mb-2 block">
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

            <div>
              <Label className="text-sm mb-2 block">
                Error Correction Level
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
                <SelectTrigger>
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

        <div>
          <Label className="text-sm font-medium mb-3 block">Colors</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fg-color" className="text-sm mb-2 block">
                Foreground
              </Label>
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
                className="h-10"
              />
            </div>
            <div>
              <Label htmlFor="bg-color" className="text-sm mb-2 block">
                Background
              </Label>
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
                className="h-10"
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="margin" className="text-sm mb-2 block">
            Margin (modules)
          </Label>
          <Input
            id="margin"
            type="number"
            min="0"
            max="10"
            value={businessSettings.margin}
            onChange={(e) =>
              setBusinessSettings((prev) => ({
                ...prev,
                margin: parseInt(e.target.value) || 4,
              }))
            }
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
}