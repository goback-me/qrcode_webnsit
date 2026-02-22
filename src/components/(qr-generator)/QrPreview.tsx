"use client";

import { Card } from "@/components/ui/card";

export default function QrPreview({ qrDataUrl }: { qrDataUrl: string }) {
  return (
    <Card className="p-4 md:p-6 bg-gray-50 shadow-md rounded-lg mb-10 w-full">
      {qrDataUrl ? (
        <img
          src={qrDataUrl}
          alt="Generated QR"
          className="w-40 h-40 sm:w-56 h-56 md:w-64 md:h-64 object-contain mx-auto transition-all duration-200"
        />
      ) : (
        <p className="text-sm sm:text-base text-gray-500">Your QR Code will appear here</p>
      )}
    </Card>
  );
}
