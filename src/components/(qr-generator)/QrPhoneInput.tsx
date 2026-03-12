"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QrPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function QrPhoneInput({ value, onChange, error }: QrPhoneInputProps) {
  return (
    <div className="text-left space-y-2">
      <Label htmlFor="phone">Phone Number *</Label>
      <Input
        id="phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
      <p className="text-xs text-gray-500">
        Format: +1 (555) 123-4567 or any valid phone number
      </p>
    </div>
  );
}
