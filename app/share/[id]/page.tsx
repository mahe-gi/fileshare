'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer';

interface FileData {
  fileName: string;
  downloadUrl: string;
  fileSize: number;
}

function SharePageContent() {
  const params = useParams();
  const [files, setFiles] = useState<FileData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFiles() {
      try {
        const id = params.id as string;
        if (!id) {
          setError('No share ID found');
          setLoading(false);
          return;
        }

        // Fetch from dpaste.com with retry logic
        const response = await fetch(`https://dpaste.com/${id}.txt`, {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          if (response.status === 429) {
            setError('The service is temporarily busy. Please wait a moment and try again.');
          } else if (response.status === 404) {
            setError('Share link not found or has expired. Links are valid for 24 hours.');
          } else {
            setError('Unable to load files. Please try again later.');
          }
          setLoading(false);
          return;
        }

        const content = await response.text();
        
        // Validate JSON content
        try {
          const filesData = JSON.parse(content);
          if (!Array.isArray(filesData) || filesData.length === 0) {
            setError('Invalid share link data');
            setLoading(false);
            return;
          }
          setFiles(filesData);
          setLoading(false);
        } catch (parseErr) {
          console.error('JSON parse error:', parseErr);
          setError('Invalid share link format');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading files:', err);
        if (err instanceof TypeError && err.message.includes('fetch')) {
          setError('Network error. Please check your internet connection.');
        } else {
          setError('Failed to load files. Please try again.');
        }
        setLoading(false);
      }
    }

    loadFiles();
  }, [params]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return (
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h10l4 4v16H2v-1z"/>
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 2h8l4 4v12H4V2zm2 2v12h8V7h-3V4H6z"/>
          </svg>
        );
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return (
          <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v10h10V5H5zm2 8l2-3 1.5 2L13 8l2 5H7z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 2h8l4 4v12H4V2zm2 2v12h8V7h-3V4H6z"/>
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FileShare</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Share files instantly with QR codes</p>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
            </div>
            <p className="text-lg font-medium text-gray-900">Loading files...</p>
            <p className="text-sm text-gray-500 mt-1">Please wait</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FileShare</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Share files instantly with QR codes</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Files</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
              <a
                href="/app"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FileShare</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Share files instantly with QR codes</p>
              </div>
            </div>
            <a
              href="/app"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Upload Files
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Page title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Shared Files
          </h2>
          <p className="text-gray-600">
            {files.length} file{files.length > 1 ? 's' : ''} ready to download
          </p>
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium text-amber-800">Links expire in 60 minutes</span>
          </div>
        </div>

        {/* Files list */}
        <div className="max-w-3xl mx-auto space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                {/* File icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                  {getFileIcon(file.fileName)}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1 break-words">
                    {file.fileName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.fileSize)}
                  </p>
                </div>

                {/* Download button */}
                <a
                  href={file.downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info banner */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">
              Files are hosted temporarily and will be automatically deleted after 60 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FileShare</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Share files instantly with QR codes</p>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
            </div>
            <p className="text-lg font-medium text-gray-900">Loading files...</p>
            <p className="text-sm text-gray-500 mt-1">Please wait</p>
          </div>
        </div>
      </main>
    }>
      <SharePageContent />
    </Suspense>
  );
}
