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
          border-2 border-dashed rounded-xl p-12 sm:p-16 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 bg-white'
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed hover:border-gray-300' 
            : ''
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className={`transition-transform duration-200 ${isDragActive ? 'scale-110' : 'scale-100'}`}>
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          
          {isDragActive ? (
            <p className="text-lg font-semibold text-blue-600">
              Drop your files here
            </p>
          ) : (
            <>
              <div>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-600">
                  PDF, DOCX, PNG, JPG, JPEG, GIF
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Select Files
              </div>
              <p className="text-xs text-gray-500">
                Max 100 MB per file • Multiple files supported
              </p>
            </>
          )}
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate text-sm">{file.name}</p>
                <p className="text-xs text-gray-600">{file.size}</p>
              </div>
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
