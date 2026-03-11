'use client';

import { useState } from 'react';
import Image from 'next/image';
import UploadZone from '@/components/UploadZone';
import ResultsDisplay from '@/components/ResultsDisplay';
import MultipleFilesShare from '@/components/MultipleFilesShare';
import LoadingScreen from '@/components/LoadingScreen';
import Footer from '@/components/Footer';
import { uploadToTmpFiles, UploadError, validateFileSize, isOnline } from '@/lib/api';

/**
 * Application state interface
 * Manages the complete upload and display flow
 */
interface UploadedFile {
  fileName: string;
  fileSize: number;
  downloadUrl: string;
}

interface AppState {
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  uploadedFiles: UploadedFile[];
  errorMessage: string | null;
  showLoading: boolean;
  uploadProgress: number;
  currentlyUploading: string | null;
}

/**
 * Supported file types for validation
 */
const SUPPORTED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif']
};

/**
 * Main application component
 * 
 * Requirements:
 * - 2.1: Transmits file to Storage_API
 * - 2.2: Receives Download_URL from Storage_API
 * - 2.4: Displays error messages from Storage_API
 * - 5.2: Displays Upload_Component in center before upload
 * - 5.3: Displays results after successful upload
 * - 5.4: Uses single-page layout
 */
export default function Home() {
  // You can add your trainer's image URL here
  const trainerImageUrl = '/manoj-sir.png'; // Add image URL like: '/manoj-sir.jpg' or 'https://...'
  
  const [state, setState] = useState<AppState>({
    uploadStatus: 'idle',
    uploadedFiles: [],
    errorMessage: null,
    showLoading: true,
    uploadProgress: 0,
    currentlyUploading: null
  });

  /**
   * Validates file type against supported types
   * Requirement 7.1: Display error for unsupported file types with list
   */
  const validateFileType = (file: File): boolean => {
    const supportedMimeTypes = Object.keys(SUPPORTED_TYPES);
    return supportedMimeTypes.includes(file.type);
  };

  /**
   * Handles file selection and initiates upload
   * Supports multiple files
   */
  const handleFileSelected = async (files: File[]) => {
    // Check if online
    if (!isOnline()) {
      setState({
        ...state,
        uploadStatus: 'error',
        errorMessage: 'No internet connection. Please check your connection and try again.',
        uploadProgress: 0
      });
      return;
    }

    // Validate all files first
    for (const file of files) {
      // Validate file type
      if (!validateFileType(file)) {
        setState({
          ...state,
          uploadStatus: 'error',
          errorMessage: `"${file.name}" is not supported. Please upload only: PDF, DOCX, PNG, JPG, JPEG, or GIF.`,
          uploadProgress: 0
        });
        return;
      }

      // Validate file size
      if (!validateFileSize(file)) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        setState({
          ...state,
          uploadStatus: 'error',
          errorMessage: `"${file.name}" is too large (${fileSizeMB} MB). Maximum file size is 100 MB.`,
          uploadProgress: 0
        });
        return;
      }
    }

    // Upload files one by one
    const uploadedFiles: UploadedFile[] = [...state.uploadedFiles];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      setState(prev => ({
        ...prev,
        uploadStatus: 'uploading',
        currentlyUploading: file.name,
        errorMessage: null,
        uploadProgress: 0
      }));

      try {
        const url = await uploadToTmpFiles(file, (progress) => {
          setState(prev => ({ ...prev, uploadProgress: progress }));
        });
        
        uploadedFiles.push({
          fileName: file.name,
          fileSize: file.size,
          downloadUrl: url
        });
      } catch (error) {
        handleUploadError(error, file.name);
        return;
      }
    }

    // All files uploaded successfully
    setState({
      uploadStatus: 'success',
      uploadedFiles,
      errorMessage: null,
      showLoading: false,
      uploadProgress: 100,
      currentlyUploading: null
    });
  };

  /**
   * Handles upload errors
   */
  const handleUploadError = (error: unknown, fileName?: string) => {
    let errorMessage = 'Something unexpected happened. Please try again.';

    if (error instanceof UploadError) {
      errorMessage = error.userMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (fileName) {
      errorMessage = `Failed to upload "${fileName}": ${errorMessage}`;
    }

    setState(prev => ({
      ...prev,
      uploadStatus: 'error',
      errorMessage,
      uploadProgress: 0,
      currentlyUploading: null
    }));
  };

  /**
   * Reset to upload more files (clear all)
   */
  const handleClearAndStartOver = () => {
    setState({
      uploadStatus: 'idle',
      uploadedFiles: [],
      errorMessage: null,
      showLoading: false,
      uploadProgress: 0,
      currentlyUploading: null
    });
  };

  /**
   * Add more files to existing list
   */
  const handleAddMoreFiles = () => {
    setState(prev => ({
      ...prev,
      uploadStatus: 'idle',
      errorMessage: null,
      uploadProgress: 0,
      currentlyUploading: null
    }));
  };

  return (
    <>
      {/* Initial loading screen with thank you message */}
      {state.showLoading && (
        <LoadingScreen 
          onLoadingComplete={() => setState({ ...state, showLoading: false })} 
          trainerImage={trainerImageUrl}
        />
      )}

      {/* Main application */}
      <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Header with trainer branding */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mb-4 shadow-lg overflow-hidden border-2 border-gray-600">
            {trainerImageUrl ? (
              <Image 
                src={trainerImageUrl} 
                alt="Manoj Sir" 
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <span className="text-3xl sm:text-4xl">📚</span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
             File Sharing Platform
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto px-4">
            Upload File → Generate QR Code → Share Instantly
          </p>
        </div>

        {/* Conditional rendering based on upload status */}
        {state.uploadStatus === 'success' && state.uploadedFiles.length > 0 ? (
          // Display results after successful upload
          <div className="animate-fade-in w-full max-w-6xl px-4">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-3">
                {state.uploadedFiles.length === 1 ? 'File Ready to Share' : `${state.uploadedFiles.length} Files Ready to Share`}
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mb-2">⏰ Links will work for 60 minutes</p>
              <p className="text-xs text-gray-500">Each file has its own simple QR code</p>
            </div>

            {/* Grid layout for files - each with its own QR code OR single QR for multiple */}
            {state.uploadedFiles.length === 1 ? (
              // Single file - direct QR code
              <div className="max-w-2xl mx-auto">
                <ResultsDisplay
                  downloadUrl={state.uploadedFiles[0].downloadUrl}
                  fileName={state.uploadedFiles[0].fileName}
                  isMultiple={false}
                />
              </div>
            ) : (
              // Multiple files - create gist and show single QR
              <MultipleFilesShare files={state.uploadedFiles} />
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={handleAddMoreFiles}
                className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 active:bg-gray-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base border border-gray-500"
              >
                ➕ Add More Files
              </button>
              <button
                onClick={handleClearAndStartOver}
                className="px-8 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base border border-gray-600"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>
        ) : (
          // Display upload zone before/during upload
          <div className="animate-fade-in w-full max-w-2xl">
            {/* Show current files count if any */}
            {state.uploadedFiles.length > 0 && state.uploadStatus === 'idle' && (
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-3 bg-gray-800 px-5 py-3 rounded-lg border border-gray-600">
                  <span className="text-gray-300 text-sm font-medium">
                    📁 {state.uploadedFiles.length} file{state.uploadedFiles.length > 1 ? 's' : ''} uploaded
                  </span>
                  <button
                    onClick={() => setState(prev => ({ ...prev, uploadStatus: 'success' }))}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded border border-gray-500 transition-colors"
                  >
                    View Files
                  </button>
                  <button
                    onClick={handleClearAndStartOver}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Clear All
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Add more files below or view your uploaded files</p>
              </div>
            )}

            <UploadZone 
              onFileSelected={handleFileSelected}
              disabled={state.uploadStatus === 'uploading'}
            />

            {/* Display uploading status */}
            {state.uploadStatus === 'uploading' && (
              <div className="mt-6 text-center animate-fade-in">
                <div className="relative inline-block">
                  {/* Outer spinning ring */}
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-gray-300"></div>
                  {/* Inner pulsing circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 bg-gray-400 rounded-full animate-pulse opacity-50"></div>
                  </div>
                </div>
                <p className="mt-4 text-gray-200 font-semibold text-lg">Uploading...</p>
                {state.currentlyUploading && (
                  <p className="mt-1 text-gray-400 text-sm">{state.currentlyUploading}</p>
                )}
                
                {/* Progress bar */}
                <div className="mt-4 w-full max-w-md mx-auto">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                    <div 
                      className="h-full bg-gradient-to-r from-gray-500 to-gray-300 transition-all duration-300 ease-out"
                      style={{ width: `${state.uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">{Math.round(state.uploadProgress)}%</p>
                </div>
              </div>
            )}

            {/* Display error message (Requirement 2.4, 7) */}
            {state.uploadStatus === 'error' && state.errorMessage && (
              <div className="mt-6 max-w-2xl w-full px-4 animate-fade-in">
                <div className="bg-gray-800 border-2 border-red-500 rounded-lg p-4 sm:p-6 shadow-sm">
                  <div className="flex items-start">
                    <div className="text-2xl sm:text-3xl mr-3 flex-shrink-0">⚠️</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-red-400 mb-2 text-base sm:text-lg">Upload Failed</h3>
                      <p className="text-red-300 text-sm sm:text-base break-words">{state.errorMessage}</p>
                      <button
                        onClick={() => setState({ ...state, uploadStatus: 'idle', errorMessage: null, uploadProgress: 0 })}
                        className="mt-4 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-gray-700 active:bg-gray-600 rounded-md transition-all duration-200 hover:shadow-sm border border-red-500"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer with dedication */}
        <Footer />
      </main>
    </>
  );
}
