'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';

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

        // Fetch from GitHub Gist
        const response = await fetch(`https://api.github.com/gists/${id}`);
        
        if (!response.ok) {
          setError('Share link not found or expired');
          setLoading(false);
          return;
        }

        const gist = await response.json();
        const fileContent = gist.files['files.json']?.content;
        
        if (!fileContent) {
          setError('Invalid share link');
          setLoading(false);
          return;
        }

        const filesData = JSON.parse(fileContent);
        setFiles(filesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load files');
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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading files...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-200 mb-2">Error</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold"
          >
            Go to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mb-4 shadow-lg border-2 border-gray-600">
          <span className="text-3xl">📁</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
          Shared Files
        </h1>
        <p className="text-sm text-gray-400">
          {files.length} file{files.length > 1 ? 's' : ''} ready to download
        </p>
        <p className="text-xs text-gray-500 mt-2">⏰ Links expire in 60 minutes</p>
      </div>

      {/* Files List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-4 sm:p-6 border-2 border-gray-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-gray-500"
          >
            <div className="flex items-start gap-4">
              {/* File Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                📄
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-1 break-words">
                  {file.fileName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-3">
                  {formatFileSize(file.fileSize)}
                </p>

                {/* Download Button */}
                <a
                  href={file.downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-sm border border-gray-500"
                >
                  <span>⬇️</span>
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-xs">
        <p>Files are hosted temporarily and will expire after 60 minutes</p>
      </div>
    </main>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading files...</p>
        </div>
      </main>
    }>
      <SharePageContent />
    </Suspense>
  );
}
