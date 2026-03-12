"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QrVCardInputProps {
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    organization: string;
    url: string;
  };
  onChange: (data: QrVCardInputProps["data"]) => void;
  errors?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    url?: string;
  };
}

export default function QrVCardInput({ data, onChange, errors }: QrVCardInputProps) {
  const handleChange = (field: keyof QrVCardInputProps["data"], value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="text-left space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          {errors?.firstName ? <p className="text-xs font-medium text-red-600">{errors.firstName}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          {errors?.lastName ? <p className="text-xs font-medium text-red-600">{errors.lastName}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={data.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        {errors?.phone ? <p className="text-xs font-medium text-red-600">{errors.phone}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        {errors?.email ? <p className="text-xs font-medium text-red-600">{errors.email}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          placeholder="Your Company"
          value={data.organization}
          onChange={(e) => handleChange("organization", e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Website URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={data.url}
          onChange={(e) => handleChange("url", e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        {errors?.url ? <p className="text-xs font-medium text-red-600">{errors.url}</p> : null}
      </div>
    </div>
  );
}
