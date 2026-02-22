"use client";

import { Upload, Image, X } from "lucide-react";
import { useState, useRef } from "react";

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
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
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
    if (file?.type.startsWith("image/")) handleFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0] || null);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    onUpload(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openFilePicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Step 2: Upload Logo
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Add your logo to customize your QR code (optional)
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`
            relative rounded-lg border-2 border-dashed transition-all duration-200
            ${dragOver
              ? "border-blue-400 bg-blue-50"
              : selectedFile
              ? "border-green-300 bg-green-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 cursor-pointer"
            }
          `}
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

          <div className="p-5 sm:p-8">
            {selectedFile && previewUrl ? (
              /* Preview State */
              <div className="flex flex-row sm:flex-col items-center gap-4 sm:space-y-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={previewUrl}
                    alt="Logo preview"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg border border-gray-200 bg-white"
                  />
                  <button
                    onClick={handleRemoveFile}
                    className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label="Remove logo"
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="flex-1 sm:text-center min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                  <p className="text-xs text-green-600 mt-1">✓ Uploaded successfully</p>
                  <button
                    onClick={openFilePicker}
                    className="mt-2 text-xs text-blue-500 hover:text-blue-700 underline"
                  >
                    Change file
                  </button>
                </div>
              </div>
            ) : (
              /* Upload State */
              <div className="flex flex-col items-center space-y-3 text-center">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${
                    dragOver
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {dragOver ? <Upload size={20} /> : <Image size={20} />}
                </div>

                <div className="space-y-1">
                  <p className={`text-sm font-medium transition-colors ${
                    dragOver ? "text-blue-600" : "text-gray-700"
                  }`}>
                    {dragOver ? "Drop your logo here" : "Click to upload or drag & drop"}
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>

                <button
                  type="button"
                  onClick={openFilePicker}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <Upload size={15} />
                  Choose File
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="flex items-start gap-2 text-xs text-gray-400">
          <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-600 font-bold text-[10px]">i</span>
          </div>
          <p>For best results, use a square image with a transparent background.</p>
        </div>
      </div>
    </div>
  );
}