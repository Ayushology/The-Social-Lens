import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, X, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MediaUploadZone = ({ onUpload, isLoading }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Basic validation
    if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
      alert('Please upload an image or video file.');
      return;
    }

    setFile(selectedFile);
    
    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div 
        className={cn(
          "relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 ease-out overflow-hidden group bg-zinc-900/50",
          isDragActive 
            ? "border-amber-500 bg-amber-500/5" 
            : "border-zinc-700 hover:border-amber-500/30 hover:bg-zinc-800/80",
          preview ? "p-4 border-solid" : "p-12",
          isLoading ? "opacity-70 pointer-events-none" : ""
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef}
          type="file" 
          accept="image/*,video/*" 
          onChange={handleChange} 
          className="hidden" 
          id="file-upload"
        />
        
        {!preview ? (
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-amber-900/40 group-hover:text-amber-400 transition-colors duration-300 text-zinc-400 shadow-inner">
              <UploadCloud size={32} />
            </div>
            <h3 className="text-xl font-medium text-zinc-200 mb-2">Drop your media here</h3>
            <p className="text-sm text-zinc-500 max-w-sm mb-6">
              Supports JPG, PNG, MP4. High-resolution images are recommended for best caption results.
            </p>
            <span className="px-6 py-2.5 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700 hover:border-zinc-600">
              Browse Files
            </span>
          </label>
        ) : (
          <div className="relative w-full rounded-xl overflow-hidden glass-panel border-zinc-700/50 flex flex-col md:flex-row gap-6 p-4">
            <div className="relative w-full md:w-1/2 aspect-video bg-zinc-950 rounded-lg overflow-hidden flex items-center justify-center border border-zinc-800">
              {file?.type.startsWith('video/') ? (
                <video src={preview} controls className="w-full h-full object-contain" />
              ) : (
                <img src={preview} alt="Preview" className="w-full h-full object-contain" />
              )}
            </div>
            <div className="flex flex-col flex-1 justify-center py-4">
              <div className="flex items-center gap-3 mb-2">
                <FileImage className="text-amber-400" size={24} />
                <h4 className="text-lg font-medium text-zinc-200 truncate pr-8">{file?.name}</h4>
              </div>
              <p className="text-sm text-zinc-500 mb-8">
                {(file?.size / (1024 * 1024)).toFixed(2)} MB • {file?.type}
              </p>
              
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={handleClear}
                  disabled={isLoading}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  Clear
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors shadow-lg shadow-amber-900/50 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Generate Caption'
                  )}
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleClear}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUploadZone;
