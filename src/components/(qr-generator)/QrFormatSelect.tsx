"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function QrFormatSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="text-left space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-lg shadow-sm">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="png">PNG</SelectItem>
          <SelectItem value="svg">SVG</SelectItem>
          <SelectItem value="jpeg">JPEG</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
