import React, { useState, useRef } from "react";
import { FaCloudUploadAlt, FaTimes, FaCamera } from "react-icons/fa";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

const ImageDropzone = ({ value, onChange, label = "Upload Photo", placeholder = "Drop an image here or click to browse" }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(
    typeof value === "string" && value.startsWith("http") ? value : null
  );
  const inputRef = useRef(null);

  const handleFiles = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-ink-2">{label}</label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-card p-5 transition-all text-center cursor-pointer flex flex-col items-center justify-center min-h-[140px] ${
          dragActive
            ? "border-accent bg-accent/10"
            : "border-rule bg-paper-2 hover:bg-paper-3 hover:border-rule/80"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFiles(e.target.files[0]);
            }
          }}
        />

        {preview ? (
          <div className="relative group w-full flex items-center justify-center">
            <img
              src={preview}
              alt="Uploaded Preview"
              className="max-h-48 rounded-stock object-cover ring-2 ring-rule shadow-sm"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-ink/75 hover:bg-ink text-white text-xs transition-colors shadow-sm"
              title="Remove image"
            >
              <FaTimes />
            </button>
            <div className="absolute bottom-2 bg-ink/80 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-pill backdrop-blur-xs flex items-center gap-1">
              <FaCamera className="text-[10px]" />
              <span>Click or drop new photo to replace</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 py-2">
            <div className="w-10 h-10 rounded-full bg-paper border border-rule mx-auto flex items-center justify-center text-accent text-lg">
              <FaCloudUploadAlt />
            </div>
            <div>
              <p className="text-xs font-semibold text-ink">{placeholder}</p>
              <p className="text-[11px] text-muted mt-0.5">
                PNG, JPG, WEBP up to 5MB (auto-compressed)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDropzone;
