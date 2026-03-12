'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

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
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-16 sm:p-20 text-center cursor-pointer
          transition-all duration-300
          ${isDragActive 
            ? 'border-blue-600 bg-blue-50 scale-[1.02]' 
            : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50 bg-white'
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed hover:border-gray-200 hover:bg-white' 
            : ''
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-6">
          <div className={`transition-all duration-300 ${isDragActive ? 'scale-110' : 'scale-100'}`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          
          {isDragActive ? (
            <div>
              <p className="text-2xl font-bold text-blue-600 mb-2">
                Drop your files here
              </p>
              <p className="text-gray-600">Release to upload</p>
            </div>
          ) : (
            <>
              <div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Drop or pick a file
                </button>
              </div>
              <p className="text-sm text-gray-500">
                100 MB max file size. Will be available for 60 minutes.
              </p>
            </>
          )}
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6 space-y-3 animate-fade-in">
          <p className="text-sm font-semibold text-gray-700 px-1">Selected files:</p>
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{file.name}</p>
                <p className="text-sm text-gray-500">{file.size}</p>
              </div>
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
