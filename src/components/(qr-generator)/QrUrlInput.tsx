"use client";

import { Input } from "@/components/ui/input";

export default function QrUrlInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  return (
    <div className="text-left space-y-2">
      <Input
        id="url"
        placeholder="https://example.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}