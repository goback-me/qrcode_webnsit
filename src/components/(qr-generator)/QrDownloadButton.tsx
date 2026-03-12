"use client";

interface QrDownloadButtonProps {
  qrDataUrl: string;
  format: string;
}

export default function QrDownloadButton({ qrDataUrl, format }: QrDownloadButtonProps) {
  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `qrcode.${format}`;
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!qrDataUrl}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
    >
      {qrDataUrl ? "Download QR" : "Generate to download"}
    </button>
  );
}
