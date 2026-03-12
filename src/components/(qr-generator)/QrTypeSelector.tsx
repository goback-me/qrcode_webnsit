"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  Wifi,
  Contact,
  FileText,
  Mail,
  Phone,
} from "lucide-react";

export type QRDataType =
  | "url"
  | "wifi"
  | "vcard"
  | "text"
  | "email"
  | "phone";

interface QrTypeSelectorProps {
  value: QRDataType;
  onChange: (type: QRDataType) => void;
}

const typeOptions: {
  value: QRDataType;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "url",
    label: "Website URL",
    description: "Open any webpage instantly",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    value: "wifi",
    label: "WiFi Password",
    description: "Connect to WiFi network quickly",
    icon: <Wifi className="h-4 w-4" />,
  },
  {
    value: "vcard",
    label: "vCard",
    description: "Share contact details",
    icon: <Contact className="h-4 w-4" />,
  },
  {
    value: "text",
    label: "Plain Text",
    description: "Display custom text or notes",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    value: "email",
    label: "Email",
    description: "Open email compose screen",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    value: "phone",
    label: "Phone Number",
    description: "Dial a phone number",
    icon: <Phone className="h-4 w-4" />,
  },
];

export default function QrTypeSelector({
  value,
  onChange,
}: QrTypeSelectorProps) {
  const selectedOption = typeOptions.find((option) => option.value === value);

  return (
    <div className="rounded-[16px] border-0 bg-transparent p-0 sm:rounded-[20px] sm:border sm:border-slate-200 sm:bg-slate-50/90 sm:p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Label className="text-sm font-medium text-slate-700">Type</Label>
        <span className="sm:hidden rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {selectedOption?.label}
        </span>
      </div>

      <div className="sm:hidden space-y-1">
        <Select value={value} onValueChange={(newValue) => onChange(newValue as QRDataType)}>
          <SelectTrigger className="h-11 rounded-xl border-slate-300 bg-white text-left text-sm">
            <SelectValue placeholder="Select QR type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {typeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden grid-cols-2 gap-2 sm:grid lg:grid-cols-3 xl:grid-cols-6">
        {typeOptions.map((option) => {
          const isActive = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isActive}
              className={[
                "min-h-[58px] rounded-2xl border px-3 py-2.5 text-left transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                isActive
                  ? "border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-100"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40",
              ].join(" ")}
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                <span className={[
                  "inline-flex h-8 w-8 items-center justify-center rounded-xl border transition-colors",
                  isActive
                    ? "border-blue-200 bg-white text-blue-600"
                    : "border-slate-200 bg-slate-50 text-slate-500",
                ].join(" ")}>
                  {option.icon}
                </span>
                <span className="leading-tight">{option.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
