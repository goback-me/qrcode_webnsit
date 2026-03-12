"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QrEmailInputProps {
  data: {
    email: string;
    subject: string;
    body: string;
  };
  onChange: (data: QrEmailInputProps["data"]) => void;
  error?: string;
}

export default function QrEmailInput({ data, onChange, error }: QrEmailInputProps) {
  const handleChange = (field: keyof QrEmailInputProps["data"], value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="text-left space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="recipient@example.com"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Email subject (optional)"
          value={data.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Message</Label>
        <Textarea
          id="body"
          placeholder="Email body (optional)"
          value={data.body}
          onChange={(e) => handleChange("body", e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 min-h-24"
        />
      </div>
    </div>
  );
}
