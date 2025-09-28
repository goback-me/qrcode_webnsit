"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function QrUrlInput({
  onChange,
}: {
  onChange: (val: string) => void;
}) {
  return (
    <div className="text-left space-y-2">
      <Label htmlFor="url" className="text-lg font-medium">
        Step 1: Enter your URL
      </Label>
      <Input
        id="url"
        placeholder="https://example.com"
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
