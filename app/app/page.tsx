'use client';

import { useState } from 'react';
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
  const brandImageUrl = '/logo.png'; // Add your brand logo here
  
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
      {/* Initial loading screen */}
      {state.showLoading && (
        <LoadingScreen 
          onLoadingComplete={() => setState({ ...state, showLoading: false })} 
          brandImage={brandImageUrl}
        />
      )}

      {/* Main application */}
      <main className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FileShare</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Share files instantly with QR codes</p>
                </div>
              </a>
              {state.uploadedFiles.length > 0 && (
                <button
                  onClick={handleClearAndStartOver}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Start Over
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
          {state.uploadStatus === 'success' && state.uploadedFiles.length > 0 ? (
            // Success view
            <div className="space-y-6">
              {/* Success message */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {state.uploadedFiles.length === 1 ? 'File Uploaded!' : `${state.uploadedFiles.length} Files Uploaded!`}
                </h2>
                <p className="text-gray-600">Your {state.uploadedFiles.length === 1 ? 'file is' : 'files are'} ready to share. Links expire in 60 minutes.</p>
              </div>

              {/* Files display */}
              {state.uploadedFiles.length === 1 ? (
                <ResultsDisplay
                  downloadUrl={state.uploadedFiles[0].downloadUrl}
                  fileName={state.uploadedFiles[0].fileName}
                  isMultiple={false}
                />
              ) : (
                <MultipleFilesShare files={state.uploadedFiles} />
              )}

              {/* Action button */}
              <div className="text-center pt-4">
                <button
                  onClick={handleAddMoreFiles}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload More Files
                </button>
              </div>
            </div>
          ) : (
            // Upload view
            <div className="space-y-6">
              {/* Instructions */}
              {state.uploadStatus === 'idle' && state.uploadedFiles.length === 0 && (
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Share Files Instantly
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Upload your files and get a QR code to share. No sign-up required.
                  </p>
                </div>
              )}

              {/* Pending files indicator */}
              {state.uploadedFiles.length > 0 && state.uploadStatus === 'idle' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">{state.uploadedFiles.length}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {state.uploadedFiles.length} file{state.uploadedFiles.length > 1 ? 's' : ''} ready
                        </p>
                        <p className="text-sm text-gray-600">Add more or view your files</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setState(prev => ({ ...prev, uploadStatus: 'success' }))}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Files
                    </button>
                  </div>
                </div>
              )}

              {/* Upload zone */}
              <UploadZone 
                onFileSelected={handleFileSelected}
                disabled={state.uploadStatus === 'uploading'}
              />

              {/* Uploading status */}
              {state.uploadStatus === 'uploading' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">Uploading...</p>
                  {state.currentlyUploading && (
                    <p className="text-sm text-gray-600 mb-4">{state.currentlyUploading}</p>
                  )}
                  <div className="max-w-xs mx-auto">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${state.uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{Math.round(state.uploadProgress)}%</p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {state.uploadStatus === 'error' && state.errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-900 mb-1">Upload Failed</h3>
                      <p className="text-sm text-red-700 mb-3">{state.errorMessage}</p>
                      <button
                        onClick={() => setState({ ...state, uploadStatus: 'idle', errorMessage: null, uploadProgress: 0 })}
                        className="text-sm font-medium text-red-600 hover:text-red-700 underline"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              {state.uploadStatus === 'idle' && state.uploadedFiles.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Secure</h3>
                    <p className="text-sm text-gray-600">Files are encrypted and auto-delete after 60 minutes</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Fast</h3>
                    <p className="text-sm text-gray-600">Instant upload and QR code generation</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Simple</h3>
                    <p className="text-sm text-gray-600">Scan QR code to download on any device</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
