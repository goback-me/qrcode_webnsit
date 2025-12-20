"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function QrCornerStyle({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="text-left space-y-2 w-full">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-lg shadow-sm">
          <SelectValue placeholder="Select style" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="square">Square</SelectItem>
          <SelectItem value="circle">Circle</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
