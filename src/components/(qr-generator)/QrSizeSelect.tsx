"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function QrSizeSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="text-left space-y-2">
      <Input
        id="size"
        type="number"
        min={100}
        max={1000}
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
