"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QrWiFiInputProps {
  data: {
    ssid: string;
    password: string;
    security: "WPA" | "WEP" | "nopass";
  };
  onChange: (data: QrWiFiInputProps["data"]) => void;
  errors?: {
    ssid?: string;
    password?: string;
  };
}

export default function QrWiFiInput({ data, onChange, errors }: QrWiFiInputProps) {
  const handleSsidChange = (value: string) => {
    onChange({ ...data, ssid: value });
  };

  const handlePasswordChange = (value: string) => {
    onChange({ ...data, password: value });
  };

  const handleSecurityChange = (value: string) => {
    onChange({
      ...data,
      security: value as "WPA" | "WEP" | "nopass",
    });
  };

  return (
    <div className="text-left space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ssid">Network Name (SSID)</Label>
        <Input
          id="ssid"
          placeholder="Your WiFi network name"
          value={data.ssid}
          onChange={(e) => handleSsidChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        {errors?.ssid ? <p className="text-xs font-medium text-red-600">{errors.ssid}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="WiFi password"
          value={data.password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        {errors?.password ? <p className="text-xs font-medium text-red-600">{errors.password}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="security">Security Type</Label>
        <select
          id="security"
          value={data.security}
          onChange={(e) => handleSecurityChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Open Network</option>
        </select>
      </div>
    </div>
  );
}
