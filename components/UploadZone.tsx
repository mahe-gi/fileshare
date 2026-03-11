'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { validateFileSize, MAX_FILE_SIZE } from '@/lib/api';

interface UploadZoneProps {
  onFileSelected: (files: File[]) => void;
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
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; size: string }[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const fileInfos = acceptedFiles.map(file => ({
        name: file.name,
        size: formatFileSize(file.size)
      }));
      setSelectedFiles(fileInfos);
      onFileSelected(acceptedFiles);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: SUPPORTED_TYPES,
    multiple: true,
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
            ? 'border-gray-400 bg-gray-800 scale-[1.02] shadow-lg' 
            : 'border-gray-600 hover:border-gray-400 hover:shadow-md bg-gray-900'
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed bg-gray-800 hover:border-gray-600 hover:shadow-none scale-100' 
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
            <p className="text-base sm:text-lg font-semibold text-gray-200 transition-all duration-200">
              Drop your files here
            </p>
          ) : (
            <>
              <p className="text-base sm:text-lg font-semibold text-gray-200 transition-all duration-200">
                Drag & drop files here, or click to browse
              </p>
              <p className="text-xs sm:text-sm text-gray-400 px-2 transition-all duration-200">
                Supported formats: PDF, DOCX, PNG, JPG, JPEG, GIF
              </p>
              <p className="text-xs text-gray-500 px-2 mt-1">
                Max file size: 100 MB • Multiple files supported
              </p>
            </>
          )}
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="p-3 bg-gray-800 rounded-lg border-2 border-gray-600 shadow-sm animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="text-xl flex-shrink-0">📄</div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-200 truncate text-sm">{file.name}</p>
                  <p className="text-xs text-gray-400">{file.size}</p>
                </div>
              </div>
            </div>
          ))}
          {selectedFiles.length > 1 && (
            <p className="text-xs text-gray-400 text-center mt-2">
              {selectedFiles.length} files selected
            </p>
          )}
        </div>
      )}
    </div>
  );
}
