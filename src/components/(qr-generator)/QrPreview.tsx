"use client";

export default function QrPreview({ qrDataUrl }: { qrDataUrl: string }) {
  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
      {qrDataUrl ? (
        <img
          src={qrDataUrl}
          alt="Generated QR"
          className="h-40 w-40 object-contain sm:h-48 sm:w-48 md:h-56 md:w-56"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-[18px] border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
          <p className="max-w-[14rem] text-sm leading-relaxed text-slate-500">
            Your QR code preview will appear here after you generate it.
          </p>
        </div>
      )}
    </div>
  );
}
