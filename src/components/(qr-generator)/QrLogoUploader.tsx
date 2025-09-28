"use client";

import { Label } from "@/components/ui/label";
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
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleRemoveFile = () => {
    handleFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900">
            Step 2: Upload Logo
          </h2>
          <p className="text-sm text-gray-600">
            Add your logo to customize your QR code (optional)
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`
            relative rounded-lg border-2 border-dashed transition-all duration-200 ${!selectedFile ? 'cursor-pointer' : ''}
            ${dragOver 
              ? 'border-blue-400 bg-blue-50' 
              : selectedFile 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={selectedFile ? undefined : handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            aria-label="Upload logo image"
          />
          
          <div className="p-8">
            {selectedFile && previewUrl ? (
              /* Preview State */
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Logo preview"
                    className="w-20 h-20 object-contain rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label="Remove logo"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                  <p className="text-xs text-green-600 mt-1">✓ Logo uploaded successfully</p>
                </div>
              </div>
            ) : (
              /* Upload State */
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-colors
                  ${dragOver ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}
                `}>
                  {dragOver ? <Upload size={24} /> : <Image size={24} />}
                </div>
                
                <div className="space-y-2">
                  <p className={`font-medium transition-colors ${
                    dragOver ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {dragOver ? 'Drop your logo here' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={handleClick}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Upload size={16} className="mr-2" />
                  Choose File
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="flex items-start space-x-2 text-xs text-gray-500">
          <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-600 font-bold text-[10px]">i</span>
          </div>
          <p>
            Your logo will be placed in the center of the QR code. For best results, use a square image with transparent background.
          </p>
        </div>
      </div>
    </div>
  );
}