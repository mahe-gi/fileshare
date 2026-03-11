'use client';

import { useState } from 'react';
import UploadZone from '@/components/UploadZone';
import ResultsDisplay from '@/components/ResultsDisplay';
import LoadingScreen from '@/components/LoadingScreen';
import Footer from '@/components/Footer';
import { uploadToTmpFiles, UploadError } from '@/lib/api';

/**
 * Application state interface
 * Manages the complete upload and display flow
 */
interface AppState {
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  downloadUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  errorMessage: string | null;
  showLoading: boolean;
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
  const trainerImageUrl = ''; // Add image URL like: '/manoj-sir.jpg' or 'https://...'
  
  const [state, setState] = useState<AppState>({
    uploadStatus: 'idle',
    downloadUrl: null,
    fileName: null,
    fileSize: null,
    errorMessage: null,
    showLoading: true
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
   * Requirement 2.1: Transmit file to Storage_API
   * Requirement 7.1: Display error for unsupported file types with list
   */
  const handleFileSelected = async (file: File) => {
    // Validate file type (Requirement 7.1)
    if (!validateFileType(file)) {
      setState({
        uploadStatus: 'error',
        downloadUrl: null,
        fileName: null,
        fileSize: null,
        errorMessage: 'This file type is not supported. Please upload one of these file types: PDF, DOCX, PNG, JPG, JPEG, or GIF.',
        showLoading: false
      });
      return;
    }

    // Set uploading state
    setState({
      uploadStatus: 'uploading',
      downloadUrl: null,
      fileName: file.name,
      fileSize: file.size,
      errorMessage: null,
      showLoading: false
    });

    try {
      // Upload file to tmpfiles.org (Requirements 2.1, 2.2)
      const url = await uploadToTmpFiles(file);
      handleUploadSuccess(url, file.name);
    } catch (error) {
      handleUploadError(error);
    }
  };

  /**
   * Handles successful upload
   * Requirement 2.2: Receive Download_URL from Storage_API
   * Requirement 5.3: Display results after upload
   */
  const handleUploadSuccess = (url: string, fileName: string) => {
    setState({
      uploadStatus: 'success',
      downloadUrl: url,
      fileName: fileName,
      fileSize: state.fileSize,
      errorMessage: null,
      showLoading: false
    });
  };

  /**
   * Handles upload errors
   * Requirement 2.4: Display error messages from Storage_API
   * Requirement 7: Error handling with user-friendly messages
   * Requirement 7.5: Display all errors in plain, non-technical language
   */
  const handleUploadError = (error: unknown) => {
    let errorMessage = 'Something unexpected happened. Please try again.';

    if (error instanceof UploadError) {
      errorMessage = error.userMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    setState({
      uploadStatus: 'error',
      downloadUrl: null,
      fileName: state.fileName,
      fileSize: state.fileSize,
      errorMessage,
      showLoading: false
    });
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
      <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header with trainer branding */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg overflow-hidden">
            {trainerImageUrl ? (
              <img 
                src={trainerImageUrl} 
                alt="Manoj Sir" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl sm:text-4xl">📚</span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Manoj Sir's File Sharing Platform
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-4">
            Upload File → Generate QR Code → Share Instantly
          </p>
        </div>

        {/* Conditional rendering based on upload status */}
        {state.uploadStatus === 'success' && state.downloadUrl && state.fileName ? (
          // Display results after successful upload (Requirement 5.3)
          // Fade-in animation for smooth transition (Requirement 1.3, 2.3)
          <div className="animate-fade-in">
            <ResultsDisplay 
              downloadUrl={state.downloadUrl}
              fileName={state.fileName}
            />
          </div>
        ) : (
          // Display upload zone before/during upload (Requirement 5.2)
          <div className="animate-fade-in">
            <UploadZone 
              onFileSelected={handleFileSelected}
              disabled={state.uploadStatus === 'uploading'}
            />

            {/* Display uploading status (Requirement 1.3, 2.3) */}
            {state.uploadStatus === 'uploading' && (
              <div className="mt-6 text-center animate-fade-in">
                <div className="relative inline-block">
                  {/* Outer spinning ring */}
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
                  {/* Inner pulsing circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 bg-indigo-500 rounded-full animate-pulse opacity-50"></div>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 font-semibold text-lg">Uploading...</p>
                <p className="mt-1 text-gray-500 text-sm">Please wait while we process your file</p>
              </div>
            )}

            {/* Display error message (Requirement 2.4, 7) */}
            {state.uploadStatus === 'error' && state.errorMessage && (
              <div className="mt-6 max-w-2xl w-full px-4 animate-fade-in">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 sm:p-6 shadow-sm">
                  <div className="flex items-start">
                    <div className="text-2xl sm:text-3xl mr-3 flex-shrink-0">⚠️</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-red-800 mb-2 text-base sm:text-lg">Upload Failed</h3>
                      <p className="text-red-700 text-sm sm:text-base break-words">{state.errorMessage}</p>
                      <button
                        onClick={() => setState({ ...state, uploadStatus: 'idle', errorMessage: null })}
                        className="mt-4 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-100 active:bg-red-200 rounded-md transition-all duration-200 hover:shadow-sm"
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
