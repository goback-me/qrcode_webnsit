"use client";

import { Upload, Image, X } from "lucide-react";
import { useRef, useState } from "react";

export default function QrLogoUploader({
  onUpload,
}: {
  onUpload: (file: File | null) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    onUpload(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      return;
    }

    setPreviewUrl(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];

    if (file?.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0] || null);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    onUpload(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFilePicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-slate-900">Logo</h2>

      <div
        className={[
          "relative rounded-[18px] border border-dashed p-3 transition-all duration-200 sm:p-4",
          dragOver
            ? "border-blue-400 bg-blue-50"
            : selectedFile
              ? "border-emerald-300 bg-emerald-50"
              : "border-slate-300 bg-slate-50 hover:border-slate-400",
          !selectedFile ? "cursor-pointer" : "",
        ].join(" ")}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!selectedFile ? openFilePicker : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          aria-label="Upload logo image"
        />

        {selectedFile && previewUrl ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <img
                src={previewUrl}
                alt="Logo preview"
                className="h-full w-full rounded-xl object-contain"
              />
              <button
                onClick={handleRemoveFile}
                className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                aria-label="Remove logo"
              >
                <X size={12} />
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">
                {selectedFile.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  Uploaded
                </span>
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Upload size={14} />
                  Change file
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
            <div
              className={[
                "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                dragOver ? "bg-blue-100 text-blue-600" : "bg-white text-slate-400",
              ].join(" ")}
            >
              {dragOver ? <Upload size={20} /> : <Image size={20} />}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={[
                  "text-sm font-medium transition-colors",
                  dragOver ? "text-blue-600" : "text-slate-700",
                ].join(" ")}
              >
                {dragOver ? "Drop logo here" : "Upload logo"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                PNG, JPG, GIF
              </p>
            </div>

            <button
              type="button"
              onClick={openFilePicker}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Upload size={15} />
              Choose file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}