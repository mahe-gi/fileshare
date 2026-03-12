'use client';

import { useState } from 'react';
import UploadZone from '@/components/UploadZone';
import ResultsDisplay from '@/components/ResultsDisplay';
import MultipleFilesShare from '@/components/MultipleFilesShare';
import LoadingScreen from '@/components/LoadingScreen';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
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
      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          {state.uploadStatus === 'success' && state.uploadedFiles.length > 0 ? (
            // Success view
            <div className="space-y-8 animate-fade-in">
              {/* Success header */}
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  Share the file, using<br />the QR Code.
                </h1>
                <p className="text-gray-600">
                  The file will be available for the next 60 minutes. 
                  <button onClick={handleAddMoreFiles} className="text-blue-600 hover:text-blue-700 ml-1 font-medium">
                    Upload another one.
                  </button>
                </p>
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
            </div>
          ) : (
            // Upload view
            <div className="space-y-8">
              {/* Hero text */}
              {state.uploadStatus === 'idle' && state.uploadedFiles.length === 0 && (
                <div className="text-center animate-fade-in">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                    Drop your file.<br />
                    Get a <span className="text-blue-600">QR Code</span>.<br />
                    Share it.
                  </h1>
                  <p className="text-gray-600 text-lg">
                    100 MB max file size. Will be available for 60 minutes.
                  </p>
                </div>
              )}

              {/* Pending files indicator */}
              {state.uploadedFiles.length > 0 && state.uploadStatus === 'idle' && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{state.uploadedFiles.length}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {state.uploadedFiles.length} file{state.uploadedFiles.length > 1 ? 's' : ''} ready
                        </p>
                        <p className="text-sm text-gray-600">Add more or view your files</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setState(prev => ({ ...prev, uploadStatus: 'success' }))}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      View Files
                    </button>
                  </div>
                </div>
              )}

              {/* Upload zone */}
              <div className="animate-fade-in delay-200">
                <UploadZone 
                  onFileSelected={handleFileSelected}
                  disabled={state.uploadStatus === 'uploading'}
                />
              </div>

              {/* Uploading status with circular progress */}
              {state.uploadStatus === 'uploading' && (
                <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                  <div className="relative w-32 h-32 mb-6">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - state.uploadProgress / 100)}`}
                        className="text-blue-600 transition-all duration-300"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">{Math.round(state.uploadProgress)}%</span>
                    </div>
                  </div>
                  {state.currentlyUploading && (
                    <p className="text-gray-600 text-center max-w-md">
                      Uploading <span className="font-medium text-gray-900">{state.currentlyUploading}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Error message */}
              {state.uploadStatus === 'error' && state.errorMessage && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-900 mb-1">Upload Failed</h3>
                      <p className="text-sm text-red-700 mb-3">{state.errorMessage}</p>
                      <button
                        onClick={() => setState({ ...state, uploadStatus: 'idle', errorMessage: null, uploadProgress: 0 })}
                        className="text-sm font-semibold text-red-600 hover:text-red-700 underline"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
