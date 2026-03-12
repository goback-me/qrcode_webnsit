"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QrTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QrTextInput({ value, onChange }: QrTextInputProps) {
  return (
    <div className="text-left space-y-2">
      <Label htmlFor="text">Plain Text</Label>
      <Textarea
        id="text"
        placeholder="Enter your text here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 min-h-32"
      />
      <p className="text-xs text-gray-500">
        {value.length} characters
      </p>
    </div>
  );
}
