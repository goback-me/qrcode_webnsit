"use client";

import { Input } from "@/components/ui/input";

export default function QrUrlInput({
  onChange,
}: {
  onChange: (val: string) => void;
}) {
  return (
    <div className="text-left space-y-2">
      <Input
        id="url"
        placeholder="https://example.com"
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}