'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  disabled: boolean;
}

const SUPPORTED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif']
};

const ACCEPTED_EXTENSIONS = Object.values(SUPPORTED_TYPES).flat();

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default function UploadZone({ onFileSelected, disabled }: UploadZoneProps) {
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile({
        name: file.name,
        size: formatFileSize(file.size)
      });
      onFileSelected(file);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: SUPPORTED_TYPES,
    multiple: false,
    disabled
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragActive 
            ? 'border-indigo-500 bg-indigo-50 scale-[1.02] shadow-lg' 
            : 'border-purple-300 hover:border-indigo-400 hover:shadow-md bg-white'
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed bg-gray-100 hover:border-purple-300 hover:shadow-none scale-100' 
            : ''
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-3 sm:space-y-4">
          <div className={`text-5xl sm:text-6xl transition-transform duration-300 ${isDragActive ? 'scale-110' : 'scale-100'}`}>
            📁
          </div>
          
          {isDragActive ? (
            <p className="text-base sm:text-lg font-semibold text-indigo-600 transition-all duration-200">
              Drop your file here
            </p>
          ) : (
            <>
              <p className="text-base sm:text-lg font-semibold text-gray-700 transition-all duration-200">
                Drag & drop a file here, or click to browse
              </p>
              <p className="text-xs sm:text-sm text-gray-500 px-2 transition-all duration-200">
                Supported formats: PDF, DOCX, PNG, JPG, JPEG, GIF
              </p>
            </>
          )}
        </div>
      </div>

      {selectedFile && (
        <div className="mt-4 p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="text-2xl flex-shrink-0">📄</div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{selectedFile.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">{selectedFile.size}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
