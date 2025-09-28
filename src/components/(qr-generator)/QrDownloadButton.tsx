"use client";

interface QrDownloadButtonProps {
  qrDataUrl: string;
  format: string;
}

export default function QrDownloadButton({ qrDataUrl, format }: QrDownloadButtonProps) {
  if (!qrDataUrl) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `qrcode.${format}`;
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-green-600 text-white rounded w-full"
    >
      Download QR
    </button>
  );
}
