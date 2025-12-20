"use client";

import { Card } from "@/components/ui/card";

export default function QrPreview({ qrDataUrl }: { qrDataUrl: string }) {
  return (
    <Card className="p-6 bg-gray-50 shadow-md rounded-lg mb-10 w-full">
      {qrDataUrl ? (
        <img
          src={qrDataUrl}
          alt="Generated QR"
          className="w-64 h-64 object-contain mx-auto"
        />
      ) : (
        <p className="text-gray-500">Your QR Code will appear here</p>
      )}
    </Card>
  );
}
